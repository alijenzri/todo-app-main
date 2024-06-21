document.addEventListener("DOMContentLoaded", () => {
    const themeToggleIcon = document.querySelector(".theme-toggle-icon");
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
        themeToggleIcon.src = "images/icon-sun.svg";
    } else {
        themeToggleIcon.src = "images/icon-moon.svg";
    }

    themeToggleIcon.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            themeToggleIcon.src = "images/icon-sun.svg";  
        } else {
            themeToggleIcon.src = "images/icon-moon.svg"; 
        }
    });
});
