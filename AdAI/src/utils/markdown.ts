import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

// Configure markdown-it with basic CommonMark settings
const md = new MarkdownIt({
  html: false, // Disable HTML tags in source for security
  breaks: true, // Convert \n to <br>
  linkify: true, // Auto-convert URLs to links
  typographer: true, // Enable smart quotes and other typographic replacements
})

/**
 * Renders markdown string to safe HTML
 * @param markdown - The markdown string to render
 * @returns Sanitized HTML string safe for v-html
 */
export function renderMarkdown(markdown: string): string {
  // First, render markdown to HTML
  const rawHtml = md.render(markdown)
  
  // Then sanitize the HTML with DOMPurify
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
