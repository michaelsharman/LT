---
inclusion: always
description: Git commit message and branch naming policy for the LT repo
---

# Git Commit & Branch Policy

Standardised commits and branch names matter because:

- Consistent grammar and meaningful messages keep history readable.
- CI pipelines and automation scripts parse commit messages for versioning.
- Anyone can tell what a branch does at a glance.
- Repos stay neat and tidy.

> This repo does **not** use Jira. Never add ticket references (e.g. `LRN-12345`) to
> commit messages or branch names.

## Commit format

```
[TYPE] Imperative summary of the change
```

- Prefix is wrapped in square brackets and **fully capitalised**.
- Exactly one space between the prefix and the message.
- No ticket reference anywhere in the commit.

## Commit types

Primary types:

| Type       | Use for                                        |
| ---------- | ---------------------------------------------- |
| `BUG`      | Fixes incorrect behaviour.                     |
| `FEATURE`  | Adds new behaviour.                            |
| `REFACTOR` | Does not change behaviour.                     |
| `CHANGE`   | Changes or breaks existing behaviour.          |
| `SECURITY` | Security related changes, e.g. auth handling.  |

`REFACTOR` sub-types (all essentially a refactor, but give more context):

- `VENDOR` — update code from a vendor. Vendor list changes and vendored file
  changes must be committed separately, since the list is manually curated while
  the files can be regenerated from it.
- `TEST` — test suites and automation.
- `BUILD` — build system: webpack config, Makefiles, scripts, etc.
- `CLEANUP`
- `DOC`
- `LINT`
- `WHITESPACE`
- `CONFIG` — only when exclusively changing committed configuration.

Other types:

- `CI` — changes to CI/CD or automation workflows. Combine with a primary type,
  e.g. `[CI FEATURE]`, `[CI BUG]`. `CI` changes must not touch application code
  or functionality, so they don't affect automatic versioning.
- `LDE` — anything related to the Learnosity Development Environment.

Prefixes can be combined where it adds context, e.g.
`[VENDOR][CHANGE] bump LP from lts/v2024.1.LTS to master` — switching a submodule
from an LTS branch back to main signifies a break from an LTS version.

### Examples

```
YES  [FEATURE] Add autofocus to username field
NO   [POLISH] Add autofocus to username field      (POLISH is not a type; decide bug vs feature so we adhere to SemVer)
NO   [Feature] Add autofocus to username field     (prefix must be fully capitalised)
NO   [FEATURE]Add autofocus to username field      (missing space after the prefix)
NO   [FEATURE] Add autofocus to username LRN-1234  (no ticket refs in this repo)
```

## Branch naming

Pattern: `TYPE/DESCRIPTION`

- `TYPE` is the main type of the change, **lower case**.
- `DESCRIPTION` is **lower case**, hyphen separated. No camelCase, no snake_case.
- No ticket reference segment.

```
YES  feature/add-feature
YES  bug/fix-cloze-image-width
NO   feature/addFeature        (camelCase)
NO   feature/add_feature       (snake_case)
NO   feature/Add-feature       (must be lower case)
NO   FEATURE/add-feature       (prefix must be lower case)
NO   LRN-12345/feature/add-x   (no ticket refs in this repo)
```

## Length

- Limit the first line to 72 characters and do not end it with a period.
- Going beyond 72 is acceptable when needed, but keep it short.
- Use multi-line commits for anything needing explanation.
- Multi-line commits must have a blank line between the first line and the body.

```
YES    [BUG] Fix responsive widths affecting cloze image in Firefox            (62)
MAYBE  [BUG] Fix responsive widths affecting cloze image dropdown questions in Firefox   (>72)
```

## Mixing commits

- Never mix changes of different types. A `FEATURE` commit must not also contain
  a bug fix, and a `BUG` commit must not add new behaviour.
- If a feature needs a significant refactor first, commit the `REFACTOR`
  separately.
- Changes made by an automated tool (e.g. `LINT`) always go in an isolated
  commit, so on a later conflict the commit can simply be dropped and
  regenerated on the new base.

## Grammar

- Write in the **imperative** mood: "Fix a bug", not "Fixed bug" or "Fixing bug".
- Commit messages must be meaningful and describe the feature or fix.
- Submodule updates should use multi-line commits with a relevant description.

| Yes       | No          | No         |
| --------- | ----------- | ---------- |
| `fix`     | `fixing`    | `fixed`    |
| `remove`  | `removing`  | `removed`  |
| `skip`    | `skipping`  | `skipped`  |
| `add`     | `adding`    | `added`    |
| `strip`   | `stripping` | `stripped` |
| `rename`  | `renaming`  | `renamed`  |
| `move`    | `moving`    | `moved`    |
| `replace` | `replacing` | `replaced` |
| `combine` | `combining` | `combined` |
| `sort`    | `sorting`   | `sorted`   |

### Multi-line example

```
[VENDOR] Mathcore v1.22.1

- set subtraction add using \backslash
- fix a bug where equivSymbolic treats 0 as equivalent to an empty string
```
