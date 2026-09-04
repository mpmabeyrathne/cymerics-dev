# Cymerics

## The Problem

AI agents are increasingly being used to perform actions on behalf of users.

In a simple system, authorization is relatively straightforward:

```text
User
  │
  │ Request
  ▼
Application
  │
  │ Authorization Check
  ▼
Resource
```

The application can determine whether the **user** is allowed to perform an action.

However, AI agents can introduce a more complex workflow.

```text
User
  │
  ▼
Agent A
  │
  ▼
Agent B
  │
  ▼
Agent C
  │
  ▼
Resource
```

Now the important question becomes:

> **Is the final action still authorized after passing through multiple agents?**

---

## Research Problem

When one AI agent delegates work to another agent, authorization may need to propagate through the entire delegation chain.

For example:

```text
User
  │
  │ Authorization
  ▼
Agent A
  │
  │ Delegates
  ▼
Agent B
  │
  │ Delegates
  ▼
Agent C
  │
  │ Action
  ▼
Resource
```

The original user may have authorized **Agent A** to perform a specific action.

But Agent A may delegate the task to Agent B, and Agent B may delegate it again to Agent C.

This creates several questions:

```text
Who originally authorized the action?
             │
             ▼
        Agent A
             │
        delegated?
             ▼
        Agent B
             │
        delegated?
             ▼
        Agent C
             │
             ▼
      Final Action
```

### Key Questions

* Does Agent C have the same authority as the original requester?
* Can an agent gain more permissions through delegation?
* Are the original permission constraints preserved?
* Can an agent delegate an action it was not allowed to delegate?
* How can the origin of the final action be identified?
* What happens when authorization is revoked?
* How should authorization be maintained across dynamic delegation chains?

---

## The Core Research Question

> **How can authorization be maintained across dynamic multi-agent delegation chains without allowing agents to gain authority beyond the original authorization?**

```text
Original Authorization
        │
        ▼
     Agent A
        │
     Delegate
        ▼
     Agent B
        │
     Delegate
        ▼
     Agent C
        │
        ▼
   Final Action
        │
        ▼
   Authorization
   still valid?
```

The focus of **Cymerics** is to investigate this problem and understand how authorization behaves as actions move through multiple AI agents.

---

## Why This Matters

Traditional authorization often follows a simpler relationship:

```text
User ───────────────► Resource
          Access
```

Multi-agent systems can instead create:

```text
User
 │
 ▼
Agent A
 │
 ▼
Agent B
 │
 ▼
Agent C
 │
 ▼
Tool
 │
 ▼
Resource
```

The longer the chain becomes, the harder it can be to determine:

```text
Who started the action?
        │
        ▼
Who delegated it?
        │
        ▼
Who is performing it?
        │
        ▼
What authority was originally granted?
        │
        ▼
Does the final action remain within that authority?
```

This is the problem Cymerics is investigating.

