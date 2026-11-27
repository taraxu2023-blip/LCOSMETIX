# 本地运行、询盘存储与发布说明

项目使用 Next.js App Router、TypeScript 和 React，部署运行时为 **Node.js 24.x**。
依赖锁定于 `package-lock.json`。项目包含服务端询盘接口，不能只导出静态文件。
本说明描述部署方法；生产环境是否已部署、真实询盘是否已保存需以实际验证为准。

## 本地运行与正式构建

在仓库根目录执行：

```sh
npm ci
npm run dev
```

访问 Next.js 输出的本地地址。已有开发进程占用端口时，先停止对应进程。
执行正式检查与生产服务：

```sh
npm run typecheck
npm run test:inquiries
npm run build
npm start
```

`npm start` 使用已经生成的生产构建，改源码后需要重新构建。

| 地址 | 内容 |
| --- | --- |
| `/` | 首页 |
| `/about` | 公司介绍与联系地图 |
| `/oem-odm` | OEM/ODM 合作方式、制造照片、质量协调、服务与流程 |
| `/single-dose-technology` | Product Innovations，13 系列／23 概念与配方兼容 |
| `/single-dose-technology#inquiry` | Request Samples，默认选择 Samples |
| `/products/bobii-ball-single-dose-container` | BOBII 产品、五层结构与专利证书 |
| `/#contact` | 首页询盘 |

## 环境变量

本地参考 `.env.example` 创建 `.env.local`，实际秘密不能提交到 GitHub。
Vercel 的变量在项目设置中维护，按 Production／Preview／Development 分配。

| 变量 | 配置方法 |
| --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Vercel 私有 Blob 存储的服务端凭据，连接 private Blob store 后确认已注入目标环境。不能使用 `NEXT_PUBLIC_` 前缀。 |
| `SITE_URL` | 已确认的生产 HTTPS origin，不带页面路径，例如 `https://www.example.com`；临时预览可留空。 |
| `ENABLE_INDEXING` | 默认 `false`。仅确认生产域名和公开内容后，在 Production 设 `true`。Preview 保持 `false`。 |
| `INQUIRY_STORAGE_DIR` | 非 Vercel Node.js 托管使用的私有持久磁盘绝对目录。本地默认 `.local-data/inquiries/`。Vercel 不使用此变量作为存储替代。 |

域名与索引设置参与构建；改变后重新部署。默认页面 noindex、robots 禁止抓取且
sitemap 不含 URL。仅有效 `SITE_URL` 与 `ENABLE_INDEXING=true` 同时存在时，
才输出已实现的首页、About、OEM/ODM、Single-Dose Technology 和已发布产品。
草稿及计划中的页面不进入 sitemap；公司资料里的旧官网域名不会自动成为部署域名。

## Vercel 导入与发布

1. 在 Vercel 新建项目，导入
   [taraxu2023-blip/LCOSMETIX](https://github.com/taraxu2023-blip/LCOSMETIX)。
2. Framework Preset 选择 **Next.js**，Root Directory 使用仓库根目录，
   Node.js Version 设为 **24.x**。Install Command 为 `npm ci`，
   Build Command 为 `npm run build`，Output Directory 保持 Next.js 默认。
3. 建立并连接 **private Vercel Blob store**。确认 `BLOB_READ_WRITE_TOKEN`
   已对本次部署环境生效；只在服务端使用。不要建立公开询盘文件目录。
4. 预览先保持 `ENABLE_INDEXING=false`，部署并逐项验证页面与询盘。
5. 准备正式域名后配置对应的 `SITE_URL`。仅在允许搜索引擎收录时，把 Production
   的 `ENABLE_INDEXING` 设为 `true`，再重新部署；Preview 继续禁止索引。

Vercel 使用 Next.js 构建适配器，不需要另开长期后台 `npm start` 进程。
不要配置静态导出，也不要把函数临时磁盘当作客户询盘数据库。上传到 GitHub
只是准备部署，不等于已经在 Vercel 上线或更改 DNS。

## 询盘实际行为

浏览器向 `POST /api/inquiries` 提交 JSON。服务端校验必填项、邮箱、长度、询盘
类型、产品公开状态，以及可选概念与容器的归属。记录包含 UUID、提交时间、同一
产品记录的名称与 slug，并可保存概念、目标市场和预计量级的快照。

- Vercel：等待 **private Blob** 实际保存完成后，才返回 HTTP 201 和成功编号。
- 非 Vercel：写入私有磁盘 JSON 并同步完成后，才返回成功。
- 缺少 Blob 凭据或存储失败：返回 HTTP 503，前端保留表单并显示错误，不显示成功。
- 无效字段、草稿产品、跨站来源、超长或不符合格式的请求不会进入成功流程。

网站没有公开读取这些询盘的 API，不把 Blob URL 返回给访客。没有自动邮件、销售
通知、CRM 或询盘管理后台。销售人员需经授权从 Vercel 私有 Blob 或自管服务器
读取记录并跟进；保存成功不代表邮件已送达。上线前安排查收责任人、访问权限、
备份和保留／删除规则。

`npm run test:inquiries` 检查真实写入与失败路径，使用测试临时存储，不能清除
真实客户资料。生产验证使用明确标记的测试询盘，并检查对应存储记录存在、
产品／概念快照正确、返回编号一致。不要把客户信息复制到公开构建日志。

## 非 Vercel Node.js 托管

主机或容器使用 Node.js 24.x，按前述命令安装、检查、构建，再由进程管理器
运行 `npm start`。根据平台要求设置 `PORT`，并在反向代理后提供 HTTPS。
反向代理应保留正确的外部 Host／请求来源，并在实际域名测试表单。

把 `INQUIRY_STORAGE_DIR` 指向仓库和 `public/` 之外的私有持久磁盘目录。
服务账号须有创建目录、独占写入及同步文件的权限。容器重建不能清空该目录；
多实例必须使用共同的可靠持久存储，不能各自保存在临时容器层。
本地默认目录仅用于开发，不应连同源码上传。

## 发布验证与内容维护

发布后核对所有页面、手机导航、产品颜色、概念展开、首页视频、图片及画册。
确认真实询盘回读与故障不假成功，再核对 `robots.txt` 和 `sitemap.xml` 符合
当前索引决定。未完成线上验证时，不能把构建成功等同于真实业务验证完成。

内容与产品替换见 [CONTENT.md](CONTENT.md)。界面回退应通过 Git 版本进行；
客户询盘独立备份，不能因回退源码覆盖或删除。
