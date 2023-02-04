# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```


## 技术栈

```
nuxt3 + pinia + tailwind + vant (postcss-px-to-viewport) + element-ui + ts
```

## 规范

```
stylelint + eslint (@antfu, @nuxtjs/eslint-config-typescript)
```


`useAsyncData` 系列获取数据方法，模板绑定事件中无法触发。比如：

```
<ElButton @click="clickHandler">获取异步数据</ElButton>
```
