// Remark plugin to transform Mermaid codeblocks in Markdown
// into HTML divs with the raw Mermaid code in data attribute
// Adapted from https://github.com/JuanM04/portfolio/blob/983b0ed0eabdac37bf8b7912d3e8128a443192b9/src/plugins/mermaid.ts

import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

const escapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (str: string) => str.replace(/[&<>"']/g, c => escapeMap[c]);

export const remarkMermaid: RemarkPlugin<[]> = () => tree => {
  visit(tree, "code", node => {
    if (node.lang !== "mermaid") {
      return;
    }
    const escapeSrc = escapeHtml(node.value);
    // @ts-ignore
    node.type = "html";
    node.value = `<div class="mermaid" data-status="loading"><p>Loading graph...</p><pre class="src" data-mermaid-src>${escapeSrc}</pre></div>`;
  });
};
