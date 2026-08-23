# Stealth Browser Assistant 官网

Stealth Browser Assistant 的官方网站，基于 Next.js 16 构建。内置国际化 (i18n) 支持，使用 [next-intl](https://next-intl.dev/)。

## 技术栈

- **框架**: Next.js 16.3.0 (App Router)
- **语言**: TypeScript
- **UI**: React 19.2.8 + Tailwind CSS 4
- **i18n**: next-intl 4.x（locale 前缀路由）
- **包管理**: pnpm
- **代码规范**: ESLint

## 开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。根路径会自动重定向到浏览器首选语言对应的 locale（默认 `en`）。

## Google Analytics

网站通过 GA4 收集全站访问数据。在本地 `.env.local` 及部署平台中配置 Measurement ID：

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

未配置时不会加载 Google Analytics。`NEXT_PUBLIC_` 环境变量会在构建时写入前端资源，因此部署环境修改后需要重新构建。

## 国际化（i18n）

所有页面位于 `[locale]` 段下：

- 翻译文案在 `messages/<locale>.json`，已包含英文（`en`）和中文（`zh`）
- 通过 `next-intl` 在服务端组件中读取，避免在客户端传输语言包
- `<html lang>` 与 `<title>` / `<meta description>` 根据 locale 动态生成
- 在 `src/i18n/routing.ts` 中配置 `locales` / `defaultLocale`，新增语言时只需：
  1. 在 `routing.ts` 的 `locales` 数组中加入新 locale
  2. 新建 `messages/<locale>.json`
  3. （可选）在页面里使用 `getTranslations({ locale, namespace: '...' })`

## 目录结构

```
messages/
├── en.json                # 英文文案（默认）
└── zh.json                # 中文文案

public/
└── icon.png               # 产品 Logo

src/
├── app/
│   ├── globals.css        # 全局样式（默认深色主题）
│   └── [locale]/
│       ├── layout.tsx     # 根布局：动态 lang/metadata + Provider
│       └── page.tsx       # 首页（落地页）
├── i18n/
│   ├── routing.ts         # locale 配置
│   ├── navigation.ts      # 国际化导航包装（Link / useRouter 等）
│   └── request.ts         # 服务端文案加载
└── proxy.ts               # next-intl 中间件（Next.js 16 中重命名为 proxy）
```

## 部署

推荐使用 [Vercel](https://vercel.com) 部署，详见 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。
