<template>
  <div
    class="relative mx-auto flex w-full max-w-[280px] flex-col items-center"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 280 300"
      class="h-auto w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Disconnected relays (left) -->
      <line
        x1="48"
        y1="72"
        x2="118"
        y2="118"
        stroke="var(--color-heya-dark-border)"
        stroke-width="1.5"
        stroke-dasharray="4 4"
        stroke-opacity="0.6"
      />
      <line
        x1="42"
        y1="155"
        x2="118"
        y2="150"
        stroke="var(--color-heya-dark-border)"
        stroke-width="1.5"
        stroke-dasharray="4 4"
        stroke-opacity="0.6"
      />
      <line
        x1="50"
        y1="238"
        x2="118"
        y2="182"
        stroke="var(--color-heya-dark-border)"
        stroke-width="1.5"
        stroke-dasharray="4 4"
        stroke-opacity="0.6"
      />

      <!-- Connected relays (right) -->
      <line
        x1="162"
        y1="118"
        x2="228"
        y2="68"
        stroke="var(--color-heya-teal)"
        stroke-width="2"
        stroke-opacity="0.7"
      />
      <line
        x1="162"
        y1="150"
        x2="232"
        y2="150"
        stroke="var(--color-heya-teal)"
        stroke-width="2"
        stroke-opacity="0.7"
      />
      <line
        x1="162"
        y1="182"
        x2="224"
        y2="232"
        stroke="var(--color-heya-teal)"
        stroke-width="2"
        stroke-opacity="0.7"
      />

      <!-- Dim relay nodes -->
      <circle
        cx="38"
        cy="68"
        r="14"
        fill="var(--color-heya-dark-border)"
        fill-opacity="0.5"
      />
      <circle
        cx="30"
        cy="155"
        r="12"
        fill="var(--color-heya-dark-border)"
        fill-opacity="0.5"
      />
      <circle
        cx="40"
        cy="242"
        r="13"
        fill="var(--color-heya-dark-border)"
        fill-opacity="0.5"
      />

      <!-- Lit relay nodes — How It Works pastels -->
      <circle
        cx="236"
        cy="64"
        r="14"
        fill="var(--color-heya-step-blue-fg)"
      />
      <circle
        cx="242"
        cy="150"
        r="13"
        fill="var(--color-heya-step-gold-fg)"
      />
      <circle
        cx="230"
        cy="236"
        r="14"
        fill="var(--color-heya-step-green-fg)"
      />

      <!-- Totem hub -->
      <defs>
        <linearGradient
          id="totem-gradient"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stop-color="var(--color-heya-teal)" />
          <stop
            offset="1"
            stop-color="var(--color-heya-step-blue-fg)"
          />
        </linearGradient>
      </defs>
      <circle
        cx="140"
        cy="150"
        r="36"
        fill="url(#totem-gradient)"
      />
      <text
        x="140"
        y="154"
        text-anchor="middle"
        fill="var(--color-heya-cream)"
        font-size="10"
        font-weight="700"
        font-family="system-ui, sans-serif"
        letter-spacing="0.08em"
      >
        TOTEM
      </text>
    </svg>

    <p class="mt-2 text-center text-xs font-semibold tracking-wide text-heya-teal">
      Relais qui s'allument
    </p>
  </div>
</template>
