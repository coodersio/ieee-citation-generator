# IEEE Citation Generator - Next.js Project Structure

## 🚀 项目概览

这是一个使用 Next.js 14 (App Router) + TypeScript + Tailwind CSS + Radix UI 构建的专业 IEEE 引用生成器网站。

## 📁 项目结构

```
ieee-citation-generator/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [type]/                   # 动态路由 - 文献类型
│   │   │   ├── page.tsx              # /book, /journal, /conference 等
│   │   │   ├── [input]/              # 动态路由 - 输入方式
│   │   │   │   ├── page.tsx          # /book/doi, /book/pdf 等
│   │   │   │   └── [output]/         # 动态路由 - 输出格式
│   │   │   │       └── page.tsx      # /book/doi/bibtex 等
│   │   ├── globals.css               # 全局样式
│   │   ├── layout.tsx                # 根布局
│   │   ├── page.tsx                  # 首页
│   │   ├── robots.ts                 # robots.txt 生成
│   │   └── sitemap.ts                # sitemap.xml 生成
│   ├── components/                   # 可复用组件
│   │   ├── BookCitationTool.tsx      # 书籍引用生成工具
│   │   ├── Breadcrumb.tsx            # 面包屑导航
│   │   ├── Footer.tsx                # 页脚
│   │   ├── Header.tsx                # 页头和导航
│   │   └── PageLayout.tsx            # 页面布局包装器
│   ├── lib/                          # 工具函数
│   └── types/                        # TypeScript 类型定义
│       └── citation.ts               # 引用相关类型
├── public/                           # 静态资源
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🛣️ 路由架构

### 层级式 URL 结构
- `/` - 首页
- `/[type]` - 单一文献类型页面 (book, journal, conference, website, standard, image)
- `/[type]/[input]` - 文献类型 + 输入方式 (manual, doi, pdf)
- `/[type]/[input]/[output]` - 完整组合 (text, bibtex, latex)

### 示例 URL
- `/book` - 书籍引用生成器
- `/book/doi` - 使用 DOI 生成书籍引用
- `/book/doi/bibtex` - DOI 输入，BibTeX 输出的书籍引用
- `/journal/manual/text` - 手动输入，文本输出的期刊引用

## 🎨 技术栈

### 核心框架
- **Next.js 14** - React 框架，使用 App Router
- **TypeScript** - 类型安全
- **Tailwind CSS** - 实用优先的 CSS 框架

### UI 组件库
- **Radix UI Themes** - 现代化组件库
- **Radix UI Icons** - 图标系统

### SEO 优化
- 自动生成 sitemap.xml
- 自动生成 robots.txt
- 完整的元数据支持
- 结构化数据 (Schema.org)
- 语义化 HTML

## 🔧 主要功能

### 已实现
✅ **响应式布局** - 适配所有设备  
✅ **书籍引用生成器** - 完整功能，支持多种输入/输出格式  
✅ **动态路由系统** - 层级式 URL 结构  
✅ **SEO 优化** - 元数据、sitemap、robots.txt  
✅ **现代化 UI** - Radix UI + Tailwind CSS  
✅ **类型安全** - 完整的 TypeScript 支持  

### 待实现
🚧 **其他文献类型** - 期刊、会议、网站等引用生成器  
🚧 **DOI 查询功能** - 自动从 DOI 获取文献信息  
🚧 **PDF 上传解析** - 从 PDF 提取引用信息  
🚧 **格式转换器** - APA/MLA 转 IEEE  
🚧 **批量处理** - 一次生成多个引用  

## 🎯 SEO 特性

### URL 结构优化
- 层级式 URL：`/book/doi/bibtex/`
- 语义化路径名
- 静态路由生成

### 元数据优化
- 每页独特的 title 和 description
- Open Graph 标签
- 结构化数据标记
- 自动生成 sitemap

### 性能优化
- 静态生成 (SSG)
- 图片优化
- 代码分割
- 快速加载

## 🚀 开发指南

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
npm start
```

### 类型检查
```bash
npm run type-check
```

## 📝 添加新功能

### 添加新的文献类型
1. 在 `types/citation.ts` 中添加新类型
2. 在 `components/` 中创建对应的工具组件
3. 更新 `[type]/page.tsx` 中的渲染逻辑

### 添加新的输入方式
1. 在 `types/citation.ts` 中添加新的 `InputMethod`
2. 在组件中添加对应的处理逻辑
3. 更新静态路由生成

### 添加新的输出格式
1. 在 `types/citation.ts` 中添加新的 `OutputFormat`
2. 在引用生成工具中添加格式化逻辑
3. 更新相关页面和路由

## 🎨 设计系统

### 颜色主题
- **主色调**: Blue (Radix UI blue scale)
- **中性色**: Slate (Radix UI slate scale)
- **强调色**: 根据功能使用不同颜色

### 组件规范
- 使用 Radix UI 组件作为基础
- Tailwind CSS 用于布局和样式
- 统一的间距和圆角系统

### 响应式断点
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px

这个项目结构为 IEEE 引用生成器提供了完整的 SEO 优化、现代化 UI 和可扩展的架构基础。
