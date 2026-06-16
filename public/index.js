const html = document.documentElement;
const darkIcon = document.querySelector("#moon-icon");
const lightIcon = document.querySelector("#sun-icon");
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", ()=>{
    darkIcon.classList.toggle("d-none");
    lightIcon.classList.toggle("d-none");
    const newTheme = html.getAttribute("data-bs-theme");
    if (newTheme === "dark") {
        html.setAttribute("data-bs-theme", "light");
    } else {
        html.setAttribute("data-bs-theme", "dark");
    }
});
