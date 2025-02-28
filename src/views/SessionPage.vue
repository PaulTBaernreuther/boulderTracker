<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonGrid, IonRow, IonCol, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime } from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';

import { loadSessions, saveSessions, Session } from './sessions';

const router = useRouter();

const route = useRoute();
const index = typeof route.params.index === "string" ? parseInt(route.params.index) : null;

const selectedDate = ref(new Date().toISOString().split('T')[0]);
const tops = ref({
  3: 0,
  4: 0,
  5: 0,
  6: 0,
});


const setValuesFromSession = (session: Session) => {
  tops.value = session.tops
  selectedDate.value = session.date
}

const getCurrentSessionValue = (): Session => ({
  tops: tops.value,
  date: selectedDate.value
})


onMounted(async () => {
  if (index != null) {
    const sessions = await loadSessions()
    const currentSession = sessions[index]
    setValuesFromSession(currentSession)
  }
})

const saveSession = async () => {
  const currentSession = getCurrentSessionValue()
  let sessions = await loadSessions();
  if (index === null)  {
    sessions = [currentSession].concat(sessions)
  } else {
    sessions[index] = currentSession
  }
  saveSessions(sessions)
  router.push("/home")
};

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>New Bouldering Session</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-item>
          <ion-label>Date:</ion-label>

          <ion-datetime-button datetime="datetime"></ion-datetime-button>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" format="yyyy-mm-dd" v-model="selectedDate" presentation="date" preferWheel="false"></ion-datetime>
          </ion-modal>
        </ion-item>
        <ion-grid>
          <ion-row class="ion-align-items-center" v-for="grade in [3, 4, 5, 6] as const" :key="grade">
            <ion-col size="3">
              <ion-label>{{ grade }}er</ion-label>
            </ion-col>
            <ion-col size="3" class="ion-text-center">
              <ion-button v-if="tops[grade] > 0" @click="() => { tops[grade] = tops[grade] - 1 }" color="danger">-</ion-button>
            </ion-col>
            <ion-col size="3" class="ion-text-center">
              <div>{{ tops[grade] }}</div>
            </ion-col>
            <ion-col size="3" class="ion-text-center">
              <ion-button @click="() => { tops[grade] = tops[grade] + 1 }" color="success">+</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-button expand="full" @click="saveSession">Save</ion-button>
    </ion-content>
  </ion-page>
</template>
