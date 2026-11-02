# 紫微斗数在线排盘

基于开源 [iztro](https://github.com/SylarLong/iztro) 与 [react-iztro](https://github.com/SylarLong/react-iztro) 排盘引擎的紫微斗数在线排盘网页。输入生辰后即可生成完整的十二宫星盘（主星、辅星、杂曜、四化、神煞、流曜、大限/流年等）。

- 支持阳历 / 农历出生日期
- 支持闰月、早子时 / 晚子时
- 前端本地计算，数据不出浏览器
- 部署于 GitHub Pages，可直接在线使用

## 本地开发

需要 Node.js 18+。

```bash
npm install
npm run dev        # 本地开发，默认 http://localhost:5173
npm run build      # 构建静态产物到 dist/
npm run preview    # 本地预览构建产物
```

## 技术栈

- [Vite](https://vitejs.dev/) + React + TypeScript
- [iztro](https://github.com/SylarLong/iztro) —— 紫微斗数排盘算法库
- [react-iztro](https://github.com/SylarLong/react-iztro) —— 紫微斗数星盘 React 组件

## License

本项目源码基于 MIT License 开源，排盘算法版权归 iztro / react-iztro 原作者所有。
