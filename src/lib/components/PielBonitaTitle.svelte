<h1 id=title-component class="relative overflow-hidden m-1 sm:text-5xl text-4xl font-extrabold">
  Piel Bonita
</h1>

<style>
  #title-component:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      250deg,
      transparent,
      var(--blendedMagenta),
      transparent
      );
    transition: all 650ms;
  }

  #title-component:hover:before {
      left: 100%;
  }

 
</style>
