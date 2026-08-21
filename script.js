// Envelope Opening Animation Sequence
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("scrapbook-locked");
  
  const openEnvBtn = document.getElementById("open-envelope-btn");
  const envWrapper = document.getElementById("envelope-wrapper");
  const enterBtn = document.getElementById("enter-scrapbook-btn");

  if (openEnvBtn && envWrapper) {
    openEnvBtn.addEventListener("click", () => {
      // Step 1: Untie twine
      envWrapper.classList.add("untying");

      // Step 2: Open flaps after 800ms
      setTimeout(() => {
        envWrapper.classList.add("opening");
      }, 800);

      // Step 3: Slide letter up & unlock scrolling after 1600ms
      setTimeout(() => {
        envWrapper.classList.add("revealed");
        document.body.classList.remove("scrapbook-locked");
        document.body.classList.add("scrapbook-unlocked");
      }, 1600);
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#intro")?.scrollIntoView({ behavior: "smooth" });
    });
  }
});

const content = window.scrapbookContent || {};

// Dynamic text nodes
document.querySelectorAll("[data-content]").forEach((node) => {
  const key = node.dataset.content;
  if (content[key]) node.textContent = content[key];
});

// Dynamic images
document.querySelectorAll("[data-image]").forEach((image) => {
  const key = image.dataset.image;
  if (content[key]) image.src = content[key];
  image.alt = image.closest("figure")?.querySelector("figcaption")?.textContent || "";
});

// Timeline rendering
const timeline = document.querySelector("[data-timeline]");
if (timeline) {
  timeline.innerHTML = (content.timeline || [])
    .map(
      (item) => `
        <article class="timeline-item">
          <div class="timeline-pin"></div>
          <figure class="mini-photo">
            <img src="${item.image}" alt="" />
          </figure>
          <div>
            <p class="timeline-date">${item.date}</p>
            <p class="timeline-label">${item.label}</p>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

// Appreciation cards
const appreciationCards = document.querySelector("[data-appreciation-cards]");
if (appreciationCards) {
  appreciationCards.innerHTML = (content.appreciationCards || [])
    .map(
      (card, index) => `
        <button class="flip-card" type="button" aria-pressed="false">
          <span class="flip-card-inner">
            <span class="flip-face flip-front">
              <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
              <strong>${card.front}</strong>
              <small>Click to open</small>
            </span>
            <span class="flip-face flip-back">
              <span>${card.back}</span>
            </span>
          </span>
        </button>
      `
    )
    .join("");

  appreciationCards.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      card.setAttribute("aria-pressed", String(isOpen));
    });
  });
}

// Funny sticky notes
const funnyNotes = document.querySelector("[data-funny-notes]");
if (funnyNotes) {
  funnyNotes.innerHTML = (content.funnyNotes || [])
    .map((note, index) => `<p class="sticky-note note-${(index % 5) + 1}">${note}</p>`)
    .join("");
}

// Future predictions
const futureItems = document.querySelector("[data-future-items]");
if (futureItems) {
  futureItems.innerHTML = (content.futureItems || [])
    .map(
      (item) => `
        <article class="future-item">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}


// Floating Retro CD Player Button Controller
const cdPlayerWidget = document.getElementById("cd-player-widget");
const cdButton = document.getElementById("cd-button");
const bgMusic = document.getElementById("bg-music");
const cdSpindleIcon = document.getElementById("cd-spindle-icon");

let noteInterval = null;
function startFloatingNotes() {
  if (noteInterval) return;
  const notes = ["♩", "♪", "♫", "♬"];
  noteInterval = setInterval(() => {
    if (!cdPlayerWidget || !bgMusic || bgMusic.paused) {
      stopFloatingNotes();
      return;
    }
    const note = document.createElement("div");
    note.className = "note";
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    
    // Random offset X between -30 and 30
    const x = Math.floor(Math.random() * 60) - 30;
    // Random rotation angle between -45 and 45
    const r = Math.floor(Math.random() * 90) - 45;
    
    note.style.setProperty("--x", x);
    note.style.setProperty("--r", r);
    note.style.left = "calc(50% - 10px)";
    note.style.bottom = "80px";
    
    cdPlayerWidget.appendChild(note);
    setTimeout(() => note.remove(), 2000);
  }, 600);
}

function stopFloatingNotes() {
  if (noteInterval) {
    clearInterval(noteInterval);
    noteInterval = null;
  }
}

if (cdButton && bgMusic) {
  const cdInfoLabel = document.getElementById("cd-info-label");
  const showMissingAudioState = () => {
    cdButton.classList.remove("playing");
    cdButton.classList.add("audio-missing");
    if (cdSpindleIcon) cdSpindleIcon.textContent = "!";
    if (cdInfoLabel) cdInfoLabel.textContent = "Add assets/audio/frangipani.mp3";
    stopFloatingNotes();
  };

  cdButton.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic
        .play()
        .then(() => {
          cdButton.classList.remove("audio-missing");
          cdButton.classList.add("playing");
          if (cdSpindleIcon) cdSpindleIcon.textContent = "❚❚";
          if (cdInfoLabel) cdInfoLabel.textContent = "Frangipani - Kaber Vasuki";
          startFloatingNotes();
        })
        .catch(() => {
          showMissingAudioState();
        });
    } else {
      bgMusic.pause();
      cdButton.classList.remove("playing");
      if (cdSpindleIcon) cdSpindleIcon.textContent = "▶";
      if (cdInfoLabel) cdInfoLabel.textContent = "Frangipani - Kaber Vasuki";
      stopFloatingNotes();
    }
  });

  bgMusic.addEventListener("error", showMissingAudioState, true);
}


// Polaroid Click-to-Zoom Handler
const zoomModal = document.getElementById("zoom-modal");
const zoomImg = zoomModal?.querySelector(".zoom-img");
const zoomCaption = zoomModal?.querySelector(".zoom-caption");
const zoomClose = zoomModal?.querySelector(".zoom-close");

function openZoom(src, captionText) {
  if (!zoomModal || !zoomImg || !zoomCaption) return;
  zoomImg.src = src;
  zoomCaption.textContent = captionText || "";
  zoomModal.classList.add("active");
}

if (zoomModal) {
  zoomClose?.addEventListener("click", () => zoomModal.classList.remove("active"));
  zoomModal.addEventListener("click", (event) => {
    if (event.target === zoomModal || event.target === zoomClose) {
      zoomModal.classList.remove("active");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") zoomModal.classList.remove("active");
  });
}

// Register zoom events on all polaroids
function registerPolaroidZoom() {
  document.querySelectorAll(".photo-card img, .polaroid-large img, .mini-photo img, .final-photo-frame img").forEach((img) => {
    img.addEventListener("click", () => {
      const figure = img.closest("figure") || img.closest(".final-photo-frame");
      const caption = figure?.querySelector("figcaption")?.textContent || 
                      img.closest(".timeline-item")?.querySelector("h3")?.textContent || 
                      "Memory Photo";
      openZoom(img.src, caption);
    });
  });
}
registerPolaroidZoom();


// Page visibility observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".page").forEach((page) => observer.observe(page));

// Edit guide dialog
const dialog = document.querySelector("[data-edit-dialog]");
document.querySelector("[data-open-editor-help]")?.addEventListener("click", () => {
  if (dialog?.showModal) dialog.showModal();
});
document.querySelector("[data-close-dialog]")?.addEventListener("click", () => {
  dialog?.close();
});

// Final Confetti click handler
document.querySelector("[data-confetti]")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  launchConfetti();
  window.setTimeout(() => {
    button.disabled = false;
  }, 1200);
});

function launchConfetti() {
  const colors = ["#e94f64", "#f4b942", "#3a7ca5", "#5fb49c", "#7d5fff"];
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    piece.style.transform = `rotate(${Math.random() * 160}deg)`;
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 1900);
  }
}
