/**
 * Lightweight Lexical JSON → HTML converter for Astro.
 * Handles the common node types produced by Payload's Lexical editor.
 */

interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  tag?: string;
  url?: string;
  newTab?: boolean;
  listType?: string;
  value?: string | number;
  fields?: { url?: string; newTab?: boolean; linkType?: string; doc?: { slug?: string } };
  [key: string]: unknown;
}

const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_STRIKETHROUGH = 4;
const FORMAT_UNDERLINE = 8;
const FORMAT_CODE = 16;
const FORMAT_SUBSCRIPT = 32;
const FORMAT_SUPERSCRIPT = 64;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderText(node: LexicalNode): string {
  let html = escapeHtml(node.text ?? '');
  const fmt = typeof node.format === 'number' ? node.format : 0;

  if (fmt & FORMAT_BOLD) html = `<strong>${html}</strong>`;
  if (fmt & FORMAT_ITALIC) html = `<em>${html}</em>`;
  if (fmt & FORMAT_UNDERLINE) html = `<u>${html}</u>`;
  if (fmt & FORMAT_STRIKETHROUGH) html = `<s>${html}</s>`;
  if (fmt & FORMAT_CODE) html = `<code>${html}</code>`;
  if (fmt & FORMAT_SUBSCRIPT) html = `<sub>${html}</sub>`;
  if (fmt & FORMAT_SUPERSCRIPT) html = `<sup>${html}</sup>`;

  return html;
}

function renderChildren(children?: LexicalNode[]): string {
  if (!children) return '';
  return children.map(renderNode).join('');
}

function alignmentStyle(node: LexicalNode): string {
  if (node.format === 'center') return ' style="text-align:center"';
  if (node.format === 'right') return ' style="text-align:right"';
  if (node.format === 'justify') return ' style="text-align:justify"';
  return '';
}

function renderNode(node: LexicalNode): string {
  switch (node.type) {
    case 'text':
      return renderText(node);

    case 'linebreak':
      return '<br />';

    case 'paragraph':
      return `<p${alignmentStyle(node)}>${renderChildren(node.children)}</p>`;

    case 'heading': {
      const tag = node.tag || 'h2';
      return `<${tag}${alignmentStyle(node)}>${renderChildren(node.children)}</${tag}>`;
    }

    case 'quote':
      return `<blockquote>${renderChildren(node.children)}</blockquote>`;

    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul';
      return `<${tag}>${renderChildren(node.children)}</${tag}>`;
    }

    case 'listitem':
      return `<li>${renderChildren(node.children)}</li>`;

    case 'link':
    case 'autolink': {
      const url = node.fields?.url || node.url || '#';
      const target = (node.fields?.newTab || node.newTab) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${escapeHtml(url)}"${target}>${renderChildren(node.children)}</a>`;
    }

    case 'upload': {
      const src = (node.value as any)?.url || '';
      const alt = (node.value as any)?.alt || '';
      if (!src) return '';
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
    }

    case 'horizontalrule':
      return '<hr />';

    case 'tab':
      return '&emsp;';

    default:
      // Unknown node type — render children if any
      if (node.children) return renderChildren(node.children);
      return '';
  }
}

/** Convert Lexical editor JSON to HTML string. */
export function lexicalToHtml(content: unknown): string {
  if (!content || typeof content !== 'object') return '';

  const root = (content as { root?: LexicalNode }).root;
  if (!root?.children) return '';

  return renderChildren(root.children);
}
