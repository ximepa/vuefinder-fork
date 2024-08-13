<template>
  <div class="vuefinder__pdf-preview">
    <h3 class="vuefinder__pdf-preview__title" id="modal-title" :title="app.modal.data.item.path">
      {{ app.modal.data.item.basename }}
    </h3>
    <div>
      <vue-pdf-app style="height: 70vh;" :pdf="previewPdf" :config="pdfViewerConfig"></vue-pdf-app>
    </div>
  </div>
</template>

<script setup>

import { inject, onMounted, ref } from 'vue';
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";

const app = inject('ServiceContainer');

const emit = defineEmits(['success']);
const previewPdf = ref('');

const pdfViewerConfig = ref({
  sidebar: {
    viewThumbnail: true,
    viewOutline: true,
    viewAttachments: true,
  },
  toolbar: {
    toolbarViewerRight: {
      presentationMode: true,
      openFile: false,
      print: true,
      download: true,
      viewBookmark: false,
    },
  },
});

function blobToArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
}

const fetchDocument = () => {
  app.requester.send({
    url: '',
    method: 'get',
    params: { q: 'preview', adapter: app.modal.data.adapter, path: app.modal.data.item.path },
    responseType: 'blob',
  })
      .then(data => {
        blobToArrayBuffer(data).then(arrayBuffer => {
          previewPdf.value = arrayBuffer;
        });
      })
      .catch((e) => {
        console.log('catch', e);
      })

}
onMounted(() => {
  fetchDocument()
  emit('success');
});


</script>
