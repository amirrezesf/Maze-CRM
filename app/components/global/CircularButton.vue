<script setup lang="ts">
interface Props {
  size?: string
  buttonClass?: string
  isLink?: boolean
  href?: string
  onClick?: () => void,
  fontSize?: string,
  defaultColor?: string,
  hoverColor?: string,
  iconColor?: string,
  iconHoverColor?: string,
}

const props = withDefaults(defineProps<Props>(), {
  isLink: false,
  href: '#',
  buttonClass: 'default',
  fontSize: '30px'
})
</script>

<template>
  <NuxtLink
      v-if="props.isLink"
      :to="props.href"
      :class="['circular__btn w-10 h-10 flex items-center justify-center rounded-full relative',buttonClass, props.size ?? '']"
      :style="{ '--icon-size': props.fontSize, 'z-index':'2' }"

  >
    <slot/>
  </NuxtLink>

  <button
      v-else
      @click="props.onClick"
      :class="['circular__btn w-10 h-10 flex items-center justify-center rounded-full relative',buttonClass, props.size ?? '']"
      :style="{ '--icon-size': props.fontSize, 'z-index':'2' }"
  >
    <slot/>
  </button>
</template>

<style lang="scss">
@import '@/assets/scss/colors';

.circular__btn {
  overflow: hidden;

  &.default {
    background: v-bind("props.defaultColor ?? 'rgba(193, 207, 222, 0.6)'");

    ion-icon {
      color: v-bind("props.iconColor ?? ' rgba(51, 59, 74, 0.6)'");
      font-size: var(--icon-size);
    }

    &:hover {
      background-color: v-bind("props.hoverColor ?? 'rgba(193, 207, 222, 0.6)'");

      ion-icon {
        color: v-bind("props.iconHoverColor ?? '$navy'") !important;
      }
    }

  }

  &.dark {
    background: $lightNavy;

    ion-icon {
      color: $milky;
      font-size: var(--icon-size);
    }

    &:hover {
      background: #fff;

      ion-icon {
        color: $navy;
        animation: wiggle 0.4s ease-in-out;
      }
    }
  }

  @keyframes wiggle {
    0%, 100% {
      transform: rotate(0deg);
    }
    15% {
      transform: rotate(10deg);
    }
    30% {
      transform: rotate(-10deg);
    }
    45% {
      transform: rotate(8deg);
    }
    60% {
      transform: rotate(-8deg);
    }
    75% {
      transform: rotate(5deg);
    }
    90% {
      transform: rotate(-5deg);
    }
  }
}

</style>
