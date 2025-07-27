## Typography

**Brief description:**\
*A comprehensive typography system that provides consistent text styling with a hierarchical structure, clear visual hierarchy, and excellent readability across all interface elements.*

---

### ⚠️ Steering Notes (AI Priority)

- Always use semantic heading hierarchy (H1 → H2 → H3 → H4 → H5 → H6) - don't skip levels
- Use only one H1 per page for the main page title
- Apply typography tokens consistently - avoid custom font sizes or line heights
- Use appropriate text colors for content hierarchy (primary, secondary, tertiary)
- Use body text variants (.body-small, .body-x-small) for supporting content
- Maintain consistent spacing between text elements using spacing tokens
- Consider text readability on all background colors
- Use bold weight (700) only for headings and emphasis, normal weight (400) for body text
- Never use italics

---

### 🏦 Usage Instructions

The typography system establishes consistent text styling throughout the application using design tokens for font families, sizes, weights, and line heights. It follows a hierarchical structure that ensures readability and visual hierarchy.

**Typography Hierarchy:**
1. **H1**: Main page title (35px) - one per page
2. **H2**: Major section headings (28px)
3. **H3**: Subsection headings (24px)
4. **H4**: Content group headings (24px)
5. **H5**: Minor section headings (20px)
6. **H6**: Smallest headings (16px)

**Body Text Variants:**
- **Body**: Default content text (16px)
- **Body Small**: Secondary information (14px)
- **Body X-Small**: Tertiary details (12px)

**Dependencies:**
- `css/tokens/typography.css` - Typography design tokens
- `css/main.css` - Typography implementation styles
- Google Fonts (Lato family)
- Color tokens for text colors

**Font Loading:**
The system uses Lato as the primary font with system font fallbacks for reliability and performance.

---

### 🧱 HTML Variants

#### Variant: Heading Hierarchy

```html
<h1>Main Page Title</h1>
<p>Page description or introduction text.</p>

<h2>Major Section</h2>
<p>Section content with proper hierarchy.</p>

<h3>Subsection</h3>
<p>Subsection content maintaining structure.</p>

<h4>Content Group</h4>
<p>Content group information.</p>

<h5>Minor Section</h5>
<p>Minor section details.</p>

<h6>Smallest Heading</h6>
<p>Caption or label information.</p>
```

*Description: Complete heading hierarchy showing proper semantic structure.*

#### Variant: Body Text Variants

```html
<p>This is default body text (16px) used for main content throughout the application. It provides excellent readability with proper line height and spacing.</p>

<p class="body-small">This is small body text (14px) used for secondary information, captions, or supporting details that need less visual prominence.</p>

<p class="body-x-small">This is extra small body text (12px) used for fine print, metadata, timestamps, or other tertiary information that requires minimal space.</p>
```

*Description: Three body text sizes for different content importance levels.*

#### Variant: Text Color Hierarchy

```html
<p style="color: var(--color-text-primary);">Primary text color for main content and headings.</p>

<p style="color: var(--color-text-secondary);">Secondary text color for supporting information and descriptions.</p>

<p style="color: var(--color-text-tertiary);">Tertiary text color used for placeholder content ONLY.</p>

<p style="color: var(--color-text-disabled);">Disabled text color for inactive elements.</p>

<div style="background-color: var(--color-neutral-800); padding: 16px;">
    <p style="color: var(--color-text-inverse);">Inverse text color for dark backgrounds.</p>
</div>

<p><a href="#" style="color: var(--color-text-link);">Link text color</a> for interactive elements.</p>
```


*Description: Quoted content with proper typography treatment.*

---

### 🎯 Configuration Options

| Option | Type | Values / Example | Description |
|--------|------|------------------|-------------|
| Heading elements | HTML | `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` | Semantic heading hierarchy with automatic styling |
| Body text classes | class | `.body-small`, `.body-x-small` | Optional size variants for body text |
| Text color | CSS property | `var(--color-text-primary)`, `var(--color-text-secondary)` | Semantic text colors |
| Font weight | CSS property | `var(--font-weight-normal)`, `var(--font-weight-bold)` | Two weight options |
| Font family | CSS property | `var(--font-family-primary)` | Primary font with system fallbacks |

---

### 🎨 CSS Classes

| Class Name | Role / Description |
|------------|-------------------|
| `body` | Base body text styling (16px, 24px line-height, normal weight) |
| `.body-small` | Small body text (14px, 21px line-height) for secondary content |
| `.body-x-small` | Extra small text (12px, 18px line-height) for tertiary content |
| `.sr-only` | Screen reader only text - visually hidden but accessible |

**Typography Tokens:**
```css
/* Font Family */
--font-family-primary: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Font Sizes */
--font-size-h1: 35px;
--font-size-h2: 28px;
--font-size-h3: 24px;
--font-size-h4: 24px;
--font-size-h5: 20px;
--font-size-h6: 16px;
--font-size-body: 16px;
--font-size-body-small: 14px;
--font-size-body-x-small: 12px;
--font-size-page-description: 20px;

/* Line Heights */
--line-height-h1: 45px;
--line-height-h2: 35px;
--line-height-h3: 30px;
--line-height-h4: 30px;
--line-height-h5: 25px;
--line-height-h6: 20px;
--line-height-body: 24px;
--line-height-body-small: 21px;
--line-height-body-x-small: 18px;
--line-height-page-description: 30px;

/* Font Weights */
--font-weight-normal: 400;
--font-weight-bold: 700;
```

**Heading Styles:**
All headings share consistent properties with size-specific variations:
```css
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-bold);
    color: var(--color-foreground-primary);
    margin-bottom: var(--spacing-4);
}
```

**Text Color Hierarchy:**
- **Primary**: `var(--color-text-primary)` - Main content (#1C2832)
- **Secondary**: `var(--color-text-secondary)` - Supporting text (#394B58)
- **Tertiary**: `var(--color-text-tertiary)` - Less important text (#68777D)
- **Disabled**: `var(--color-text-disabled)` - Inactive elements (#9B9B9B)
- **Inverse**: `var(--color-text-inverse)` - Dark backgrounds (#FFFFFF)
- **Link**: `var(--color-text-link)` - Interactive links (#2B7ABC)
- **Link Hover**: `var(--color-text-link-hover)` - Link hover state (#0A5A9E)

---

