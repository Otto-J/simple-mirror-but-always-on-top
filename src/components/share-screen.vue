<template>
  <div>
    <div>分享屏幕</div>
    <video
      id="video"
      autoplay
      width="540"
      height="304"
      style="outline: 1px solid red"
      ref="videoRef"
    ></video>
    <video id="video" autoplay style="display: none" ref="videoRef2"></video>
    <div id="log" ref="logRef"></div>
    <canvas
      style="display: none"
      width="540"
      height="304"
      ref="canvasRef"
    ></canvas>
    <a-row>
      <a-space>
        <a-button type="primary" @click="shareScreen">开始</a-button>
        <a-button type="primary" @click="endCapture">停止</a-button>
        <a-button type="primary" @click="drawScreen">截屏</a-button>
      </a-space>
    </a-row>
    <a-row>
      <!-- <a-image-preview-group infinite> -->
      <a-col v-for="img in imgList" :key="img" :span="6">
        <a-image fit="contain" :src="img" alt="" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { captureScreen } from "../utils";

const videoRef = ref<HTMLVideoElement>();
const videoRef2 = ref<HTMLVideoElement>();
const logRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();

const shareScreen = async () => {
  if (videoRef.value) {
    const stream = await captureScreen();
    if (!stream) return;
    // console.log(stream);
    videoRef.value.srcObject = stream;
  }
};

// 图片 base64 列表
const imgList = ref<string[]>([]);

// 把 base64 图片放入 img 标签中

const endCapture = () => {
  if (!videoRef.value || !videoRef.value.srcObject) {
    console.log("没有视频流");
    return;
  } else {
    let tracks = videoRef.value.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.value.srcObject = null;
  }
};

const drawScreen = () => {
  // 对 video 进行截屏

  const _canvas = document.createElement("canvas");
  if (videoRef.value) {
    const ctx = _canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.value, 0, 0, 540 / 2, 304 / 2);
      const dataUrl = _canvas.toDataURL("image/jpeg");
      // console.log(dataUrl);
      imgList.value.push(dataUrl);
    }
  }
};
</script>

<style>
#video {
  width: 540px;
  height: auto;
  margin: auto;
}
</style>
