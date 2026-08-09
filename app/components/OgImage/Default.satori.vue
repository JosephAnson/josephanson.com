<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'Systems, products, experiments.',
    description: 'Frontend projects, design-system work, technical notes, talks, and occasional web experiments.',
  },
)

const title = computed(() => props.title.trim().slice(0, 68))
const description = computed(() => props.description.trim().slice(0, 180))
</script>

<template>
  <div class="h-full w-full flex bg-[#11161a] p-[48px] text-[#edf1f3] font-sans">
    <div class="h-full w-full flex flex-col border border-[rgba(237,241,243,0.22)] bg-[#151b20] px-[48px] py-[40px]">
      <div class="h-[56px] w-full flex items-center border-b border-[rgba(237,241,243,0.22)]">
        <p class="m-0 text-[25px] font-semibold tracking-[-0.02em]">
          Joseph Anson
        </p>
        <div class="ml-[48px] flex flex-1 items-center gap-[14px] text-[14px] text-[#8ba9e0] uppercase">
          <span>01</span>
          <span class="h-px flex-1 bg-[rgba(237,241,243,0.22)]" />
          <span>WWW</span>
        </div>
        <svg class="ml-[32px]" width="32" height="32" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 6 58 32 32 58 6 32Z" fill="none" stroke="#8ba9e0" stroke-width="4" />
          <path d="M32 23 41 32 32 41 23 32Z" fill="#8ba9e0" />
        </svg>
      </div>

      <div class="w-full flex flex-1 pt-[42px]">
        <div class="w-[690px] flex flex-col">
          <h1 class="m-0 max-w-[690px] text-[64px] font-semibold leading-[0.96] tracking-[-0.035em]">
            {{ title }}
          </h1>
          <p class="mt-[28px] max-w-[660px] text-[24px] text-[#abb3b9] leading-[1.4]">
            {{ description }}
          </p>
        </div>

        <div class="ml-auto flex items-end gap-[10px]" aria-hidden="true">
          <div class="h-[292px] w-[126px] flex flex-col border border-[#8ba9e0] p-[14px]">
            <span class="text-[13px] text-[#8ba9e0]">01</span>
            <span class="mt-[18px] h-[72px] w-full bg-[rgba(139,169,224,0.18)]" />
            <span class="mt-auto h-px w-[72px] bg-[rgba(237,241,243,0.34)]" />
            <span class="mt-[10px] h-px w-[52px] bg-[rgba(237,241,243,0.22)]" />
          </div>
          <div class="h-[292px] w-[62px] flex flex-col border border-[rgba(237,241,243,0.22)] p-[12px]">
            <span class="text-[13px] text-[#89959d]">02</span>
            <span class="mt-auto h-[92px] w-full bg-[rgba(237,241,243,0.07)]" />
          </div>
          <div class="h-[292px] w-[62px] flex flex-col border border-[rgba(237,241,243,0.22)] p-[12px]">
            <span class="text-[13px] text-[#89959d]">03</span>
            <span class="mt-auto h-[138px] w-full bg-[rgba(237,241,243,0.05)]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
