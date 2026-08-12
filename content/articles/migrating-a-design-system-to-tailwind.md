---
title: Migrating a Design System to Tailwind Without Breaking Its Consumers
description: The migration tools, compatibility decisions, and rollout strategy behind making Tailwind CSS the main styling driver for Nord Design System.
date: 2026-07-26T00:00:00.000Z
categories:
  - Design Systems
  - Developer Experience
tags:
  - Design Systems
  - Tailwind CSS
  - ESLint
  - Migration
  - Developer Experience
related: /articles/documentation-is-an-api-for-coding-agents
---

Moving an application to a new CSS framework is mostly a local decision. Moving a design system is an ecosystem change.

The old classes are already spread across products, templates, documentation, tests, and code owned by teams you do not control. A migration that makes the design-system repository cleaner can still leave every consumer with years of repetitive work.

When we made [Tailwind CSS the main styling driver](https://nordhealth.design/core/css/) for Nord Design System, the difficult part was not generating utilities. It was giving existing consumers a safe path from the old system to the new one.

## Treat Existing Classes as an API

A utility class may look like an implementation detail, but once it appears in consumer markup it behaves like public API.

Nord's existing CSS exposed both simple utilities and compound layout classes. A class such as `n-stack` represented several declarations at once. Products could also combine it with an explicit gap or alignment class.

Replacing the stylesheet without understanding those combinations would create subtle changes in spacing, direction, and responsive behaviour. The migration therefore had to preserve intent, not merely replace one string with another.

We approached the work as three connected products:

1. A Tailwind theme that expresses Nord's design decisions.
2. Documentation that explains the new vocabulary.
3. Automated tooling that can translate existing usage safely.

Shipping only the first would have transferred the migration cost to every product team.

::tailwind-migration-figure
::

## Make Tokens the Centre of the Tailwind Theme

Tailwind became the driver, but it did not become the source of truth for the visual language.

The custom Nord theme maps the existing colour, spacing, typography, radius, and shadow tokens into Tailwind. Base styles cover fonts, resets, typesetting, and shared HTML patterns. Nord-specific utilities handle forms and logical layout behaviour that should remain consistent across products.

This separation matters. Consumers get Tailwind's composition model while the design system retains control over the available decisions.

It also avoids a common migration failure: replacing a constrained system with arbitrary framework defaults. If every product starts using a slightly different grey, spacing value, or shadow because it exists in the framework, the migration has weakened the design system.

## Prefer Logical Properties in the New Vocabulary

A new styling layer is an opportunity to remove assumptions that were difficult to change in the old one.

Nord's utilities use logical directions—inline and block, start and end—instead of encoding left and right into the API. Negative margin and inset utilities follow the same model.

Logical properties make the utilities work with right-to-left layouts and different writing modes without requiring a parallel set of directional classes. They also let the ESLint migration rule distinguish between a genuinely physical choice and a layout relationship that should follow the document direction.

The important lesson is that compatibility does not require preserving every historical mistake. It requires a tool-supported transformation from the old intent to a better representation.

## Build the Migration Into ESLint

Documentation helps someone understand a migration. It does not find thousands of affected templates or prevent a deprecated class from returning six months later.

We created an [ESLint plugin](https://nordhealth.design/docs/developer/eslint/) that detects legacy Nord classes, recommends the new logical utilities, and can automatically replace supported patterns. This puts migration feedback in the editor and CI, where teams already encounter code-quality rules.

For a simple utility, replacement can be one-to-one. Compound classes are more difficult:

```html
<div class="n-stack n-gap-l">
  <!-- ... -->
</div>
```

The stack class may expand into flex direction and a default gap, while the explicit gap is meant to override that default. A mechanical expansion must not produce two competing gap utilities.

## Conflict Resolution Is the Real Migration Logic

Our first rule was not enough if it generated output such as:

```html
<div class="n:flex n:flex-col n:gap-m n:gap-l">
```

Both gap classes are valid in isolation, but together they make the result depend on generated CSS order rather than the author's intent.

Our [conflict-detection work](https://nordhealth.design/changelogs/eslint-plugin/) established an explicit priority:

1. Existing `n:*` utilities have the highest priority.
2. Explicit single-output legacy classes come next.
3. When compound legacy classes conflict, the rightmost class wins.

With that model, `n-stack n:gap-l` becomes:

```html
<div class="n:flex n:flex-col n:gap-l">
```

The rule is doing more than renaming classes. It is interpreting a small styling language, resolving conflicts, and emitting an equivalent expression in the new language.

This is where migration tooling earns its value. The easy 80% can be handled by search and replace; the remaining combinations are where visual regressions hide.

## Documentation Must Support Mixed States

Large consumers do not migrate in one pull request. For a while, teams need to understand both the legacy class they encounter and the utility they should use next.

The initial implementation included a new Tailwind documentation area, live examples, package entry points, and a migration guide. The documentation explains how the Nord theme differs from unconfigured Tailwind and keeps examples tied to the supported token set.

During the transition, we also had to test the old and new paths together. Component tests, documentation examples, visual regression tests, package builds, and lint rules all became part of the migration surface.

That mixed state is not temporary noise to ignore. It is the actual product experience until the final consumer has moved.

## Release the Path, Not Just the Destination

The main Tailwind implementation touched 68 files and added theme configuration, base styles, utilities, build tooling, documentation, and the first version of the ESLint migration support.

The public [Tailwind migration guide](https://nordhealth.design/migrations/tailwind/) documents the resulting consumer path, including side-by-side compatibility and automated migration with ESLint.

Later changes refined conflict handling, logical selectors, negative values, and legacy replacements as real combinations were exercised. That progression was expected: migration rules improve when they meet the full variety of consumer code.

A safer rollout looks less like a framework switch and more like an API migration:

- publish the new representation
- keep a documented compatibility period
- provide detection and automatic fixes
- test equivalent output
- collect cases the automatic migration cannot decide
- remove the old path only when consumers have somewhere reliable to go

## What I Would Repeat

If I were planning another design-system styling migration, I would keep these principles:

1. **Assume consumed CSS is public API.** Whether it was intended to be or not, products depend on it.
2. **Put design tokens above the framework.** Tailwind should express the system, not redefine it.
3. **Ship migration tooling with the new API.** A destination without a path is incomplete.
4. **Model conflicts explicitly.** Class order and compound utilities contain intent that string replacement cannot preserve.
5. **Design for a long mixed state.** Documentation, tests, and tooling must work while old and new syntax coexist.
6. **Use migration pressure to improve the model.** Logical properties and clearer utilities are worth introducing when automation can carry consumers forward.

## The Framework Was the Small Part

Tailwind gave us a flexible engine and a familiar authoring model. The design-system work was everything around it: translating tokens, defining supported utilities, protecting existing products, and making the new path easier than staying on the old one.

That is the difference between adopting a CSS framework and evolving a shared platform.
