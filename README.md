# 框架目录

```text
src
├── App.vue
├── apis
│   └── request.js
├── assets
│   ├── font
│   │   ├── Poppins-Bold.eot
│   │   ├── Poppins-Bold.ttf
│   │   ├── Poppins-Bold.woff
│   │   ├── Poppins-Bold.woff2
│   │   ├── Poppins-BoldItalic.eot
│   │   ├── Poppins-BoldItalic.ttf
│   │   ├── Poppins-BoldItalic.woff
│   │   ├── Poppins-BoldItalic.woff2
│   │   ├── Poppins-Medium.eot
│   │   ├── Poppins-Medium.ttf
│   │   ├── Poppins-Medium.woff
│   │   ├── Poppins-Medium.woff2
│   │   ├── Poppins-Regular.eot
│   │   ├── Poppins-Regular.ttf
│   │   ├── Poppins-Regular.woff
│   │   └── Poppins-Regular.woff2
│   ├── image
│   │   ├── counterBg-pc.png
│   │   ├── counterBg.png
│   │   ├── headerIcon.png
│   │   ├── paymentFail.png
│   │   ├── paymentSuccess.png
│   │   └── paymentWaiting.png
│   └── scss
│       ├── font.scss
│       ├── iconfont.scss
│       ├── main.scss
│       ├── mixins.scss
│       └── variables.scss
├── components
│   ├── LanguageDropdown.vue
│   ├── common
│   │   ├── Input.vue
│   │   ├── Popup.vue
│   │   └── Select.vue
│   └── global
│       └── Loading.vue
├── composables
│   ├── useLoading.js
│   └── useLocaleRouter.js
├── directives
│   └── clickOutside.js
├── i18n
│   ├── index.js
│   └── locales
│       ├── en.json
│       ├── es.json
│       └── fr.json
├── main.js
├── pages
│   ├── Error.vue
│   ├── Index.vue
│   └── NotFound.vue
├── plugins
│   ├── loading.js
│   └── responsive.js
├── router
│   └── index.js
├── routes.js
├── stores
│   └── ui.js
└── utils
    └── utils.js

```

## 🚀 启动项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打包构建生产环境
npm run build

# 本地预览构建结果
npm run preview

```

## 🛠️ 技术栈

- Vue3, Vite, Vue Router, Prettier, ESLint, SCSS...

## 📄 License

MIT License

Copyright (c) 2025 maotongjian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## nginx配置

```bash
location /
{
  try_files $uri $uri /index.html;
}

location /prod-api/
{
  proxy_pass https://your.domain.com;
  proxy_set_header Host $proxy_host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header REMOTE-HOST $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

```
