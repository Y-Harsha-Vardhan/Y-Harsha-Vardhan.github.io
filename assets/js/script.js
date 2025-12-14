'use strict';

/* -----------------------------
   Utility
------------------------------ */
const elementToggleFunc = elem => elem.classList.toggle("active");

/* -----------------------------
   Sidebar
------------------------------ */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

/* -----------------------------
   Testimonials (SAFE – optional)
------------------------------ */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (
  testimonialsItem.length &&
  modalContainer &&
  modalCloseBtn &&
  overlay &&
  modalImg &&
  modalTitle &&
  modalText
) {
  const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItem.forEach(item => {
    item.addEventListener("click", () => {
      modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  });

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

/* -----------------------------
   Custom Select & Filters
------------------------------ */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));
}

const filterFunc = selectedValue => {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

/* -----------------------------
   Contact Form Validation
------------------------------ */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

/* -----------------------------
   Page Navigation (FIXED)
------------------------------ */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.innerText.toLowerCase();

    pages.forEach(page => {
      page.classList.toggle(
        "active",
        page.dataset.page === targetPage
      );
    });

    navigationLinks.forEach(nav => nav.classList.remove("active"));
    link.classList.add("active");

    window.scrollTo(0, 0);
  });
});

form.addEventListener("submit", async e => {
  e.preventDefault();

  const response = await fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" }
  });

  if (response.ok) {
    form.reset();
    document.querySelector(".form-success").hidden = false;
    formBtn.setAttribute("disabled", "");
  }
});
