(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */

  var header = document.getElementById("site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */

  var navToggle = document.getElementById("nav-toggle");
  var navMobile = document.getElementById("nav-mobile");
  navToggle.addEventListener("click", function () {
    var open = navMobile.classList.toggle("open");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navMobile.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMobile.classList.remove("open");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });

  /* ---------- Scroll fade-ins ---------- */

  var fadeEls = document.querySelectorAll(".fade-in");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "-40px" }
  );
  fadeEls.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- Falling fragments ---------- */

  var FRAGMENT_IMAGE_COUNT = 103;
  var FRAGMENT_COUNT = 24;
  var field = document.getElementById("fragment-field");

  function randomFragmentSrc() {
    var num = Math.floor(Math.random() * FRAGMENT_IMAGE_COUNT) + 1;
    var padded = String(num).padStart(3, "0");
    return "images/fragments/" + padded + ".png";
  }

  function randomize(el, initial) {
    el.src = randomFragmentSrc();
    el.style.left = (Math.random() * 92 + 2) + "%";
    el.style.height = (Math.random() * 34 + 26) + "px";
    el.style.setProperty("--drift", (Math.random() * 60 + 20) + "px");
    el.style.setProperty("--rot-from", (Math.random() * 40 - 20) + "deg");
    el.style.setProperty("--rot-to", (Math.random() * 280 + 40) + "deg");
    var duration = Math.random() * 10 + 16;
    var delay = initial ? Math.random() * 16 : Math.random() * 2.5;
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delay + "s";
  }

  function respawn(el) {
    el.classList.remove("popping", "fall");
    randomize(el, false);
    // Force reflow so the animation restarts cleanly.
    void el.offsetWidth;
    el.classList.add("fall");
  }

  function createFragment(initial) {
    var el = document.createElement("img");
    el.className = "fragment";
    el.alt = "";
    el.draggable = false;
    randomize(el, initial);

    el.addEventListener("mouseenter", function () {
      if (!el.classList.contains("popping")) {
        el.classList.remove("fall");
        el.classList.add("popping");
      }
    });

    el.addEventListener("animationend", function () {
      respawn(el);
    });

    field.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("fall");
    });
  }

  for (var i = 0; i < FRAGMENT_COUNT; i++) {
    createFragment(true);
  }

  /* ---------- Music carousel ---------- */

  var carousel = document.getElementById("music-carousel");

  carousel.querySelectorAll(".video-card").forEach(function (card) {
    var videoId = card.dataset.videoId;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "video-thumb";
    button.setAttribute("aria-label", "Play video");
    button.innerHTML =
      '<img src="https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg" alt="SensuCarens - Music Video">' +
      '<span class="play-btn"><span>&#9658;</span></span>';

    button.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
      iframe.title = "SensuCarens - Music Video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      card.innerHTML = "";
      card.appendChild(iframe);
    });

    card.appendChild(button);
  });

  document.getElementById("carousel-prev").addEventListener("click", function () {
    carousel.scrollBy({ left: -carousel.clientWidth * 0.9, behavior: "smooth" });
  });
  document.getElementById("carousel-next").addEventListener("click", function () {
    carousel.scrollBy({ left: carousel.clientWidth * 0.9, behavior: "smooth" });
  });
})();
