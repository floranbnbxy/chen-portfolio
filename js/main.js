/* ============================================================
   main.js  ——  全局交互与动效逻辑
   动效原则：高级、顺滑、克制；禁止弹跳/闪烁/旋转/光晕/粒子
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 工具：图片占位处理（缺失不报错） ---------- */
  function makeImage(src, alt) {
    var img = document.createElement("img");
    img.alt = alt || "";
    img.loading = "lazy";
    img.onerror = function () {
      // 图片缺失：替换为占位块，标注文件名
      var ph = document.createElement("div");
      ph.className = "img-placeholder";
      var name = document.createElement("span");
      name.className = "ph-name";
      name.textContent = src ? src.split("/").pop() : "image";
      var note = document.createElement("span");
      note.textContent = "Upload Image";
      ph.appendChild(name);
      ph.appendChild(note);
      if (img.parentNode) img.parentNode.replaceChild(ph, img);
    };
    if (src) img.src = src;
    return img;
  }

  /* ============================================================
     0. 公共组件：导航栏 / 页脚  ——  全站只维护这一份
     页面里只需放占位标签：
       <header class="nav" data-nav></header>
       <footer class="footer" data-footer></footer>
     ============================================================ */
  function navHTML() {
    return (
      '<div class="container">' +
        '<a href="index.html" class="nav-brand">CHEN<span class="dot-sep">·</span>YINGSI</a>' +
        '<nav class="nav-links">' +
          '<a class="nav-link" href="index.html">Index</a>' +
          '<a class="nav-link" href="works.html">Works</a>' +
          '<a class="nav-link" href="about.html">About</a>' +
          '<a class="nav-link" href="resume.html">Resume</a>' +
          '<a class="nav-link" href="contact.html">Contact</a>' +
          '<span class="status"><span class="status-dot"></span>Available for projects</span>' +
        '</nav>' +
        '<button class="nav-toggle" aria-label="menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>'
    );
  }

  function footerHTML() {
    return (
      '<div class="container">' +
        '<span class="footer-brand">CHEN · YINGSI</span>' +
        '<span class="footer-meta">© 2026 Chen Yingsi. All rights reserved.</span>' +
        '<div class="footer-social">' +
          '<a href="mailto:3435657748@qq.com">Email</a>' +
          '<a href="tel:19310224128">Phone</a>' +
        '</div>' +
      '</div>'
    );
  }

  /* ---------- 0b. 字体注入（统一处理衬线 / 无衬线混排，不用每个 HTML 重复写） ---------- */
  function injectFonts() {
    if (document.getElementById("__pf")) return; // 只注入一次
    var families = [
      "Inter:wght@300;400;600;700;900",
      "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400",
      "Noto+Sans+SC:wght@300;400;500;700;900",
      "Noto+Serif+SC:wght@300;400;500;600;700;900"
    ];
    var pre = document.createElement("link");
    pre.rel = "preconnect"; pre.href = "https://fonts.googleapis.com";
    document.head.appendChild(pre);
    var pre2 = document.createElement("link");
    pre2.rel = "preconnect"; pre2.href = "https://fonts.gstatic.com"; pre2.crossOrigin = "anonymous";
    document.head.appendChild(pre2);
    var link = document.createElement("link");
    link.id = "__pf";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=" + families.join("&family=") + "&display=swap";
    document.head.appendChild(link);
  }

  function renderChrome() {
    var navHost = document.querySelector("[data-nav]");
    if (navHost) navHost.innerHTML = navHTML();
    var footerHost = document.querySelector("[data-footer]");
    if (footerHost) footerHost.innerHTML = footerHTML();
  }

  /* ---------- 1. 导航：滚动虚化 + 移动端开关 ---------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");

    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 24) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        toggle.classList.toggle("open");
        links.classList.toggle("open");
      });
      // 点击链接后关闭移动菜单
      links.querySelectorAll(".nav-link").forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.classList.remove("open");
          links.classList.remove("open");
        });
      });
    }

    // 标记当前页高亮
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path) a.classList.add("active");
    });
  }

  /* ---------- 2. 滚动入场动效 ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- 3. Hero 鼠标视差（轻微） ---------- */
  function initParallax() {
    var hero = document.querySelector(".hero");
    var visual = document.querySelector(".hero-visual");
    var avatar = document.querySelector(".avatar");
    if (!hero || !visual) return;
    if (window.matchMedia("(hover: none)").matches) return; // 触屏关闭

    var raf = null;
    hero.addEventListener("mousemove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var r = hero.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width - 0.5;
        var cy = (e.clientY - r.top) / r.height - 0.5;
        // 系数极小，几乎看不出晃动，氛围感即可
        visual.style.transform =
          "translate(" + cx * -2 + "px," + cy * -2 + "px)";
        if (avatar)
          avatar.style.transform =
            "translate(" + cx * 3 + "px," + cy * 3 + "px)";
      });
    });
    hero.addEventListener("mouseleave", function () {
      visual.style.transform = "";
      if (avatar) avatar.style.transform = "";
    });
  }

  /* ---------- 4. 作品渲染 ---------- */
  function renderWorks(target, list) {
    if (!target) return;
    target.innerHTML = "";
    list.forEach(function (w, i) {
      var card = document.createElement("article");
      card.className = "work-card reveal";
      card.style.setProperty("--d", (i % 3) * 90 + "ms");
      card.dataset.index = i;

      var frame = document.createElement("div");
      frame.className = "frame";
      var slot = document.createElement("div");
      slot.className = "img-slot";
      slot.appendChild(makeImage(w.coverImg, w.title));
      frame.appendChild(slot);

      var meta = document.createElement("div");
      meta.className = "work-meta";
      var type = document.createElement("span");
      type.className = "work-type";
      type.textContent = w.type;
      var year = document.createElement("span");
      year.className = "work-year";
      year.textContent = w.year;
      meta.appendChild(type);
      meta.appendChild(year);

      var title = document.createElement("h3");
      title.className = "work-title";
      title.textContent = w.title;

      var role = document.createElement("p");
      role.className = "work-role";
      role.textContent = w.role;

      card.appendChild(frame);
      card.appendChild(meta);
      card.appendChild(title);
      card.appendChild(role);
      target.appendChild(card);
    });
  }

  /* ---------- 5. 作品弹窗 ---------- */
  function initModal() {
    var grid = document.querySelector("[data-works-grid]");
    if (!grid || !window.WORKS) return;

    var modal = document.querySelector(".modal");
    var overlay = modal ? modal.querySelector(".modal-overlay") : null;
    var closeBtn = modal ? modal.querySelector(".modal-close") : null;

    function openModal(idx) {
      var w = window.WORKS[idx];
      if (!w || !modal) return;

      modal.querySelector("[data-m-type]").textContent = w.type;
      modal.querySelector("[data-m-title]").textContent = w.title;
      modal.querySelector("[data-m-year]").textContent = w.year;
      modal.querySelector("[data-m-role]").textContent = w.role;
      modal.querySelector("[data-m-desc]").textContent = w.description;

      // 图片
      var imgWrap = modal.querySelector("[data-m-img]");
      imgWrap.innerHTML = "";
      var frame = document.createElement("div");
      frame.className = "frame";
      var slot = document.createElement("div");
      slot.className = "img-slot";
      slot.appendChild(makeImage(w.coverImg, w.title));
      frame.appendChild(slot);
      imgWrap.appendChild(frame);

      // 视频按钮：videoUrl 为空则隐藏
      var vBtn = modal.querySelector("[data-m-video]");
      if (w.videoUrl) {
        vBtn.style.display = "";
        vBtn.setAttribute("href", w.videoUrl);
        vBtn.setAttribute("target", "_blank");
        vBtn.setAttribute("rel", "noopener noreferrer");
      } else {
        vBtn.style.display = "none";
      }

      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }

    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".work-card");
      if (!card) return;
      openModal(parseInt(card.dataset.index, 10));
    });

    if (overlay) overlay.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------- 6. 筛选（预留，注释开关） ---------- */
  /* 如需启用作品筛选：在 works.html 添加 .filter-bar，调用 initFilter()
  function initFilter() {
    var bar = document.querySelector(".filter-bar");
    var grid = document.querySelector("[data-works-grid]");
    if (!bar || !grid || !window.WORKS) return;
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.dataset.filter;
      var list = f === "all" ? window.WORKS : window.WORKS.filter(function (w) { return w.type === f; });
      renderWorks(grid, list);
      grid.querySelectorAll(".work-card").forEach(function (c) { c.classList.add("in"); });
    });
  }
  */

  /* ---------- 7. 联系表单（前端展示，无后端） ---------- */
  function initForm() {
    var form = document.querySelector("[data-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-note]");
      if (note) {
        note.textContent = "感谢留言，我会尽快与你联系。";
        note.style.color = "#86e860";
      }
      form.reset();
    });
  }

  /* ---------- 8. 载入英雄图 / 头像 / About 人像 / 微信二维码 ---------- */
  function initHeroImages() {
    // Hero 主图：portrait.jpg（人像照）
    var heroSlot = document.querySelector("[data-hero-img]");
    if (heroSlot) {
      heroSlot.innerHTML = "";
      heroSlot.appendChild(makeImage("assets/images/portrait.jpg", "Chen Yingsi"));
    }
    // 右下角圆形头像
    var avatarSlot = document.querySelector("[data-avatar]");
    if (avatarSlot) {
      avatarSlot.appendChild(makeImage("assets/images/portrait.jpg", "Chen Yingsi"));
    }
    // About 页左侧人像
    var aboutSlot = document.querySelector("[data-about-img]");
    if (aboutSlot) {
      aboutSlot.innerHTML = "";
      aboutSlot.appendChild(makeImage("assets/images/about-1.jpg", "Chen Yingsi"));
    }
    // Contact 页微信二维码
    var qrSlot = document.querySelector("[data-wechat-qr]");
    if (qrSlot) {
      qrSlot.innerHTML = "";
      qrSlot.appendChild(makeImage("assets/images/wechat-qr.png", "WeChat QR"));
    }
  }

  /* ---------- 启动 ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    injectFonts();   // 先注入字体（衬线 + 无衬线混排）
    renderChrome();  // 再注入导航 / 页脚（全站共用）
    initNav();
    initReveal();
    initParallax();
    initHeroImages();
    initForm();

    // 首页精选 3 个（home: false 的作品只进作品页）
    var featured = document.querySelector("[data-featured]");
    if (featured && window.WORKS) {
      renderWorks(
        featured,
        window.WORKS.filter(function (w) {
          return w.home !== false;
        }).slice(0, 3)
      );
    }
    // 作品页全部
    var allGrid = document.querySelector("[data-works-grid]");
    if (allGrid && window.WORKS) {
      renderWorks(allGrid, window.WORKS);
    }

    initModal();
    // 对动态渲染的卡片重新观察入场
    requestAnimationFrame(function () {
      initReveal();
    });
  });
})();
