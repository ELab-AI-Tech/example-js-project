# Exercise: CLAUDE.md and Skills

**Session 1, Section 1.6 — Context Engineering in Practice**
**Format:** facilitator-led demo, ~30 min. No participant setup required.

> Outcome: participants see that context files load automatically and unconditionally, nested files scope to a subtree, and skills load only when their description matches the task.

---

## Pre-flight checklist

Run these before the session. Verify in front of the group — it normalises the reset habit.

```bash
# 1. Confirm the repo is clean (no staged failure-mode edits in the way)
git status

# 2. Confirm no compass or skills files exist yet
ls CLAUDE.md AGENTS.md .claude .cursor 2>/dev/null && echo "FOUND — run reset first" || echo "Clean — ready"

# 3. Start the dev server so the app is visible on screen (optional but useful)
npm run dev
```

Pick your tool for this session. Run the whole demo in one tool only.

| | Claude Code | Cursor |
|---|---|---|
| Start the agent | `claude` in terminal | Open Composer (Cmd+I) |
| Restart the agent | Ctrl+C then `claude` again | New chat (the + icon) |
| Compass file | `CLAUDE.md` at repo root | `AGENTS.md` at repo root OR `.cursor/rules/caveman.mdc` |
| Nested compass | `src/components/CLAUDE.md` | `.cursor/rules/components.mdc` (auto-attached by glob) |
| Skill | `.claude/skills/create-component/SKILL.md` | `.cursor/rules/create-component.mdc` (agent-requested) |

---

## Demo 1 — Baseline (no compass, no skills)

**What you show:** the agent's default behaviour with zero project context.

**Prompt:**
```
What does this repo do?
```

**What to observe:** a polite, well-structured, multi-paragraph explanation. Maybe a preamble. Definitely a postamble. The agent is trying to be helpful.

**Talking point:** this is what the agent knows from code alone. Notice it doesn't know your team's naming conventions, your domain vocabulary, or anything else that isn't in the files.

---

## Demo 2 — Drop the root compass

**What you show:** the compass file loads on every request, unconditionally.

**Step 1 — Copy the file into place:**

```bash
# Claude Code
cp assets/claude-code/CLAUDE.md.txt CLAUDE.md

# Cursor
cp assets/cursor/AGENTS.md.txt AGENTS.md
# — or, for the rules variant —
mkdir -p .cursor/rules
cp assets/cursor/.cursor/rules/caveman.mdc.txt .cursor/rules/caveman.mdc
```

**Step 2 — Restart the agent** (required — the file loads at session start).

- Claude Code: Ctrl+C, then `claude` again.
- Cursor: open a new chat.

**Step 3 — Run the same prompt:**
```
What does this repo do?
```

**What to observe:** the response is terse, caveman-short, no filler, no preamble. Same question, same codebase, different answer — the only change is the file.

**Talking points:**
- The compass loads on every request. You didn't tell the agent to read it. It just did.
- One file changed the agent's personality for this entire session.
- In a real repo, this slot holds your stack, commands, conventions, and constraints. Not a personality — but equally automatic.
- The caveman tone is the proof-of-load. In production, the signal is more subtle (correct terminology, correct file paths, no invented abstractions).

---

## Demo 3 — Nested compass

**What you show:** a compass can scope to a subfolder. Files in that folder load it; files outside do not.

**Step 1 — Copy the nested file into place** (root compass stays in place from Demo 2):

```bash
# Claude Code
cp assets/claude-code/src/components/CLAUDE.md.txt src/components/CLAUDE.md

# Cursor (.cursor/rules/components.mdc auto-attaches by glob — no nesting needed)
cp assets/cursor/.cursor/rules/components.mdc.txt .cursor/rules/components.mdc
```

**Step 2 — Restart the agent.**

**Step 3 — Prompt A (inside the folder):**
```
Add an isVerified boolean prop to UserCard. If true, show a "(verified)" label next to the name.
```

**What to observe:** the agent edits `src/components/UserCard.jsx` and the word `COMPONENT` appears at the end of its reply.

**Step 4 — Prompt B (outside the folder):**
```
Add a placeholder comment at the top of src/pages/DashboardPage.jsx saying "TODO: wire up real data".
```

**What to observe:** the reply does NOT end with `COMPONENT`. Same session, same agent, different folder, different context.

**Talking points:**
- Claude Code nests CLAUDE.md files physically in the folder. The agent merges root + folder context when working in that subtree.
- Cursor uses glob frontmatter on rules files to achieve the same scoping — no physical nesting.
- When is nested useful? Large monorepos, modules with non-obvious invariants (auth, billing, a legacy AOSP module), test suites with their own selector or stability rules. Small repos: probably overkill — keep it flat.
- The `COMPONENT` marker is intentionally silly. In production, the payload is a real convention: "every component gets a Storybook story", "no direct Prisma calls in this folder", "use the existing auth hook — never read localStorage here".

---

## Demo 4 — Skill

**What you show:** skills carry metadata always, but the body only loads when the description matches the task.

**Step 1 — Copy the skill into place** (compass files stay in place from Demo 3):

```bash
# Claude Code
mkdir -p .claude/skills/create-component
cp assets/claude-code/.claude/skills/create-component/SKILL.md.txt \
   .claude/skills/create-component/SKILL.md

# Cursor
cp assets/cursor/.cursor/rules/create-component.mdc.txt \
   .cursor/rules/create-component.mdc
```

**Step 2 — Restart the agent.**

**Step 3 — Prompt A (unrelated task):**
```
What is the dev command to start this project?
```

**What to observe:** the agent answers from `package.json`. Short. Correct. The skill did not activate — nothing in that question matched the description "scaffold a new React component".

**Step 4 — Prompt B (matching task):**
```
Create a new Badge component that shows a user's subscription tier.
```

**What to observe:** the agent reads `src/components/UserCard.jsx` first (step 1 of the skill), then produces a `src/components/Badge.jsx` that matches the existing pattern — default export, destructured props, double quotes, no icon import. In Claude Code you may see the skill name appear in the context trail.

**Talking points:**
- Skills ship ~50 tokens of metadata (name + description) per skill. The body is zero cost until triggered.
- This is why you can have dozens of skills without bloating every request.
- The trigger is semantic: the model reads the description and decides whether to load the body. It is not a keyword match.
- For this repo: `create-component` is the right shape for a skill because it's a recurring, multi-step scaffolding task with a specific pattern to follow. A one-off change ("rename this variable") is too simple — just prompt it directly.
- In Cursor: `alwaysApply: false` + a `description` field makes the rule agent-requested, which is the closest Cursor analogue. The model decides when to invoke it, same principle.

---

## Discussion prompts (5 min)

1. Looking at this repo's README — what would you put in the root compass for a team working on this codebase? What would you push into a skill instead?
2. Which subfolder in your real codebase has the most non-obvious conventions — the kind where a new engineer (or an AI) gets it wrong on the first pass? Would a nested compass help there?
3. The skill activated because its description matched the task. What else would you want a skill for in your repos? (Hint: think about things you find yourself explaining to Cursor more than twice.)

---

## Reset between cohorts

```bash
# Remove all files the demos dropped in (safe — they are not in .gitignore by default)
rm -f CLAUDE.md AGENTS.md
rm -f src/components/CLAUDE.md
rm -rf .claude .cursor

# Verify clean
git status
```

One-liner version:
```bash
rm -f CLAUDE.md AGENTS.md src/components/CLAUDE.md && rm -rf .claude .cursor && git status
```

---

## Quick reference

| Slot | Loads when | Best for | This repo's example |
|---|---|---|---|
| Root compass (`CLAUDE.md` / `AGENTS.md`) | Every request, automatically | Stack, commands, domain vocabulary, non-obvious constraints, ask-first list | Caveman tone (workshop). In production: stack, commands, `creditedAmount` not `refund`. |
| Nested compass (`src/components/CLAUDE.md` / glob rule) | Any request touching that subtree | Subtree-specific invariants the rest of the repo doesn't share | Component shape conventions, `COMPONENT` marker. In production: test stability rules, auth module guardrails. |
| Skill / agent-requested rule | When the model's task matches the skill description | Recurring multi-step procedures with a canonical pattern | Scaffold a new component following the `UserCard.jsx` shape. |

---

## File map (what lives where)

```
assets/
  EXERCISE.md                                       ← this file
  claude-code/
    CLAUDE.md.txt                                   → cp to ./CLAUDE.md
    src/components/CLAUDE.md.txt                    → cp to ./src/components/CLAUDE.md
    .claude/skills/create-component/SKILL.md.txt    → cp to ./.claude/skills/create-component/SKILL.md
  cursor/
    AGENTS.md.txt                                   → cp to ./AGENTS.md
    .cursor/rules/caveman.mdc.txt                   → cp to ./.cursor/rules/caveman.mdc
    .cursor/rules/components.mdc.txt                → cp to ./.cursor/rules/components.mdc
    .cursor/rules/create-component.mdc.txt          → cp to ./.cursor/rules/create-component.mdc
```