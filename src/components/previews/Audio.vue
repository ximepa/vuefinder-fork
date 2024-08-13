<template>
  <div class="vuefinder__audio-preview">
    <h3 class="vuefinder__audio-preview__title" id="modal-title" :title="app.modal.data.item.path">
      {{ app.modal.data.item.basename }}
    </h3>
    <div>
      <audio class="vuefinder__audio-preview__audio" controls ref="audioPlayer">
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script setup>

import { inject, onMounted, ref } from 'vue';

const emit = defineEmits(['success']);

const app = inject('ServiceContainer');
const previewAudio = ref('');
const audioPlayer = ref(null);

const fetchDocument = () => {
  app.requester.send({
    url: '',
    method: 'get',
    params: { q: 'preview', adapter: app.modal.data.adapter, path: app.modal.data.item.path },
    responseType: 'blob',
  }).then(blob => {
    previewAudio.value = URL.createObjectURL(blob);
    audioPlayer.value.src = previewAudio.value;
  }).catch((e) => {
      console.log('catch', e);
  })
}

onMounted(() => {
  fetchDocument()
  emit('success');
});

</script>
