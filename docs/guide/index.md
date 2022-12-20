# Introduction

## Why?

During the current phase of our org, and even more so in the future, documenting *decisions* related to our products and the architecture of those products will be extremely important.

But isn’t documentation of products already being maintained in some way? I don’t think so. There are three issues:

- The documentation of current architecture is non-existent for some services. Most of it is in our *heads.* This makes it harder for someone who hasn’t actively worked on that product to transition into it and understand the architecture.
  + For example, if someone wanted to make a change to the ETL flow now, they would have no idea and no easy way of knowing what the current architecture of ETL flow is.
  + They will have to comb through the deployment code, maybe AWS console to figure out that the ETL flow is deployed as a docker image to Lambda which is then triggered by an SNS trigger which is in-turn called by a cron job running on an EC2 instance. This information is in my head and maybe some parts of it is known to some people. A little bit of this is documented in a README file but that’s about it.

- The documentation of current architecture is present for some services, but scattered, bulky, and sometimes outdated, never to be updated again. Having complex documentation comes with the curse of it never or rarely getting updated. We need to make sure that the documentation is atomic and very concise, otherwise reading through all that becomes very daunting.

- We don’t have a time log of the decisions we’ve made up until now and why some decisions were accepted and why some were rejected and reworked.

To try to solve for this, there is one documenting pattern that I found which might be helpful. It is called ADR.
Make sure to go through this article to understand a high level rationale behind this process and why is it needed.

[Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

## What?

> 💡 The following document is inspired by the ADR format followed by [Decentraland](https://decentraland.org/), an open-source decentralized metaverse project. And according to them, their document was derived heavily from [Ethereum EIPs](https://github.com/ethereum/eips) which was also derived from [Bitcoin's BIP-0001](https://github.com/bitcoin/bips) written by Amir Taaki which in turn was derived from [Python's PEP-0001](https://peps.python.org/).

- ADR stands for **Architecture Decision Record**. An ADR is a design document providing information to the stakeholders, or describing a new feature for services/products or its processes or environment. The ADR should provide a concise technical specification and a rationale for the feature. The ADR author is responsible for building consensus with other team members and documenting conflicting opinions.
- ADRs should be the primary mechanisms for proposing new features, collecting technical input on an issue, and for documenting the design decisions that have gone into our products. Because the ADRs will be maintained as `.md` files in a git repository, their revision history is the historical record of the feature proposal.
- It is highly recommended that a single ADR contain a single key proposal or new idea. The more focused the ADR, the more successful it tends to be.
- An ADR must meet certain minimum criteria. It must be a clear and complete description of the proposed enhancement. The enhancement must represent a net improvement.
- To look at a working example of an open source ADR system, take a look at [this](https://adr.decentraland.org/) and [this](https://adr.decentraland.org/adr/ADR-104)
- One ADR describes one significant decision for a specific project. It should be something that has an effect on how the rest of the project will run.
- The consequences of one ADR are very likely to become the context for subsequent ADRs.
- Developers and project stakeholders can see the ADRs, even as the team composition changes over time.
- The motivation behind previous decisions is visible for everyone, present and future. Nobody is left scratching their heads to understand, "What were they thinking?" and the time to change old decisions will be clear from changes in the project's context.

## How?

The ADRs followed by big open source projects have somewhat of a complex method, for good reason though. We are trying to get rid of complexity and because a team this small doesn’t need that complexity. We’ll start simple and slowly evolve the process to whatever fits the needs

### Work Flow
  - Pre ADR discussion:
    - Before deciding on creating an ADR, the team can have a quick decision on discord channel or a sprint planning call.
  - Creating the ADR:
    - ADRs will be maintained in a Github repo. The person who is creating the ADR will create a new branch from the `main` branch of that repo.
    - Creating the ADR is as simple as copying a `[template.md](http://template.md)` file, filling it with details and making a Pull Request to that repo.
    - If new flows are being created or existing flows are being changed, it is important to have a diagram in the ADR that outlines the flow. These can be created in [whimsical](https://whimsical.com/a) or [lucid app](https://lucid.app/). I would vote for specific diagrams called Sequence Diagrams. [This](https://search.brave.com/images?q=sequence+diagram&source=web) is how they look like.
  - Sending the ADR for review:
    - The PR link will be sent on discord channel and as it is with code PRs, these need to be reviewed within 2-3 days. We’re humans so we forget, so it is the responsibility of both the parties, the PR creator and the PR reviewers to keep in mind and get the review done as soon as possible
  - Reviewing ADRs:
    - As the ADR is just a markdown file, the reviewers can view the content on github itself.
    - The reviewers have to also assure that the ADR follows the template/guidelines as much as possible. The template is very simple and the guidelines help the ADR be as concise and as to the point as possible.
    - The reviewers can leave comments and get them resolved just like normal code PRs.
  - Approving and Merging:
    - Once the ADR pull request is approved, development work can start.
    - The ADR will be merged into the main branch once the proposed implementation code is merged into the main codebase.

### What should an ADR look like? What should belong there?

The whole document should be one or two pages long. We will write each ADR as if it is a conversation with a future developer. This requires good writing style, with full sentences organized into paragraphs. Bullets are acceptable only for visual style, not as an excuse for writing sentence fragments.

- `Metadata` - Some metadata about the ADR, including the ADR number (the PR number), a short descriptive title (a few words), a description (2-3 lines), and the author details. Irrespective of the category, the title and description should not include ADR number.
- `Abstract` - Abstract is a multi-sentence (short paragraph) technical summary. This should be a very brief, to the point and human-readable version of the document section. **Someone should be able to read only the abstract to get the gist of what this document is about in its current state.**
- `Context & Prioritization` - Go into detail about the subject in question. Why is this decision important? The urgency of the decision? Datapoints and related background information. Vocabulary and key terms.
- `Solution / Solution Exploration` - If a solution has been discussed then that should be discussed here. If multiple solutions exist, and their discussion is not feasible/practical on discord, then discuss these potential alternatives and their impact.
What alternatives are being considered, their benefits, their costs (team resources, money, time frames), mitigations for any drawbacks. The team will collectively take a decision in the Pull Request itself. The agreed upon decision then should be documented in the PR.
- `Implementation / Tech Specs` (optional) - This section includes the meaty details of the decision. All the technical details, diagrams, specifications, syntax and semantics should be discussed here.
- `Status` - A decision may be "proposed" if the project stakeholders haven't agreed with it yet, or "accepted" once it is agreed. If a later ADR changes or reverses a decision, it may be marked as "deprecated" or "superseded" with a reference to its replacement.
- `Consequences` **-** This section describes the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future.

#### What ADR is not?

- I’m not 100% sure about this, and would like the help of you guys to decide what should be put in an ADR and what should be not. Below examples I wrote according to my thought process and if anyone thinks differently, then do point out!
- There are some tasks listed below and a boolean next to them answering “should this be in an ADR or not?”
    - Creating a new group for Auth Layer —  No
    - Adding a generic sign-up page for Auth Layer — Yes
    - Adding new quiz feature, `timer-behaviour` — Yes
    - Generating a new route for reporting engine, let’s say, to see student’s reports across all the tests — Maybe yes? (not sure really)
    - Changing the way an ETL flow is triggered — Yes
    - New ETL flow to read from place A and write to place B — Yes
