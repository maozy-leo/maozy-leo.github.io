const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const root = document.documentElement;
const themeToggle = $(".theme-toggle");
const langToggle = $(".lang-toggle");
const menuToggle = $(".menu-toggle");
const navLinks = $(".nav-links");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});

$$('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const gardenData = {
  core: {
    kicker: ["核心中介", "THE CONNECTOR"], title: ["统计学", "Statistics"],
    copy: ["统计是连接数学、AI 与社会科学的核心中介：它把抽象模型转化为对不确定性的表达，也让“因果”“偏差”和“证据”成为可以被审视的问题。", "Statistics connects mathematics, AI, and social science. It turns abstract models into a language for uncertainty—and makes causality, bias, and evidence open to scrutiny."],
    courses: ["数理统计", "现代统计模型", "统计思维", "计量经济学因果识别方法详解"], related: "Social Barometer · Quantitative Finance · LLM Bias"
  },
  math: {
    kicker: ["01 / 抽象结构", "01 / ABSTRACT STRUCTURE"], title: ["数学", "Mathematics"],
    copy: ["极限、线性结构、空间、测度与函数理论构成了理解概率、优化和机器学习的底层语言。", "Limits, linear structures, spaces, measure, and function theory form the underlying language of probability, optimization, and machine learning."],
    courses: ["数学分析 I–III", "高等代数 I–II", "实变函数", "测度论", "复变函数", "几何学"], related: "Probability · Optimization · Machine Learning"
  },
  prob: {
    kicker: ["02 / 不确定性", "02 / UNCERTAINTY"], title: ["概率与统计", "Probability & Statistics"],
    copy: ["从随机变量、估计与检验，到随机过程和现代统计建模，这条路径连接理论结构与经验数据。", "From random variables, estimation, and testing to stochastic processes and modern modeling, this path links theoretical structures with empirical data."],
    courses: ["概率论（实验班）", "数理统计", "应用随机过程", "现代统计模型", "统计思维"], related: "Grokking · Causal Inference · Social Barometer"
  },
  econ: {
    kicker: ["03 / 识别与制度", "03 / IDENTIFICATION & INSTITUTIONS"], title: ["经济与金融", "Economics & Finance"],
    copy: ["经济学让我从“模型是否优雅”转向“问题如何被识别”。计量、因果推断和金融时间序列提供了经验工具。", "Economics shifts my attention from whether a model is elegant to how a question is identified. Econometrics, causal inference, and financial time series provide empirical tools."],
    courses: ["中级微观经济学", "中级宏观经济学", "计量经济学（荣誉课）", "金融计量（荣誉课）", "金融时间序列", "证券投资学"], related: "Quantitative Finance · LLMs in Economics"
  },
  ai: {
    kicker: ["04 / 计算与学习", "04 / COMPUTATION & LEARNING"], title: ["计算机与 AI", "Computer Science & AI"],
    copy: ["从编程基础和算法结构出发，延伸到机器学习、深度学习、文本分析和 AI 系统应用。", "Beginning with programming and algorithms, this path extends into machine learning, deep learning, text analysis, and applied AI systems."],
    courses: ["计算概论 B", "数据结构与算法 B", "机器学习数学导引", "深度学习与文本分析", "人工智能基础"], related: "Grokking · Social Barometer · LLM Post-training"
  },
  social: {
    kicker: ["05 / 人与制度", "05 / PEOPLE & INSTITUTIONS"], title: ["社会科学与 PPE", "Social Science & PPE"],
    copy: ["制度、权力、行动、意义与共同体构成了理解社会问题的概念坐标，也提醒我模型之外始终存在人的经验。", "Institutions, power, action, meaning, and community form the conceptual coordinates for social questions—and keep human experience visible beyond models."],
    courses: ["政治学原理", "社会科学方法导论", "国外社会学学说", "社会科学经典研读", "逻辑导论"], related: "Authoritarian Regime Resilience · PPE"
  }
};

const semesterData = [
  ["2023–2024 秋", ["数学分析 I", "高等代数 I", "几何学", "计算概论 B", "逻辑导论"]],
  ["2023–2024 春", ["数学分析 II", "高等代数 II", "普通物理 I", "社会科学中的计算思维", "现代天文学"]],
  ["2024–2025 秋", ["数学分析 III", "实变函数", "数理统计", "中级微观经济学", "经济学原理"]],
  ["2024–2025 春", ["概率论（实验班）", "测度论", "应用随机过程", "计量经济学（荣誉课）", "证券投资学", "中级宏观经济学"]],
  ["2025–2026 秋", ["机器学习数学导引", "金融时间序列分析", "复变函数", "政治学原理", "社会科学方法导论"]],
  ["2025–2026 春", ["金融计量（荣誉课）", "现代统计模型", "深度学习与文本分析", "人工智能基础"]]
];

const books = [
  ...["中县干部", "金榜题名之后：大学生出路分化之谜", "新教伦理与资本主义精神", "理性的反讽：韦伯《新教伦理与资本主义精神》导读", "金翼：一个中国家族的史记", "现实社会的建构：知识社会学论纲"].map(title => ({title, category:"社会学"})),
  ...["治理中国：从革命到改革", "美国反对美国", "想象的共同体：民族主义的起源与散布"].map(title => ({title, category:"政治学"})),
  ...["毛泽东私人医生回忆录", "邓小平时代", "叫魂：1768 年中国妖术大恐慌", "赵紫阳回忆录——改革历程", "红太阳是怎么升起的：延安整风运动的来龙去脉", "红楼", "无奈的结局：司徒雷登与中国", "他改变了中国"].map(title => ({title, category:"泛文史"})),
  ...["谈谈方法", "苏格拉底的申辩", "会饮篇", "如何阅读柏拉图", "牛津通识读本：科学哲学"].map(title => ({title, category:"哲学"})),
  ...["小王子", "撒哈拉的故事", "我在西联大的日子", "献给阿尔吉侬的花束", "追风筝的人", "卡拉马佐夫兄弟", "等待戈多", "浮士德"].map(title => ({title, category:"文学"})),
  ...["置身事内：中国政府与经济发展", "央地之间：转移支付的政治及其他"].map(title => ({title, category:"经济学"})),
  ...["政治的人生", "波伏娃访谈录", "一个孤独漫步者的遐想", "这个世界会好吗", "大学者", "生命是什么", "我的几何人生", "椰壳碗外的人生", "乡下人的悲歌", "人性的深渊：吴谢宇案", "牛棚杂忆", "一百个人的十年"].map(title => ({title, category:"其他"}))
];

const categoryEnglish = {"全部":"All", "社会学":"Sociology", "政治学":"Politics", "泛文史":"History", "哲学":"Philosophy", "文学":"Literature", "经济学":"Economics", "其他":"Other"};
let currentLanguage = localStorage.getItem("language") || "cn";
let currentDomain = "core";
let currentCategory = "全部";
let booksExpanded = false;

function setLanguage(language) {
  currentLanguage = language;
  root.lang = language === "cn" ? "zh-CN" : "en";
  $$('[data-cn][data-en]').forEach(element => {
    element.textContent = element.dataset[language];
  });
  langToggle.textContent = language === "cn" ? "EN" : "中";
  langToggle.setAttribute("aria-label", language === "cn" ? "Switch to English" : "切换至中文");
  localStorage.setItem("language", language);
  renderGardenDetail(currentDomain);
  renderBookFilters();
  renderBooks();
}

langToggle.addEventListener("click", () => setLanguage(currentLanguage === "cn" ? "en" : "cn"));

function renderGardenDetail(domain) {
  const item = gardenData[domain];
  const index = currentLanguage === "cn" ? 0 : 1;
  $("#garden-detail-kicker").textContent = item.kicker[index];
  $("#garden-detail-title").textContent = item.title[index];
  $("#garden-detail-copy").textContent = item.copy[index];
  $("#garden-detail-courses").innerHTML = item.courses.map(course => `<span>${course}</span>`).join("");
  $("#garden-detail-related").innerHTML = `<strong>Related:</strong> ${item.related}`;
}

$$('.domain-node').forEach(button => {
  button.addEventListener('click', () => {
    currentDomain = button.dataset.domain;
    $$('.domain-node').forEach(node => node.classList.toggle('active', node === button));
    renderGardenDetail(currentDomain);
  });
});

const semesterTimeline = $('.semester-timeline');
semesterTimeline.innerHTML = semesterData.map(([semester, courses]) => `
  <article class="semester">
    <time>${semester}</time>
    <div class="semester-courses">${courses.map((course, index) => `<span style="animation-delay:${index * 35}ms">${course}</span>`).join('')}</div>
  </article>
`).join('');

$$('.garden-mode').forEach(button => button.addEventListener('click', () => {
  const mode = button.dataset.mode;
  $$('.garden-mode').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  $$('[data-view]').forEach(view => { view.hidden = view.dataset.view !== mode; });
}));

function renderBookFilters() {
  const categories = ["全部", "社会学", "政治学", "泛文史", "哲学", "文学", "经济学", "其他"];
  $('.book-filters').innerHTML = categories.map(category => `<button class="book-filter ${category === currentCategory ? 'active' : ''}" type="button" data-category="${category}">${currentLanguage === 'cn' ? category : categoryEnglish[category]}</button>`).join('');
  $$('.book-filter').forEach(button => button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    booksExpanded = currentCategory !== '全部';
    renderBookFilters();
    renderBooks();
  }));
}

function renderBooks() {
  const filtered = currentCategory === '全部' ? books : books.filter(book => book.category === currentCategory);
  const visible = !booksExpanded && currentCategory === '全部' ? filtered.slice(0, 12) : filtered;
  $('#book-grid').innerHTML = visible.map((book, index) => `
    <article class="book-card">
      <span>${String(index + 1).padStart(2, '0')} · ${currentLanguage === 'cn' ? book.category : categoryEnglish[book.category]}</span>
      <h4>${book.title}</h4>
    </article>
  `).join('');
  const moreButton = $('.book-more');
  moreButton.classList.toggle('hidden', currentCategory !== '全部' || booksExpanded);
}

$('.book-more').addEventListener('click', () => {
  booksExpanded = true;
  renderBooks();
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px' });
$$('.reveal').forEach(element => revealObserver.observe(element));

const sections = $$('main section[id]');
const navAnchors = $$('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navAnchors.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-30% 0px -55%', threshold: [0, .2, .6] });
sections.forEach(section => sectionObserver.observe(section));

window.addEventListener('scroll', () => {
  $('.site-header').classList.toggle('scrolled', window.scrollY > 18);
}, { passive: true });

setLanguage(currentLanguage);
$('#copyright-year').textContent = new Date().getFullYear();
