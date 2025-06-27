export type Theme = "light" | "dark";

const primaryColorScheme: Theme = "light";

// Get theme data from local storage
const currentTheme = ((): Theme | null => {
  const localTheme = localStorage.getItem("theme");
  if (localTheme && (localTheme === "light" || localTheme === "dark")) {
    return localTheme as Theme;
  }
  return null;
})();

export const getPreferTheme = (): Theme => {
  // return theme value in local storage if it is set
  if (currentTheme) {
    return currentTheme as Theme;
  }
  // return primary color scheme if it is set
  if (primaryColorScheme) {
    return primaryColorScheme;
  }
  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : ("light" as Theme);
};

const reflectPreference = (): void => {
  document.firstElementChild?.setAttribute("data-theme", themeValue);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);
  const menuThemeBtn = document.querySelector("#menu-theme-btn");
  if (menuThemeBtn) {
    const isLight = themeValue === "light";
    const ariaLabel = isLight ? "Turn Light Mode On" : "Turn Dark Mode On";
    menuThemeBtn.setAttribute("aria-label", ariaLabel);
    menuThemeBtn.textContent = isLight
      ? "Turn Dark Mode On"
      : "Turn Light Mode On";
  }
  // Get a reference to the body element
  const body = document.body;
  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);
    // Get the background color property
    const bgColor = computedStyles.backgroundColor;
    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
};

let themeValue = getPreferTheme();

const setPreference = (): void => {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
};

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  const setThemeFeature = () => {
    // set on load so screen readers can get the latest value on the button.
    reflectPreference();
    const themeClickEvent = () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference();
    };
    // now this script can find and listen for clicks on the control.
    document
      .querySelector("#theme-btn")
      ?.addEventListener("click", themeClickEvent);
    document
      .querySelector("#menu-theme-btn")
      ?.addEventListener("click", themeClickEvent);
  };

  setThemeFeature();
  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// to avoid navigation bar color flickering in Android dark mode
document.addEventListener("astro:before-swap", event => {
  const bgColor = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");

  if (bgColor) {
    event.newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
});

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
