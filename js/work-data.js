/* ============================================================
   work-data.js  ——  所有作品数据统一在此管理
   ------------------------------------------------------------
   增删作品、填入封面图与视频链接，只需修改本文件。
   字段说明：
     title       项目名称
     type        项目分类（纪录片/宣传片/活动纪实/微电影等）
     year        年份
     role        本人担任角色
     description 项目简短介绍
     coverImg    封面图路径，统一放在 assets/images/works/
     videoUrl    外部视频链接（B站/腾讯视频等）；为空字符串则按钮隐藏
   ============================================================ */

window.WORKS = [
  {
    title: "霸王别姬 · 臭香反转",
    type: "AIGC 广告",
    year: "2026",
    role: "导演",
    description:
      "原创AIGC广告短片，以《霸王别姬》自刎名场面开场，用一股臭味引出桌下偷吃臭豆腐干的孩子，由 AI 生成戏曲舞台与人物画面、人工完成编剧与剪辑，把 \"闻着臭、吃着香\" 演成一段真香反转。",
    coverImg: "assets/images/works/bawang.jpg",
    videoUrl: "https://b23.tv/3oxAHWY",
    home: false
  },
  {
    title: "她们的相册",
    type: "纪录片",
    year: "2026",
    role: "导演 / 制片",
    description:
      "纪录片《她们的相册》（英文名 The Way She Looks），聚焦三位女性的自我认知与成长。片名有两层含义：「她看起来的样子」与「她看待世界的方式」。影片最初以「谁在定义我的美」为切入点，拍摄过程中逐渐发现：你怎么看待自己，比你看起来怎么样重要得多。三个女生，三种相册，三种认真生活的方式，没有标准答案。片尾留下追问：「你的相册里，你想留下什么样的自己？只要是你自己选的，就是最好的。」因后期时间紧张，团队在一天内完成剪辑，虽有遗憾，最终得以展映呈现，希望带给观众思考与意义。",
    coverImg: "assets/images/works/tamen-de-xiangce.jpg",
    videoUrl: "https://www.bilibili.com/video/BV1kcbn6PEMN"
  },
  {
    title: "指尖未递的情书",
    type: "微电影",
    year: "2025",
    role: "编导",
    description:
      "原创校园青春短片，时长6分35秒。以青春里的告白与心动为主题，讲述一封未递出的情书背后，藏着的小心翼翼的情感与青春遗憾。",
    coverImg: "assets/images/works/zhijian.jpg",
    videoUrl: "https://www.bilibili.com/video/BV16Pbn6wEFF"
  },
  {
    title: "子任",
    type: "微电影",
    year: "2025",
    role: "现场执行",
    description:
      "思政微电影，担任现场执行，协助导演完成现场调度与跨部门沟通，保障拍摄顺利推进。",
    coverImg: "assets/images/works/ziren.jpg",
    videoUrl: "https://weixin.qq.com/sph/A89Kk76TBy"
  },
  {
    title: "湘乡红色地标",
    type: "宣传片",
    year: "2024",
    role: "摄影 / 粗剪",
    description:
      "无人机与摄影机多角度取景，呈现湘乡红色地标；协助粗剪的东山书院专题获平台当月最高点赞。",
    coverImg: "assets/images/works/xiangxiang.jpg",
    videoUrl: "https://weixin.qq.com/sph/AJALuGfkiE"
  },
  {
    title: "青春创·歌 新闻发布会",
    type: "活动纪实",
    year: "2026",
    role: "执行导演",
    description:
      "湖南国际频道《青春创·歌》首发新闻发布会，核心对接出席嘉宾，统筹协调活动流程与环节衔接。",
    coverImg: "assets/images/works/qingchun.jpg",
    videoUrl: ""
  },
  {
    title: "音浪超级联赛 宣发",
    type: "宣传片",
    year: "2026",
    role: "后期剪辑 / 现场执行",
    description:
      "深度参与《音浪超级联赛》宣发，独立负责后期宣发视频剪辑，利用 AI 工具优化脚本与 BGM 匹配。并担任长沙赛区现场执行，协助十强选手拍摄个人宣传片。",
    coverImg: "assets/images/works/zhijian-weidi.jpg",
    videoUrl: ""
  },
  {
    title: "光芒至极",
    type: "纪录片",
    year: "2026",
    role: "宣发",
    description:
      "湖南国际频道纪录片项目，参与宣发及极地公益广告发布会执行。",
    coverImg: "assets/images/works/work-extra.jpg",
    videoUrl: ""
  },
  {
    title: "不止绽放的旅程",
    type: "节目成片",
    year: "2026",
    role: "成片后期 / 字幕校对",
    description:
      "参与节目成片后期制作，负责全片字幕校对与文案品控。逐帧核对字幕准确性、统一文案表达规范，把控最终播出质量，确保成片内容的文字严谨与播出安全。",
    coverImg: "assets/images/works/buzhi-zhanfang.jpg",
    videoUrl: ""
  },
  {
    title: "艺术正青春 才艺竞演大赛",
    type: "活动纪实",
    year: "2024",
    role: "执行导演（学生组）",
    description:
      "湖南国际频道联合项目，独立协调选手 LED 视觉内容，决赛直播中协同导播完成舞美视觉切换。",
    coverImg: "assets/images/works/yishu-zhengqingchun.jpg",
    videoUrl: ""
  }
];
