/**
 * Pandith Shivaji - Vedic Astrology & Spiritual Healing
 * Main Interactive Application Script
 */

document.addEventListener("DOMContentLoaded", () => {
  initAustraliaLiveClock();
  initScrollReveal();
  initCardGlowEffects();
  init3DTiltCards();
  initStatsCounter();
  initInteractiveKundli();
  initStarfield();
  initZodiacExplorer();
  initConsultationForm();
  initContactPageForm();
  initFaqAccordion();
  initMobileMenu();
  initHeaderScroll();
  initWhatsAppWidget();
  initCopyButtons();
});

/* -----------------------------------------------------------
   1. Dynamic Starfield Canvas Background
----------------------------------------------------------- */
function initStarfield() {
  const canvas = document.getElementById("starfield-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let stars = [];
  const count = Math.min(Math.floor((width * height) / 8000), 160);

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.speed = Math.random() * 0.02 + 0.005;
      this.dir = Math.random() > 0.5 ? 1 : -1;
      this.color = Math.random() > 0.3 ? "#ffd97d" : "#cbe0ff";
    }
    update() {
      this.alpha += this.speed * this.dir;
      if (this.alpha >= 0.95) {
        this.dir = -1;
      } else if (this.alpha <= 0.15) {
        this.dir = 1;
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < count; i++) {
    stars.push(new Star());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let star of stars) {
      star.update();
      star.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* -----------------------------------------------------------
   2. Interactive Vedic Zodiac & Horoscope Explorer
----------------------------------------------------------- */
function initZodiacExplorer() {
  const container = document.getElementById("zodiac-grid");
  const detailContainer = document.getElementById("zodiac-detail");
  if (!container || !detailContainer || typeof zodiacSigns === "undefined") return;

  // Render Zodiac Buttons
  container.innerHTML = zodiacSigns
    .map(
      (z, index) => `
      <button class="zodiac-btn ${index === 0 ? "active" : ""}" data-zodiac="${z.id}" aria-label="${z.name}">
        <span class="zodiac-symbol">${z.symbol}</span>
        <span class="zodiac-btn-name">${z.name}</span>
        <span class="zodiac-btn-sanskrit">${z.sanskrit.split(" ")[0]}</span>
      </button>
    `
    )
    .join("");

  // Function to render active sign detail
  function renderDetail(signId) {
    const sign = zodiacSigns.find((s) => s.id === signId) || zodiacSigns[0];

    detailContainer.innerHTML = `
      <div class="zodiac-card-inner">
        <div class="zodiac-card-header">
          <div class="zodiac-big-icon">${sign.symbol}</div>
          <div class="zodiac-header-meta">
            <span class="zodiac-tag">${sign.element} • Ruler: ${sign.ruler}</span>
            <h3 class="zodiac-title">${sign.name} <span class="sanskrit-title">(${sign.sanskrit})</span></h3>
            <p class="zodiac-dates">📅 ${sign.dates} • Auspicious Hours: <strong>${sign.auspiciousTime}</strong></p>
          </div>
          <a href="https://wa.me/61426528857?text=${encodeURIComponent(
            `Namaste Pandith Shivaji Ji, I would like to get a personalized Janam Kundli analysis for ${sign.name} (${sign.sanskrit}).`
          )}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-sm">
            <svg class="wa-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.2c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.214 8.214 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.61.2 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.46-.3z"/>
            </svg>
            Ask for ${sign.name}
          </a>
        </div>

        <div class="zodiac-body-grid">
          <div class="zodiac-box overview-box">
            <h4>🌟 Today's Cosmic Alignment</h4>
            <p>${sign.overview}</p>
          </div>
          <div class="zodiac-box love-box">
            <h4>❤️ Love & Relationships</h4>
            <p>${sign.love}</p>
          </div>
          <div class="zodiac-box career-box">
            <h4>💼 Career, Business & Wealth</h4>
            <p>${sign.career}</p>
          </div>
          <div class="zodiac-box health-box">
            <h4>🌿 Health & Mind Wellbeing</h4>
            <p>${sign.health}</p>
          </div>
        </div>

        <div class="zodiac-footer-meta">
          <div class="meta-pill"><span>Lucky Number:</span> <strong>${sign.luckyNumber}</strong></div>
          <div class="meta-pill"><span>Lucky Color:</span> <strong>${sign.luckyColor}</strong></div>
          <div class="meta-pill"><span>Vedic Gemstone:</span> <strong>${sign.gemstone}</strong></div>
          <div class="meta-pill"><span>Element:</span> <strong>${sign.element}</strong></div>
        </div>
      </div>
    `;
  }

  // Render initial
  renderDetail("aries");

  // Event listener for clicks
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".zodiac-btn");
    if (!btn) return;
    container.querySelectorAll(".zodiac-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderDetail(btn.dataset.zodiac);
  });
}

/* -----------------------------------------------------------
   3. Consultation & Free Kundli Booking Form
----------------------------------------------------------- */
function initConsultationForm() {
  const form = document.getElementById("consultation-form");
  const whatsappBtn = document.getElementById("btn-submit-whatsapp");
  const emailBtn = document.getElementById("btn-submit-email");
  const formFeedback = document.getElementById("form-feedback");

  if (!form) return;

  // Clear validation styling when user inputs text
  const inputs = form.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
    });
  });

  function getFormData() {
    return {
      name: document.getElementById("client-name")?.value.trim() || "",
      phone: document.getElementById("client-phone")?.value.trim() || "",
      email: document.getElementById("client-email")?.value.trim() || "",
      dob: document.getElementById("client-dob")?.value || "Not specified",
      tob: document.getElementById("client-tob")?.value || "Not specified",
      pob: document.getElementById("client-pob")?.value.trim() || "Not specified",
      service: document.getElementById("client-service")?.value || "General Astrology & Kundli",
      message: document.getElementById("client-message")?.value.trim() || "Requesting full consultation & remedies.",
    };
  }

  function validateBasic(data) {
    let isValid = true;
    if (!data.name) {
      document.getElementById("client-name")?.classList.add("is-invalid");
      showFeedback("Please enter your full name.", "error");
      document.getElementById("client-name")?.focus();
      isValid = false;
    }
    if (!data.phone || data.phone.length < 5) {
      document.getElementById("client-phone")?.classList.add("is-invalid");
      if (isValid) {
        showFeedback("Please provide a valid phone or WhatsApp number.", "error");
        document.getElementById("client-phone")?.focus();
      }
      isValid = false;
    }
    return isValid;
  }

  function showFeedback(msg, type = "success") {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type} show`;
    setTimeout(() => {
      formFeedback.classList.remove("show");
    }, 6000);
  }

  function submitToWhatsApp() {
    const data = getFormData();
    if (!validateBasic(data)) return;

    const sydneyTimeNow = new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Australia/Sydney',
      dateStyle: 'full',
      timeStyle: 'short'
    }).format(new Date());

    const waText = 
`✨ *NEW ASTROLOGY CONSULTATION REQUEST* ✨
-----------------------------------------
👤 *Name:* ${data.name}
📱 *Phone/WhatsApp:* ${data.phone}
📧 *Email:* ${data.email || 'Not provided'}
🎂 *Date of Birth:* ${data.dob}
⏰ *Time of Birth:* ${data.tob}
📍 *Place of Birth:* ${data.pob}
🔮 *Service Required:* ${data.service}

📝 *Specific Problem / Questions:*
${data.message}

🇦🇺 *Sydney Australia Time:* ${sydneyTimeNow}
-----------------------------------------
_Sent via Pandith Shivaji Official Portal_`;

    const targetUrl = `https://wa.me/61426528857?text=${encodeURIComponent(waText)}`;
    showFeedback("✓ Redirecting to WhatsApp with your details. Pandith Shivaji will respond shortly!", "success");
    
    // Immediate redirect works reliably on mobile without being blocked by popup blockers
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 400);
  }

  // Handle Form Submit Event (Enter key or Submit button)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitToWhatsApp();
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", (e) => {
      e.preventDefault();
      submitToWhatsApp();
    });
  }

  // Handle Email submission
  if (emailBtn) {
    emailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateBasic(data)) return;

      const subject = encodeURIComponent(`Astrology Consultation Inquiry - ${data.name} (${data.service})`);
      const body = encodeURIComponent(
`Respected Pandith Shivaji Ji,

I would like to book an astrology consultation session with you.

My Details:
- Name: ${data.name}
- Phone/WhatsApp: ${data.phone}
- Email: ${data.email || 'Not provided'}
- Date of Birth: ${data.dob}
- Time of Birth: ${data.tob}
- Place of Birth: ${data.pob}
- Primary Concern: ${data.service}

Questions / Problem Summary:
${data.message}

Please let me know your available consultation slot.

Warm regards,
${data.name}`
      );

      showFeedback("✓ Opening your email client to send to astrologerps857@gmail.com...", "success");
      setTimeout(() => {
        window.location.href = `mailto:astrologerps857@gmail.com?subject=${subject}&body=${body}`;
      }, 400);
    });
  }
}

/* -----------------------------------------------------------
   3b. Contact Page Direct Message Form
----------------------------------------------------------- */
function initContactPageForm() {
  const form = document.getElementById("contact-page-form");
  const whatsappBtn = document.getElementById("btn-contact-whatsapp");
  const emailBtn = document.getElementById("btn-contact-email");
  const formFeedback = document.getElementById("contact-form-feedback");

  if (!form) return;

  const inputs = form.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
    });
  });

  function getFormData() {
    return {
      name: document.getElementById("contact-name")?.value.trim() || "",
      phone: document.getElementById("contact-phone")?.value.trim() || "",
      email: document.getElementById("contact-email")?.value.trim() || "",
      subject: document.getElementById("contact-subject")?.value || "Sydney In-Person Consultation",
      message: document.getElementById("contact-message")?.value.trim() || "",
    };
  }

  function validateBasic(data) {
    let isValid = true;
    if (!data.name) {
      document.getElementById("contact-name")?.classList.add("is-invalid");
      showFeedback("Please enter your name.", "error");
      document.getElementById("contact-name")?.focus();
      isValid = false;
    }
    if (!data.phone || data.phone.length < 5) {
      document.getElementById("contact-phone")?.classList.add("is-invalid");
      if (isValid) {
        showFeedback("Please provide a valid phone or WhatsApp number.", "error");
        document.getElementById("contact-phone")?.focus();
      }
      isValid = false;
    }
    if (!data.message) {
      document.getElementById("contact-message")?.classList.add("is-invalid");
      if (isValid) {
        showFeedback("Please enter your message or question.", "error");
        document.getElementById("contact-message")?.focus();
      }
      isValid = false;
    }
    return isValid;
  }

  function showFeedback(msg, type = "success") {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type} show`;
    setTimeout(() => {
      formFeedback.classList.remove("show");
    }, 6000);
  }

  function submitToWhatsApp() {
    const data = getFormData();
    if (!validateBasic(data)) return;

    const waText = 
`✨ *NEW INQUIRY FOR PANDITH SHIVAJI* ✨
-----------------------------------------
👤 *Name:* ${data.name}
📱 *Phone/WhatsApp:* ${data.phone}
📧 *Email:* ${data.email || 'Not provided'}
📍 *Topic:* ${data.subject}

💬 *Message:*
${data.message}
-----------------------------------------
_Sent via Pandith Shivaji Sydney Official Website_`;

    const targetUrl = `https://wa.me/61426528857?text=${encodeURIComponent(waText)}`;
    showFeedback("✓ Redirecting to WhatsApp with your message...", "success");
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 400);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitToWhatsApp();
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", (e) => {
      e.preventDefault();
      submitToWhatsApp();
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateBasic(data)) return;

      const emailSubject = encodeURIComponent(`Inquiry from ${data.name} - ${data.subject}`);
      const body = encodeURIComponent(
`Respected Pandith Shivaji Ji,

I would like to inquire regarding ${data.subject}.

My Details:
- Name: ${data.name}
- Phone/WhatsApp: ${data.phone}
- Email: ${data.email || 'Not provided'}

Message:
${data.message}

Warm regards,
${data.name}`
      );

      showFeedback("✓ Opening email client to send to astrologerps857@gmail.com...", "success");
      setTimeout(() => {
        window.location.href = `mailto:astrologerps857@gmail.com?subject=${emailSubject}&body=${body}`;
      }, 400);
    });
  }
}

/* -----------------------------------------------------------
   4. FAQ Accordion
----------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Close all others
      faqItems.forEach((other) => other.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

/* -----------------------------------------------------------
   5. Mobile Navigation Menu
----------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("primary-navigation");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("nav-open");
    toggleBtn.classList.toggle("open");
    document.body.classList.toggle("menu-locked");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav-open");
      toggleBtn.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-locked");
    });
  });
}

/* -----------------------------------------------------------
   6. Header Scroll & Dynamic Scrollspy Navigation
----------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  if (!header) return;

  function updateScrollState() {
    const scrollPos = window.scrollY;

    // Header blur & shadow state
    if (scrollPos > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Only run hash scrollspy if there are in-page hash links on this page
    const hasHashLinks = Array.from(navLinks).some(link => link.getAttribute("href")?.startsWith("#"));
    if (hasHashLinks) {
      let currentSectionId = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id");
        }
      });

      if (currentSectionId) {
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${currentSectionId}`) {
            link.classList.add("active-nav");
          } else if (href?.startsWith("#")) {
            link.classList.remove("active-nav");
          }
        });
      }
    }
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
}

/* -----------------------------------------------------------
   7. Floating WhatsApp Widget with Invitation Bubble
----------------------------------------------------------- */
function initWhatsAppWidget() {
  const widgetBubble = document.getElementById("wa-popup-bubble");
  const closeBubble = document.getElementById("close-wa-bubble");

  // Show bubble after 3.5 seconds
  if (widgetBubble) {
    setTimeout(() => {
      widgetBubble.classList.add("visible");
    }, 3500);

    if (closeBubble) {
      closeBubble.addEventListener("click", (e) => {
        e.stopPropagation();
        widgetBubble.classList.remove("visible");
      });
    }
  }
}

/* -----------------------------------------------------------
   8. Copy Phone / Email To Clipboard
----------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll("[data-copy]");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span>✓ Copied!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      });
    });
  });
}

/* -----------------------------------------------------------
   9. Live Australian Date, Time & Office Status (AEST/Sydney)
----------------------------------------------------------- */
function initAustraliaLiveClock() {
  const clockElements = document.querySelectorAll(".sydney-live-time");
  const dateElements = document.querySelectorAll(".sydney-live-date");
  const statusElements = document.querySelectorAll(".sydney-office-status");

  function update() {
    const now = new Date();

    // 12-hour formatted time in Australia/Sydney
    const timeFormatter = new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Date formatted in Australia/Sydney
    const dateFormatter = new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Full Date for headers/cards
    const fullDateFormatter = new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Extract 24-hour hour to determine if Sydney office is open (8am - 9pm AEST)
    const hourFormatter = new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      hour: "numeric",
      hour12: false,
    });
    const currentHour = parseInt(hourFormatter.format(now), 10);
    const isOpen = currentHour >= 8 && currentHour < 21;

    const timeStr = timeFormatter.format(now);
    const dateStr = dateFormatter.format(now);
    const fullDateStr = fullDateFormatter.format(now);

    clockElements.forEach((el) => {
      el.textContent = `${timeStr} (AEST)`;
    });

    dateElements.forEach((el) => {
      if (el.dataset.format === "full") {
        el.textContent = fullDateStr;
      } else {
        el.textContent = dateStr;
      }
    });

    statusElements.forEach((el) => {
      if (isOpen) {
        el.innerHTML = `<span class="status-dot open"></span> Available Now (Sydney)`;
        el.className = "office-status-badge status-open sydney-office-status";
      } else {
        el.innerHTML = `<span class="status-dot closed"></span> Consultations Resume 8:00 AM (Sydney)`;
        el.className = "office-status-badge status-closed sydney-office-status";
      }
    });
  }

  update();
  setInterval(update, 1000);
}

/* -----------------------------------------------------------
   10. Scroll Reveal Block Animations & Card Spotlights
----------------------------------------------------------- */
function initScrollReveal() {
  const autoBlocks = document.querySelectorAll(
    ".service-card, .testimonial-card, .stat-card, .service-full-row, .pillar-box, .strip-item, .zodiac-card-inner, .faq-item, .booking-card, .location-info-card, .map-frame-wrapper, .spec-card"
  );
  autoBlocks.forEach((el) => {
    if (!el.classList.contains("reveal-block-up") && 
        !el.classList.contains("reveal-block-left") && 
        !el.classList.contains("reveal-block-right") && 
        !el.classList.contains("reveal-block-scale")) {
      el.classList.add("reveal-block");
    }
  });

  const reveals = document.querySelectorAll(
    ".reveal-block, .reveal-block-up, .reveal-block-left, .reveal-block-right, .reveal-block-scale"
  );
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initCardGlowEffects() {
  const cards = document.querySelectorAll(
    ".service-card, .testimonial-card, .stat-card, .booking-card, .action-strip-card, .service-full-row, .zodiac-card-inner, .spec-card"
  );
  cards.forEach((card) => {
    card.classList.add("glow-spotlight-card");
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    });
  });
}

/* -----------------------------------------------------------
   11. Interactive 3D Card Perspective Tilt
----------------------------------------------------------- */
function init3DTiltCards() {
  const tiltElements = document.querySelectorAll(".tilt-card, .service-card, .spec-card");
  tiltElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/* -----------------------------------------------------------
   12. Animated Statistics Number Counter
----------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-card .number, .experience-counter-badge .number");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = "true";
        animateNumber(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach((el) => observer.observe(el));

  function animateNumber(el) {
    const rawText = el.textContent.trim();
    const match = rawText.match(/([0-9.]+)/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = rawText.replace(match[1], "");
    const isFloat = rawText.includes(".");
    const duration = 1800;
    const startTime = performance.now();

    function update(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * target;
      el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = rawText;
      }
    }
    requestAnimationFrame(update);
  }
}

/* -----------------------------------------------------------
   13. Interactive Vedic Kundli Chart Explorer
----------------------------------------------------------- */
function initInteractiveKundli() {
  const kundliHouses = document.querySelectorAll(".kundli-house-poly");
  const infoBadge = document.querySelector(".kundli-info-badge");
  const infoTitle = document.querySelector(".kundli-house-title");
  const infoDesc = document.querySelector(".kundli-house-desc");
  const remedyTitle = document.querySelector(".kundli-remedy-pill h5");
  const remedyDesc = document.querySelector(".kundli-remedy-pill p");

  if (!kundliHouses.length || !infoTitle) return;

  const houseData = {
    1: {
      badge: "House 1 • Lagna Bhava",
      title: "1st House: Ascendant (Self & Vitality)",
      desc: "Represents your physical body, temperament, life path, personal magnetism, and general vitality. The planetary ruler of this house determines your overall destiny.",
      remedyTitle: "⚡ Pandith Ji's Remedy Focus",
      remedyDesc: "Lagna Lord strengthening with primary Vedic gemstone, Surya Arghya, and Gayatri Mantra japa."
    },
    2: {
      badge: "House 2 • Dhana Bhava",
      title: "2nd House: Wealth & Family Lineage",
      desc: "Governs accumulated wealth, gold, liquid assets, speech, immediate family ties, and food habits. Afflictions here cause financial instability and family discord.",
      remedyTitle: "💰 Pandith Ji's Remedy Focus",
      remedyDesc: "Sri Suktam havan, consecrated Sri Yantra installation, and Jupiter/Venus alignment."
    },
    3: {
      badge: "House 3 • Sahaja Bhava",
      title: "3rd House: Courage & Enterprise",
      desc: "Controls inner courage, siblings, short journeys, communication, and entrepreneurial initiatives. Governs will-power and artistic abilities.",
      remedyTitle: "🛡️ Pandith Ji's Remedy Focus",
      remedyDesc: "Mars and Mercury propitiation, Hanuman Chalisa recitations, and copper energization."
    },
    4: {
      badge: "House 4 • Sukha Bhava",
      title: "4th House: Home, Land & Inner Peace",
      desc: "The house of mother, ancestral properties, real estate, vehicles, and peace of mind (Mano-Bala). Disrupted 4th house leads to anxiety and domestic turmoil.",
      remedyTitle: "🏡 Pandith Ji's Remedy Focus",
      remedyDesc: "Vastu Shastra corrections for Sydney & Australian homes, Chandra (Moon) pacification remedies."
    },
    5: {
      badge: "House 5 • Putra Bhava",
      title: "5th House: Children, Love & Intellect",
      desc: "Rules progeny, love romances, higher intellect, speculative gains, and Poorva Punya (merit from previous lifetimes). Essential for child conception and exams.",
      remedyTitle: "💖 Pandith Ji's Remedy Focus",
      remedyDesc: "Santana Gopala mantra initiation, Saraswati yantra, and auspicious muhurtha selection."
    },
    6: {
      badge: "House 6 • Ari Bhava",
      title: "6th House: Enemies, Debts & Health",
      desc: "Governs acute illnesses, court cases, hidden rivals, financial debts, and workplace competition. Strong placements here allow one to conquer all foes.",
      remedyTitle: "⚔️ Pandith Ji's Remedy Focus",
      remedyDesc: "Sudarshana Maha Yantra, Shatru Vinashak puja, and debt-clearing Rin Mukteshwar rituals."
    },
    7: {
      badge: "House 7 • Kalatra Bhava",
      title: "7th House: Marriage & Life Partner",
      desc: "The supreme house for marriage, love union, spouse characteristics, partnership loyalty, and public reputation. Manglik dosha strongly affects this house.",
      remedyTitle: "💍 Pandith Ji's Remedy Focus",
      remedyDesc: "Manglik Dosha Nivarana, Katyayani Vrata remedies, and Ashta-Koota kundli harmony rituals."
    },
    8: {
      badge: "House 8 • Ayur Bhava",
      title: "8th House: Longevity & Mystery",
      desc: "Rules life longevity, sudden transformations, inheritances, occult sciences, and liberation from hidden chronic distress or black magic influences.",
      remedyTitle: "🕉️ Pandith Ji's Remedy Focus",
      remedyDesc: "Maha Mrityunjaya Jaap, Rahu-Ketu Shanti, and aura shielding with sacred black tourmaline/rudraksha."
    },
    9: {
      badge: "House 9 • Bhagya Bhava",
      title: "9th House: Luck, Fortune & Dharma",
      desc: "The most auspicious Lakshmi-Sthana house: governs divine luck, blessings of the Guru and ancestors, long foreign pilgrimages, and father's grace.",
      remedyTitle: "🌟 Pandith Ji's Remedy Focus",
      remedyDesc: "Guru (Brihaspati) blessings, Pitru Tarpan rituals, and activating dormant destiny lines."
    },
    10: {
      badge: "House 10 • Karma Bhava",
      title: "10th House: Career, Power & Status",
      desc: "Determines your professional vocation, government promotions, authority, public reputation, and worldly success. Crucial for career breakthroughs in Australia.",
      remedyTitle: "📈 Pandith Ji's Remedy Focus",
      remedyDesc: "Aditya Hridaya Stotra Sadhana, Saturn (Shani Dev) karma remedies, and corporate prosperity pujas."
    },
    11: {
      badge: "House 11 • Labha Bhava",
      title: "11th House: Infinite Gains & Desires",
      desc: "The house of major profits, high net-worth expansion, social networks, and realization of lifelong dreams. An afflicted 11th house stalls all financial rewards.",
      remedyTitle: "💎 Pandith Ji's Remedy Focus",
      remedyDesc: "Kubera Dhan Vriddhi Yantra consecration, green jade/emerald recommendations, and wealth flow mantras."
    },
    12: {
      badge: "House 12 • Vyaya Bhava",
      title: "12th House: Foreign Lands & Moksha",
      desc: "Governs overseas immigration and settlement (PR in Australia), spiritual liberation, expenditures, sleep quality, and foreign trade connections.",
      remedyTitle: "🌏 Pandith Ji's Remedy Focus",
      remedyDesc: "Overseas settlement planetary alignment, evil eye dispel rituals, and sound meditative peace."
    }
  };

  kundliHouses.forEach((house) => {
    house.addEventListener("mouseenter", () => {
      const houseNum = house.dataset.house;
      const data = houseData[houseNum];
      if (!data) return;

      kundliHouses.forEach((h) => h.classList.remove("active-house"));
      house.classList.add("active-house");

      infoBadge.textContent = data.badge;
      infoTitle.textContent = data.title;
      infoDesc.textContent = data.desc;
      remedyTitle.innerHTML = data.remedyTitle;
      remedyDesc.textContent = data.remedyDesc;
    });

    house.addEventListener("click", () => {
      const houseNum = house.dataset.house;
      const data = houseData[houseNum];
      if (!data) return;
      kundliHouses.forEach((h) => h.classList.remove("active-house"));
      house.classList.add("active-house");
    });
  });
}

