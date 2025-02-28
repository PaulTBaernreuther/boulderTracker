<template>
  <div>
      <ion-datetime-button class="date-button" format="yyyy-mm-dd"  :datetime="datetimeId" ></ion-datetime-button>
      <ion-modal v-show="false" :keep-contents-mounted="true">
        <ion-datetime  :id="datetimeId" presentation="date" :value="session.date" ></ion-datetime>
      </ion-modal>
    <span>
      {{ formatTops(session.tops) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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

const props = defineProps<{session: Session, uniqueId: number}>();
const datetimeId = computed(() => `datetime_${props.uniqueId}`)
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