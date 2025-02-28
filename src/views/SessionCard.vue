<template>
  <div>
      <ion-datetime-button class="date-button" format="yyyy-mm-dd"  datetime="datetime" ></ion-datetime-button>
      <ion-modal v-show="false" :keep-contents-mounted="true">
        <ion-datetime  id="datetime" presentation="date" :value="session.date" ></ion-datetime>
      </ion-modal>
    <span>
      {{ formatTops(session.tops) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Session } from './sessions';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue';

const formatTops = (tops: Session["tops"]) => {
  let formatted = ""
  for (const i of [6,5,4,3] as const) {
    if (tops[i]) {
      if (formatted) {
        formatted += ", "
      }
      formatted += `${tops[i]} ${i}er`
    }
  }
  return formatted || "Nix";
}

defineProps<{session: Session}>();
</script>

<style scoped>
div {
  width: 100%;
  align-items: baseline;
  gap: 10px;
  display: flex;
  justify-content: space-between;
  text-transform: none;
}
</style>