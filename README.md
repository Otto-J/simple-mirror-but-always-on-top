# mirror

这是一个 tauri + vue3 项目。这个应用可以读取摄像头，在页面中展示位一个圆形区域，并且默认启动窗口置顶。

如果你需要直播露脸，但是没有合适的摄像头窗口置顶软件，可以考虑它。

This is a Tauri + VUE3 project. The app reads the camera, displays a circular area in the page, and defaults to the top of the startup window.

If you need to live stream your face but don't have the right camera window top app, consider it.

## 如何使用？ How to use？

```sh
# 确保安装了 rust 环境
# Make sure the Rust environment is installed

pnpm i
pnpm run tauri dev # 开发预览效果
pnpm run tauri build # 生成 dmg 安装包
```

## 注意 PS

只在 MacOS v12.5 下测试了效果。
需要你自行判断。
The results were only tested on MacOS V12.5.

I need you to judge for yourself.

## todo

[ ] 补充 github actions 完成 release 发包

[] 图标替换

[] 摄像头区域进一步缩小

[] 完善文档

欢迎 PR
