# ADR - 1
# THIS IS TEMPORARY -- WIll be making a valid ADR soon

## Title
ETL Flow - Homework Quizzes

## Description
A piece of code triggered at regular intervals to extract data for Homework quizzes/sessions from firestore Sessions DB and quiz Mongo DB, transform it and dump it to a BQ table and Dynamo DB table.

## Author
Deepansh

## Abstract
> Abstract is a multi-sentence (short paragraph) technical summary. This should be a very brief, to the point and human-readable version of the document section. Someone should be able to read only the abstract to get the gist of what this document is about in its current state.

## Context & Problem Description
> Go into detail about the subject in question. Why is this decision important? What problems are there that this decision needs to be made? The urgency of the decision? Datapoints and related background information. Vocabulary and key terms.

## Solution(s)
> If a solution has been discussed then that should be discussed here. If multiple solutions exist, and their discussion is not feasible/practical on discord, then discuss these potential alternatives and their impact.
> What alternatives are being considered, their benefits, their costs (team resources, money, time frames), mitigations for any drawbacks. The team will collectively take a decision in the Pull Request itself. The agreed upon decision then should be documented in the PR.

## Implementation / Tech Specs
> This section includes the meaty details of the decision. All the technical details, diagrams, specifications, syntax and semantics should be discussed here.
> This section can be merged with `Solution` if need be. Images can also be attached as shown below

<!-- ![](logo.jpeg) -->
<p align="center">
  <img src="/tempReferenceDiagram.webp" width="400">
</p>

## Status
> A decision may be "proposed" if the project stakeholders haven't agreed with it yet, or "accepted" once it is agreed. If a later ADR changes or reverses a decision, it may be marked as "deprecated" or "superseded" with a reference to its replacement. You can use any one of these given badges

<Badge text="PROPOSED"/>
<Badge text="ACCEPTED"/>
<Badge text="DEPRECATED" type="error"/>
<Badge text="SUPERSEDED"type="warning"/>

## Consequences
> This section describes the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future.
