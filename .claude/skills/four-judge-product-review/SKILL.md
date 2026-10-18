---
name: four-judge-product-review
description: Implement and review a product through four independent specialist reviewers. Use when the owner requests four judges, unanimous review, or an evidence-based build-review-fix loop. Requires a defined product brief, release scope, artifact identity, and available reviewer tooling. Never invent reviewers or unanimity.
---

# Four-Judge Product Review

## Goal

Help a product team persist through implementation, visual inspection and remediation until four distinct reviewers approve the same release candidate. Agreement is based on the owner's requirements and observed behavior, not a score invented by the implementer.

## Inputs

- Product brief and explicit owner preferences.
- Repository/workspace and existing user changes.
- Required release scope and out-of-scope items.
- Actual tool, service, credential and device availability.
- Available time/resource constraints.

Do not restart discovery for information already supplied. Resolve routine reversible details autonomously. Only ask for material missing information or necessary permissions.

## Roles

Use exactly four reviewer contexts, distinct from the implementer:

1. product-judge-visual: typography, layout, image use, density, consistency and rendered visual quality.
2. product-judge-ux: user journeys, discoverability, feedback, accessible interaction and recovery.
3. product-judge-domain (this project: fitness/nutrition/data correctness, provenance and responsible guidance). Travel products used product-judge-integrations instead.
4. product-judge-engineering: architecture, persistence, migration, privacy, build compatibility, performance and regressions.

Adapt domain vocabulary to the product while keeping expertise separate. Reviewers receive the same frozen brief/checklist and artifact version. Their first reports are independent; do not reveal other verdicts first or ask them to agree.

If actual independent-agent execution is unavailable, do not simulate four people in the main reply. State the limitation, perform a clearly labeled provisional four-perspective review and continue useful implementation. Actual four-agent consensus remains unverified until separate reviewer contexts run.

In Claude Code, the four reviewers are the subagents defined in `.claude/agents/product-judge-*.md` (or `~/.claude/agents/`). Dispatch them with the Agent tool, one call per judge, in a single message so they run concurrently and cannot read each other's reports.

## Working artifacts

Keep a minimal evidence directory inside the project, normally `docs/reviews/`:

- scope.md: requirements, release gates, explicitly deferred items and real external blockers.
- candidate.json: source/artifact identity, platform/build, test time and evidence index.
- findings.json: finding IDs, judge, severity, reproduction, acceptance condition and current disposition.
- round-N/J1.md through J4.md: actual individual reports.
- round-N/consensus.md: agreement status and unresolved objections.
- checkpoint.md: completed work, open tasks, next action and exact reproduction commands.

Generated reports and captures must not recursively invalidate the source fingerprint. Define a source-file scope and use a commit ID plus a digest of relevant uncommitted and untracked source/configuration changes, or an equivalent reproducible artifact identity. Do not report a clean commit as the tested artifact when uncommitted code was present.

## Review report contract

Every report includes:

- Judge ID and reviewed artifact ID.
- Brief/scope revision and observed platform/viewport.
- What was actually inspected, including runtime, captures or source locations.
- Findings with stable IDs and severity.
- A concrete condition for closing each finding.
- Verdict: PASS, FAIL or BLOCKED, with rationale.
- Limitations: missing credentials, unavailable device, uninspected surface or tools.

Do not infer test success from a README or a previous session. Distinguish live integration evidence from mocks and adapter tests. Screenshots prove rendered states, not necessarily successful persistence or service calls.

## Severity

- P0: data loss, serious security exposure, unauthorized action or fundamentally unsafe release.
- P1: failed required journey, inaccessible primary action, missing required capability, misleading data/integration or major visual/interaction defect.
- P2: meaningful polish, minor usability/performance or maintainability issue.
- P3: optional improvement.

A finding must cite observable evidence. Optional subjective preference alone is not a P1.

## Execution loop

1. Inspect the project and preserve unrelated work.
2. Translate the owner brief into stable, observable acceptance criteria.
3. Run the current application and capture a baseline when possible.
4. Implement a coherent candidate with working interactions.
5. Run the appropriate checks and inspect actual rendered screens.
6. Freeze candidate identity and evidence bundle.
7. Dispatch all four reviewers against that same candidate. Reviewers are read-only except their own report files.
8. Collect independent reports. Consolidate duplicates without deleting dissent or weakening conditions.
9. Fix P0/P1 issues first, then meaningful P2 issues. The implementer owns code changes.
10. Retest affected behavior, create a new candidate identity and obtain updated reviews.
11. Repeat while substantive progress and resources allow.

For conflicting findings, reproduce the issue and compare solutions against the owner brief. Use small controlled experiments. Do not rewrite a reviewer's verdict, apply majority voting or encourage approval merely to end a loop.

## Consensus gate

Final approval requires four explicit PASS verdicts for the final candidate and scope revision. All required checks must have corresponding evidence. P0/P1 findings are closed, and any accepted P2 debt is documented and explicitly acknowledged by every judge.

A source change after review requires updated verification and affected-review reevaluation. All four must acknowledge the final artifact. Earlier passes do not silently transfer to a different build.

BLOCKED is not PASS. If credentials or native build access prevent required live checks, report implementation readiness separately from release approval. Do not downgrade required scope simply to generate unanimity.

## Persistence and stopping conditions

Work continuously through authorized reversible tasks without asking "shall I continue?" after each action. Use bounded blocks of up to six substantive cycles and save checkpoints. Continue with another block when meaningful progress and resources allow.

If two successive cycles make no progress on the same issue, isolate the blocker and change strategy. If credentials, permissions, resources or an unresolved product contradiction prevent completion, finish independent tasks and report the exact blocker. Do not burn unbounded API credits, bypass restrictions or invent success.

Before a context/session limit, write a precise checkpoint so the next session can resume without repeating work. Keep findings and evidence, not just a vague progress percentage.

## Owner communication

Give short useful progress updates. Final handoff leads with how to open the actual product, then visible changes, verification evidence, four verdicts and remaining blockers. Never claim "four judges approved" unless all four reports exist for that candidate. AI reviewers are not human certification.
