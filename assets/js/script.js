import INFO from "../../data/user.js";

("use strict");

// element toggle function
const elementToggleFunc = function (elem) {
	elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
	elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
	modalContainer.classList.toggle("active");
	overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
	testimonialsItem[i].addEventListener("click", function () {
		modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
		modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
		modalTitle.innerHTML = this.querySelector(
			"[data-testimonials-title]"
		).innerHTML;
		modalText.innerHTML = this.querySelector(
			"[data-testimonials-text]"
		).innerHTML;

		testimonialsModalFunc();
	});
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
	elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
	selectItems[i].addEventListener("click", function () {
		let selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		elementToggleFunc(select);
		filterFunc(selectedValue);
	});
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
	for (let i = 0; i < filterItems.length; i++) {
		if (selectedValue === "all") {
			filterItems[i].classList.add("active");
		} else if (selectedValue === filterItems[i].dataset.category) {
			filterItems[i].classList.add("active");
		} else {
			filterItems[i].classList.remove("active");
		}
	}
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
	filterBtn[i].addEventListener("click", function () {
		let selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		filterFunc(selectedValue);

		lastClickedBtn.classList.remove("active");
		this.classList.add("active");
		lastClickedBtn = this;
	});
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener("input", function () {
		// check form validation
		if (form.checkValidity()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}
	});
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
	navigationLinks[i].addEventListener("click", function () {
		for (let i = 0; i < pages.length; i++) {
			if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				pages[i].classList.add("active");
				navigationLinks[i].classList.add("active");
				window.scrollTo(0, 0);
			} else {
				pages[i].classList.remove("active");
				navigationLinks[i].classList.remove("active");
			}
		}
	});
}

// Função para popular os dados do usuário
function populateUserData() {
	// Dados principais
	document.title = INFO.main.title;
	document.querySelector(".info-content .name").textContent = INFO.main.name;
	document.querySelector('.contact-link[href^="mailto"]').textContent =
		INFO.main.email;
	document.querySelector('.contact-link[href^="https://wa.me/"]').textContent =
		INFO.main.phone;
	document.querySelector(".contact-item .location").textContent =
		INFO.main.location;

	// Links sociais
	const socialLinks = document.querySelectorAll(".social-link");
	socialLinks.forEach((link) => {
		const icon = link.querySelector("ion-icon").name;
		switch (icon) {
			case "logo-github":
				link.href = INFO.socials.github;
				break;
			case "logo-linkedin":
				link.href = INFO.socials.linkedin;
				break;
			case "logo-twitter":
				link.href = INFO.socials.twitter;
				break;
			case "logo-instagram":
				link.href = INFO.socials.instagram;
				break;
		}
	});

	// Sobre
	const aboutText = document.querySelector(".about-text");
	aboutText.innerHTML = `
    <p>${INFO.about.description}</p>
  `;

	/* // Experiência
  const timelineList = document.querySelector(".timeline-list");
  INFO.resume.experience.forEach((exp) => {
    const li = document.createElement("li");
    li.className = "timeline-item";
    li.innerHTML = `
      <h4 class="h4 timeline-item-title">${exp.role} at ${exp.company}</h4>
      <span>${exp.from} — ${exp.to}</span>
    `;
    timelineList.appendChild(li);
  }); */

	/*   // Habilidades
  const skillsList = document.querySelector(".skills-list");
  INFO.resume.skills.hardSkills.forEach((skill) => {
    const li = document.createElement("li");
    li.className = "skills-item";
    li.innerHTML = `
      <div class="title-wrapper">
        <h5 class="h5">${skill}</h5>
        <data value="80">80%</data>
      </div>
      <div class="skill-progress-bg">
        <div class="skill-progress-fill" style="width: 80%;"></div>
      </div>
    `;
    skillsList.appendChild(li);
  }); */
}

// Função para popular os dados de educação
function populateEducation() {
	const educationList = document.querySelector(".timeline-list");
	// Limpa a lista atual
	educationList.innerHTML = "";

	// Adiciona cada item de educação do INFO.resume.education
	INFO.resume.education.forEach((edu) => {
		const li = document.createElement("li");
		li.className = "timeline-item";

		li.innerHTML = `
      <h4 class="h4 timeline-item-title">${edu.institution}</h4>
      <span>${edu.from} — ${edu.to}</span>
      <p class="timeline-text">${edu.degree}</p>
    `;

		educationList.appendChild(li);
	});
}

// Função para popular os dados de experiência
function populateExperience() {
	// Seleciona a lista de experiências
	const experienceList = document.querySelector(
		".timeline:nth-of-type(2) .timeline-list"
	);

	// Limpa o conteúdo atual
	experienceList.innerHTML = "";

	// Para cada experiência no objeto INFO
	INFO.resume.experience.forEach((exp) => {
		const li = document.createElement("li");
		li.className = "timeline-item";

		li.innerHTML = `
      <h4 class="h4 timeline-item-title">${exp.company}</h4>
      <span>${exp.from} — ${exp.to}</span>
      <p class="timeline-text">
        ${exp.role}
      </p>
    `;

		experienceList.appendChild(li);
	});
}

// Chame a função quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
	populateUserData();
	populateEducation();
	populateExperience();
});
