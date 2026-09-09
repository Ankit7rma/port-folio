import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;
  const offset = 100;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }

  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";

    const elementPosition =
      this.parentNode.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");
    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

const swiperPortfolio = new Swiper(".portfolio__container", {
  loop: true,
  loopAdditionalSlides: 3,
  slidesPerView: 1,
  spaceBetween: 3500,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
  threshold: 20,
  on: {
    reachBeginning: function () {
      this.loopDestroy();
      this.loopCreate();
    },
    reachEnd: function () {
      this.loopDestroy();
      this.loopCreate();
    },
  },
});

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 80) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollUp);

function scrollUp1() {
  const scrollUp = document.getElementById("scroll-up1");
  if (this.scrollY >= 80) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollUp1);

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

async function elizaResponse(message) {
  let conversationHistory =
    JSON.parse(sessionStorage.getItem("conversationHistory")) || [];
  let fullResponse = "Loading...";

  try {
    const genAI = new GoogleGenerativeAI(getAIResponse());
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are an AI personal assistant for Ankit Sharma. Use the following resume information to answer questions - people might ask about his experience, qualifications, or projects. " +
        "SUMMARY: Ankit Sharma is a Full-Stack Software Engineer who builds and owns end-to-end production systems, from payment and approval workflows to video-content platforms, using React/Next.js, Node.js, and PostgreSQL. " +
        "CONTACT: Email ankitsharma290101@gmail.com, Phone +91 97821 72907, LinkedIn linkedin.com/in/ankit7rma, GitHub github.com/Ankit7rma, Location Gurugram, Haryana, India. " +
        "EXPERIENCE 1 - Infollion Research Services (Software Engineer, Dec 2025 - Present, Gurugram, Hybrid): Architected and owned a business-critical internal payments platform end-to-end - built the React frontend, Node.js/REST APIs, and PostgreSQL schema for expert onboarding, bank verification, multi-level approvals, and payment-request processing. Owned end-to-end delivery of an independent knowledge-sharing platform enabling experts to create, manage, and publish video-based educational content, designing scalable frontend components, backend services, and data models. Built a content-publishing pipeline for video recording ingestion, automated transcript generation, and marketplace publishing, and resolved high-priority production incidents to improve backend reliability. " +
        "EXPERIENCE 2 - Codegnan IT Solutions (Full Stack Developer & Mentor, Sep 2024 - Oct 2025, Hyderabad, On-Site): Built and optimized core EdTech modules (authentication, course management, student dashboards) with React and TypeScript, improving page load times by ~45%. Designed an automated quiz and grading system with manual-override support, cutting instructor grading effort by roughly half. Mentored 700+ students in full-stack development, guiding them from fundamentals to deploying production-ready applications. " +
        "EXPERIENCE 3 - Meta16Labs (Software Developer, Feb 2024 - Sep 2024, Bengaluru, Hybrid): Designed a config-driven UI architecture for a healthcare management platform, reducing feature-development effort and letting workflows be reconfigured without code changes. Enabled offline-capable deployments with Docker for client sites with unreliable connectivity, improving deployment reliability and reducing on-site downtime. " +
        "EXPERIENCE 4 - Larsen & Toubro (Graduate Engineer Trainee to Senior Engineer, Jul 2022 - Jan 2024, Mumbai, On-Site): Validated design documents and drawings within the design team before release to planning and execution, and supported digital applications used for material monitoring and progress reporting on the Mumbai Coastal Road Project. " +
        "EDUCATION: Jamia Millia Islamia, New Delhi - Bachelor of Technology (B.Tech), CGPA 8.4, Aug 2018 - Jul 2022. " +
        "NOTABLE PROJECTS: (1) Weave - E2E Encrypted Collaborative Editor (2026): A local-first collaborative editor built with Yjs CRDTs for conflict-free real-time editing, y-indexeddb offline sync, and end-to-end AES-GCM encryption - the self-hosted sync server only holds opaque ciphertext. Ships JWT-auth workspaces with 4-role WebSocket permissions, threaded comments, version history, a knowledge-graph view, and Redis pub/sub fan-out for horizontally-scaled sync. (2) Vaulty - Zero-Knowledge Password Manager (2026): A zero-knowledge vault with client-side AES-GCM encryption and an Argon2id-derived key, so the server only stores opaque ciphertext. Ships encrypted item CRUD, TOTP generation, HIBP breach checks via k-anonymity, one-time secure sharing, and idle auto-lock, backed by Playwright E2E tests and CI. " +
        "SKILLS: Languages - JavaScript, TypeScript, Python, SQL. Frontend - React.js, Next.js, Redux, Tailwind CSS, HTML5, CSS3. Backend - Node.js, Express.js, FastAPI, REST APIs. Databases - PostgreSQL, MongoDB, Prisma (ORM), Redis. DevOps & Tools - Docker, Git & GitHub, GitHub Actions, Postman, JWT, OAuth.",
    });

    conversationHistory.push({ role: "user", parts: [{ text: message }] });

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
      history: conversationHistory,
    });

    const result = await chatSession.sendMessage(message);
    fullResponse = result.response.text();
    conversationHistory.push({
      role: "model",
      parts: [{ text: fullResponse }],
    });

    sessionStorage.setItem(
      "conversationHistory",
      JSON.stringify(conversationHistory)
    );
    console.log(conversationHistory);
  } catch (error) {
    console.error("Error fetching response:", error.message);
    fullResponse =
      "An error occurred while generating the response, possibly due to high traffic or safety concerns. I apologize for any inconvenience caused. Please try again with a different query or contact MovieVerse support for further assistance.";
  }

  return removeMarkdown(fullResponse);
}

function getAIResponse() {
  const response = "QUl6YVN5Q1RoUWVFdmNUb01ka0NqWlM3UTNxNzZBNUNlNjVyMW9r";
  return atob(response);
}

function removeMarkdown(text) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(text);
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

const chatbotInput = document.getElementById("chatbotInput");
const chatbotBody = document.getElementById("chatbotBody");

chatbotInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage(chatbotInput.value);
    chatbotInput.value = "";
  }
});

async function sendMessage(message) {
  chatbotBody.innerHTML += `
    <div style="text-align: right; margin-bottom: 10px; color: white;">${message}</div>
  `;

  const loadingElement = document.createElement("div");
  loadingElement.style.textAlign = "left";
  loadingElement.style.marginBottom = "10px";
  loadingElement.style.color = "white";
  chatbotBody.appendChild(loadingElement);

  let dotCount = 0;

  let loadingInterval = setInterval(() => {
    loadingElement.textContent = "Loading" + ".".repeat(dotCount);
    dotCount = (dotCount + 1) % 4;
  }, 500);

  let botReply = await elizaResponse(message);

  clearInterval(loadingInterval);
  loadingElement.textContent = botReply;
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

document
  .getElementById("minimizeButton")
  .addEventListener("click", function () {
    const chatbotBody = document.getElementById("chatbotBody");
    const chatbotInput = document.getElementById("chatbotInput");

    if (chatbotBody.style.display !== "none") {
      chatbotBody.style.display = "none";
      chatbotInput.style.display = "none";
    } else {
      chatbotBody.style.display = "";
      chatbotInput.style.display = "";
    }
  });

const chatbotContainer = document.getElementById("chatbotContainer");

window.onload = function () {
  chatbotContainer.style.display = "none";
  chatbotBody.style.display = "none";
  chatbotInput.style.display = "none";
};

const backToTopButton = document.getElementById("back-to-top");

backToTopButton.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

window.addEventListener("scroll", function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    chatbotContainer.style.display = "block";
    backToTopButton.style.bottom = "10px";
  } else {
    chatbotContainer.style.display = "none";
    backToTopButton.style.bottom = "-20%";
  }
});

window.addEventListener("resize", checkModalHeight);
document.addEventListener("DOMContentLoaded", checkModalHeight);

function checkModalHeight() {
  let modalContent = document.querySelector(".services__modal-content");
  if (!modalContent) return;

  let windowHeight = window.innerHeight;
  let modalContentHeight = modalContent.scrollHeight;

  if (modalContentHeight > windowHeight) {
    modalContent.style.overflowY = "scroll";
  } else {
    modalContent.style.overflowY = "hidden";
  }
}

document.addEventListener("scroll", function () {
  let scrollUpButton = document.getElementById("back-to-top");
  let footer = document.querySelector("footer");

  let footerPosition = footer.getBoundingClientRect().top + window.scrollY;
  let scrollPosition = window.scrollY + window.innerHeight;

  if (scrollPosition >= footerPosition) {
    scrollUpButton.style.color = "white";
  } else {
    scrollUpButton.style.color = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let chatbotContainer = document.getElementById("chatbotContainer");
  let minimizeButton = document.getElementById("minimizeButton");

  minimizeButton.addEventListener("click", function () {
    if (chatbotContainer.classList.contains("minimized")) {
      chatbotContainer.classList.remove("minimized");
      minimizeButton.innerHTML = "+";
    } else {
      chatbotContainer.classList.add("minimized");
      minimizeButton.innerHTML = "-";
    }
  });
});
