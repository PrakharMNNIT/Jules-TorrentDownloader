# Velocity Kanban
Product Requirements Document (PRD) v2.0
Status: Draft
Last updated: 2026-02-06

## 1. Product Summary
Velocity Kanban is a local-first productivity system with a motorsport-inspired interface, tactile interactions, and an AI copilot that helps users decide what to do next. It is designed to be portfolio-grade visually while remaining dependable for daily execution.

## 2. Problem Statement
Power users and small creative teams struggle with three issues in traditional Kanban tools:
1. Low interaction quality on desktop and mobile.
2. Weak offline reliability for real work in unstable network conditions.
3. AI features that are generic and disconnected from board context.

Velocity Kanban solves these with responsive motion design, offline-first data handling, and contextual AI tools tied directly to board actions.

## 3. Goals and Non-Goals
### Goals
1. Deliver a fast, tactile Kanban experience that runs smoothly on mid-tier mobile devices.
2. Ensure core task workflows function offline without data loss.
3. Add practical AI assistance that changes board state through safe tool calls.
4. Provide controlled collaboration with granular permission links.

### Non-Goals (MVP)
1. Enterprise SSO, SCIM, audit-compliance packs.
2. Advanced dependency graphs and gantt planning.
3. Complex team hierarchy/role management beyond link permissions.
4. Native desktop clients.

## 4. Target Users
### Primary
1. Solo power users managing high-volume personal and client tasks.
2. Creator teams (2-10 people) needing quick, visual collaboration.

### Secondary
1. Portfolio reviewers and hiring managers evaluating product craft.

## 5. Product Principles
1. Local-first by default: user can create, edit, move, and complete tasks without internet.
2. Speed as UX: every interaction should feel immediate and intentional.
3. AI as operator, not chatbot only: suggestions should trigger concrete actions.
4. Safety over novelty: destructive operations require explicit permission and undo paths.

## 6. Core User Journeys
### Journey A: Solo Power User
1. User opens app and lands on last active board.
2. User creates a task with custom fields (priority, energy, estimate).
3. User drags task from `To Do` to `In Progress` with spring motion and visual snap.
4. User asks AI, "I am low energy, what should I do next?"
5. AI ranks options from due date, energy fit, and effort score.
6. User completes task, gains XP, and sees streak update.
7. User reopens app days later on mobile and sees synced state.

### Journey B: Collaborative Creator
1. Owner shares board with a contributor link.
2. Collaborator moves cards and edits task details in real time.
3. AI flags bottleneck patterns (for example, repeated moves into `Blocked`).
4. Owner exports JSON snapshot before major refactor.

## 7. Scope
### In Scope (MVP)
1. Kanban boards with custom columns and custom task fields.
2. Local persistence and offline operation.
3. Cloud sync for account-based multi-device continuity.
4. AI chat with board-aware suggestions and safe tool calling.
5. 3-tier sharing model with revocable magic links.
6. Gamification v1: XP, streaks, completion feedback.
7. Undo/redo stack for key board operations.

### Out of Scope (MVP)
1. Full semantic vector memory store.
2. Live multiplayer cursors at large scale.
3. WebGL-heavy hero surfaces in app runtime.

## 8. Functional Requirements
### Board and Task Management
1. FR-01: System supports multiple boards per user.
2. FR-02: Board columns are user-configurable and reorderable.
3. FR-03: Tasks support dynamic custom fields defined at board level.
4. FR-04: Drag-and-drop must preserve deterministic ordering in each column.
5. FR-05: Undo/redo for create, update, move, delete, and column edits.

### Collaboration and Sharing
1. FR-06: Share links support `view`, `edit-safe`, `edit-full`.
2. FR-07: `edit-safe` can create/edit/move tasks but cannot delete columns or archive board.
3. FR-08: Owners can revoke links instantly from link dashboard.
4. FR-09: Board changes sync in near real time across active clients.

### AI Copilot
1. FR-10: AI assistant receives board snapshot metadata in each turn.
2. FR-11: AI can call tools: `createTask`, `moveTask`, `analyzeBottlenecks`, `suggestPrioritization`.
3. FR-12: All AI-initiated board mutations require user confirmation in MVP.
4. FR-13: Last 10 threads per board are persisted for context continuity.

### Gamification
1. FR-14: Task completion awards XP based on action type.
2. FR-15: Daily streak counter updates on qualifying completion events.
3. FR-16: Completion feedback includes lightweight visual celebration with reduced-motion fallback.

## 9. Non-Functional Requirements
1. NFR-01 Performance: drag interactions sustain 60fps target on mid-tier Android devices.
2. NFR-02 Performance: cold launch under 2.0s for boards up to 1,000 tasks on modern desktop.
3. NFR-03 Reliability: offline create/edit/move/delete succeeds with queued sync when online returns.
4. NFR-04 Accessibility: WCAG 2.2 AA contrast and full keyboard navigation for all critical flows.
5. NFR-05 Motion Safety: all non-essential motion disabled when `prefers-reduced-motion: reduce`.
6. NFR-06 Security: BYOK secrets are never persisted server-side; logs redact key-like payloads.

## 10. UX and Visual System (ui-ux-pro-max aligned)
### Experience Direction
1. Interaction pattern: interactive demo + feature-rich productivity canvas.
2. Style: micro-interactions, tactile motion, contextual feedback.
3. Layout priority: board first, AI and telemetry as assistive rails.

### Design Tokens (v1)
```css
:root {
  --vk-primary: #0D9488;
  --vk-secondary: #14B8A6;
  --vk-cta: #F97316;
  --vk-bg: #F0FDFA;
  --vk-text: #134E4A;
  --vk-focus: #0EA5E9;
}
```

### Typography
1. Headings: `Fira Code`.
2. Body/UI: `Fira Sans`.
3. Data labels and shortcuts: mono variants only where density or scan speed benefits.

### Motion Rules
1. Micro-interactions: 150-300ms.
2. Drag feedback: transform/opacity only (no width/height animation).
3. Avoid infinite decorative animation.
4. Use easing curves (not linear) for entry/exit transitions.

### Accessibility Requirements
1. Minimum contrast ratio 4.5:1 for normal text.
2. Icon-only controls require `aria-label`.
3. Errors announced with `role="alert"` or `aria-live`.
4. Primary workflows must be keyboard-complete.
5. Touch targets minimum 44x44px.

## 11. Technical Architecture
### Frontend and Runtime
1. Next.js 14+ App Router with TypeScript.
2. Tailwind CSS for tokenized styling and theming.
3. Framer Motion for drag physics and constrained motion effects.

### Data and Sync
1. Local source of truth: Dexie (IndexedDB).
2. Cloud sync: Firebase Firestore (real-time listeners and offline persistence enabled).
3. Conflict policy: last-write-wins for MVP plus manual merge prompt on critical collisions.
4. Background sync: service worker queues writes while offline.

### Collaboration
1. Presence and updates in MVP via Firestore listeners.
2. Yjs CRDT integration remains Phase 2+ if conflict profile requires it.

### AI Runtime
1. UI streaming via Vercel AI SDK.
2. Bedrock/OpenAI provider via proxy route handlers.
3. BYOK keys encrypted locally at rest (WebCrypto) and never stored in backend databases.
4. Keys may pass transiently through proxy requests and are immediately discarded after request completion.

## 12. Data Model (MVP)
```ts
interface Board {
  id: string;
  ownerId: string;
  title: string;
  columns: Column[];
  customFields: FieldSchema[];
  theme: {
    accentColor: string;
    mode: "dark" | "light" | "system";
    particleEffects: boolean;
  };
  shareLinks: ShareLink[];
  version: number;
  updatedAt: number;
}

interface Task {
  id: string;
  boardId: string;
  columnId: string;
  position: number;
  data: {
    title: string;
    description?: string;
    [fieldId: string]: unknown;
  };
  aiContext: {
    estimatedTime?: number;
    complexity?: "low" | "medium" | "high";
    lastDiscussed?: number;
  };
  updatedAt: number;
}

interface AIThread {
  id: string;
  boardId: string;
  messages: Message[];
  contextSnapshot: Record<string, unknown>;
  createdAt: number;
}

interface ShareLink {
  token: string;
  permission: "view" | "edit-safe" | "edit-full";
  createdAt: number;
  usageCount: number;
  expiresAt?: number;
}
```

## 13. MVP Release Plan
### Phase 1 (Weeks 1-3): Core Board
1. Next.js, Tailwind, Dexie foundations.
2. Auth and board CRUD.
3. Drag-drop with motion constraints.
4. Custom field schema builder.
5. View-only link sharing.

Exit criteria:
1. User can manage full board offline and restore state after reload.

### Phase 2 (Weeks 4-6): Sync and Intelligence
1. Firestore sync and offline indicator.
2. AI chat with board metadata and tool calls.
3. 3-tier sharing permissions.
4. Undo/redo command stack.
5. Gamification v1.

Exit criteria:
1. Two devices stay consistent after network interruptions.
2. AI can perform safe task operations with confirmation.

### Phase 3 (Weeks 7-8): Polish and Portfolio
1. Import/export JSON and CSV.
2. Calendar export (iCal).
3. PWA tuning and gesture polish.
4. Performance and accessibility hardening pass.

Exit criteria:
1. 60fps drag benchmark reached on target devices.
2. Accessibility audit passes AA checks for core flows.

## 14. Success Metrics
1. SQ-01 Interaction: p95 drag frame time under 16.7ms on test matrix.
2. SQ-02 Reliability: zero data-loss incidents in offline-to-online reconciliation tests.
3. SQ-03 AI Utility: at least 60% of accepted AI suggestions result in completed tasks within 48 hours.
4. SQ-04 Engagement: average session time above 3 minutes on portfolio demo board.

## 15. Risks and Mitigations
1. Risk: motion-heavy UI hurts accessibility.
   Mitigation: reduced-motion mode, strict animation budgets, keyboard-first QA.
2. Risk: sync collisions create trust issues.
   Mitigation: deterministic ordering keys, merge prompts, reconciliation logs.
3. Risk: BYOK handling introduces security concerns.
   Mitigation: local encryption, redaction filters, no server-side persistence, threat-model review.
4. Risk: scope creep in AI workflows.
   Mitigation: fixed tool surface for MVP and explicit confirmation gate.

## 16. Open Decisions
1. Decide if live cursors are mandatory for MVP or deferred to post-MVP.
2. Confirm whether iCal sync is export-only or two-way calendar integration.
3. Finalize device benchmark matrix for performance sign-off.
