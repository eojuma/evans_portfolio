# ADR-0003: Adopt Tailwind CSS

**Status:** Accepted

**Date:** 2026-07-28

---

## Context

The project requires a styling solution that supports rapid development, responsive layouts, consistent design, and maintainable user interfaces.

Several CSS approaches were considered.

---

## Decision

The project will use **Tailwind CSS** as its primary styling framework.

---

## Rationale

Tailwind CSS provides:

* Utility-first styling.
* Responsive design utilities.
* Consistent spacing and typography.
* Minimal custom CSS.
* Excellent integration with React and Vite.
* Highly customizable design tokens.

These characteristics support the project's goal of building a clean, scalable, and maintainable interface.

---

## Consequences

### Advantages

* Faster UI development.
* Consistent design language.
* Reduced CSS duplication.
* Easier maintenance.

### Trade-offs

* Longer HTML class attributes.
* Requires familiarity with utility-first styling.
* Initial learning curve for developers new to Tailwind CSS.

---

## Alternatives Considered

* Traditional CSS
* CSS Modules
* Styled Components
* Bootstrap

These alternatives were not selected because Tailwind CSS offers greater flexibility, consistency, and maintainability while allowing the project to build a custom design system without the constraints of pre-designed component libraries.
