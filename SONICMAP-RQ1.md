# SonicMap RQ1

SonicMap is a research prototype I'm working on around understanding how an audio scene changes over time. The idea is to take observations from microphones, track possible sound sources, and keep a record of the relationships between them.

This is ongoing work. It is not yet a complete real-time system, and I don't treat the current results as proof that it can understand a scene on its own.

## What the project does

The current code has two audio paths:

- A framewise sound-event path that uses PANNs to produce sound-event intervals.
- A multichannel path that estimates sound direction, forms direction-focused audio, uses classifier or external SELD predictions, tracks detections, and builds time-based relations between source hypotheses.

The spatial path uses SRP-PHAT for direction estimates, delay-and-sum beamforming, and a Kalman filter with Hungarian assignment for tracking. The temporal graph stores relations over intervals, such as a source being to the left of the listener for part of a recording.

A track is a system hypothesis. It is not a guarantee that the system has identified a real-world person or object.

## Evaluation so far

The current spatial baseline was checked on the STARSS23 development-training recordings from both the Sony and TAU sites.

| Measure | Result |
| --- | ---: |
| Recordings | 90 |
| Ground-truth source frames | 181,433 |
| Predicted spatial peaks | 264,682 |
| Matched peaks | 115,150 |
| Recall | 63.47% |
| Precision | 43.51% |
| Matching tolerance | 20° azimuth |

This is a class-agnostic direction-of-arrival diagnostic. It is not an official DCASE sound-event localization and detection score.

I also ran an oracle-assisted graph benchmark. In that experiment, ground-truth class and range information are supplied after matching spatial peaks to annotations. The result helps inspect the tracking and relation stages, but it is not an autonomous audio-perception result.

That distinction matters. The oracle-assisted benchmark reported 92.63% detection precision and 66.17% recall, but relation extraction was much weaker: macro-F1 was 10.51% with a 0.5-second boundary tolerance. The system still needs work on this part.

## Delayed-arrival work

I added a separate synthetic diagnostic for late-arriving observations. It compares an event log, an event-time graph, and receipt-aware query paths to check whether evidence received later can affect what a query says was known earlier.

The diagnostic uses controlled synthetic observations. It does not run the audio models or measure real-time performance. It is a software test of the timing rules, not an audio evaluation.

## What still needs work

- Improve the spatial front end and reduce false direction estimates.
- Improve tracking and relation extraction on predicted, rather than oracle-assisted, observations.
- Evaluate the system on held-out recordings using an appropriate protocol.
- Connect delayed-arrival and knowledge-time handling to the actual audio pipeline.
- Compare the research direction with prior work before making any novelty claim.

The current graph path is event-time based. The knowledge-time work is still being developed and tested separately. I have not established that the full system is bitemporal, real-time, or novel.

## Current status

SonicMap is an active research prototype. The results above show where the current implementation stands and where it is weak. I am keeping the evaluation notes and limitations visible as the work continues.
