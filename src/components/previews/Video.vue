<template>
  <div class="vuefinder__video-preview">
    <h3 class="vuefinder__video-preview__title" id="modal-title" :title="app.modal.data.item.path">
      {{ app.modal.data.item.basename }}
    </h3>
    <div>
      <video class="vuefinder__video-preview__video" preload controls ref="videoPlayer">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';

const app = inject("ServiceContainer");
const emit = defineEmits(['success']);
const previewVideo = ref('');
const videoPlayer = ref(null);

const fetchDocument = () => {
  app.requester.send({
    url: '',
    method: 'get',
    params: { q: 'preview', adapter: app.modal.data.adapter, path: app.modal.data.item.path },
    responseType: 'blob',
  }).then(blob => {
    previewVideo.value = URL.createObjectURL(blob);
    videoPlayer.value.src = previewVideo.value;
  }).catch((e) => {
      console.log('catch', e);
  })
}

onMounted(() => {
  fetchDocument()
  emit('success');
});

</script>

