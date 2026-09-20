<script setup lang="ts">
interface Props {
  name: string,
  image: string,
  price?: string,
  salesCount?: string,
  bgColor?: string,
  textColor?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="person_list_item flex items-center justify-between w-full rounded-2xl">
    <NuxtLink class="person__details flex items-center gap-x-3">
      <div class="person__image w-12 h-12" :style="{backgroundImage:  `url('${props.image}')` }"/>
      <p class="person__name relative flex flex-col items-center">{{ props.name }}</p>
    </NuxtLink>
    <div v-if="props.salesCount"
         class="person__sales_count cursor-pointer relative h-fit">
      <p class="text-white text-xs  w-28 px-2 py-2 bg-navy rounded-2xl relative z-10">{{ props.salesCount }} فروش</p>
      <div class="sales__details -z-10 absolute w-28 p-5 flex flex-col items-center bg-navy pb-8 rounded-2xl min-h-8">
        <p class="flex items-center justify-between w-full text-white text-xs">
          <span>دوازدهم</span>
          <span>2</span>
        </p>
      </div>
    </div>
    <p v-if="props.price" class="person__sales ">
      12,000,000 تومان
    </p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";

.person_list_item {
  padding: 12px;
  background-color: v-bind("props.bgColor ?? 'rgba(255, 255, 255, 0.3)'");

  .person__details {
    .person__name {
      color: v-bind("props.textColor??'$navy'");

      &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        width: 0;
        border-radius: 20px;
        height: 2px;
        background-color: $navy;
        transition: all 0.3s ease;
        left: 50%;
        transform: translateX(-50%);
      }

      &:hover {
        color: $navy;

        &::after {
          width: 60%;
        }
      }
    }

    .person__image {
      border-radius: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

  }

  .person__sales_count {
    z-index: 4;


    .sales__details {
      bottom: 0;
      padding: 0;
      //opacity: 0;
      //left: 0;
      //border-radius: 20px;
      //z-index: 2;
      //visibility: hidden;
      //
      p {
        display: none;
      }
    }

    &:hover {
      .sales__details {
        //top: -100%;
        //opacity: 1;
        //visibility: unset;
        //
        padding: 1.25rem 1.25rem 2rem;

        p {
          display: flex;
        }

      }
    }
  }
}
</style>