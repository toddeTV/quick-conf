# Contributing to quick-conf

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to `quick-conf`. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## 🚀 Getting Started

To get your local development environment set up, please follow our [Developer Setup Guide](/docs/developer-setup.md).

For more detailed information about the project structure, components, and usage, check out the [Documentation](/docs) folder.

## 🛠️ Technology Stack & Guidelines

This project uses a modern tech stack. Please ensure you are familiar with the following:

- **Framework**: Nuxt 4 with Vue 3 (Composition API)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (via Nuxt UI)
- **Content**: `@nuxt/content` with Zod validation
- **Package Manager**: **pnpm** is the project standard and highly recommended. While you may use other tools locally at your own risk, `pnpm` must be used for any changes affecting dependencies or project structure to ensure `pnpm-lock.yaml` remains consistent.

### Code Style

- **Vue Components**: Use `<script setup lang="ts">`.
- **Naming**: PascalCase for components (`MyComponent.vue`), kebab-case for TS files (`my-utils.ts`).
- **Imports**: Prefer auto-imports provided by Nuxt.
- **Linting**: Run `pnpm lint` to check your code.
- **Formatting**: Run `pnpm format` to check your code.

## 📝 Git Workflow & Conventions

We follow strict Git conventions to maintain a clean history and efficient workflow.

Please refer to our detailed documentation:

- **[Git Conventions](/docs/git-conventions.md)**: Rules for **branch naming** and **Conventional Commits**.
- **[GitHub Workflow Conventions](/docs/github-workflow-conventions.md)**: Guidelines for **Pull Requests**, **Assignees**, and **Reviews**.

### Pull Requests Checklist

1. **Be Focused**: PRs should be small and focused on a single feature or bug fix.
2. **Clean**: Ensure your PR does not include unrelated files, local user settings, or build artifacts.
3. **Documentation**: Update the documentation in `/docs` with details of fundamental changes (new env vars, workflows, algorithms, important decisions, etc.).

## 🤝 Code of Conduct

We are committed to providing a friendly, safe and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or similar personal characteristic.

Please be kind and courteous. There's no need to be mean or rude.
