# ADR - 1

## Title
ETL Flow - Homework Quizzes

## Description
A piece of code triggered at regular intervals to extract data for Homework quizzes/sessions from firestore Sessions DB and quiz Mongo DB, transform it and dump it to a BQ table and Dynamo DB table.

## Author
Deepansh

## Abstract
> Abstract is a multi-sentence (short paragraph) technical summary. This should be a very brief, to the point and human-readable version of the document section. Someone should be able to read only the abstract to get the gist of what this document is about in its current state.

A cron job (running on AWS EC2) will go through the [**Quiz Session Creator**](https://docs.google.com/spreadsheets/d/1viSIQZ3oKvZGFu08YetZs9l4aZSMGAk4aeyo-hvp8SQ/edit#gid=0) google sheet every 15 minutes.
On every run, the cron job will select the sessions with the following filters:
- Sessions which are either infinite sessions or non infinite sessions which have ended
- Sessions with `test_type` as `homework`

The selected session ids will be sent to an SNS notification, which will trigger a Lambda function implementing the ETL flow. The ETL flow will extract the required data, transform it, and dump into the required tables.

## Context & Problem Description
> Go into detail about the subject in question. Why is this decision important? What problems are there that this decision needs to be made? The urgency of the decision? Datapoints and related background information. Vocabulary and key terms.

Till now we have only been syncing assessment sessions but not homework sessions. For homework sessions, the extracted data will come from two places: **Firestore Sessions DB** and **Quiz Mongo DB**.
The data being extracted from the **Firestore Sessions DB** is the data pertaining to the sessions. Things like `program`, `grade`, `course`, `stream` and many other, basically the column values stored in the **Quiz Session Creator** google sheet. The data being extracted from the **Quiz Mongo DB** will be the responses of students who have attempted that quiz and the related metadata. Decisions regarding some questions mentioned below need to be taken:
1. Where should the homework sessions data be stored on BQ? Should it be stored in the `test_responses` table that exists or some new table?
2. If storing in a different table, how should we name the new table? The old one is `test_responses`. It doesn't have the keyword `assessments` in the name.
3. Is the question level analysis also needed for homework tests? If yes, then should it be stored in a separate table or in the table for `assessments`?
4. This data also needs to go into the Dynamo DB (for reporting engine). Should it go to a different table or the same existing one?
5. What all fields are necessary or good to have for the homework level sessions? The fields listed below are the ones present in the assessments table. We can filter out or add more fields for the homework quizzes. Decision needs to be taken on entries with a :question: emoji:

    | Field | Comments |
    | ------ | ----------- |
    | user_id | will be added |
    | num_skipped | :question: Right now one can't skip in homework mode. But it's possible in the future, so for now, should we keep it and the value will be 0? |
    | num_correct | :question: Number of correctly answered graded questions. This will not include ungraded questions right? |
    | num_wrong | :question: Number of wrongly answered graded questions. This will not include ungraded questions right? |
    | marks_scored | :question: Marks scored by the user on graded questions wrt marking scheme. What is the default marking scheme if nothing is present? |
    | percentage | Marks scored by user / total marks possible |
    | section | :question: Will these questions also have subject wise sections like P/C/M/B? |
    | max_marks_possible | total graded questions * score for correct answer |
    | user_data_validated | does the user id exist in auth layer logs |
    | avg_test_score | avg of scores of users in a particular session |
    | highest_test_score | highest of scores of users in a particular session |
    | rank | rank of student among other students in a particular session |
    | percentile | percentile of student among other students in a particular session |
    | num_test_takers | number of unique users who attempted the quiz |
    | session_id | unique session id |
    | start_date | start date of session |
    | start_time | start time of session |
    | end_date | end date of session |
    | end_time | end time of session |
    | infinite_session | :question: Should we add this? if yes, then this needs to go into firestore sessions DB as well |
    | test_name | Will be taken as it is from firestore session DB |
    | test_type | Will be taken as it is from quiz metadata `quiz_type` field from mongoDB - will be `homework` |
    | cms_test_id | Will be taken as it is from quiz metadata `source_id` field from mongoDB |
    | total_questions | Will be taken as it is from quiz metadata `num_graded_questions` field from mongoDB |
    | group | Will be taken as it is from firestore session DB |
    | batch | Will be taken as it is from firestore session DB |
    | af_rank | Will be `null` for now, will be implemented using a different ADR |
    | has_quiz_ended | Will be added |
    | platform | Will be `quizengine` |
    | inserted_at_timestamp | when was a record inserted into the table |
    | ... new field? ... | ... what all new fields are needed? ... |

  6. A table like the above one needs to be created if we decide on saving question level analysis as well for homework quizzes.
  7. Should the existing ETL Flow code for assessments be reused or a new code file be created for this?

## Solution(s)
> If a solution has been discussed then that should be discussed here. If multiple solutions exist, and their discussion is not feasible/practical on discord, then discuss these potential alternatives and their impact.
> What alternatives are being considered, their benefits, their costs (team resources, money, time frames), mitigations for any drawbacks. The team will collectively take a decision in the Pull Request itself. The agreed upon decision then should be documented in the PR.

Proposed solutions for the questions above:
  1. After writing this, I think this should be stored in the same `test_responses` table. As the data will be almost similar to the assessments data. The only difference being the `test_type` being `homework`.
  2. If we store in the same table, this question is redundant.
  3. TBD
  4. According to me, same table. Will keep things simpler to manage and the data also makes sense staying in the existing table.
  5. TBD
  6. TBD
  7. Same flow. The current code skips the quizzes which are of `homework` type. The new change to the code will not skip `homework` type quizzes, will take them into consideration and will transform the data accordingly. And because of this, the name of the flow will have to be changed from `ETL Flow Assessments` to something like `ETL Flow Quizzes`.


## Implementation / Tech Specs
> This section includes the meaty details of the decision. All the technical details, diagrams, specifications, syntax and semantics should be discussed here.
> This section can be merged with `Solution` if need be. Images can also be attached as shown below

This is how the ETL flow's architecture will look like.

<p align="center">
  <img src="/adr1_image1.drawio.svg" width="800">
</p>



## Status
> A decision may be "proposed" if the project stakeholders haven't agreed with it yet, or "accepted" once it is agreed. If a later ADR changes or reverses a decision, it may be marked as "deprecated" or "superseded" with a reference to its replacement. You can use any one of these given badges

<Badge text="PROPOSED"/>

## Consequences
> This section describes the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future.

`[positive]` -- After this implementation, we will have homework data being synced along with assessments data. That will help enable the Haryana program team to use the Datastudio dashboard and reporting engine.

`[positive]` -- The same implementation can be extended for quizzes with types other than `homework` and `assessment`.

`[negative/neutral]` -- If we decide on putting the data in the same table as assessments data, we will have to make sure that any column that we plan to add in the future to the table, will also have to be filled for homework tests (we can fill that value as `null` so not that big of an issue). This might be a problem if the column types are vastly different for different quiz types, but there's a high probability that the metrics needed for different type of quizzes (in the future) might be very similar to existing metrics.
