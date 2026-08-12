---
title: One close() Method Across Reka UI and Nuxt UI
description: How a small modal API improvement moved through two library layers and removed state-management boilerplate for their consumers.
date: 2026-06-28T00:00:00.000Z
categories:
  - Component APIs
  - Open Source
tags:
  - Vue
  - Nuxt UI
  - Reka UI
  - Component APIs
  - Open Source
related: /articles/performance-budgets-for-web-components
---

Small component APIs can expose large architectural problems.

I wanted content inside a Nuxt UI Modal to close the modal that contained it. The visible requirement was tiny: provide a `close()` function in the component's scoped slots. The existing solution required consumers to create and maintain an external boolean ref solely to set it back to `false`.

Adding one function turned into a change across Nuxt UI, Reka UI, and two different primitives. That path is a useful example of finding the correct layer for an API rather than hiding the problem in the highest-level component.

## The Consumer Problem

A controlled modal is explicit, but it creates state even when the consumer has no other reason to own that state:

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <UModal v-model:open="open">
    <UButton label="Open" />

    <template #footer>
      <UButton label="Close" @click="open = false" />
    </template>
  </UModal>
</template>
```

This becomes more awkward with nested modals. Each instance needs a separate ref, and content must close over the correct one.

The component already owns or coordinates its open state. Its content needs a safe, local way to request the common transition from open to closed.

The API I wanted looked like this:

```vue
<template>
  <UModal>
    <UButton label="Open" />

    <template #footer="{ close }">
      <UButton label="Close" @click="close" />
    </template>
  </UModal>
</template>
```

The difference is small, but the ownership is clearer: consumers decide when to close; the component decides how its state changes.

::close-method-demo
::

## The First Solution Was Too High in the Stack

Nuxt UI's Modal and Slideover are built on Reka UI's Dialog primitive. My first Nuxt UI implementation introduced an additional context so the wrapper could expose its internal state-changing function to the relevant slots.

It worked, but it duplicated responsibility already present lower in the stack. The wrapper had to recreate a path from the primitive's state to the consumer-facing slot.

That was the signal to move down a layer.

If Dialog Root exposed a local close function through its default slot, every wrapper could compose that capability without introducing another state channel.

::close-ownership-figure
::

## Put the Capability Next to the State

The [Reka UI Dialog change](https://github.com/unovue/reka-ui/pull/1943) added `open` and `close` to the Dialog Root's default scoped slot.

A simplified version of the primitive looks like this:

```vue
<script setup lang="ts">
const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: props.open === undefined,
})

function close() {
  open.value = false
}
</script>

<template>
  <slot :open="open" :close="close" />
</template>
```

The important detail is not the function body. It is that `close()` uses the same reactive state that already supports controlled and uncontrolled Dialog usage.

The primitive does not need a second context, a template ref, or a parallel event. It exposes a narrow operation over the state it already owns.

## Let Higher-Level Components Pass It Through

Once Dialog Root exposed the capability, [Nuxt UI could add it to Modal and Slideover slots](https://github.com/nuxt/ui/pull/4219) without maintaining a separate model of dialog state.

This also made nested usage easier to read:

```vue
<template>
  <UModal title="First modal">
    <UButton label="Open" />

    <template #footer="{ close: closeFirst }">
      <UButton label="Close first" @click="closeFirst" />

      <UModal title="Second modal">
        <UButton label="Open second" />

        <template #footer="{ close: closeSecond }">
          <UButton label="Close second" @click="closeSecond" />
        </template>
      </UModal>
    </template>
  </UModal>
</template>
```

Each function is scoped to the instance that provided it. There is no shared ref to accidentally mutate and no need to reach into the component through an imperative template API.

## Apply the Pattern Consistently

Dialog was not the only primitive with this interaction shape. Popovers also contain actions that commonly dismiss the surface after a choice is made.

The later [Popover Root contribution](https://github.com/unovue/reka-ui/pull/1956) applied the same default-slot API there. Consistency matters: if two primitives model open state in similar ways, consumers should not need unrelated techniques to close them.

This does not mean every component needs `open()`, `close()`, and `toggle()` methods everywhere. The useful API is the smallest operation that removes recurring state plumbing while preserving the component's normal state path.

## Why a Function Is Better Than Exposing the Ref

Reka UI could have exposed a mutable `open` ref and let consumers assign to it directly. A function creates a better boundary.

It communicates intent, prevents consumers from depending on the exact state representation, and leaves room for the primitive to change what closing means later. The high-level library can pass it through without teaching users about the lower-level implementation.

This distinction becomes valuable as components gain focus restoration, transitions, nested layers, and controlled-state behaviour. Consumers should request the transition rather than reproduce it.

## What This Change Taught Me

Several lessons from this small contribution apply to component libraries more generally:

1. **Repeated consumer state can indicate a missing component operation.** A boolean ref is simple, but hundreds of identical refs are still API friction.
2. **Put operations beside the state they affect.** Wrappers should compose primitive capabilities rather than recreate internal state channels.
3. **Scoped slots are useful capability boundaries.** They expose an operation to the correct subtree and component instance.
4. **Test nested composition.** A convenient API for one modal can become ambiguous when two are open.
5. **Carry patterns across related primitives.** Dialog and Popover should feel related without being artificially forced into one component.
6. **Upstream the missing primitive.** A local workaround solves one wrapper; a primitive improvement benefits the surrounding ecosystem.

## Small APIs Reveal the Shape of the System

The final consumer API is one function. Getting there required deciding which library owned the behaviour, how controlled and uncontrolled state should share it, and how wrappers should expose it without duplicating state.

That is why small component changes are often worth examining. The amount of code is not the measure of the design problem. Sometimes a single `close()` method is enough to show whether the layers in a component system are doing the right jobs.
