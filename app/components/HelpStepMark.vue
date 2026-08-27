<script setup lang="ts">
import type { ActivityAccent, HelpStepSceneKind } from '~/data/solutions'

const props = defineProps<{
  kind: HelpStepSceneKind
  accent: ActivityAccent
  active?: boolean
}>()

const accentHex: Record<ActivityAccent, string> = {
  blue: '#03a9f4',
  yellow: '#e8c547',
  orange: '#f79007',
  violet: '#8b7ab8'
}

const ink = '#2a2520'

function assertNever(value: never): never {
  throw new Error(`Unknown help step mark: ${String(value)}`)
}

function markLabel(kind: HelpStepSceneKind): string {
  switch (kind) {
    case 'totem':
      return 'Totem'
    case 'lamp':
      return 'Lampe relay'
    case 'gather':
      return 'Rencontre'
    case 'dashboard':
      return 'Dashboard'
    default:
      return assertNever(kind)
  }
}

const color = computed(() => accentHex[props.accent])
</script>

<template>
  <span
    class="inline-flex size-8 shrink-0 items-center justify-center rounded-full"
    :class="active ? 'bg-primary/12' : 'bg-heya-neutral-100'"
    :aria-label="markLabel(kind)"
  >
    <svg
      v-if="kind === 'totem'"
      viewBox="0 0 24 24"
      class="size-4"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="13.5"
        cy="12"
        r="6"
        :stroke="color"
        stroke-width="2.2"
      />
      <circle
        cx="8"
        cy="13"
        r="2.4"
        :stroke="ink"
        stroke-width="1.5"
      />
    </svg>

    <svg
      v-else-if="kind === 'lamp'"
      viewBox="0 0 24 24"
      class="size-4"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="12"
        cy="10"
        rx="7"
        ry="3.2"
        :fill="color"
      />
      <path
        d="M5 10c.6 4 3.4 7 7 7s6.4-3 7-7"
        :stroke="ink"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>

    <svg
      v-else-if="kind === 'gather'"
      viewBox="0 0 24 24"
      class="size-4"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8.5"
        cy="8"
        r="2.4"
        :stroke="ink"
        stroke-width="1.5"
      />
      <circle
        cx="15.5"
        cy="8"
        r="2.4"
        :stroke="ink"
        stroke-width="1.5"
      />
      <path
        d="M5.5 16c.6-3 2.2-4.5 3-4.5s2.4 1.5 3 4.5"
        :stroke="ink"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M12.5 16c.6-3 2.2-4.5 3-4.5s2.4 1.5 3 4.5"
        :stroke="ink"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M10.2 12.2c1.2 1.2 2.4 1.2 3.6 0"
        :stroke="color"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>

    <svg
      v-else
      viewBox="0 0 24 24"
      class="size-4"
      fill="none"
      aria-hidden="true"
    >
      <rect
        class="origin-bottom"
        x="5"
        y="13"
        width="4"
        height="6"
        rx="1"
        fill="#ff763c"
      />
      <rect
        x="10"
        y="9"
        width="4"
        height="10"
        rx="1"
        fill="#8b7ab8"
      />
      <rect
        x="15"
        y="11"
        width="4"
        height="8"
        rx="1"
        :fill="color"
      />
    </svg>
  </span>
</template>
