# web_with_game

一个可直接部署到 GitHub Pages 的静态网站，包含：

1. 生日祝福（给晓宇）
2. 在线小游戏：电梯模拟器（楼层切换、开门/关门、第一人称视角场景图）

## 本地预览

直接双击打开 `index.html` 即可运行。

## 部署到 GitHub Pages

1. 把本仓库推送到 GitHub。
2. 进入仓库 `Settings` -> `Pages`。
3. `Build and deployment` 选择：
   - `Source: Deploy from a branch`
   - `Branch: main`（或你的默认分支）和 `/ (root)`
4. 保存后等待部署完成，访问页面链接即可。

本项目不依赖外部 CDN 资源，在中国大陆网络环境下可直接加载页面内容和游戏逻辑。
游戏中的 AI 场景图已下载到本地 `assets/scenes/`，页面运行时不会再请求外部图片。
