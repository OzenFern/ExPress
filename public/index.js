"use strict";

// Toggle theme of document
const html = document.documentElement;
const darkIcon = document.querySelector("#moon-icon");
const lightIcon = document.querySelector("#sun-icon");
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
  darkIcon.classList.toggle("d-none");
  lightIcon.classList.toggle("d-none");
  const newTheme = html.getAttribute("data-bs-theme");
  if (newTheme === "dark") {
    html.setAttribute("data-bs-theme", "light");
  } else {
    html.setAttribute("data-bs-theme", "dark");
  }
});

// Form Validation by Bootstrap
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// Live Form Validation
const title = document.querySelector("input[name='title']");
const blurb = document.querySelector("textarea[name='blurb']");
const content = document.querySelector("textarea[name='content']");
const titleCount = document.getElementById("title-count");
const blurbCount = document.getElementById("blurb-count");
const contentCount = document.getElementById("content-count");
const form = document.getElementById("post-form");

// Focus on next element on Enter
[title, blurb].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (input === title) {
        blurb.focus();
      } else if (input === blurb) {
        content.focus();
      }
    }
  });
});

// Live Form Validation
function setValidity(el, isValid) {
  // Helper Function for Validity
  el.classList.toggle("is-valid", isValid);
  el.classList.toggle("is-invalid", !isValid);
}

function validateTitle() {
  const len = title.value.trim().length;
  const valid = len >= 3 && len <= 100;
  setValidity(title, valid);

  return valid;
}

function validateBlurb() {
  const len = blurb.value.trim().length;
  const valid = len >= 10 && len <= 180;
  setValidity(blurb, valid);
  return valid;
}

function validateContent() {
  const len = content.value.trim().length;
  const valid = len >= 30;

  setValidity(content, valid);
  return valid;
}

// Updating character count
function updateCounter(el, counter) {
  // Helper function for counters
  counter.textContent = el.value.trim().length;
}

// Add Event Listeners
title.addEventListener("input", () => {
  updateCounter(title, titleCount);
  validateTitle();
});
blurb.addEventListener("input", () => {
  updateCounter(blurb, blurbCount);
  validateBlurb();
});
content.addEventListener("input", () => {
  updateCounter(content, contentCount);
  validateContent();
});

// Disable submit if input is not valid
form.addEventListener("submit", (e) => {
  const ok = validateTitle() && validateBlurb() && validateContent();

  if (!ok) e.preventDefault();
});
