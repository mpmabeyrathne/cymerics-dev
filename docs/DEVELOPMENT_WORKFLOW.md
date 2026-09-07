# Development Workflow

## Branch Naming

All development work should be done on a feature branch.

Format:

`<type>/<TICKET-ID>-<description>`

Example:

`feature/PH01-026-configure-github-pr-workflow`

## Commit Convention

Commits should follow:

`<type>(<TICKET-ID>): <description>`

Example:

`feat(PH01-026): configure GitHub pull request workflow`

## Pull Request Workflow

1. Create a feature branch from `main`.
2. Make the required changes.
3. Commit the changes using the commit convention.
4. Push the feature branch.
5. Create a Pull Request to `main`.
6. CI checks must pass.
7. Merge the Pull Request.
8. Delete the feature branch after merging.

## Main Branch

The `main` branch is protected.

- Direct pushes are restricted.
- Pull Requests are required.
- Required CI checks must pass before merging.
- Force pushes are blocked.
- Branch deletion is restricted.
