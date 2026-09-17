(function () {
  "use strict";

  // Belt-and-suspenders alongside the scrollRestoration override in
  // <head>: force the very top on every load/reload regardless of
  // whatever scroll position the browser tried to bring back.
  window.scrollTo(0, 0);

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
  var FRAGMENT_COUNT = 172;
  var field = document.getElementById("fragment-field");
  var fragmentZone = document.querySelector(".fragment-zone");

  // Every fragment makes one continuous run the full length of the zone
  // (hero through Live) - always starting fresh above the hero and
  // fading in as it enters, never skipping ahead into a random midpoint
  // (which is what caused fragments to visibly pop into existence
  // partway down the page). --fall-scale stretches the original
  // one-screen fall shape to cover that whole distance; the duration
  // below is tuned independently of the scale (not simply multiplied by
  // it) so the pace stays brisk rather than turning into a multi-minute
  // crawl, keeping the lower sections populated soon after load.
  var fallScale = 1;
  // Fraction-of-duration -> unscaled vh position, matching the
  // fragment-fall keyframes (0%,30%,60%,100% -> -20,15,55,120 vh).
  function unscaledVhAt(fraction) {
    if (fraction <= 0.3) return -20 + 35 * (fraction / 0.3);
    if (fraction <= 0.6) return 15 + 40 * ((fraction - 0.3) / 0.3);
    return 55 + 65 * ((fraction - 0.6) / 0.4);
  }
  // Inverse of the above: the fraction at which the curve first reaches
  // a given unscaled vh position.
  function fractionAtUnscaledVh(vh) {
    if (vh <= 15) return (0.3 * (vh + 20)) / 35;
    if (vh <= 55) return 0.3 + (0.3 * (vh - 15)) / 40;
    return 0.6 + (0.4 * (vh - 55)) / 65;
  }
  // The span of the cycle (as a 0-1 fraction) during which a fragment's
  // scaled position sits inside the hero's own viewport height - the
  // one stretch of the whole fall that's visible the instant the page
  // loads, before any scrolling. Used below to keep every fragment that
  // would otherwise start already inside that window looking freshly
  // spawned (fading in above the hero) rather than popping in mid-fall.
  var heroFracStart = 0;
  var heroFracEnd = 0;
  function updateFallScale() {
    fallScale = Math.max(fragmentZone.offsetHeight / window.innerHeight, 1);
    field.style.setProperty("--fall-scale", fallScale);
    heroFracStart = fractionAtUnscaledVh(0);
    heroFracEnd = fractionAtUnscaledVh(100 / fallScale);
  }
  updateFallScale();
  window.addEventListener("resize", updateFallScale);
  window.addEventListener("load", updateFallScale);

  function randomFragmentSrc() {
    var num = Math.floor(Math.random() * FRAGMENT_IMAGE_COUNT) + 1;
    var padded = String(num).padStart(3, "0");
    return "images/fragments/" + padded + ".png";
  }

  // Each fragment keeps a fixed horizontal "lane" for its whole lifetime
  // (across respawns) and only jitters within that lane, so the
  // fragments stay spread evenly across the full width instead of
  // clustering wherever independent random draws happen to land.
  var LANE_WIDTH = 100 / FRAGMENT_COUNT;

  // A handful start with delay 0 for instant motion, and some trickle in
  // over a ramp as long as the fall itself - both only matter for
  // whichever fragments land inside the hero's own visible window (see
  // heroFracStart/heroFracEnd), so that stretch always shows a proper
  // fade-in instead of a mid-fall pop. A short ramp used to bunch
  // everyone into one wave: they all passed the hero/News area together
  // and then, since a respawn can't happen until that fragment's own
  // (long) fall finishes, left a real gap behind them with nothing new
  // entering at the top until the first wave started cycling back - a
  // visible "empty stretch" sweeping down the page. A ramp on the same
  // order as the fall duration keeps a steady trickle entering from
  // above the hero the whole time, so the first respawns take over
  // right as the ramp tapers off instead of after a gap.
  var IMMEDIATE_LANE_COUNT = 10;
  var INITIAL_RAMP_SECONDS = 45;
  // Respawns get a wide, uniform-random gap, and duration itself is also
  // widely spread. Both matter for the same reason: if every fragment's
  // full cycle (duration + gap) landed in a similar range, the whole
  // fleet would drift back into sync and thin out / clump together at
  // the same time instead of falling at a steady, even rate forever.
  var RESPAWN_GAP_MAX_SECONDS = 6;

  function randomize(el, initial, laneIndex, immediate) {
    el.src = randomFragmentSrc();
    var laneStart = laneIndex * LANE_WIDTH;
    var jitter = Math.random() * (LANE_WIDTH * 0.8) + LANE_WIDTH * 0.1;
    el.style.left = (laneStart + jitter) + "%";
    el.style.height = (Math.random() * 34 + 26) + "px";
    el.style.setProperty("--drift", (Math.random() * 60 + 20) + "px");
    el.style.setProperty("--rot-from", (Math.random() * 40 - 20) + "deg");
    el.style.setProperty("--rot-to", (Math.random() * 280 + 40) + "deg");
    var duration = Math.random() * 40 + 50;
    var delay;
    if (!initial) {
      delay = Math.random() * RESPAWN_GAP_MAX_SECONDS;
    } else {
      // Anchoring to the real clock (rather than a fresh Math.random()
      // draw) makes the fall read as something already continuously in
      // progress that the page happens to join, instead of visibly
      // starting from scratch the moment the site is opened - but only
      // where that's invisible anyway: if the resulting phase would
      // currently sit inside the hero's own viewport (the one stretch
      // visible from the very first frame), fall back to the ordinary
      // fresh-start ramp so the hero still always shows a proper
      // fade-in instead of a fragment popping in mid-fall.
      var phaseOffset = Math.random() * duration;
      var cyclePos = ((Date.now() / 1000) + phaseOffset) % duration;
      var fraction = cyclePos / duration;
      var inHeroWindow = fraction >= heroFracStart && fraction <= heroFracEnd;
      if (immediate) {
        delay = 0;
      } else if (inHeroWindow) {
        delay = Math.random() * INITIAL_RAMP_SECONDS;
      } else {
        delay = -cyclePos;
      }
    }
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delay + "s";
  }

  function respawn(el, laneIndex) {
    el.classList.remove("melting", "fall");
    el.style.removeProperty("translate");
    el.style.removeProperty("rotate");
    randomize(el, false, laneIndex);
    // Force reflow so the animation restarts cleanly.
    void el.offsetWidth;
    el.classList.add("fall");
  }

  function meltFragment(el) {
    // Freeze the current fall position/rotation as inline styles so
    // melting only shrinks/fades the fragment in place, instead of
    // jumping back to its untransformed (top-of-field) position.
    var computed = getComputedStyle(el);
    el.style.translate = computed.translate;
    el.style.rotate = computed.rotate;
    el.classList.remove("fall");
    el.classList.add("melting");
  }

  function createFragment(laneIndex, immediate) {
    var el = document.createElement("img");
    el.className = "fragment";
    el.alt = "";
    el.draggable = false;
    randomize(el, true, laneIndex, immediate);

    el.addEventListener("animationend", function () {
      respawn(el, laneIndex);
    });

    field.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("fall");
    });
  }

  // Shuffle lane indices so the initial fall order doesn't visibly sweep
  // left-to-right on page load.
  var lanes = [];
  for (var i = 0; i < FRAGMENT_COUNT; i++) lanes.push(i);
  for (var j = lanes.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var tmp = lanes[j];
    lanes[j] = lanes[k];
    lanes[k] = tmp;
  }
  lanes.forEach(function (laneIndex, i) {
    createFragment(laneIndex, i < IMMEDIATE_LANE_COUNT);
  });

  // A plain "mouseenter" listener only fires on actual pointer movement, so
  // a falling fragment that drifts under an already-stationary cursor would
  // never trigger it. Instead, track the last known pointer position and
  // hit-test it every frame, so melting also catches a fragment moving
  // into a cursor that isn't moving itself.
  var pointerX = -1;
  var pointerY = -1;
  window.addEventListener("mousemove", function (e) {
    pointerX = e.clientX;
    pointerY = e.clientY;
  });

  // Sample a small ring of points around the cursor, not just the exact
  // pixel, so melting a small, constantly-moving fragment doesn't require
  // pixel-perfect precision from a real mouse.
  var HOVER_SAMPLE_OFFSETS = [
    [0, 0], [10, 0], [-10, 0], [0, 10], [0, -10],
    [7, 7], [-7, 7], [7, -7], [-7, -7],
  ];

  function findFragmentNearPointer() {
    for (var i = 0; i < HOVER_SAMPLE_OFFSETS.length; i++) {
      var hit = document.elementFromPoint(
        pointerX + HOVER_SAMPLE_OFFSETS[i][0],
        pointerY + HOVER_SAMPLE_OFFSETS[i][1]
      );
      if (hit && hit.classList && hit.classList.contains("fragment") && !hit.classList.contains("melting")) {
        return hit;
      }
    }
    return null;
  }

  function pollFragmentHover() {
    if (pointerX >= 0) {
      var hit = findFragmentNearPointer();
      if (hit) meltFragment(hit);
    }
    requestAnimationFrame(pollFragmentHover);
  }
  requestAnimationFrame(pollFragmentHover);

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

  /* ---------- About photo carousel ---------- */

  var aboutCarousel = document.getElementById("about-carousel");
  document.getElementById("about-carousel-prev").addEventListener("click", function () {
    aboutCarousel.scrollBy({ left: -aboutCarousel.clientWidth * 0.9, behavior: "smooth" });
  });
  document.getElementById("about-carousel-next").addEventListener("click", function () {
    aboutCarousel.scrollBy({ left: aboutCarousel.clientWidth * 0.9, behavior: "smooth" });
  });
})();
