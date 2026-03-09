# HyperScale AWC — Technical Roadmap: From Prototype to Production

**To:** Product Management & Engineering Teams
**From:** Suchit Bachalli
**Date:** March 2026
**Re:** APIs, MCPs, and Architecture Required to Productionize HyperScale

---

## 1. What the Prototype Proves

The HyperScale prototype demonstrates four AI agents working in concert to automate CX1 eCommerce implementations:

| Agent | What It Does | Time Saved |
|-------|-------------|------------|
| **Project Scaffolding** | Provisions 8 systems (SF, SmartSheet, Teams, Jira, FTP, CIMM2, OneDrive, Intake) in 18.6s | 3-4 hrs → 19s |
| **Customer Interface** | Conversational intake replacing Excel spreadsheet — 350+ fields, 29 domains | 24 hrs → 2-3 hrs |
| **Product Data** | PIM pipeline — import, AI enrichment, schema.org validation, publish (24 items × 4 stages) | 12 hrs → 21s |
| **Meeting Intelligence** | Auto-capture Zoom/Teams calls, extract structured data, auto-populate intake fields | 5 hrs → 5 min |

**Blended result:** 52 hours of manual implementation work → 5 hours of agent-assisted work (90% reduction).

The prototype is live at the Vercel deployment and runs entirely on simulated data. This document covers what's needed to make each agent real.

---

## 2. Current Architecture (UniOps / AI-Ops)

We already have a production architecture for AI-Ops (the UniTech support chatbot):

```
User → unitech-support.unilog.corp.com → LB (34.8.229.88) → Firewall
  → GKE Cluster (AI-OPS)
    → Ingress Controller → Chat Service (/chat)
    → Vertex Agent (LLM)
    → MCP Services: GKE, Cloudflare, GitLab, Jira, Freshdesk, Site 24*7
    → PostgreSQL (chat history, login history, configurations, metering)
    → Knowledge Base Service
```

**What we can reuse from AI-Ops:**
- GKE infrastructure and deployment patterns
- MCP service architecture (the plugin model for external systems)
- Chat Service foundation (WebSocket-based conversation)
- PostgreSQL for state management
- Vertex Agent orchestration layer
- Jira MCP (already built)

**What's new for HyperScale:**
- Additional MCP services for implementation-specific systems
- Multi-agent orchestration (4 agents sharing state, not 1 agent)
- Domain-specific data model (29 intake domains, product pipeline stages)
- Meeting intelligence pipeline (Zoom/Teams → transcription → extraction)

---

## 3. Target Architecture for HyperScale

```
                    ┌──────────────────────────────────────────────────┐
                    │           GKE CLUSTER (HYPERSCALE)               │
                    │                                                  │
                    │  ┌─────────────────────────────────────────────┐ │
                    │  │         ORCHESTRATION LAYER                  │ │
                    │  │    (Agent Coordinator / State Machine)       │ │
                    │  │                                             │ │
                    │  │  Manages agent lifecycle, shared state,     │ │
                    │  │  dependency tracking, AWC scoring           │ │
                    │  └──────────┬──────────┬──────────┬───────────┘ │
                    │             │          │          │              │
                    │     ┌───────▼──┐ ┌────▼────┐ ┌──▼───────┐     │
                    │     │Scaffolding│ │Customer │ │Product   │     │
                    │     │  Agent   │ │Interface│ │Data Agent│     │
                    │     └────┬─────┘ │ Agent   │ └────┬─────┘     │
                    │          │       └────┬────┘      │           │
                    │          │            │           │           │
                    │     ┌────▼────────────▼───────────▼─────┐     │
                    │     │      MEETING INTELLIGENCE AGENT     │     │
                    │     │  (feeds data to all other agents)   │     │
                    │     └────────────────┬───────────────────┘     │
                    │                      │                         │
                    │  ┌───────────────────▼──────────────────────┐  │
                    │  │           MCP SERVICE LAYER               │  │
                    │  │                                          │  │
                    │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐  │  │
                    │  │  │  SF  │ │Teams │ │SmartS│ │  Jira  │  │  │
                    │  │  │ MCP  │ │ MCP  │ │ MCP  │ │  MCP   │  │  │
                    │  │  └──────┘ └──────┘ └──────┘ └────────┘  │  │
                    │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐  │  │
                    │  │  │ FTP  │ │ PIM  │ │ Zoom │ │ Claude │  │  │
                    │  │  │ MCP  │ │ MCP  │ │ MCP  │ │AI MCP  │  │  │
                    │  │  └──────┘ └──────┘ └──────┘ └────────┘  │  │
                    │  │  ┌──────┐ ┌──────┐                      │  │
                    │  │  │ShareP│ │  P21 │                      │  │
                    │  │  │ MCP  │ │ MCP  │                      │  │
                    │  │  └──────┘ └──────┘                      │  │
                    │  └──────────────────────────────────────────┘  │
                    │                                                │
                    │  ┌──────────────────────────────────────────┐  │
                    │  │            DATA LAYER                     │  │
                    │  │                                          │  │
                    │  │  PostgreSQL         Redis                │  │
                    │  │  - Project state    - Agent session cache│  │
                    │  │  - Domain data      - Real-time events   │  │
                    │  │  - Meeting notes    - WebSocket pub/sub  │  │
                    │  │  - Audit trail                           │  │
                    │  │  - Product pipeline                      │  │
                    │  └──────────────────────────────────────────┘  │
                    └──────────────────────────────────────────────────┘
                                          │
                    ┌─────────────────────▼──────────────────────────┐
                    │              EXTERNAL SYSTEMS                   │
                    │                                                │
                    │  Salesforce   SmartSheet   MS Teams   Jira     │
                    │  SharePoint   FTP/SFTP     Prophet21  Zoom     │
                    │  CX1 PIM     Claude API   CIMM2 Admin         │
                    └────────────────────────────────────────────────┘
```

---

## 4. MCP Services Needed (10 Total)

### 4.1 Already Built / Can Reuse

| MCP | Source | Status | Used By |
|-----|--------|--------|---------|
| **Jira MCP** | AI-Ops existing | Production | Scaffolding Agent |
| **PIM MCP** | `pim-mcp-server` (TypeScript, in this repo) | Built, needs hardening | Product Data Agent |
| **Schema.org Agent** | `schema-org-agent-py` (Python, in this repo) | Built, needs hardening | Product Data Agent |

### 4.2 New MCPs to Build

| MCP | Priority | Complexity | APIs Required | Used By |
|-----|----------|-----------|---------------|---------|
| **Salesforce MCP** | P0 — Critical | High | REST API v58.0: `Project__c`, `Account`, `User`, `Community_User__c` | Scaffolding |
| **Microsoft Graph MCP** | P0 — Critical | High | Teams API + SharePoint API + OneDrive API (single OAuth app) | Scaffolding |
| **SmartSheet MCP** | P1 — Important | Medium | REST API v2: Workspaces, Sheets, Rows, Dashboards | Scaffolding |
| **FTP/SFTP MCP** | P1 — Important | Low | SSH/SFTP: mkdir, chmod, put | Scaffolding |
| **Zoom MCP** | P1 — Important | Medium | REST API: Meetings, Recordings, Transcripts | Meeting Intel |
| **Prophet 21 MCP** | P0 — Critical | High | Epicor P21 REST API: Items, Ship Vias, Order Statuses, Pricing | Customer Interface + Product Data |
| **Claude AI MCP** | P0 — Critical | Medium | Anthropic API: Messages, tool_use for enrichment | Product Data + Meeting Intel |

### 4.3 MCP Service Specification Template

Each MCP should follow the same pattern as our AI-Ops MCPs:

```typescript
// Example: Salesforce MCP
interface SalesforceMCP {
  // Tools exposed to the agent
  tools: {
    create_project: (params: CreateProjectParams) => ProjectResult;
    enable_portal_users: (params: EnableUsersParams) => UserResult[];
    assign_project_owner: (params: AssignOwnerParams) => void;
    get_project_status: (projectId: string) => ProjectStatus;
    log_domain_completion: (projectId: string, domain: string) => void;
  };

  // Auth
  auth: {
    type: 'oauth2';
    scopes: ['api', 'id', 'refresh_token'];
    instance_url: string;  // e.g., https://unilog.my.salesforce.com
  };
}
```

---

## 5. API Inventory by Agent

### 5.1 Scaffolding Agent — 8 System Integrations

| System | API | Key Endpoints | Auth |
|--------|-----|--------------|------|
| **Salesforce** | REST API v58.0 | `POST /sobjects/Project__c`, `POST /sobjects/Community_User__c`, `PATCH /sobjects/User/{id}` | OAuth 2.0 (Connected App) |
| **Customer Portal** | Salesforce Community API | `POST /connect/communities/{id}/members`, Password reset triggers | Same SF OAuth |
| **SmartSheet** | REST API v2.0 | `POST /workspaces`, `POST /sheets`, `POST /sheets/{id}/rows`, `POST /workspaces/{id}/copy` | API Token or OAuth 2.0 |
| **MS Teams** | Microsoft Graph API v1.0 | `POST /teams`, `POST /teams/{id}/channels`, `POST /teams/{id}/members` | OAuth 2.0 (Azure AD App) |
| **FTP** | SFTP Protocol | `mkdir`, `chmod`, `put` (via SSH2 library) | SSH Key or Password |
| **Jira** | REST API v3 | `POST /rest/api/3/issue` (Epic, Story, Sub-task), `PUT /rest/api/3/issue/{key}` | API Token (Basic Auth) |
| **Intake Form** | MS Teams Files / SharePoint | `PUT /drives/{driveId}/items/{itemId}/content` (upload XLSX) | Same MS Graph OAuth |
| **SharePoint** | Microsoft Graph API v1.0 | `POST /drives/{driveId}/root/children`, `POST /drives/{driveId}/items/{id}/invite` | Same MS Graph OAuth |

**OAuth consolidation note:** MS Teams, SharePoint, and OneDrive all use the same Microsoft Graph OAuth app — single auth flow covers 3 systems.

### 5.2 Customer Interface Agent — LLM + Domain State

| Integration | API | Purpose |
|------------|-----|---------|
| **Vertex AI / Claude** | Vertex Agent API or Anthropic Messages API | Conversation orchestration, field extraction, contextual Q&A |
| **Prophet 21** | Epicor P21 REST API | Validate ERP connectivity, fetch ship vias, order statuses |
| **Zoom** | Zoom REST API v2 | Trigger meeting creation, fetch calendar availability |
| **Calendar** | Microsoft Graph Calendar API | Check PM availability, create events |
| **Internal State DB** | PostgreSQL | Read/write 29 domain states, 350+ fields |

### 5.3 Product Data Agent — PIM Pipeline

| Integration | API | Purpose |
|------------|-----|---------|
| **CX1 PIM** (already built) | Item Service REST + gRPC | Fetch catalog, items, taxonomy |
| **Claude AI** | Anthropic Messages API | Generate descriptions, FAQs, keywords, normalize UOM |
| **Schema.org Validator** (already built) | Internal Python service | Score compliance, generate JSON-LD |
| **CX1 Workspace** | PIM Workspace API | Push enriched products, publish JSON-LD |

### 5.4 Meeting Intelligence Agent

| Integration | API | Purpose |
|------------|-----|---------|
| **Zoom** | REST API v2 | `GET /recordings/{id}/transcript` — fetch auto-transcription |
| **MS Teams** (optional) | Graph API | Meeting recordings + transcript if Teams meetings |
| **Claude AI** | Anthropic Messages API | Extract structured data from transcript text |
| **Internal State** | PostgreSQL | Store meeting notes, link to domains, track auto-populated fields |

---

## 6. Shared Data Model

All agents read/write to a shared project state:

```sql
-- Core tables
projects (id, customer_name, erp_type, go_live_date, awc_score, status)
project_systems (project_id, system_type, status, external_id, provisioned_at)
domains (project_id, domain_name, status, fields_collected, fields_total, source)
domain_fields (domain_id, field_name, value, confidence, source, auto_populated)
meetings (project_id, title, date, duration, participants, domain, transcript_url)
meeting_extractions (meeting_id, field_name, value, confidence)
products (project_id, part_number, brand, category, stage, compliance_score, risk_tier)
product_enrichments (product_id, enrichment_type, before_value, after_value, ai_model)
audit_log (project_id, agent, action, details, timestamp)
```

---

## 7. Real-Time Communication

The prototype uses simulated animations, but production needs real-time updates:

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Agent → UI updates** | WebSocket (Socket.IO or native WS) | Stream scaffolding progress, chat messages, pipeline stages |
| **Agent → Agent events** | Redis Pub/Sub | Meeting Intelligence notifies Customer Interface of new extractions |
| **Long-running jobs** | GKE Jobs + status polling | Product Data enrichment (24 items × Claude API calls) |
| **Terminal output** | Server-Sent Events (SSE) | Stream log lines to terminal component |

---

## 8. Authentication & Secrets

| System | Auth Method | Secret Storage |
|--------|------------|----------------|
| Salesforce | OAuth 2.0 (Connected App) | GCP Secret Manager |
| Microsoft Graph (Teams/SharePoint/Calendar) | OAuth 2.0 (Azure AD) | GCP Secret Manager |
| SmartSheet | OAuth 2.0 or API Token | GCP Secret Manager |
| Jira | API Token (Basic Auth) | GCP Secret Manager (already in AI-Ops) |
| FTP/SFTP | SSH Key | GCP Secret Manager |
| Zoom | OAuth 2.0 (Server-to-Server) | GCP Secret Manager |
| Prophet 21 | Basic Auth (per-customer) | Per-project encrypted storage |
| Claude AI | API Key | GCP Secret Manager |
| CX1 PIM | Internal service auth | Service account token |

**Per-customer credentials:** ERP credentials (P21 username/password) are customer-specific. Need a credential vault pattern where each project stores its own ERP auth securely.

---

## 9. Implementation Phases

### Phase 1: Foundation (4-6 weeks)
- [ ] Stand up GKE cluster for HyperScale (or add namespace to AI-Ops cluster)
- [ ] Build Orchestration Layer (agent coordinator, shared state, event bus)
- [ ] Build PostgreSQL schema for project state, domains, products, meetings
- [ ] Build WebSocket layer for real-time UI updates
- [ ] Port the Next.js frontend from prototype to production (connect to real APIs)

### Phase 2: Scaffolding Agent (4-6 weeks)
- [ ] Build Salesforce MCP (create project, enable portal users, assign owner)
- [ ] Build Microsoft Graph MCP (Teams + SharePoint + OneDrive in one OAuth app)
- [ ] Build SmartSheet MCP (workspace creation, template copying)
- [ ] Build FTP/SFTP MCP (directory creation, permission setting)
- [ ] Extend existing Jira MCP (epic/story/sub-task creation)
- [ ] Wire agents to MCP services via Orchestration Layer
- [ ] Build Manifest generation (post-scaffolding summary)

### Phase 3: Customer Interface Agent (6-8 weeks)
- [ ] Build conversation engine (Vertex Agent or Claude-based)
- [ ] Define 29 domain schemas with field definitions, validation rules
- [ ] Build chat UI with real WebSocket streaming (not simulated)
- [ ] Build domain progress tracking and field extraction pipeline
- [ ] Build call-prompt → calendar scheduling flow (MS Graph Calendar API)
- [ ] Build Prophet 21 MCP for ERP validation
- [ ] Build intake form generation (XLSX export from domain state)

### Phase 4: Meeting Intelligence (3-4 weeks)
- [ ] Build Zoom MCP (fetch recordings, transcripts)
- [ ] Build Claude extraction pipeline (transcript → structured data)
- [ ] Build auto-population flow (extraction → domain field update)
- [ ] Build Meeting Intelligence UI (meeting list, detail, agent context)
- [ ] Wire meeting data into Customer Interface Agent's context

### Phase 5: Product Data Agent (3-4 weeks)
- [ ] Harden existing PIM MCP server for production use
- [ ] Harden existing schema-org-agent-py for production use
- [ ] Build import → enrich → validate → publish pipeline orchestration
- [ ] Build Claude enrichment calls (descriptions, FAQs, keywords, UOM)
- [ ] Build real-time progress streaming for pipeline UI
- [ ] Build compliance dashboard with real scoring

### Phase 6: Integration & Polish (2-3 weeks)
- [ ] End-to-end testing with a real customer implementation
- [ ] AWC score calculation from real agent data
- [ ] Audit trail and compliance logging
- [ ] Error handling, retries, circuit breakers for all MCPs
- [ ] Performance optimization (parallel provisioning where possible)
- [ ] Security audit (credential handling, PII in transcripts)

**Total estimated timeline: 22-31 weeks (~5-7 months)**

---

## 10. Key Technical Decisions Needed

1. **LLM choice for agents:** Vertex Agent (current AI-Ops pattern) vs Claude API directly? Vertex gives us Google-native orchestration but Claude gives us better extraction quality. Could use Vertex as orchestrator with Claude as the LLM.

2. **Multi-agent framework:** Custom orchestration layer vs LangGraph vs CrewAI vs Claude Agent SDK? The prototype shows 4 agents sharing state — need a framework that handles inter-agent communication and dependency tracking.

3. **Real-time streaming:** WebSocket (bidirectional) vs SSE (server-push only)? Scaffolding and Product Data are mostly server-push, but Customer Interface needs bidirectional chat.

4. **Per-customer credentials:** How do we securely store and rotate customer-specific ERP credentials? Need a vault pattern (HashiCorp Vault, GCP Secret Manager with per-project namespacing).

5. **Deployment model:** Separate GKE cluster for HyperScale, or namespace within AI-Ops cluster? Separate gives isolation; shared reduces infra cost.

6. **Meeting transcript handling:** Zoom AI companion transcripts vs building our own transcription (Whisper/Deepgram)? Zoom AI is cheaper but less customizable. Need to handle PII in transcripts carefully.

---

## 11. What We Already Have (Head Start)

| Asset | Location | Status |
|-------|----------|--------|
| PIM MCP Server (TypeScript) | `pim-mcp-server/` | Built, connects to CX1 Item Service |
| Schema.org Agent (Python) | `schema-org-agent-py/` | Built, AI enrichment + compliance scoring |
| PIM gRPC Gateway | `pim-grpc-gateway/` | Built, dual-protocol REST+gRPC |
| Jira MCP | AI-Ops production | Running in production |
| GKE Infrastructure | AI-Ops cluster | Running, can extend |
| Chat Service pattern | AI-Ops production | Running, can adapt |
| Vertex Agent integration | AI-Ops production | Running, can extend |
| Prototype UI (Next.js) | `hyperscale-prototype/` | Complete, deploy-ready |

**Bottom line:** We're not starting from zero. The PIM pipeline is 60% built. The infrastructure pattern is proven. The biggest new work is the Salesforce MCP, Microsoft Graph MCP, and the multi-agent orchestration layer.
