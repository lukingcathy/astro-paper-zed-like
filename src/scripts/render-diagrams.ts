// Source: https://github.com/JuanM04/portfolio/blob/983b0ed0eabdac37bf8b7912d3e8128a443192b9/src/pages/docs/%5B...documentSlug%5D.astro#L74-L103
// From this comment: https://github.com/withastro/astro/issues/4433#issuecomment-1584019991

async function renderDiagrams(graphs: HTMLCollectionOf<Element>) {
  if (!graphs || graphs.length === 0) {
    return;
  }
  const { default: mermaid } = await import("mermaid");
  mermaid.initialize({
    themeCSS: "width: 100%; height: auto;",
    startOnLoad: false,
    fontFamily: "var(--sans-font)",
    // @ts-ignore This works, but TS expects a enum for some reason
    theme: "base",
  });

  for (const graph of graphs) {
    const mermaidPre = graph.querySelector(".src");
    if (!mermaidPre) {
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
        graph.innerHTML = result.svg;
        graph.setAttribute("data-status", "rendered");
      })
      .catch(error => {
        graph.innerHTML = error;
        graph.setAttribute("data-status", "error");
      });
  }
}

renderDiagrams(document.getElementsByClassName("mermaid"));
