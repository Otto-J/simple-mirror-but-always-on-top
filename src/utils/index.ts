export const isSupport = () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("不支持 enumerateDevices() .");
    return false;
  }
  return true;
};

// 当前可用设备
export const getDevices = async () => {
  const enumDevices = await await navigator.mediaDevices.enumerateDevices();
  // console.log("enumDevices", enumDevices);
  // 音频相关
  const audioDevices = enumDevices.filter((i) => i.kind === "audioinput");
  const audioLabel = audioDevices.map((i) => i.label);
  console.log("audioDevices", audioLabel);
  // 视频相关
  const videoDevices = enumDevices.filter((i) => i.kind === "videoinput");
  const videoLabel = videoDevices.map((i) => i.label);
  console.log("videoDevices", videoLabel);
};

// 捕获当前屏幕或者部分内容
export const captureScreen = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: "always",
      },
      audio: {
        // 消除回声
        echoCancellation: true,
        // 噪声抑制
        noiseSuppression: true,
        // 音频采样率
        sampleRate: 44100,
      },
    });
    // 会立刻弹窗，授权后打印
    console.log("stream", stream);

    return stream;
  } catch (err) {
    const msg = (err as Error).message;
    // console.log(msg);
    if (msg.includes("Permission denied")) {
      console.log("用户取消了授予权限");
    }
    return false;
  }
};
