<template>
  <div class="ripple">
    <div class="ripple__circle"></div>
    <div class="ripple__circle ripple__inner-circle"></div>
  </div>
</template>

<style lang="scss" scoped>

@mixin center-spinner($diameter) {
  position: absolute;
  width: $diameter;
  height: $diameter;
  top: 50%;
  left: 50%;
  margin-top: $diameter / 2 * (-1);
  margin-left: $diameter / 2 * (-1);
}

$spinner-width: 64px;
.ripple {
  display: inline-block;
  @include center-spinner(64px);

  &__circle {
    position: absolute;
    border: 4px solid rgb(96, 208, 112);
    opacity: 1;
    border-radius: 50%;
    animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &__inner-circle {
    animation-delay: -0.5s;
  }
}

@keyframes ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>

