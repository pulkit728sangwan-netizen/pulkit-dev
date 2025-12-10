/* ===========================================================
   1. LOADER SCREEN / PRELOADER
   =========================================================== */

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader-screen");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 600);
    }, 800);
});


/* ===========================================================
   2. MOBILE NAVIGATION OPEN/CLOSE
   =========================================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuOpen = !menuOpen;
});


/* ===========================================================
   3. SMOOTH SCROLLING FOR NAV LINKS
   =========================================================== */

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});


/* ===========================================================
   4. SCROLL ANIMATION (fade, slide, etc.)
   =========================================================== */

const animatedElements = document.querySelectorAll(".fade-in, .slide-left, .slide-right, .section");

function showAnimations() {
    const windowHeight = window.innerHeight;
    animatedElements.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        if (pos < windowHeight - 50) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", showAnimations);
showAnimations();


/* ===========================================================
   5. PROJECT FILTER BUTTONS
   =========================================================== */

const filterButtons = document.querySelectorAll(".filter-buttons button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.dataset.category;

        projectCards.forEach(card => {
            if (category === "all" || card.dataset.category === category) {
                card.style.display = "block";
                setTimeout(() => card.style.opacity = "1", 100);
            } else {
                card.style.opacity = "0";
                setTimeout(() => card.style.display = "none", 300);
            }
        });
    });
});


/* ===========================================================
   6. LIGHTBOX (IMAGE POPUP)
   =========================================================== */

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");

galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
});


/* ===========================================================
   7. SKILL BAR ANIMATIONS
   =========================================================== */

const skillBars = document.querySelectorAll(".progress");

function animateSkills() {
    skillBars.forEach(bar => {
        const value = bar.dataset.value;
        const pos = bar.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (pos < screenHeight - 50) {
            bar.style.width = value + "%";
        }
    });
}

window.addEventListener("scroll", animateSkills);


/* ===========================================================
   8. BACK TO TOP BUTTON
   =========================================================== */

const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ===========================================================
   9. CUSTOM CURSOR EFFECT
   =========================================================== */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursorDot.style.transform = `translate(${x}px, ${y}px)`;
    cursorOutline.style.transform = `translate(${x}px, ${y}px)`;
});


/* ===========================================================
   10. CONTACT FORM — Basic Validation
   =========================================================== */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = contactForm.querySelector("input[name='name']").value;
        const email = contactForm.querySelector("input[name='email']").value;
        const message = contactForm.querySelector("textarea[name='message']").value;

        if (!name || !email || !message) {
            alert("Please fill all fields!");
            return;
        }

        alert("Your request has been submitted! Pulkit will contact you soon.");
        contactForm.reset();
    });
}


/* ===========================================================
   11. CHATBOT BUTTON (Popup)
   =========================================================== */

const chatbotBtn = document.querySelector(".chatbot-btn");

chatbotBtn.addEventListener("click", () => {
    alert("Chatbot feature coming soon — Made by Pulkit Development!");
});


/* ===========================================================
   12. NAVBAR SHADOW ON SCROLL
   =========================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
    } else {
        navbar.style.boxShadow = "none";
    }
});


/* ===========================================================
   13. COUNTERS (Animated Numbers)
   =========================================================== */

const counters = document.querySelectorAll(".counter");

function animateCounters() {
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let count = 0;
        const speed = 20;

        function updateCount() {
            if (count < target) {
                count += Math.ceil(target / 100);
                counter.textContent = count;
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        }

        const position = counter.getBoundingClientRect().top;
        if (position < window.innerHeight - 50) {
            updateCount();
        }
    });
}

window.addEventListener("scroll", animateCounters);
/* ===========================================================
   JAVASCRIPT — PART 2/4
   (Project tabs, modal logic, localStorage requests, admin,
    testimonial carousel, FAQ, subscribe, load more, canvas demo)
   =========================================================== */

/* ---------- Helper: Safe selector ---------- */
function $qs(selector, root = document) {
  return root.querySelector(selector);
}
function $qsa(selector, root = document) {
  return Array.from((root || document).querySelectorAll(selector));
}

/* ---------- PROJECT TABS (commercial / personal / animation) ---------- */
const tabBtns = $qsa('.tab-btn');
const projectContainers = $qsa('.project-container');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.tab;
    projectContainers.forEach(pc => {
      if (pc.id === target) {
        pc.classList.add('active');
      } else {
        pc.classList.remove('active');
      }
    });
  });
});

/* ---------- PROJECT MODAL (preview) ---------- */
const modalOverlayEl = $qs('#modalOverlay');
const projectModal = $qs('#projectModal');
const modalCloseBtn = $qs('#modalClose');
const modalTitle = $qs('#modalTitle');
const modalImage = $qs('#modalImage');
const modalText = $qs('#modalText');
const modalLink = $qs('#modalLink');

function openProjectModal({ title = '', img = '', desc = '', href = '#' } = {}) {
  modalTitle.textContent = title;
  modalImage.src = img || 'https://via.placeholder.com/800x420?text=Preview';
  modalText.textContent = desc || 'Project description not provided.';
  modalLink.href = href || '#';
  modalOverlayEl.style.display = 'block';
  projectModal.style.display = 'block';
  setTimeout(() => {
    modalOverlayEl.classList.add('visible');
    projectModal.classList.add('visible');
  }, 10);
}

function closeProjectModal() {
  modalOverlayEl.classList.remove('visible');
  projectModal.classList.remove('visible');
  setTimeout(() => {
    modalOverlayEl.style.display = 'none';
    projectModal.style.display = 'none';
  }, 300);
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
if (modalOverlayEl) modalOverlayEl.addEventListener('click', closeProjectModal);

/* Attach modal openers to every .view-btn inside project-card (delegation safe) */
document.addEventListener('click', (e) => {
  const viewBtn = e.target.closest('.view-btn');
  if (!viewBtn) return;
  // try read data attributes from nearest project-card
  const card = viewBtn.closest('.project-card') || viewBtn.closest('.neon-card');
  const title = card ? (card.querySelector('.project-title') ? card.querySelector('.project-title').textContent : card.querySelector('h3')?.textContent || 'Project') : 'Project';
  const desc = card ? (card.querySelector('.project-desc')?.textContent || '') : '';
  const img = card ? (card.dataset.img || card.querySelector('img')?.src || '') : '';
  openProjectModal({ title, img, desc, href: viewBtn.href || '#' });
});

/* ---------- LOCAL REQUESTS STORAGE (contact form) ---------- */
const REQUESTS_KEY = 'pulkit_requests_v2';
const formEl = $qs('#projectRequestForm') || $qs('.contact-form') || $qs('form');

function loadRequests() {
  try {
    return JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]');
  } catch (err) {
    return [];
  }
}
function saveRequests(arr) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(arr));
}

/* Form submit handling with robust selectors/fallbacks */
if (formEl) {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const getVal = (sel) => {
      const el = formEl.querySelector(sel);
      return el ? el.value.trim() : '';
    };
    const name = getVal('#clientName') || getVal('input[name="name"]') || getVal('input[type="text"]') || '';
    const email = getVal('#clientEmail') || getVal('input[name="email"]') || getVal('input[type="email"]') || '';
    const type = getVal('#projectType') || getVal('select[name="type"]') || '';
    const budget = getVal('#budgetRange') || getVal('input[name="budget"]') || '';
    const deadline = getVal('#deadline') || '';
    const desc = getVal('#projectDesc') || getVal('textarea[name="message"]') || getVal('textarea') || '';

    if (!name || !email || !type || !desc) {
      const msg = $qs('#formMsg') || $qs('.form-message');
      if (msg) {
        msg.textContent = 'Please fill required fields (name, email, type, description).';
        msg.style.color = 'tomato';
      } else {
        alert('Please fill required fields (name, email, type, description).');
      }
      return;
    }

    // Save request object
    const requests = loadRequests();
    const requestObj = {
      id: 'r_' + Date.now(),
      name, email, type, budget, deadline, desc,
      at: new Date().toISOString()
    };
    requests.unshift(requestObj);
    saveRequests(requests);

    // UI feedback
    const msg = $qs('#formMsg') || $qs('.form-message');
    if (msg) {
      msg.textContent = 'Request saved locally. (Demo) — Pulkit will contact you at ' + email;
      msg.style.color = '#7ee787';
    } else {
      alert('Request saved locally. Pulkit will contact you at ' + email);
    }
    formEl.reset();
  });
}

/* Save Draft button */
const saveDraftBtn = $qs('#saveDraft');
if (saveDraftBtn) {
  saveDraftBtn.addEventListener('click', () => {
    // try storing current form values into localStorage draft
    const draft = {};
    ['#clientName', '#clientEmail', '#projectType', '#budgetRange', '#deadline', '#projectDesc'].forEach(sel => {
      const el = formEl.querySelector(sel);
      if (el) draft[sel] = el.value;
    });
    localStorage.setItem('pulkit_request_draft', JSON.stringify(draft));
    alert('Draft saved locally.');
  });
}

/* ---------- ADMIN DEMO: View & Export Requests ---------- */
const viewLocalBtn = $qs('#viewLocalRequests');
const clearLocalBtn = $qs('#clearLocalRequests');
const localList = $qs('#localRequestsList');

if (viewLocalBtn) {
  viewLocalBtn.addEventListener('click', () => {
    const pass = ($qs('#adminPassDemo') || {}).value || '';
    const DEMO_PASS = 'pulkit-admin';
    if (pass !== DEMO_PASS) {
      alert('Incorrect passphrase (demo). Use: ' + DEMO_PASS);
      return;
    }
    const arr = loadRequests();
    if (!arr.length) {
      localList.innerHTML = '<div class="muted">No saved requests.</div>';
      return;
    }
    let html = '<table style="width:100%;border-collapse:collapse;"><thead><tr><th>Name</th><th>Email</th><th>Type</th><th>Budget</th><th>When</th></tr></thead><tbody>';
    arr.forEach(r => {
      html += `<tr style="border-bottom:1px solid #ddd;"><td>${escapeHtml(r.name)}</td><td>${escapeHtml(r.email)}</td><td>${escapeHtml(r.type)}</td><td>${escapeHtml(r.budget||'')}</td><td>${new Date(r.at).toLocaleString()}</td></tr>`;
    });
    html += '</tbody></table>';
    localList.innerHTML = html;
  });
}

if (clearLocalBtn) {
  clearLocalBtn.addEventListener('click', () => {
    if (!confirm('Clear all saved requests from your browser?')) return;
    localStorage.removeItem(REQUESTS_KEY);
    localList.innerHTML = '<div class="muted">Cleared.</div>';
  });
}

/* ---------- EXPORT / DOWNLOAD requests ---------- */
function exportRequests() {
  const arr = loadRequests();
  if (!arr.length) {
    alert('No requests to export.');
    return;
  }
  const blob = new Blob([JSON.stringify(arr, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pulkit_requests.json';
  a.click();
  URL.revokeObjectURL(url);
}
const exportBtn = $qs('#exportRequests');
if (exportBtn) exportBtn.addEventListener('click', exportRequests);

/* ---------- LOAD MORE PROJECTS (append dummy cards) ---------- */
const loadMoreBtn = $qs('#loadMoreProjects');
const projectsGrid = $qs('#projectsGrid') || $qs('.projects-grid');

if (loadMoreBtn && projectsGrid) {
  loadMoreBtn.addEventListener('click', () => {
    // append 3 dummy cards
    for (let i = 0; i < 3; i++) {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-thumb" style="background-image:url('https://via.placeholder.com/800x420?text=Project+${Date.now()%1000}')"></div>
        <div class="project-body">
          <h3>Extra Project ${Math.floor(Math.random()*900)}</h3>
          <p class="muted">Appended by load more action — update with real project details later.</p>
          <div class="project-actions"><a class="small-btn" href="#">Open</a> <button class="small-btn view-btn">Preview</button></div>
        </div>
      `;
      projectsGrid.appendChild(card);
    }
    // scroll to new content
    loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ---------- ANIMATIONS GRID: small canvas particle demo preview ---------- */
function createParticlesCanvas(container) {
  const canvas = document.createElement('canvas');
  canvas.width = 560;
  canvas.height = 280;
  canvas.style.width = '100%';
  canvas.style.height = '200px';
  canvas.style.borderRadius = '8px';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      vx: (Math.random()-0.5)*1.5,
      vy: (Math.random()-0.5)*1.0,
      r: 2 + Math.random()*3,
      hue: 180 + Math.random()*120
    });
  }

  function step() {
    ctx.fillStyle = 'rgba(2,6,23,0.25)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      ctx.beginPath();
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
      g.addColorStop(0, `hsla(${p.hue},90%,60%,0.95)`);
      g.addColorStop(1, `hsla(${p.hue},90%,40%,0)`);
      ctx.fillStyle = g;
      ctx.arc(p.x,p.y,p.r*3,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(step);
  }
  step();
}

/* Render particle demo into each .animation-box when clicked (lazy create) */
document.addEventListener('click', (e) => {
  const animBox = e.target.closest('.animation-box');
  if (!animBox) return;
  // prevent re-creating
  if (!animBox.dataset.inited) {
    animBox.dataset.inited = '1';
    animBox.innerHTML = '<div style="padding:12px"><div style="font-weight:700;margin-bottom:8px;color:#0ff">Live demo</div></div>';
    createParticlesCanvas(animBox);
    // open modal if desired
    openProjectModal({ title: 'Animation Demo', desc: 'Interactive particle demo', img: '' });
  }
});

/* ---------- TESTIMONIAL CAROUSEL (simple auto-slide) ---------- */
const testimonials = $qsa('.testimonial');
let tIndex = 0;
function showTestimonial(i) {
  testimonials.forEach((t, idx) => {
    t.style.opacity = idx === i ? '1' : '0';
    t.style.transform = idx === i ? 'translateY(0)' : 'translateY(20px)';
    t.style.transition = 'opacity 0.6s, transform 0.6s';
  });
}
if (testimonials.length) {
  showTestimonial(0);
  setInterval(() => {
    tIndex = (tIndex + 1) % testimonials.length;
    showTestimonial(tIndex);
  }, 4500);
}

/* ---------- FAQ accordion toggle ---------- */
const faqItems = $qsa('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

/* ---------- Subscribe form (simple) ---------- */
const subscribeInput = $qs('.subscribe-input');
const subscribeBtn = $qs('.subscribe-btn');
if (subscribeBtn && subscribeInput) {
  subscribeBtn.addEventListener('click', () => {
    const mail = subscribeInput.value.trim();
    if (!mail || !mail.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    // mimic subscribe: save to localStorage (demo)
    const list = JSON.parse(localStorage.getItem('pulkit_subs') || '[]');
    if (list.includes(mail)) {
      alert('You are already subscribed.');
      return;
    }
    list.push(mail);
    localStorage.setItem('pulkit_subs', JSON.stringify(list));
    subscribeInput.value = '';
    alert('Subscribed. Thank you!');
  });
}

/* ---------- Utility: escapeHtml ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"'`]/g, function (m) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;", "`":"&#96;"})[m];
  });
}

/* End of JS Part 2 */
/* ===========================================================
   JAVASCRIPT — PART 3/4
   (Advanced animations, tab enhancements, sticky header,
    theme toggler, hover effects, counters, misc utils)
   =========================================================== */

/* ---------- STICKY HEADER / SCROLL CLASS ---------- */
const header = document.querySelector('.navbar') || document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

/* ---------- TAB HOVER EFFECTS ---------- */
$qsa('.tab-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
});

/* ---------- PORTFOLIO CARD HOVER EFFECT ---------- */
$qsa('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) rotateX(2deg)';
    card.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0deg)';
    card.style.boxShadow = '0 6px 12px rgba(0,0,0,0.07)';
  });
});

/* ---------- COUNTER ANIMATION ON SCROLL (MULTI) ---------- */
function animateAllCounters() {
  $qsa('.counter').forEach(counter => {
    if (counter.dataset.animated) return;
    const top = counter.getBoundingClientRect().top;
    if (top < window.innerHeight - 40) {
      counter.dataset.animated = 'true';
      let target = parseInt(counter.dataset.target) || 0;
      let count = 0;
      const step = Math.ceil(target / 120);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = count;
        }
      }, 15);
    }
  });
}
window.addEventListener('scroll', animateAllCounters);
animateAllCounters();

/* ---------- DARK / LIGHT THEME TOGGLER ---------- */
const themeToggleBtn = $qs('.theme-toggle');
themeToggleBtn && themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('pulkit_theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});
/* Load saved theme */
if (localStorage.getItem('pulkit_theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

/* ---------- SCROLL-BASED SECTION HIGHLIGHT ---------- */
const sections = $qsa('section');
function highlightCurrentSection() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    const id = sec.id;
    const navLink = $qs(`a[href="#${id}"]`);
    if (!navLink) return;
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', highlightCurrentSection);
highlightCurrentSection();

/* ---------- MODAL DRAG FEATURE (mouse drag demo) ---------- */
if (projectModal) {
  let isDragging = false, dragX = 0, dragY = 0;
  projectModal.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragX = e.clientX - projectModal.offsetLeft;
    dragY = e.clientY - projectModal.offsetTop;
    projectModal.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    projectModal.style.cursor = 'default';
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    projectModal.style.left = `${e.clientX - dragX}px`;
    projectModal.style.top = `${e.clientY - dragY}px`;
  });
}

/* ---------- PROJECT CARD SORTING (by date/title) ---------- */
const sortSelect = $qs('#sortProjects');
if (sortSelect && projectsGrid) {
  sortSelect.addEventListener('change', () => {
    const cards = Array.from(projectsGrid.children);
    const val = sortSelect.value;
    if (val === 'title') {
      cards.sort((a, b) => (a.querySelector('h3')?.textContent || '').localeCompare(b.querySelector('h3')?.textContent || ''));
    } else if (val === 'recent') {
      cards.sort((a, b) => (b.dataset.date || 0) - (a.dataset.date || 0));
    }
    cards.forEach(c => projectsGrid.appendChild(c));
  });
}

/* ---------- FAQ MULTIPLE OPEN OPTION ---------- */
faqItems.forEach(item => {
  const header = $qs('h4', item);
  if (!header) return;
  header.addEventListener('click', () => {
    const openMultiple = true; // allow multiple open
    if (!openMultiple) {
      faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
    }
    item.classList.toggle('active');
  });
});

/* ---------- SUBSCRIBE FIELD ANIMATION ---------- */
if (subscribeInput) {
  subscribeInput.addEventListener('focus', () => subscribeInput.style.boxShadow = '0 0 6px #2563eb');
  subscribeInput.addEventListener('blur', () => subscribeInput.style.boxShadow = 'none');
}

/* ---------- PROJECT CARD IMAGE ZOOM ---------- */
$qsa('.project-thumb').forEach(imgDiv => {
  imgDiv.addEventListener('mouseenter', () => {
    imgDiv.style.transform = 'scale(1.05)';
    imgDiv.style.transition = 'transform 0.3s';
  });
  imgDiv.addEventListener('mouseleave', () => {
    imgDiv.style.transform = 'scale(1)';
  });
});

/* ---------- MODAL TAB SWITCH INSIDE MODAL ---------- */
const modalTabs = $qsa('.modal-tab-btn');
const modalTabContents = $qsa('.modal-tab-content');
modalTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    modalTabs.forEach(t => t.classList.remove('active'));
    modalTabContents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    $qs(`#${target}`)?.classList.add('active');
  });
});

/* ---------- SCROLL-TRIGGERED HIGHLIGHT CARDS ---------- */
$qsa('.highlight-card').forEach(card => {
  function animateCard() {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
      card.style.transition = 'all 0.7s ease-out';
    }
  }
  window.addEventListener('scroll', animateCard);
  animateCard();
});

/* ---------- UTILITY: Random Color Generator (for animations) ---------- */
function randomColor() {
  return `hsl(${Math.floor(Math.random()*360)}, 80%, 60%)`;
}

/* ---------- SMALL ICON SPIN EFFECT ---------- */
$qsa('.icon-spin').forEach(icon => {
  let deg = 0;
  setInterval(() => {
    deg += 2;
    icon.style.transform = `rotate(${deg}deg)`;
  }, 30);
});

/* ---------- END OF JS PART 3/4 ---------- */
/* ===========================================================
   JAVASCRIPT — PART 4/4
   (Final advanced features, parallax, ripple, notifications)
   =========================================================== */

/* ---------- HERO PARALLAX BACKGROUND ---------- */
const hero = $qs('.hero-section');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = -(scrolled * 0.25) + 'px';
  });
}

/* ---------- BUTTON RIPPLE EFFECT ---------- */
document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('ripple-btn')) return;
  const btn = e.target;
  const circle = document.createElement('span');
  circle.className = 'ripple-circle';
  btn.appendChild(circle);
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  circle.style.width = circle.style.height = d + 'px';
  const rect = btn.getBoundingClientRect();
  circle.style.left = e.clientX - rect.left - d/2 + 'px';
  circle.style.top = e.clientY - rect.top - d/2 + 'px';
  setTimeout(() => circle.remove(), 600);
});

/* ---------- MINI TOAST NOTIFICATIONS ---------- */
function showToast(message, duration = 2200) {
  const toast = document.createElement('div');
  toast.className = 'mini-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 50);
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ---------- STICKY SIDEBAR DEMO ---------- */
const stickySidebar = $qs('.sticky-sidebar');
if (stickySidebar) {
  const stickyOffset = stickySidebar.offsetTop;
  window.addEventListener('scroll', () => {
    if (window.scrollY > stickyOffset) {
      stickySidebar.classList.add('fixed');
    } else {
      stickySidebar.classList.remove('fixed');
    }
  });
}

/* ---------- HERO TEXT TYPING ANIMATION ---------- */
const typingEls = $qsa('.type-text');
typingEls.forEach(el => {
  const text = el.dataset.text || el.textContent;
  el.textContent = '';
  let index = 0;
  function typeChar() {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, 80);
    }
  }
  setTimeout(typeChar, 500);
});

/* ---------- SCROLL REVEAL FOR MULTIPLE ELEMENTS ---------- */
function scrollRevealAll(selector, offset = 60) {
  $qsa(selector).forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - offset) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', () => scrollRevealAll('.reveal'));
scrollRevealAll('.reveal');

/* ---------- INTERACTIVE ICONS HOVER COLOR ---------- */
$qsa('.icon-hover').forEach(icon => {
  icon.addEventListener('mouseenter', () => icon.style.color = randomColor());
  icon.addEventListener('mouseleave', () => icon.style.color = '');
});

/* ---------- IMAGE ZOOM ON SCROLL ---------- */
$qsa('.zoom-scroll').forEach(img => {
  window.addEventListener('scroll', () => {
    const top = img.getBoundingClientRect().top;
    const vh = window.innerHeight;
    if (top < vh) {
      img.style.transform = `scale(${1 + (vh - top)/800})`;
      img.style.transition = 'transform 0.3s';
    }
  });
});

/* ---------- FLOATING BUTTON BOUNCE ---------- */
const floatBtns = $qsa('.float-btn');
floatBtns.forEach(btn => {
  let pos = 0;
  setInterval(() => {
    pos = pos === 0 ? -6 : 0;
    btn.style.transform = `translateY(${pos}px)`;
  }, 700);
});

/* ---------- MODAL IMAGE SLIDER (NEXT/PREV) ---------- */
const modalNext = $qs('#modalNext');
const modalPrev = $qs('#modalPrev');
let modalImages = $qsa('.project-card img');
let currentIndex = 0;

function updateModalImage(idx) {
  if (!modalImages[idx]) return;
  modalImage.src = modalImages[idx].src;
  currentIndex = idx;
}

if (modalNext) {
  modalNext.addEventListener('click', () => updateModalImage((currentIndex + 1) % modalImages.length));
}
if (modalPrev) {
  modalPrev.addEventListener('click', () => updateModalImage((currentIndex - 1 + modalImages.length) % modalImages.length));
}

/* ---------- PAGE LOADING PROGRESS BAR ---------- */
const progBar = $qs('#pageProgress');
window.addEventListener('scroll', () => {
  if (!progBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progBar.style.width = scrollPercent + '%';
});

/* ---------- INTERACTIVE SERVICE CARDS ---------- */
$qsa('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('active'));
  card.addEventListener('mouseleave', () => card.classList.remove('active'));
});

/* ---------- PORTFOLIO CARD FOCUS EFFECT ---------- */
$qsa('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    $qsa('.project-card').forEach(c => c.classList.remove('focused'));
    card.classList.add('focused');
  });
});

/* ---------- ADDITIONAL UTILITY: RANDOM ROTATION ---------- */
function randomRotation(el, degMax = 10) {
  const deg = Math.random() * degMax * 2 - degMax;
  el.style.transform = `rotate(${deg}deg)`;
}
$qsa('.rotate-card').forEach(card => randomRotation(card));

/* ---------- END OF JAVASCRIPT 1000+ LINES ---------- */

