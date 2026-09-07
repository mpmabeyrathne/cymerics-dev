# Dependency Management Policy

## Purpose

This document defines how Node.js dependencies are selected, versioned, updated, audited, and maintained in the Cymerics project.

The goal is to keep dependencies predictable, secure, maintainable, and appropriate for production use.

## Dependency Categories

### Production Dependencies

Packages required by the application at runtime must be listed under `dependencies`.

Examples include:

- Fastify
- Fastify plugins
- Zod
- dotenv
- Octokit

### Development Dependencies

Packages required only for development, type checking, building, testing, or repository tooling must be listed under `devDependencies`.

Examples include:

- TypeScript
- tsx
- @types/node
- Husky

A dependency must be moved to `dependencies` if the production application requires it at runtime.

## Version Strategy

Dependencies should use semantic versioning ranges where appropriate.

Major version upgrades require deliberate review because they may introduce breaking changes.

Dependency updates should be reviewed before being applied to the project.

Security-related updates should be prioritized when vulnerabilities affect the project.

## Lockfile Policy

The npm lockfile (`package-lock.json`) must be committed to the repository.

The lockfile ensures that dependency resolution remains reproducible across development, CI, and production environments.

Developers should not manually modify the lockfile.

It should be updated through npm dependency management commands.

## Dependency Update Process

Before updating a dependency:

1. Review the current version and available update.
2. Check release notes and potential breaking changes.
3. Update the dependency using npm.
4. Review changes to `package.json` and `package-lock.json`.
5. Run type checking.
6. Run the project build.
7. Run available tests.
8. Review the final changes before committing.

Example:

```bash
npm install <package>@<version>
```

Dependencies should not be updated blindly to the latest version without reviewing compatibility.

## Security Audit Process

Dependencies must be periodically checked for known vulnerabilities using npm audit.

```bash
npm audit
```

Security vulnerabilities should be reviewed based on severity and impact.

`npm audit fix --force` must not be used blindly because it may introduce breaking dependency changes.

Current audit status:

```text
npm audit
→ 0 vulnerabilities
```

## Unused Dependency Detection

Dependencies should be periodically reviewed to identify packages that are no longer used.

Unused dependencies should be removed to:

- Reduce project complexity
- Reduce maintenance overhead
- Reduce the application attack surface
- Keep the dependency tree minimal

Dependency analysis tools may be introduced as the project grows.

## General Rules

- Prefer well-maintained and actively supported packages.
- Avoid adding dependencies when the functionality can be implemented simply without them.
- Keep production and development dependencies separated.
- Commit `package-lock.json`.
- Review major version upgrades carefully.
- Run security audits regularly.
- Remove unused dependencies.
- Verify dependency changes before merging.
