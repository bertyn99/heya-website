<script setup lang="ts">
import type { ActivityAccent, HelpStepSceneKind, SolutionAudience } from '~/data/solutions'

const props = defineProps<{
  scene: HelpStepSceneKind
  num: string
  title: string
  audience: string
  accent: ActivityAccent
}>()

const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')

const accentHex: Record<ActivityAccent, string> = {
  blue: '#03a9f4',
  yellow: '#e8c547',
  orange: '#f79007',
  violet: '#8b7ab8'
}

const ink = '#2a2520'

function assertNever(value: never): never {
  throw new Error(`Unknown help step scene: ${String(value)}`)
}

function sceneLabel(scene: HelpStepSceneKind): string {
  switch (scene) {
    case 'totem':
      return 'Proposition au totem'
    case 'lamp':
      return 'Signal lumineux du relais'
    case 'gather':
      return 'Rencontre dans l\'espace commun'
    case 'dashboard':
      return 'Pilotage sur le dashboard'
    default:
      return assertNever(scene)
  }
}

const resolvedAudience = computed<SolutionAudience>(() => {
  switch (props.audience) {
    case 'residences-seniors':
    case 'co-living':
    case 'residences-etudiantes':
    case 'habitat-inclusif':
      return props.audience
    default:
      return 'residences-seniors'
  }
})

const color = computed(() => accentHex[props.accent])

const totemCy = 138

const totemSlots: Array<{
  id: ActivityAccent
  hex: string
  cx: number
}> = [
  { id: 'blue', hex: '#03a9f4', cx: 78 },
  { id: 'yellow', hex: '#e8c547', cx: 148 },
  { id: 'violet', hex: '#8b7ab8', cx: 218 },
  { id: 'orange', hex: '#f79007', cx: 288 }
]

const activeTotemCx = computed(() => {
  const slot = totemSlots.find(item => item.id === props.accent)
  return slot?.cx ?? 218
})
</script>

<template>
  <article
    class="flex w-full flex-col rounded-[1.15rem] bg-white px-5 py-6 sm:px-7 sm:py-8"
    :style="{ '--scene-accent': color }"
  >
    <p class="text-[11px] font-semibold uppercase tracking-widest text-primary">
      {{ title }}
    </p>

    <div class="relative mt-3 min-h-52 sm:min-h-64">
      <span
        class="absolute left-0 top-0 font-bold tabular leading-none text-primary/90"
        style="font-size: 2.75rem"
        aria-hidden="true"
      >
        {{ num }}
      </span>

      <svg
        viewBox="0 0 360 240"
        class="mx-auto mt-2 block h-auto w-full max-w-md"
        fill="none"
        role="img"
        :aria-label="sceneLabel(scene)"
      >
        <defs>
          <radialGradient
            :id="`${uid}-glow`"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              :stop-color="color"
              stop-opacity="0.8"
            />
            <stop
              offset="100%"
              :stop-color="color"
              stop-opacity="0"
            />
          </radialGradient>
        </defs>

        <!-- 01 Totem: pill panel with 4 activity slots -->
        <g v-if="scene === 'totem'">
          <ellipse
            cx="183"
            cy="204"
            rx="148"
            ry="12"
            fill="#ece6db"
          />
          <rect
            x="22"
            y="86"
            width="322"
            height="108"
            rx="54"
            fill="#f4efe6"
            :stroke="ink"
            stroke-width="2"
          />

          <g
            v-for="slot in totemSlots"
            :key="slot.id"
          >
            <circle
              :cx="slot.cx"
              :cy="totemCy - 38"
              r="5"
              fill="#4a453f"
            />
            <circle
              :class="slot.id === accent ? 'scene-totem-glow' : ''"
              :cx="slot.cx"
              :cy="totemCy"
              r="30"
              fill="none"
              :stroke="slot.id === accent ? slot.hex : '#c5cdd6'"
              :stroke-width="slot.id === accent ? 10 : 8"
            />
            <circle
              :cx="slot.cx"
              :cy="totemCy"
              r="19"
              fill="#fff"
              :stroke="ink"
              stroke-width="1.3"
            />

            <g
              v-if="slot.id === 'blue'"
              :stroke="ink"
              stroke-width="1.5"
              stroke-linecap="round"
              fill="none"
            >
              <rect
                :x="slot.cx - 7"
                :y="totemCy - 8"
                width="9"
                height="12"
                rx="1"
              />
              <rect
                :x="slot.cx - 2"
                :y="totemCy - 5"
                width="9"
                height="12"
                rx="1"
                fill="#fff"
              />
            </g>
            <g
              v-else-if="slot.id === 'yellow'"
              :stroke="ink"
              stroke-width="1.5"
              stroke-linecap="round"
              fill="none"
            >
              <circle
                :cx="slot.cx"
                :cy="totemCy"
                r="5"
              />
              <path :d="`M${slot.cx} ${totemCy - 11}v3M${slot.cx} ${totemCy + 8}v3M${slot.cx - 11} ${totemCy}h3M${slot.cx + 8} ${totemCy}h3`" />
            </g>
            <g
              v-else-if="slot.id === 'violet'"
              :stroke="ink"
              stroke-width="1.5"
              stroke-linecap="round"
              fill="none"
            >
              <path :d="`M${slot.cx - 6} ${totemCy - 2}c0-6 4-9 6-9s6 3 6 9v8h-12v-8Z`" />
              <path :d="`M${slot.cx - 4} ${totemCy + 6}h8`" />
              <path :d="`M${slot.cx} ${totemCy - 13}v-3`" />
            </g>
            <g
              v-else
              :stroke="ink"
              stroke-width="1.5"
              stroke-linecap="round"
              fill="none"
            >
              <ellipse
                :cx="slot.cx"
                :cy="totemCy + 4"
                rx="8"
                ry="3.5"
              />
              <path :d="`M${slot.cx - 8} ${totemCy + 4}c1-8 5-12 8-12s7 4 8 12`" />
            </g>
          </g>

          <g class="scene-totem-press">
            <image
              href="/images/solutions/hand-point.png"
              :x="activeTotemCx - 40"
              :y="totemCy - 96"
              width="80"
              height="126"
              preserveAspectRatio="xMidYMax meet"
              pointer-events="none"
            />
          </g>
        </g>

        <!-- 02 Lamp: short cylinder, colored top you press -->
        <g v-else-if="scene === 'lamp'">
          <ellipse
            class="scene-lamp-halo"
            cx="198"
            cy="176"
            rx="100"
            ry="36"
            :fill="`url(#${uid}-glow)`"
          />

          <path
            d="M120 138v36c0 16 35 28 78 28s78-12 78-28v-36"
            fill="#f7f3ec"
            :stroke="ink"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <ellipse
            cx="198"
            cy="174"
            rx="78"
            ry="22"
            fill="#efe8dc"
            :stroke="ink"
            stroke-width="2"
          />
          <ellipse
            cx="198"
            cy="136"
            rx="78"
            ry="24"
            fill="#fff"
            :stroke="ink"
            stroke-width="2"
          />
          <ellipse
            class="scene-lamp-top"
            cx="198"
            cy="136"
            rx="68"
            ry="18"
            :fill="color"
          />
          <ellipse
            class="scene-ripple scene-ripple-a"
            cx="198"
            cy="136"
            rx="78"
            ry="24"
            :stroke="color"
            stroke-width="1.6"
          />
          <ellipse
            class="scene-ripple scene-ripple-b"
            cx="198"
            cy="136"
            rx="78"
            ry="24"
            :stroke="color"
            stroke-width="1.6"
          />

          <g class="scene-press">
            <image
              href="/images/solutions/hand-press.png"
              x="72"
              y="4"
              width="200"
              height="148"
              preserveAspectRatio="xMidYMax meet"
              pointer-events="none"
            />
          </g>
        </g>

        <!-- 03 Gather: two people, props adapted to the audience -->
        <g v-else-if="scene === 'gather'">
          <ellipse
            cx="184"
            cy="206"
            rx="122"
            ry="14"
            fill="#f5efe6"
          />
          <path
            d="M68 180h232"
            :stroke="ink"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M84 180v30M284 180v30"
            :stroke="ink"
            stroke-width="2"
            stroke-linecap="round"
          />

          <g
            :stroke="ink"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M76 180c4-24 16-38 40-40 18-2 34 8 42 26" />
            <path d="M206 166c8-18 26-30 44-28 24 2 40 18 44 42" />
            <path d="M108 180c10-8 26-10 40-4" />
            <path d="M218 180c10-8 26-10 38-2" />
          </g>

          <!-- Seniors: glasses, short hair, coffee + cards -->
          <g v-if="resolvedAudience === 'residences-seniors'">
            <circle
              cx="118"
              cy="108"
              r="18"
              :stroke="ink"
              stroke-width="2"
              fill="#fff"
            />
            <path
              d="M104 100c6-12 22-14 30-4"
              :stroke="ink"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle
              cx="248"
              cy="106"
              r="18"
              :stroke="ink"
              stroke-width="2"
              fill="#fff"
            />
            <path
              d="M236 100h24"
              :stroke="ink"
              stroke-width="1.7"
              stroke-linecap="round"
            />
            <circle
              cx="240"
              cy="106"
              r="4.5"
              :stroke="ink"
              stroke-width="1.5"
            />
            <circle
              cx="256"
              cy="106"
              r="4.5"
              :stroke="ink"
              stroke-width="1.5"
            />
            <ellipse
              class="scene-steam"
              cx="168"
              cy="168"
              rx="10"
              ry="6"
              :stroke="ink"
              stroke-width="1.6"
            />
            <ellipse
              cx="196"
              cy="168"
              rx="10"
              ry="6"
              :stroke="ink"
              stroke-width="1.6"
            />
            <rect
              x="174"
              y="152"
              width="16"
              height="12"
              rx="1.5"
              :fill="color"
              fill-opacity="0.9"
            />
            <rect
              x="186"
              y="158"
              width="16"
              height="12"
              rx="1.5"
              fill="#fff"
              :stroke="ink"
              stroke-width="1.4"
            />
          </g>

          <!-- Co-living: dinner around a shared dish -->
          <g v-else-if="resolvedAudience === 'co-living'">
            <circle
              cx="118"
              cy="106"
              r="17"
              :stroke="ink"
              stroke-width="2"
              fill="#fff"
            />
            <path
              d="M128 96c10-10 8-22-2-24"
              :stroke="ink"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle
              cx="250"
              cy="106"
              r="17"
              :stroke="ink"
              stroke-width="2"
              fill="#fff"
            />
            <path
              d="M240 96c4-10 16-14 24-6"
              :stroke="ink"
              stroke-width="2"
              stroke-linecap="round"
            />
            <ellipse
              cx="170"
              cy="170"
              rx="14"
              ry="7"
              :stroke="ink"
              stroke-width="1.7"
            />
            <ellipse
              cx="206"
              cy="170"
              rx="14"
              ry="7"
              :stroke="ink"
              stroke-width="1.7"
            />
            <ellipse
              cx="188"
              cy="156"
              rx="20"
              ry="9"
              :fill="color"
              fill-opacity="0.9"
              :stroke="ink"
              stroke-width="1.5"
            />
            <path
              d="M176 154c8-6 16-2 20 4"
              :stroke="ink"
              stroke-width="1.4"
              stroke-linecap="round"
            />
          </g>

          <!-- Students: beanie + book / controller -->
          <g v-else-if="resolvedAudience === 'residences-etudiantes'">
            <circle
              cx="118"
              cy="112"
              r="16"
              :stroke="ink"
              stroke-width="2"
              fill="#fff"
            />
            <path
              d="M102 106c4-16 16-22 32-16 4 10 2 16-4 18"
              :stroke="ink"
              stroke-width="2"
              stroke-linecap="round"
              :fill="color"
              fill-opacity="0.35"
            />
            <circle
              cx="250"
              cy="110"
              r="16"
              :stroke="ink"
              stroke-width="2"
              fill="#fff"
            />
            <circle
              cx="244"
              cy="110"
              r="4"
              :stroke="ink"
              stroke-width="1.5"
            />
            <circle
              cx="256"
              cy="110"
              r="4"
              :stroke="ink"
              stroke-width="1.5"
            />
            <rect
              x="168"
              y="152"
              width="40"
              height="24"
              rx="2"
              :stroke="ink"
              stroke-width="1.7"
              fill="#fff"
            />
            <path
              d="M188 152v24"
              :stroke="ink"
              stroke-width="1.5"
            />
            <path
              d="M172 160h12M192 160h12"
              :stroke="color"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <rect
              x="214"
              y="166"
              width="22"
              height="12"
              rx="3"
              :stroke="ink"
              stroke-width="1.5"
            />
            <circle
              cx="220"
              cy="172"
              r="1.6"
              :fill="color"
              stroke="none"
            />
            <circle
              cx="230"
              cy="172"
              r="1.6"
              :fill="color"
              stroke="none"
            />
          </g>

          <!-- Habitat inclusif: mixed ages + plant -->
          <g v-else>
            <circle
              cx="116"
              cy="108"
              r="17"
              :stroke="ink"
              stroke-width="2"
              fill="#fff"
            />
            <path
              d="M102 100c6-12 20-14 28-4"
              :stroke="ink"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle
              cx="252"
              cy="106"
              r="16"
              :stroke="ink"
              stroke-width="2"
              fill="#fff"
            />
            <path
              d="M242 96c6-10 20-10 26 2"
              :stroke="ink"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M184 172v-24"
              :stroke="ink"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M184 154c-10-8-8-18 2-20 8 8 6 16-2 20Z"
              :fill="color"
              :stroke="ink"
              stroke-width="1.5"
            />
            <path
              d="M184 156c10-6 12-16 4-20-4 8-6 14-4 20Z"
              :fill="color"
              fill-opacity="0.7"
              :stroke="ink"
              stroke-width="1.5"
            />
            <rect
              x="176"
              y="170"
              width="16"
              height="10"
              rx="1.5"
              :stroke="ink"
              stroke-width="1.5"
            />
            <path
              d="M208 168c0-8 10-10 12-2"
              :stroke="ink"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <circle
              cx="222"
              cy="164"
              r="3"
              :fill="color"
              stroke="none"
            />
          </g>
        </g>

        <!-- 04 Dashboard: tablet + chart, hand touching a control -->
        <g v-else-if="scene === 'dashboard'">
          <rect
            x="48"
            y="28"
            width="250"
            height="168"
            rx="18"
            fill="#fff"
            :stroke="ink"
            stroke-width="2"
          />
          <path
            d="M48 54h250"
            :stroke="ink"
            stroke-width="1.5"
            stroke-opacity="0.28"
          />
          <circle
            cx="66"
            cy="41"
            r="4"
            fill="#ff763c"
          />
          <circle
            cx="80"
            cy="41"
            r="4"
            fill="#8b7ab8"
          />
          <circle
            cx="94"
            cy="41"
            r="4"
            :fill="color"
          />

          <rect
            x="64"
            y="70"
            width="60"
            height="34"
            rx="8"
            fill="#fff5f0"
            :stroke="ink"
            stroke-width="1.4"
          />
          <rect
            x="138"
            y="70"
            width="60"
            height="34"
            rx="8"
            fill="#f7f3fb"
            :stroke="ink"
            stroke-width="1.4"
          />
          <rect
            x="212"
            y="70"
            width="60"
            height="34"
            rx="8"
            fill="#fbf7e8"
            :stroke="ink"
            stroke-width="1.4"
          />
          <path
            d="M76 84h28M150 84h28M224 84h28"
            :stroke="ink"
            stroke-width="3"
            stroke-linecap="round"
            stroke-opacity="0.7"
          />
          <path
            d="M76 94h14M150 94h18M224 94h10"
            stroke="#aaa297"
            stroke-width="2"
            stroke-linecap="round"
          />

          <g class="scene-bars">
            <rect
              class="scene-bar scene-bar-a"
              x="78"
              y="140"
              width="26"
              height="38"
              rx="4"
              fill="#ff763c"
            />
            <rect
              class="scene-bar scene-bar-b"
              x="118"
              y="128"
              width="26"
              height="50"
              rx="4"
              fill="#8b7ab8"
            />
            <rect
              class="scene-bar scene-bar-c"
              x="158"
              y="148"
              width="26"
              height="30"
              rx="4"
              fill="#e8c547"
            />
            <rect
              class="scene-bar scene-bar-d"
              x="198"
              y="134"
              width="26"
              height="44"
              rx="4"
              fill="#03a9f4"
            />
          </g>
          <path
            d="M70 178h168"
            :stroke="ink"
            stroke-width="1.5"
            stroke-linecap="round"
          />

          <!-- Highlight matching the page activity -->
          <circle
            class="scene-pulse-dot"
            cx="250"
            cy="152"
            r="7"
            :fill="color"
          />
        </g>
      </svg>
    </div>
  </article>
</template>

<style scoped>
.scene-totem-glow {
  animation: totem-glow 2.6s ease-in-out infinite;
}

.scene-totem-press {
  transform-origin: 50% 85%;
  transform-box: fill-box;
  animation: press-down 2.6s ease-in-out infinite;
}

.scene-lamp-top {
  transform-origin: 198px 136px;
  animation: lamp-pulse 2.6s ease-in-out infinite;
}

.scene-lamp-halo {
  transform-origin: 198px 176px;
  animation: halo-pulse 2.6s ease-in-out infinite;
}

.scene-press {
  transform-origin: 50% 90%;
  transform-box: fill-box;
  animation: press-down 2.6s ease-in-out infinite;
}

.scene-ripple {
  transform-origin: 198px 136px;
  opacity: 0;
}

.scene-ripple-a {
  animation: ripple-out 2.4s ease-out infinite;
}

.scene-ripple-b {
  animation: ripple-out 2.4s ease-out infinite 0.7s;
}

.scene-steam {
  transform-origin: 168px 168px;
  animation: steam-lift 2.8s ease-in-out infinite;
}

.scene-bar {
  transform-box: fill-box;
  transform-origin: center bottom;
}

.scene-bar-a {
  animation: bar-rise 2.4s ease-in-out infinite;
}

.scene-bar-b {
  animation: bar-rise 2.4s ease-in-out infinite 0.12s;
}

.scene-bar-c {
  animation: bar-rise 2.4s ease-in-out infinite 0.24s;
}

.scene-bar-d {
  animation: bar-rise 2.4s ease-in-out infinite 0.36s;
}

.scene-pulse-dot {
  transform-origin: 250px 152px;
  animation: dot-pulse 2s ease-in-out infinite;
}

@keyframes totem-glow {
  0%,
  100% {
    opacity: 0.72;
  }

  50% {
    opacity: 1;
  }
}

@keyframes lamp-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.92;
  }

  50% {
    transform: scale(1.03);
    opacity: 1;
  }
}

@keyframes halo-pulse {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.94);
  }

  50% {
    opacity: 1;
    transform: scale(1.06);
  }
}

@keyframes press-down {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(6px);
  }
}

@keyframes ripple-out {
  0% {
    transform: scale(0.86);
    opacity: 0.55;
  }

  100% {
    transform: scale(1.28);
    opacity: 0;
  }
}

@keyframes steam-lift {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }

  50% {
    transform: translateY(-3px);
    opacity: 1;
  }
}

@keyframes bar-rise {
  0%,
  100% {
    transform: scaleY(0.62);
  }

  50% {
    transform: scaleY(1);
  }
}

@keyframes dot-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }

  50% {
    transform: scale(1.25);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scene-totem-glow,
  .scene-totem-press,
  .scene-lamp-top,
  .scene-lamp-halo,
  .scene-press,
  .scene-ripple-a,
  .scene-ripple-b,
  .scene-steam,
  .scene-bar-a,
  .scene-bar-b,
  .scene-bar-c,
  .scene-bar-d,
  .scene-pulse-dot {
    animation: none;
  }
}
</style>
