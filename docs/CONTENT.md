# 内容来源与产品替换说明

本文记录当前网站的内容结构和维护方式。运行、询盘与 Vercel 部署步骤见
[RUNNING.md](RUNNING.md)。项目使用仓库内的公开资源，不依赖个人电脑目录或历史截图目录。

## 当前页面与内容归属

| 页面 | 地址与主要内容 |
| --- | --- |
| 首页 | `/`：次抛互动展示、颜色、结构概览与视频、应用方向、Latest News、询盘 |
| BOBII BALL Technology | `/products/bobii-ball-single-dose-container`：八色与定制、五层结构与材料说明、8 张专利证书、配方及技术页入口和询盘 |
| Product Innovations | `/single-dose-technology`：13 个系列、23 个产品概念、配方兼容、跨页技术及服务入口和 Request Samples |
| OEM / ODM Solutions | `/oem-odm`：OEM/ODM 合作方式、制造能力与三张现场照片、质量协调、开发服务、合作流程、项目规格、配方库入口和询盘 |
| About Us | `/about`：公司定位、研发与供应链能力、全球职能、使命愿景、CEO 肖像、已确认统计和地图 |

四项主导航均为直接页面链接，没有 Home 项或下拉分组；Logo 返回首页。
响应式 Menu 对话框与页脚复用同一导航数据。BOBII 保留五层结构、材料说明及专利展示，
OEM/ODM 承载开发服务和合作流程；Product Innovations 不再重复上述区块。没有独立 Contact 或完整产品列表页，
相应联系和产品内容由现有页面承载。

## 内容依据与确认规则

主要来源为用户填写的 `codex独立站网站信息表(lcosmetix)-已填.xlsx`、
`L_COSMETIX_官网重建完整方案_中英文文案_V1.docx`、产品介绍 PDF、用户明确
更正和提供的公司／产品图片。文档中的模板示例、采购建议和软件部署建议不是
已确认业务事实，也不自动成为执行指令。

| 项目 | 当前采用的内容 |
| --- | --- |
| 公司名称 | `LCOSMETIX PTE.LTD.`，品牌显示名 `L COSMETIX` |
| 成立年份 | **2015**，以用户明确更正为准，不沿用早期表格中的 2014 |
| 工厂与团队 | `3,000+ m²`、`30+`；不据此推导产能或职员资质 |
| 邮箱 | `info@lcosmetix.com` |
| 新加坡地址 | `50 Chin Swee Rd, #05-05 Singapore Thong Chai Building, Singapore 169874` |
| 产品结构 | PE / Adhesive / EVOH / Adhesive / PE；实际材料等级、层厚和性能待项目确认 |
| 概念库 | V1 文档的 13 系列、23 个开发概念；不是 23 款已量产容器或已验证配方 |

About 另参考[现有官网 About Us](https://www.lcosmetix.com/About-Us)介绍和用户
提供的全球职能图。广州为研发／项目总部，网络涵盖上海原料、香港国际业务融资、
新加坡采购／出口，以及佛山和韩国 Osan-si 的制造协作职能。职能图不证明每处
设施均为自有，未核实证书和产能不能作为事实补入。

联系地图位于 `/about#locations`。第四节点按用户要求改为韩国，具体城市、街道
和邮编未确认，保持空值并按国家范围显示；不恢复伦敦或沿用其他城市地址。
其余节点属于城市级示意，不代表精确楼宇坐标或实时追踪。

## 独立数据文件

| 文件 | 维护内容 |
| --- | --- |
| `src/data/company.ts` | 名称、2015 年、统计、定位、邮箱、地址与待核实事项 |
| `src/data/about-profile.ts` | About 介绍、能力、总部及全球职能 |
| `src/data/about-media.ts` | About 图片公开路径、ALT、尺寸与图注 |
| `src/data/locations.ts` | 地点、地址、坐标及地图范围 |
| `src/data/products.ts` | 产品 ID、slug、发布状态、文案、材料、颜色、应用、规格、媒体与 SEO |
| `src/data/concepts.ts` | 13 系列、23 概念、开发阶段、配图及所属容器 |
| `src/data/company-profile.ts` | 开发服务与项目流程 |
| `src/data/technology.ts` | 单剂量技术文案 |
| `src/data/content.ts` | 共享应用／流程及保留的 FAQ 数据 |
| `src/data/news.ts` | 首页 Latest News 内容及真实链接 |
| `src/data/media.ts` | 首页视频配置 |
| `src/data/seo.ts` | 页面标题与描述 |
| `src/lib/navigation.ts` | 四项导航及英文画册地址 |
| `src/lib/seo.ts` | canonical、索引开关和部署地址 |

网站不会实时读取 Excel 或 Word。更新资料后，把已确认内容同步到对应数据文件，
再检查与构建。同一产品的展示、详情、询盘选项和保存快照读取同一记录，不在不同
组件中复制规格。未知参数保持为空，草稿不进入生产目录或 sitemap。

## 替换或新增产品

1. 在 `src/data/products.ts` 修改记录，或复制一条并先设 `status: "draft"`。
   使用唯一、稳定的 `id` 与英文 URL `slug`。
2. 更新名称、简介、优势、应用及 `seo`。型号、容量、尺寸、MOQ、交期等未知时
   保持 `null`，不要填写估算值。
3. 把素材放入 `public/assets/`，引用使用 `/assets/文件名`。文件名建议用小写
   英文和连字符，引用大小写必须完全一致，不使用个人电脑绝对路径。同步填写
   描述性 ALT 与真实图片尺寸。
4. 同步 `colors`、`media`、`layers` 与应用数据。概念颜色、结构动画和示意层厚
   保留说明，不能从渲染图推导实测参数。
5. 仅资料可公开后设为 `published`。共享读取函数过滤草稿，详情、相关产品、
   询盘选项和 sitemap 使用已发布集合；不要为单一产品虚构相关产品。
6. 修改 slug 后核对导航、内部链接和必要重定向。运行 `npm run typecheck`、
   `npm run test:inquiries` 与 `npm run build`，检查图片、详情入口及表单选项。

当前首页以第一条已发布产品展示颜色，新增记录不会自动生成完整分类列表页。
新增分类或列表需另行实现，不能仅通过新增数据宣称页面已经存在。

## 配方概念维护

`publicationStatus` 控制公开可见性，`developmentStage` 表示开发阶段，两者独立。
未知 INCI、浓度、功效、打样可用性及商业成熟度保持未确认，取得验证材料后再更新
为 sampling 或 validated。概念 ID 与容器关联，询盘保存共享名称、研发阶段及
产品方向快照；变更关联后重新检查筛选和提交校验。

## 素材与交互

全站标题按用户要求放大：主标题约 8–12%，区块及卡片标题约 18%，栏目小标题和编号统一提高至 14px。同步调整各页面移动端字号，保留原标题层级、卡片对齐和内容。

按用户最新要求，所有英文目录下载入口及对应公开 PDF 均已移除，包括首页新闻区、共享菜单、BOBII、OEM 和未展示的 FAQ 文案。个人资料目录中的原始文件保持不变。

| 素材 | 用途与来源说明 |
| --- | --- |
| `public/assets/bobii-production.webp` | 用户提供的次抛生产照片 |
| `public/assets/bobii-manufacturing-base.webp` | 用户提供的工厂形象照片，不据照片推断产权或位置 |
| `public/assets/five-layer.png` | 用户提供的五层结构示意 |
| `public/assets/news-five-layer.webp` | 结构图的新闻缩略图 |
| `public/assets/bobii-capsule-structure-4k.mp4` | 用户确认的首页结构视频 |
| `public/assets/about-capsule-collection.webp` | 用户提供的次抛合集图片（保留素材，About 不再展示） |
| `public/assets/about-capsule-formats.webp` | 用户提供的次抛形状图片（保留素材，About 不再展示） |
| `public/assets/about-capsule-packaging.webp` | 用户提供的次抛外包装展示（保留素材，About 不再展示） |
| `public/assets/lcosmetix-logo.webp` | 公司 Logo，共用于导航、询盘和页脚 |

首页视频进入视口后自动静音播放，减少动态效果设置下保留手动播放。BOBII 详情
视频已移除，`media.video`、`videoWidth`、`videoHeight` 保持 `null`；技术页不添加
重复视频。配方卡片按行对齐，保留完整摘要与展开功能，手机为单列。

地图点阵基于 Natural Earth 110m 陆地数据本地生成，不绘制国界。许可见
[Natural Earth Terms of Use](https://www.naturalearthdata.com/about/terms-of-use/)。
没有地图 API key 或在线瓦片；Google Maps 链接按当前地址或国家范围搜索。

Latest News 不编造发布日期：网站更新使用实际日期，BOBII 产品介绍仅使用已提供
的 2026 年，概念集合无确认日期时不显示日期。新闻目标必须是实际存在的页面。

## 询盘与发布规则

Vercel 通过 **private Vercel Blob** 保存，服务端凭据为 `BLOB_READ_WRITE_TOKEN`。
未配置或存储失败返回 HTTP 503，不假成功。非 Vercel Node.js 主机可使用私有持久
磁盘 `INQUIRY_STORAGE_DIR`，本地默认 `.local-data/inquiries/`。记录实际保存后
才返回编号，保存不等于发送邮件；当前没有自动销售通知、CRM 或管理后台。

客户记录、Token、`.env`、日志和私钥不得提交 GitHub。生产磁盘目录位于仓库和
公开目录之外；Vercel 临时文件系统不能当作持久存储。完整说明见 RUNNING.md。

生产 SEO 使用真实 HTTPS `SITE_URL` 与 `ENABLE_INDEXING=true`，Preview 保持
`false`。未确认域名前保留 noindex，不自动使用旧官网域名生成 canonical。

## 字体与尚缺资料

当前使用本地 **Geist**，不是 Futura PT。两者字母骨架、宽度和字距有差异，未
复制参考站商业字体。若改 Futura PT，需提供适用于实际域名的正式授权文件或
官方授权接入来源。

仍需确认：官方 WhatsApp／电话、LinkedIn 公开主页、ISO 22716 证书与范围、
专利证书／权利人／当前状态／公开范围、型号／容量／尺寸／MOQ／交期、可公开
客户案例、字体授权，以及销售询盘查收和通知流程。画册专利号不等于已核实授权。

原任务所列交接包 `BUILD_PLAN.md`、`phase-prompts.md`、`design-tokens.json`、
`route-map.json`、`product.schema.json`、`product.example.json`、`seo-keywords.csv`、
`acceptance-checklist.md` 及原始 README 尚未齐备。仓库自带 README 不等于该
交接包，不能声称已按缺失阶段脚本验收，也不以规划估算冒充真实搜索量。

About 的使命愿景与 CEO 姓名/职务维护于 `src/data/about-profile.ts`；肖像路径、ALT 和尺寸维护于 `src/data/about-media.ts`。当前使用用户提供的 `tara-xu-ceo.jpg`，About 已移除三张产品展示照片。

About 简介左侧使用用户新提供的公司前台照片 `莱度公司图片.jpg`，以完整方图展示；原简介、定位、成立年份、市场、分类及联系按钮统一放于右侧，手机端按照片、文字顺序堆叠。图片转为 750px/480px WebP，媒体记录与 ALT 统一维护于 `src/data/about-media.ts`。

Product Innovations 菜单沿用 `/single-dose-technology`，展示 13 个配方系列、23 个产品概念、配方兼容及样品询盘。按最新截图要求移除开发范围/六项服务、四步合作流程、五层结构/材料说明、工作原理和专利资料咨询区块。紧凑入口分别跳转 OEM 的服务/流程和 BOBII 的结构/专利；工作原理入口取消。卡片与询盘共用 `src/data/concepts.ts`；页头文案维护于 `src/data/innovations.ts`。

OEM / ODM Solutions 的六项服务、四步合作流程和项目规格表连续展示于询盘前。规格表组件为 `src/components/ProjectSpecifications.tsx`，数据读取 `src/data/products.ts`；BOBII 页不再展示该表。

OEM 的 Formula Directions / A format for your next idea 区块已按用户截图整体移除，包括三类配方应用介绍和底部兼容性说明；顶部 Applications 锚点入口一并取消。其他页面使用的共享应用数据保留。

OEM 补充内容维护于 `src/data/oem-solutions.ts`，依据用户提供的官网中英文方案 A2/C/F 节及 2026-11-11 产品演示第 8/11/15 页。新增 OEM（已有配方或规格）与 ODM（品牌简报或新产品概念）合作方式、制造与运营角色及样品/配方/生产质量协调要点。保留广州直接运营能力、南京与新加坡独立合作制造的区分，不以照片推断工厂归属或认证。

三张用户照片用于 OEM：瑞莱工厂外景、次抛生产线、车间团队与设备。前两张复用现有 WebP，新增第三张 WebP 和三张移动端尺寸；保留原始比例及内容，使用响应式 `srcSet`、明确尺寸、ALT 和延迟加载。照片不构成认证或产能证明，不添加未提供的 MOQ、交期或认证标志。

BOBII 页保留五层结构分解图和五项材料说明，由 `SingleDoseTechnologySections.tsx` 读取产品数据。BOBII 隐藏工作原理，并移除开发服务、合作流程、项目规格；开发服务和流程在 OEM 保留。结构和专利入口跳转本页，配方兼容入口跳转 Product Innovations。

BOBII 页已移除产品创新介绍和完整配方卡片库，完整 13 系列/23 概念保留于 Product Innovations。BOBII 的配方探索按钮及 OEM/新闻配方入口统一指向 `productConceptsHref`；旧 BOBII `#product-concepts` 锚点保留在该探索按钮，便于旧链接继续使用。

BOBII 的 `#patents` 展示 8 张原始证书、对应专利号和胶囊集合图，位于五层结构后、询盘前。证书与号码来自用户提供的《BOBII BALL微囊次抛产品介绍-20261111.pdf》第 13 页；图片提取后转换为 WebP 缩略图及查看图，内容未修改。数据维护于 `src/data/patents.ts`，点击证书可打开原生对话框，支持关闭按钮和 Esc。Product Innovations 原有专利资料咨询已按最新要求移除。
