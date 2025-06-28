// Source: https://github.com/JuanM04/portfolio/blob/983b0ed0eabdac37bf8b7912d3e8128a443192b9/src/pages/docs/%5B...documentSlug%5D.astro#L74-L103
// From this comment: https://github.com/withastro/astro/issues/4433#issuecomment-1584019991

import { getPreferTheme } from "./toggle-theme";

const renderDiagrams = async (
  graphs: HTMLCollectionOf<Element>,
  theme: string
): Promise<void> => {
  if (!graphs || graphs.length === 0) {
    return;
  }
  const { default: mermaid } = await import("mermaid");
  const { SvgToolbelt } = await import("svg-toolbelt");
  await import("svg-toolbelt/dist/svg-toolbelt.css");

  const mermaidTheme = theme === "dark" ? "dark" : "base";
  mermaid.initialize({
    themeCSS: "width: 100%; height: auto;",
    startOnLoad: false,
    fontFamily: "var(--sans-font)",
    theme: mermaidTheme,
  });

  const domParser = new DOMParser();

  for (const graph of graphs) {
    const mermaidPre = graph.querySelector(".src");
    const mermaidPrompt = graph.querySelector(".prompt");
    if (!mermaidPre || !mermaidPrompt) {
      continue;
    }
    const content = mermaidPre.textContent;
    if (!content) {
      continue;
    }
    const id = "mermaid-" + Math.round(Math.random() * 100000);
    mermaid
      .render(id, content)
      .then(result => {
        const doc = domParser.parseFromString(result.svg, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (svg) {
          mermaidPrompt.classList["add"]("hidden");
          mermaidPre.classList["add"]("hidden");
          const oldSvg = graph.querySelectorAll(
            "svg, .svg-toolbelt-controls, .svg-toolbelt-zoom-indicator"
          );
          oldSvg.forEach(e => {
            e.remove();
          });
          graph.appendChild(svg);
          const svgToolbelt = new SvgToolbelt(graph as HTMLElement, {
            minScale: 0.2,
            maxScale: 8,
            controlsPosition: "top-right",
            enableKeyboard: true,
          });
          svgToolbelt.init();
        }
        graph.setAttribute("data-status", "rendered");
      })
      .catch(error => {
        graph.innerHTML = error;
        graph.setAttribute("data-status", "error");
      });
  }
};

renderDiagrams(document.getElementsByClassName("mermaid"), getPreferTheme());

const themeObserver = async (): Promise<void> => {
  const target = document.firstElementChild;
  if (!target) {
    return;
  }

  const callback = (mutations: MutationRecord[]) => {
    mutations.forEach(mutation => {
      if (
        mutation.type === "attributes" ||
        mutation.attributeName === "data-theme"
      ) {
        const newTheme = target.getAttribute("data-theme");
        if (newTheme) {
          renderDiagrams(document.getElementsByClassName("mermaid"), newTheme);
        }
      }
    });
  };

  const observer = new MutationObserver(callback);

  observer.observe(target, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
};

themeObserver();

/**
 * Go to page start after page swap
 */
document.addEventListener("astro:after-swap", () =>
  renderDiagrams(document.getElementsByClassName("mermaid"), getPreferTheme())
);

document.addEventListener("astro:page-load", () =>
  renderDiagrams(document.getElementsByClassName("mermaid"), getPreferTheme())
);
