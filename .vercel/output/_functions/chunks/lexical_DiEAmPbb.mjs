const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_STRIKETHROUGH = 4;
const FORMAT_UNDERLINE = 8;
const FORMAT_CODE = 16;
const FORMAT_SUBSCRIPT = 32;
const FORMAT_SUPERSCRIPT = 64;
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderText(node) {
  let html = escapeHtml(node.text ?? "");
  const fmt = typeof node.format === "number" ? node.format : 0;
  if (fmt & FORMAT_BOLD) html = `<strong>${html}</strong>`;
  if (fmt & FORMAT_ITALIC) html = `<em>${html}</em>`;
  if (fmt & FORMAT_UNDERLINE) html = `<u>${html}</u>`;
  if (fmt & FORMAT_STRIKETHROUGH) html = `<s>${html}</s>`;
  if (fmt & FORMAT_CODE) html = `<code>${html}</code>`;
  if (fmt & FORMAT_SUBSCRIPT) html = `<sub>${html}</sub>`;
  if (fmt & FORMAT_SUPERSCRIPT) html = `<sup>${html}</sup>`;
  return html;
}
function renderChildren(children) {
  if (!children) return "";
  return children.map(renderNode).join("");
}
function alignmentStyle(node) {
  if (node.format === "center") return ' style="text-align:center"';
  if (node.format === "right") return ' style="text-align:right"';
  if (node.format === "justify") return ' style="text-align:justify"';
  return "";
}
function renderNode(node) {
  switch (node.type) {
    case "text":
      return renderText(node);
    case "linebreak":
      return "<br />";
    case "paragraph":
      return `<p${alignmentStyle(node)}>${renderChildren(node.children)}</p>`;
    case "heading": {
      const tag = node.tag || "h2";
      return `<${tag}${alignmentStyle(node)}>${renderChildren(node.children)}</${tag}>`;
    }
    case "quote":
      return `<blockquote>${renderChildren(node.children)}</blockquote>`;
    case "list": {
      const tag = node.listType === "number" ? "ol" : "ul";
      return `<${tag}>${renderChildren(node.children)}</${tag}>`;
    }
    case "listitem":
      return `<li>${renderChildren(node.children)}</li>`;
    case "link":
    case "autolink": {
      const url = node.fields?.url || node.url || "#";
      const target = node.fields?.newTab || node.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeHtml(url)}"${target}>${renderChildren(node.children)}</a>`;
    }
    case "upload": {
      const src = node.value?.url || "";
      const alt = node.value?.alt || "";
      if (!src) return "";
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
    }
    case "horizontalrule":
      return "<hr />";
    case "tab":
      return "&emsp;";
    default:
      if (node.children) return renderChildren(node.children);
      return "";
  }
}
function lexicalToHtml(content) {
  if (!content || typeof content !== "object") return "";
  const root = content.root;
  if (!root?.children) return "";
  return renderChildren(root.children);
}

export { lexicalToHtml as l };
