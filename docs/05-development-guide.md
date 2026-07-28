# Development Guide

**Document Information**

| Field        | Value             |
| ------------ | ----------------- |
| Project      | Evans Portfolio   |
| Document     | Development Guide |
| Document ID  | DOC-005           |
| Version      | 1.0               |
| Status       | Draft             |
| Owner        | Evans Juma        |
| Last Updated | 2026-07-28        |

---

# 1. Purpose

This document defines the development workflow, coding standards, repository conventions, and engineering practices for the Evans Portfolio project.

Its objective is to ensure consistency, maintainability, and collaboration throughout the software development lifecycle.

All contributors should follow the standards described in this document.

---

# 2. Development Environment

## Required Software

### General

* Git
* Node.js (LTS)
* npm
* Visual Studio Code (recommended)

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend (Future)

* Go
* PostgreSQL
* Docker

---

# 3. Repository Structure

```text
evans_portfolio/
│
├── backend/
├── docs/
├── frontend/
├── LICENSE
└── README.md
```

Each top-level directory has a clearly defined responsibility.

---

# 4. Getting Started

Clone the repository.

```bash
git clone git@github.com:eojuma/evans_portfolio.git
```

Navigate to the frontend.

```bash
cd frontend
```

Install project dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

---

# 5. Git Workflow

The project follows a feature-branch workflow.

## Main Branch

`main`

Represents the latest stable version of the project.

Development should not occur directly on the `main` branch.

---

## Feature Branches

Feature branches should follow the naming convention:

```text
feature/<feature-name>
```

Examples:

```text
feature/navbar
feature/projects-page
feature/contact-form
```

---

## Documentation Branches

```text
docs/<topic>
```

Examples:

```text
docs/project-overview
docs/architecture
```

---

## Bug Fix Branches

```text
fix/<issue>
```

Examples:

```text
fix/mobile-layout
fix/navigation-overflow
```

---

# 6. Commit Message Convention

The project follows the Conventional Commits specification.

Examples:

```text
feat: implement responsive navigation

fix: resolve mobile layout issue

docs: define software architecture

refactor: simplify project card component

style: improve button spacing

test: add routing tests

chore: update project dependencies
```

Commit messages should clearly describe the intent of the change.

---

# 7. Pull Request Guidelines

Every pull request should:

* Address a single feature or issue.
* Build successfully.
* Pass linting.
* Include meaningful commit messages.
* Update documentation when necessary.

A pull request should not combine unrelated changes.

---

# 8. Code Style

General principles:

* Write readable code.
* Prefer clarity over cleverness.
* Keep functions focused on a single responsibility.
* Avoid unnecessary duplication.
* Follow consistent naming conventions.

---

# 9. TypeScript Standards

The project follows a TypeScript-first approach.

Guidelines:

* Avoid the `any` type whenever possible.
* Prefer interfaces for shared models.
* Keep types reusable.
* Explicitly type component props.
* Use strict TypeScript settings.

---

# 10. React Standards

Components should:

* Have a single responsibility.
* Be reusable.
* Receive typed props.
* Keep business logic separate from presentation logic.

Prefer composition over deeply nested components.

---

# 11. Folder Organization

New files should be placed according to their responsibility.

Examples:

* Pages → `pages/`
* Shared UI → `components/ui/`
* Layout components → `components/layout/`
* Feature-specific logic → `features/`
* Shared types → `types/`
* Utility functions → `utils/`

The project structure should remain predictable and consistent.

---

# 12. Documentation Standards

Documentation is considered part of the implementation.

Requirements:

* Update documentation when architecture changes.
* Record significant architectural decisions.
* Keep documents current.
* Use consistent formatting.

---

# 13. Definition of Done

A task is considered complete when:

* The feature functions correctly.
* TypeScript compilation succeeds.
* Linting passes without errors.
* Documentation is updated where required.
* The implementation follows project conventions.
* Changes have been committed with a meaningful message.

---

# 14. Engineering Principles

Development should always prioritize:

* Simplicity
* Maintainability
* Consistency
* Documentation
* Reusability
* Performance
* Accessibility

Engineering quality should never be sacrificed for unnecessary complexity.

---

# 15. Related Documents

* README.md
* DOC-001 — Project Overview
* DOC-002 — Software Architecture
* DOC-003 — Design System
* DOC-004 — API Design
* DOC-006 — Deployment Guide
