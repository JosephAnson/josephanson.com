---
title: How We Added Performance Budgets to 117 Web Components
description: How we turned interaction timing, rendering work, and application traces into a repeatable performance contract for Nord Design System.
date: 2026-08-08T00:00:00.000Z
categories:
  - Design Systems
  - Performance
tags:
  - Design Systems
  - Web Components
  - Performance
  - Playwright
  - Testing
related: /articles/migrating-a-design-system-to-tailwind
---

Visual regression testing can tell you that a component still looks right. Unit tests can tell you that it still behaves correctly. Neither tells you that opening a combobox, resizing a panel, or expanding navigation has quietly become slower.

That gap matters in a design system. A small regression in a shared component is not isolated to one page: it is multiplied across every product that consumes it.

At [Nord Design System](https://nordhealth.design/components/), we already had broad visual coverage. What we did not have was a complete inventory of interactive components or a repeatable way to detect interaction regressions. We needed performance to become a testable contract rather than something we investigated after a product felt slow.

This is how we built that contract across 117 production custom elements.

::performance-pipeline-figure
::

## Start With an Inventory, Not a Benchmark

It is tempting to begin by measuring the most complicated component. That produces numbers quickly, but it does not tell you whether the test suite represents the system.

We first classified all 117 production custom elements as one of three types:

- **Interactive** components respond directly to trusted user input.
- **Composite** components coordinate several elements or a larger interaction.
- **Passive** components render content but do not perform meaningful interaction work.

That classification was checked into the repository and validated by tests. Adding a new production component without deciding how it should be measured now fails the inventory contract.

The important result was not simply a spreadsheet of components. It gave us an explicit answer to two questions:

1. Which components require an interaction scenario?
2. Which components are intentionally excluded, and why?

Without that inventory, performance coverage would slowly become a collection of whichever examples somebody happened to remember.

## Build Deterministic Workloads

We created 42 Storybook scenarios covering the interactive and composite elements. Each scenario uses trusted browser input and provides deterministic normal or dense workloads.

The distinction between normal and dense is useful. A Combobox with five options and a Data Table with ten rows can both look fast while avoiding the work that makes them interesting. Dense fixtures give expensive code paths enough data to become visible without turning the benchmark into an unrealistic stress test.

Determinism is more important than realism here. Performance tests need stable inputs, stable interaction sequences, and a pinned browser environment. If fixture data, animations, network requests, or fonts change between runs, the resulting number is not a useful signal.

## Measure the Interaction, Not the Test Runner

A Playwright test duration includes setup, selector resolution, assertions, and communication with the browser. That makes it a poor approximation of what the user experienced.

Instead, we collect Chromium Event Timing entries around the trusted interaction. This lets us examine the browser's input-to-render path and calculate a p75 interaction value across repeated runs.

The suite also records rendering work that a single duration can hide:

- layout shifts
- long animation frames
- `UpdateLayoutTree` work
- layout duration
- paint duration
- the total painted viewport area

That last measurement proved particularly helpful. An interaction can complete within its timing budget while repainting far more of the page than intended. The user might not notice it in one component fixture, but the same invalidation pattern can become expensive once the component is composed into an application.

## Test Components and Composition Separately

Isolated component scenarios are good at locating regressions. They tell us that a specific Combobox workload or Drawer interaction changed.

They cannot show the full cost of composition.

We therefore added a second layer: a production-built documentation App Shell scenario. It exercises opening and closing navigation inside a real page, with the same layout relationships and paint surface as the application.

The two layers answer different questions:

| Layer | Question |
| --- | --- |
| Component fixture | Which interaction became slower? |
| Application scenario | Does composing the system create expensive layout or paint work? |

In our initial pinned calibration environment, 37 of the 42 component scenarios recorded a p75 at or below 32 milliseconds. Dense Combobox filtering was the slowest component scenario at 64 milliseconds.

The App Shell recorded an INP-style p75 of 56 milliseconds. Its layout and paint durations were small, but the trace exposed broad repaint behaviour: approximately 7.6 viewport-equivalents of paint per interaction and one full-viewport paint.

That is exactly the kind of result we wanted. It did not justify weakening a timing budget; it identified an invalidation problem worth investigating separately.

## A Baseline Is a Reviewed Contract

Performance numbers vary across processors, operating systems, browser versions, and CI machines. Pretending otherwise creates a test suite that is either noisy or so tolerant that it never fails.

We use checked-in baselines with two kinds of limits:

- a scenario-specific p75 budget for normal variation
- an absolute ceiling for obviously bad individual interactions

Changing a baseline is treated as a reviewable product decision. The generated reports and traces remain build artifacts, while the small baseline and inventory files stay in version control.

We also separated correctness from calibration. When moving from the original arm64 environment to GitHub's native x64 runners, timing violations remained visible but advisory during calibration. Broken fixtures, invalid reports, missing inventory entries, and failed test execution still blocked the change.

This distinction prevented a new machine profile from disguising genuine test failures.

## Keep the Feedback Loop Practical

Forty-two browser workloads can make a pull request pipeline painfully slow if they run serially. We divided the scenarios into four workload-balanced CI shards and kept the application performance job independent.

The full screen completes in roughly ten minutes and retains JSON reports and diagnostic traces when something fails. A developer can reproduce the exact scenario locally instead of trying to infer a regression from one red number.

Performance tests only change behaviour when people trust and use them. Fast feedback, clear failure messages, and reproducible fixtures are part of the measurement system—not secondary tooling concerns.

## What I Would Repeat

Several principles from this work transfer beyond Web Components:

1. **Inventory the surface first.** Coverage should be an explicit decision, not an accidental collection of tests.
2. **Use trusted input.** Measure the browser responding to a user, not JavaScript calling an internal method.
3. **Measure rendering work as well as duration.** Layout and paint often explain regressions that one timing number cannot.
4. **Test isolation and composition.** Component fixtures locate problems; application scenarios expose amplification.
5. **Review baselines like code.** Updating a number should require an explanation of what changed and why it is acceptable.
6. **Calibrate without disabling correctness.** A different runner may change timings, but it should not make malformed tests pass.

The implementation lives alongside the design-system source, where its inventory and baselines can be reviewed with the component changes they measure.

## Performance Is Part of the Component API

A component API is more than properties, events, and slots. Consumers also depend on a component responding within a reasonable amount of time and composing without invalidating an entire page.

By checking in the inventory, workloads, and budgets, we made those expectations visible. The suite will not prevent every slow interaction, but it gives us a repeatable way to notice when the system changes—and enough evidence to decide what to do next.
