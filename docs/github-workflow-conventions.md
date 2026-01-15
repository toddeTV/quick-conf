# GitHub Workflow Conventions

These conventions streamline our pull request (PR) process, clarify responsibilities, and ensure high code quality.

## Key Roles & Responsibilities

- **Assignee**: The sole owner of the PR from creation to merge. Responsible for handling merge conflicts, pulling latest `main`, ensuring all review feedback is addressed, and performing the final merge.
- **Reviewer**: Provides constructive feedback, suggestions, and approves or requests changes.
- **Author**: The person who created the PR. May differ from the Assignee.

## Workflow Best Practices

1. **Clear Ownership**: Every PR _must_ have an Assignee. This role dynamically shifts to indicate who is currently responsible for advancing the PR.
2. **Addressing Feedback**: If a reviewer requests changes, the _Assignee_ is responsible for ensuring these changes are implemented. If the reviewer is _also_ the Assignee and requests changes, they must reassign the PR to the appropriate person (e.g., the Author) to implement the feedback.
3. **Draft PRs for Visibility**: Open draft PRs for work-in-progress, especially if it spans more than a day. Regular commits to draft PRs provide visibility, facilitate early feedback, and prevent large, surprising changes later. Convert to a regular PR when ready for formal review.
4. **Assignee Merges**: The Assignee should _always_ merge the PR.
   - **Ensures Readiness**: The Assignee is best positioned to ensure the PR is truly ready (e.g., all CI/CD checks passed, last-minute conflicts resolved).
   - **Local Clean-up**: Allows for immediate local clean-up of development environment (e.g., removing temporary demo data, feature flags, or debugging code not intended for `main`).
   - **Latest Changes**: Guarantees the PR branch is up-to-date with `main` before integration.
   - **Final Verification**: Provides a final opportunity for the person most familiar with the changes to verify everything before merge.

## Example: Dynamic Assignment Workflow

This illustrates how the Assignee role indicates current responsibility at each stage:

1. **Scenario A: Author as Initial Assignee**
   - **Person A (Author)** opens PR, remains Assignee, and requests review from **Person B**. (Person A is responsible).
   - **Person B (Reviewer)** reviews and approves.
   - **Person A (Assignee)** performs final checks, cleans up local environment if needed, and merges.

2. **Scenario B: Hand-off for Review & Merge**
   - **Person A (Author)** opens PR, assigns **Person B** as both Reviewer and Assignee. (Person B is now responsible).
   - **Person B (Reviewer/Assignee)** reviews.
     - **No Changes Needed**: Person B approves and merges.
     - **Changes Needed**: Person B requests changes, then reassigns the PR _back to Person A_. (Person A is now responsible).
   - **Person A (now Assignee)** implements feedback, requests a new review from Person B, and reassigns the PR _back to Person B_. (Person B is now responsible again).
   - **Person B (Assignee)** reviews, approves, and merges.

This dynamic assignment ensures continuous clarity on who is responsible for the next step.
