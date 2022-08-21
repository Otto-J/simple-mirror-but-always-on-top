<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useDevicesList, useUserMedia } from "@vueuse/core";

const currentCamera = ref<string>();
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  constraints: {
    video: {},
  },
  onUpdated() {
    if (!cameras.value.find((i) => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId;
  },
});
const video = ref<HTMLVideoElement>();
const { stream, enabled } = useUserMedia({
  videoDeviceId: currentCamera,
});
watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value!;
});
</script>

<template>
  <div id="video-box">
    <video
      id="videoMask"
      ref="video"
      muted
      autoplay
      controls
      class="h-100 w-auto"
    />
  </div>
  <div class="flex flex-col gap-4 text-center">
    <div>
      <button @click="enabled = !enabled">
        {{ enabled ? "Stop" : "Start" }}
      </button>
    </div>

    <div>
      <div
        v-for="camera of cameras"
        :key="camera.deviceId"
        class="px-2 py-1 cursor-pointer"
        :class="{ 'text-primary': currentCamera === camera.deviceId }"
        @click="currentCamera = camera.deviceId"
      >
        {{ camera.label }}
      </div>
    </div>
  </div>
</template>
<style lang="less">
// 320 * 240
#video-box {
  mask-image: url("/round.png");
  mask-position: center center;
  mask-repeat: no-repeat;
  mask-size: contain;
  width: 533px;
  margin: auto;
  outline: 1px solid red;
}
</style>
