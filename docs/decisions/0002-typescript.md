# ADR-0002: Adopt TypeScript

**Status:** Accepted

**Date:** 2026-07-28

---

## Context

The project aims to maintain a reliable and maintainable codebase as it grows in size and complexity.

JavaScript's dynamic typing can make refactoring and long-term maintenance more difficult.

---

## Decision

The frontend will be developed using **TypeScript**.

---

## Rationale

TypeScript provides:

* Static type checking.
* Improved developer tooling.
* Better code completion.
* Safer refactoring.
* Improved maintainability.
* Self-documenting interfaces.

These benefits align with the project's emphasis on software engineering best practices.

---

## Consequences

### Advantages

* Reduced runtime type errors.
* Improved code quality.
* Better collaboration.
* Easier maintenance.

### Trade-offs

* Additional learning curve.
* Slightly more verbose code.
* Compilation step before execution.

---

## Alternatives Considered

* JavaScript

JavaScript was not selected because TypeScript provides stronger guarantees for correctness and maintainability while remaining fully compatible with the JavaScript ecosystem.
