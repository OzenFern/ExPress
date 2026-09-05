"use strict";

const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#site-navigation");

const storedTheme = window.localStorage.getItem("express-theme");
if (storedTheme) root.dataset.theme = storedTheme;

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  window.localStorage.setItem("express-theme", nextTheme);
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${nextTheme === "dark" ? "light" : "dark"} theme`,
  );
});

menuToggle?.addEventListener("click", () => {
  const isOpen = navigation?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navigation.classList.remove("is-open"));
});

const forms = document.querySelectorAll(".needs-validation");
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.classList.add("was-validated");
    }
  });
});

const title = document.querySelector("input[name='title']");
const blurb = document.querySelector("textarea[name='blurb']");
const content = document.querySelector("textarea[name='content']");
const form = document.querySelector("#post-form");

const fields = [
  [
    title,
    document.querySelector("#title-count"),
    (length) => length >= 3 && length <= 100,
  ],
  [
    blurb,
    document.querySelector("#blurb-count"),
    (length) => length >= 10 && length <= 180,
  ],
  [content, document.querySelector("#content-count"), (length) => length >= 30],
];

const updateField = ([field, counter, isValid]) => {
  if (!field) return;
  const length = field.value.trim().length;
  if (counter) counter.textContent = length;
  field.classList.toggle("is-valid", isValid(length));
  field.classList.toggle("is-invalid", !isValid(length));
};

fields.forEach(([field]) =>
  field?.addEventListener("input", () =>
    updateField(fields.find(([item]) => item === field)),
  ),
);

[title, blurb].forEach((field, index) => {
  field?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      [blurb, content][index]?.focus();
    }
  });
});

form?.addEventListener("submit", (event) => {
  fields.forEach(updateField);
  if (
    fields.some(
      ([field, , isValid]) => field && !isValid(field.value.trim().length),
    )
  ) {
    event.preventDefault();
    form.classList.add("was-validated");
  }
});

document.querySelectorAll("[data-dismiss]").forEach((button) => {
  button.addEventListener("click", () =>
    button.closest("[data-dismissible]")?.remove(),
  );
});

document.querySelectorAll("[data-modal-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalOpen);
    modal?.classList.add("is-visible");
    modal?.querySelector("[data-modal-close]")?.focus();
  });
});

document.querySelectorAll("[data-modal-close]").forEach((button) => {
  button.addEventListener("click", () =>
    button.closest(".modal")?.classList.remove("is-visible"),
  );
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.remove("is-visible");
  });
});
