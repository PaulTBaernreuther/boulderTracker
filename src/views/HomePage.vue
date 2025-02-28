<script setup lang="ts">
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';
import SessionCard from './SessionCard.vue';
import { deleteSession, loadSessions, Session } from './sessions';
const router = useRouter()

const addSession = () => openSession(null)

const openSession = (index: number | null) => router.push({
    name: "session",
    params: {index}
  })




const sessions = ref<Session[]>([])
const refresh = async () => {
  sessions.value = await loadSessions()
}
onMounted(refresh)

const deleteSessionAndRefresh = async (index: number) => {
  await deleteSession(index)
  await refresh();
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Boulder Tracker</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Boulder Tracker</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <div class="spacing"/>
        <IonButton class="add" @click="addSession">Add Session</IonButton>
        <div class="card" v-for="(session, i) in sessions" :key="i">
          <IonButton class="item" color="secondary" @click="() => openSession(i)"><SessionCard :session="session"/></IonButton>
          <IonButton class="delete" color="danger" @click="() => deleteSessionAndRefresh(i)"><img class="trash" src="../assets/trash.svg"/></IonButton>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped>

#container {
  display: flex;
  flex-direction: column;
  padding: 10px
}

#container .spacing {
  height: 30vh;
}


#container .card {
  display: flex;
  width: 100%;
}

#container .card .item {
  flex: 1;
}


#container .card .delete .trash {
  height: 18px;
}


</style>
