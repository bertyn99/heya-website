<script setup lang="ts">
import type { BenefitMarkKind } from '~/data/solutions'

const props = defineProps<{
  kind: BenefitMarkKind
  active?: boolean
}>()

const uid = useId()

const surfaces: Record<BenefitMarkKind, string> = {
  lamp: 'bg-step-blue text-step-blue-fg',
  gesture: 'bg-step-gold text-step-gold-fg',
  together: 'bg-step-green text-step-green-fg',
  chart: 'bg-primary/12 text-primary',
  spaces: 'bg-step-blue text-step-blue-fg',
  spark: 'bg-step-gold text-step-gold-fg'
}

function assertNever(value: never): never {
  throw new Error(`Unknown benefit mark: ${String(value)}`)
}

function markLabel(kind: BenefitMarkKind): string {
  switch (kind) {
    case 'lamp':
      return 'Lampe relay'
    case 'gesture':
      return 'Geste simple'
    case 'together':
      return 'Lien collectif'
    case 'chart':
      return 'Pilotage'
    case 'spaces':
      return 'Espaces communs'
    case 'spark':
      return 'Différenciation'
    default:
      return assertNever(kind)
  }
}
</script>

<template>
  <span
    class="benefit-mark inline-flex size-11 shrink-0 items-center justify-center rounded-2xl"
    :class="[surfaces[props.kind], props.active ? 'is-active' : '']"
    :aria-label="markLabel(props.kind)"
  >
    <svg
      v-if="kind === 'lamp'"
      viewBox="0 0 32 32"
      class="size-6"
      fill="none"
      aria-hidden="true"
    >
      <circle
        class="mark-lamp-glow"
        cx="16"
        cy="19"
        r="7"
      />
      <path
        d="M11 12.5c0-2.8 2.2-5 5-5s5 2.2 5 5v3.2c0 .7-.4 1.3-1 1.6l-1.2.6h-5.6L12 17.3c-.6-.3-1-.9-1-1.6V12.5Z"
        fill="currentColor"
      />
      <path
        d="M16 8.2V6.5"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <path
        d="M13.5 23.5h5"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />
    </svg>

    <svg
      v-else-if="kind === 'gesture'"
      viewBox="0 0 32 32"
      class="size-6"
      fill="none"
      aria-hidden="true"
    >
      <circle
        class="mark-ripple mark-ripple-a"
        cx="16"
        cy="14"
        r="7"
        stroke="currentColor"
        stroke-width="1.4"
      />
      <circle
        class="mark-ripple mark-ripple-b"
        cx="16"
        cy="14"
        r="7"
        stroke="currentColor"
        stroke-width="1.4"
      />
      <circle
        cx="16"
        cy="14"
        r="3.2"
        fill="currentColor"
      />
      <path
        d="M13.2 18.2c.6 2.4 1.7 4.6 3.4 6.3"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />
    </svg>

    <svg
      v-else-if="kind === 'together'"
      viewBox="0 0 32 32"
      class="size-6"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11.5"
        r="3"
        fill="currentColor"
      />
      <circle
        cx="21"
        cy="11.5"
        r="3"
        fill="currentColor"
      />
      <path
        d="M6.8 22.5c.6-3.2 2.6-5 4.2-5s3.6 1.8 4.2 5"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <path
        d="M16.8 22.5c.6-3.2 2.6-5 4.2-5s3.6 1.8 4.2 5"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <path
        class="mark-link"
        d="M13.4 16.2c1.2 1.4 3.8 1.4 5.2 0"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>

    <svg
      v-else-if="kind === 'chart'"
      viewBox="0 0 32 32"
      class="size-6"
      fill="none"
      aria-hidden="true"
    >
      <rect
        class="mark-bar mark-bar-a"
        x="7"
        y="17"
        width="5"
        height="9"
        rx="1.4"
        fill="currentColor"
      />
      <rect
        class="mark-bar mark-bar-b"
        x="13.5"
        y="11"
        width="5"
        height="15"
        rx="1.4"
        fill="currentColor"
      />
      <rect
        class="mark-bar mark-bar-c"
        x="20"
        y="14"
        width="5"
        height="12"
        rx="1.4"
        fill="currentColor"
      />
    </svg>

    <svg
      v-else-if="kind === 'spaces'"
      viewBox="0 0 32 32"
      class="size-6"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="9"
        width="13"
        height="13"
        rx="3"
        stroke="currentColor"
        stroke-width="1.6"
      />
      <rect
        class="mark-room"
        x="13"
        y="12"
        width="13"
        height="13"
        rx="3"
        fill="currentColor"
        fill-opacity="0.22"
        stroke="currentColor"
        stroke-width="1.6"
      />
    </svg>

    <svg
      v-else-if="kind === 'spark'"
      viewBox="0 0 32 32"
      class="size-6"
      fill="none"
      aria-hidden="true"
    >
      <path
        :id="`${uid}-spark`"
        class="mark-spark"
        d="M16 6.5 17.8 13 24.5 14.8 17.8 16.6 16 23.2 14.2 16.6 7.5 14.8 14.2 13 16 6.5Z"
        fill="currentColor"
      />
    </svg>
  </span>
</template>

<style scoped>
.mark-lamp-glow {
  fill: #03a9f4;
  opacity: 0.42;
  transform-origin: 16px 19px;
  animation: lamp-glow 4.2s ease-in-out infinite;
}

.mark-ripple {
  transform-origin: 16px 14px;
  fill: none;
}

.mark-ripple-a {
  animation: ripple 2.4s ease-out infinite;
}

.mark-ripple-b {
  animation: ripple 2.4s ease-out infinite 0.7s;
}

.mark-link {
  stroke-dasharray: 18;
  stroke-dashoffset: 18;
  animation: draw-link 2.8s ease-in-out infinite;
}

.mark-bar {
  transform-box: fill-box;
  transform-origin: center bottom;
}

.mark-bar-a {
  animation: bar-rise 2.2s ease-in-out infinite;
}

.mark-bar-b {
  animation: bar-rise 2.2s ease-in-out infinite 0.18s;
}

.mark-bar-c {
  animation: bar-rise 2.2s ease-in-out infinite 0.36s;
}

.mark-room {
  animation: room-shift 3.2s ease-in-out infinite;
}

.mark-spark {
  transform-origin: 16px 14.8px;
  animation: spark-twinkle 2.4s ease-in-out infinite;
}

.is-active .mark-lamp-glow,
.benefit-mark:hover .mark-lamp-glow {
  animation-duration: 1.6s;
}

.is-active .mark-ripple-a,
.benefit-mark:hover .mark-ripple-a {
  animation-duration: 1.2s;
}

@keyframes lamp-glow {
  0%,
  100% {
    fill: #03a9f4;
    opacity: 0.35;
    transform: scale(0.92);
  }

  33% {
    fill: #e8c547;
    opacity: 0.7;
    transform: scale(1.08);
  }

  66% {
    fill: #8b7ab8;
    opacity: 0.55;
    transform: scale(1);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0.55);
    opacity: 0.7;
  }

  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

@keyframes draw-link {
  0% {
    stroke-dashoffset: 18;
  }

  40%,
  70% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -18;
  }
}

@keyframes bar-rise {
  0%,
  100% {
    transform: scaleY(0.55);
  }

  50% {
    transform: scaleY(1);
  }
}

@keyframes room-shift {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(-1.5px, -1.5px);
  }
}

@keyframes spark-twinkle {
  0%,
  100% {
    transform: rotate(0deg) scale(0.92);
    opacity: 0.7;
  }

  50% {
    transform: rotate(12deg) scale(1.08);
    opacity: 1;
  }
}
</style>
