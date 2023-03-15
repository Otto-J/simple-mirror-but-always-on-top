<template>
  <a-row>
    <a-space>
      <a-button type="primary" @click="startRecording"
        >Start Recording</a-button
      >
      <a-button type="primary" @click="stopRecording">Stop Recording</a-button>
      <a-button type="primary" @click="pauseRecording"
        >Pause Recording</a-button
      >
      <a-button type="primary" @click="resumeRecording"
        >Resume Recording</a-button
      >
    </a-space>
  </a-row>
  <a-row>
    <audio ref="audioRef" controls></audio>
  </a-row>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const audioRef = ref<HTMLAudioElement>(); // 用于控制音频播放
const mediaRecorderRef = ref(); // 用于控制录音功能
const audioCtxRef = ref(new AudioContext());
const chunksRef = ref([]); // 存放录音数据的数组

const createMediaRecorder = () => {
  const mediaStream = audioCtxRef.value.createMediaStreamSource(
    audioRef.value.srcObject
  );
  const mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: "audio/webm;codecs=opus",
  });

  mediaRecorder.ondataavailable = (e) => {
    chunksRef.value.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunksRef.value, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.controls = true;

    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.onclick = () => {
      audio.play();
    };

    audioRef.value.parentNode.insertBefore(
      playButton,
      audioRef.value.nextSibling
    );

    chunksRef.value = [];
  };

  return mediaRecorder;
};

// 开始录音
const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  audioRef.value.srcObject = stream;
  // mediaRecorderRef.value = createMediaRecorder();
  // mediaRecorderRef.value.start();
};

// 停止录音
const stopRecording = () => {
  mediaRecorderRef.value.stop();
};

// 暂停录音
const pauseRecording = () => {
  mediaRecorderRef.value.pause();
};

// 恢复录音
const resumeRecording = () => {
  mediaRecorderRef.value.resume();
};

onMounted(() => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      audioRef.value.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<style></style>
