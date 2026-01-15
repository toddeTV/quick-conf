# Git Conventions

We follow strict Git conventions to maintain a clean history, automate releases, and ensure an efficient workflow for all contributors.

## Branch Naming

Branches must follow the naming convention: `<type>/<description-slug>`. This helps us identify the purpose of a branch at a glance.

### Structure

`<type>/<short-description-separated-by-dashes>`

### Supported Types

- **`feat`**: New features or significant additions.
- **`fix`**: Bug fixes.
- **`refactor`**: Code refactoring without changing behavior.
- **`docs`**: Documentation updates only.
- **`chore`**: Maintenance tasks, dependency updates, build config changes.
- **`test`**: Adding or updating tests.

### Examples

- `feat/new-landing-section`
- `fix/mobile-menu-overflow`
- `docs/update-readme`
- `refactor/user-store-logic`
- `chore/update-dependencies`

---

## Commit Messages

We strictly follow **[Conventional Commits](https://www.conventionalcommits.org/)**. This format is machine-readable and allows us to automate changelog generation and versioning.

### Structure

```text
type(scope): description

[optional body]

[optional footer(s)]
```

### Types

- **`feat`**: A new feature (correlates with `MINOR` in Semantic Versioning).
- **`fix`**: A bug fix (correlates with `PATCH` in Semantic Versioning).
- **`docs`**: Documentation only changes.
- **`style`**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **`refactor`**: A code change that neither fixes a bug nor adds a feature.
- **`perf`**: A code change that improves performance.
- **`test`**: Adding missing tests or correcting existing tests.
- **`build`**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- **`ci`**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- **`chore`**: Other changes that don't modify src or test files.
- **`revert`**: Reverts a previous commit.

### Examples

**Feature:**

```text
feat(lang): add polish language support
```

**Bug Fix:**

```text
fix(header): fix logo alignment on mobile devices
```

**Breaking Change:**

```text
feat(api)!: remove support for v1 endpoints

BREAKING CHANGE: The v1 API endpoints have been removed. Please migrate to v2.
```
