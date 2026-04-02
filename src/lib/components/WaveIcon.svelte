<script lang="ts">
  export let active = false;
</script>

<span class="wave-icon-wrapper" class:active>
  <span class="icon-base">
    <slot />
  </span>
  <span class="icon-gold" aria-hidden="true">
    <slot />
  </span>
</span>

<style>
  .wave-icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.2rem;
    height: 1.2rem;
  }

  .icon-base,
  .icon-gold {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Force the SVG to fill the wrapper fully so clip aligns to icon bounds */
  .icon-base :global(svg),
  .icon-gold :global(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }

  .icon-base {
    color: #d1d5db;
  }

  .icon-gold {
    color: var(--customGold);
    clip-path: inset(100% 0% 0% 0%);
    transition: none;
  }

  .active .icon-gold {
    animation: wave-fill 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .wave-icon-wrapper:not(.active) .icon-gold {
    animation: wave-drain 0.8s ease-in forwards;
  }

  @keyframes wave-fill {
    0%   { clip-path: inset(100% -5% 0% -5% round 0%); }
    30%  { clip-path: inset(60%  -5% 0% -5% round 40% 35% 0% 0%); }
    55%  { clip-path: inset(30%  -5% 0% -5% round 25% 30% 0% 0%); }
    75%  { clip-path: inset(10%  -5% 0% -5% round 15% 10% 0% 0%); }
    100% { clip-path: inset(0%   -5% 0% -5% round 0%); }
  }

  @keyframes wave-drain {
    0%   { clip-path: inset(0%   -5% 0% -5% round 0%); }
    100% { clip-path: inset(100% -5% 0% -5% round 0%); }
  }
</style>
