## Colors

**Brief description:**\
*Design system color tokens providing a comprehensive palette of primitive colors, semantic aliases, and contextual color assignments for backgrounds, text, borders, and interactive states.*

---

### ⚠️ Steering Notes (AI Priority)

*Use this section to steer the AI's behavior and priorities. Include rules, do's and don'ts, special considerations, or anything the AI should always keep in mind when working with colors.*

- Always use CSS custom properties (CSS variables) for colors, never hardcoded hex values
- Prefer semantic color tokens (--color-text-primary) over primitive tokens (--color-grey-950) for better maintainability
- Use neutral colors for backgrounds and text, brand colors for interactive elements
- Ensure sufficient contrast ratios for accessibility compliance
- Extended color scales provide themed variations for specialized use cases

---

### 🏦 Usage Instructions

*High-level guidance for how colors are typically used.*

- Use semantic aliases for most styling needs (text, backgrounds, borders)
- Apply primitive color tokens only when semantic options don't fit
- Extended color scales are available for themed components or data visualization
- Interactive state colors handle hover, focus, and active states automatically
- All color tokens are defined in `/css/tokens/colors.css` and available globally

---

### 🧱 HTML Variants

Color tokens are applied via CSS custom properties. Use semantic classes or direct CSS custom property references.

#### Variant: Text Colors

```html
<p style="color: var(--color-text-primary);">Primary text content</p>
<p style="color: var(--color-text-secondary);">Secondary descriptive text</p>
<p style="color: var(--color-text-tertiary);">Tertiary helper text</p>
<a href="#" style="color: var(--color-text-link);">Link text</a>
```

*Description: Semantic text color assignments for different content hierarchy levels.*

#### Variant: Background Colors

```html
<div style="background-color: var(--color-background-primary);">Primary background</div>
<div style="background-color: var(--color-background-secondary);">Secondary background</div>
<div style="background-color: var(--color-background-tertiary);">Tertiary background</div>
```

*Description: Layered background colors for creating visual depth and hierarchy.*

#### Variant: Border Colors

```html
<div style="border: 1px solid var(--color-border-primary);">Default border</div>
<input style="border: 2px solid var(--color-border-focus);" placeholder="Focused input">
<div style="border: 1px solid var(--color-border-error);">Error state border</div>
```

*Description: Contextual border colors for different component states.*

#### Variant: Brand Colors

```html
<button style="background-color: var(--color-primary); color: var(--color-text-inverse);">Primary Button</button>
<span style="color: var(--color-success);">Success message</span>
<span style="color: var(--color-warning);">Warning message</span>
<span style="color: var(--color-error);">Error message</span>
```

*Description: Semantic brand colors for actions and feedback states.*

---

### 🎯 Configuration Options

Color tokens are CSS custom properties that can be used directly or overridden for theming.

| Option Type | Usage | Example | Description |
|-------------|-------|---------|-------------|
| Primitive Colors | Direct reference | `var(--color-blue-500)` | Base color palette values |
| Semantic Aliases | Preferred usage | `var(--color-primary)` | Context-aware color assignments |
| Text Colors | Text styling | `var(--color-text-primary)` | Typography color hierarchy |
| Background Colors | Surface styling | `var(--color-background-secondary)` | Layered background system |
| Border Colors | Border styling | `var(--color-border-focus)` | Contextual border colors |
| Interactive States | Hover/focus | `var(--color-hover-primary)` | Dynamic interaction feedback |

---

### 🎨 CSS Classes

Colors are implemented as CSS custom properties. No utility classes are provided - use the tokens directly in your CSS.

| Token Category | Purpose | Example Usage |
|----------------|---------|---------------|
| `--color-neutral-*` | Base neutral palette | Backgrounds, text, borders |
| `--color-primary` | Brand primary color | Buttons, links, highlights |
| `--color-success` | Success feedback | Confirmations, positive states |
| `--color-warning` | Warning feedback | Cautions, intermediate states |
| `--color-error` | Error feedback | Errors, destructive actions |
| `--color-text-*` | Text color hierarchy | Primary, secondary, tertiary text |
| `--color-background-*` | Background layers | Primary, secondary, tertiary surfaces |
| `--color-border-*` | Border contexts | Default, focus, error states |
| `--color-hover-*` | Interactive states | Hover, active, focus feedback |

---

### ⚙️ JavaScript Behavior

Colors are purely CSS-based and require no JavaScript. However, dynamic theming or color mode switching can be implemented through CSS custom property manipulation.

```js
// Example: Toggle dark mode by swapping color tokens
function toggleDarkMode() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark-mode');
  
  if (isDark) {
    root.classList.remove('dark-mode');
  } else {
    root.classList.add('dark-mode');
  }
}

// Example: Apply dynamic theme colors
function applyThemeColor(colorValue) {
  document.documentElement.style.setProperty('--color-primary', colorValue);
}
```

*Description: Optional JavaScript utilities for dynamic color theming.*

### 📊 Color Token Reference

#### Primitive Color Scales

- **Neutral Scale**: `--color-neutral-white` through `--color-neutral-black` (10 steps)
- **Blue Scale**: `--color-blue-100` through `--color-blue-800` (primary brand)
- **Green Scale**: `--color-green-100` through `--color-green-800` (success)
- **Orange Scale**: `--color-orange-100` through `--color-orange-800` (warning)
- **Red Scale**: `--color-red-100` through `--color-red-800` (error)

#### Extended Themed Scales

Each extended scale provides 12-step color progression with primary and secondary variants:
- Rose, Copper, Honey, Forest, Aurora, Sea, Sky, Ocean, Violet, Plum, Stone

#### Semantic Color Assignments

- **Text**: Primary, secondary, tertiary, disabled, inverse, link colors
- **Background**: Primary, secondary, tertiary, dark, overlay colors  
- **Border**: Primary, secondary, focus, error, success, warning colors
- **Interactive**: Hover, active, focus, disabled state colors