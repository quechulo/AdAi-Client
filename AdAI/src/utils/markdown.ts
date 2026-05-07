import MarkdownIt from 'markdown-it'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import DOMPurify from 'dompurify'

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true,
})

md.use(markdownItLinkAttributes, {
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer'
  }
})

/**
 * Renders markdown string to safe HTML
 * @param markdown - The markdown string to render
 * @returns Sanitized HTML string safe for v-html
 */
export function renderMarkdown(markdown: string): string {
  const rawHtml = md.render(markdown)
  
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'blockquote',
      'a',
      'hr',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  })
  
  return cleanHtml
}
