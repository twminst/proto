## Buttons

**Brief description:**\
*A comprehensive button component system that provides consistent interactive elements with multiple variants, sizes, and states for all user actions throughout the application.*

---

### ⚠️ Steering Notes (AI Priority)

- Always include a size class (`btn--small`, `btn--medium`, or `btn--large`) with every button
- Use `aria-label` attributes for icon-only buttons to ensure accessibility
- Apply `aria-hidden="true"` to decorative icons within buttons that have text
- Use semantic `<button>` elements for actions and `<a>` elements for navigation
- Icon-only buttons must be square - always combine with size classes
- Use primary buttons sparingly - only for the main call-to-action per page/section
- Disabled buttons should use the `disabled` attribute, not just the `.disabled` class
- **Menu Trigger Buttons**: Use `btn--with-chevron` for buttons that trigger menus with chevrons. Only elements with `.menu-trigger-chevron` class will have their icons swapped by JavaScript
- **Chevron Behavior**: Chevrons automatically swap between up/down when menus open/close - no CSS animations needed

---

### 🏦 Usage Instructions

The button system provides consistent interactive elements across the application using a modular class-based approach. All buttons share a base `.btn` class combined with modifier classes for size, variant, and layout.

**When to use buttons:**
- User actions (submit, save, delete, add)
- Modal and dialog controls
- Form interactions
- Toolbar actions
- Navigation within the same page context

**Dependencies:**
- `css/buttons.css` - Button styles and variants
- Design tokens for colors, spacing, and typography
- Icon system for button icons

**Button Hierarchy:**
- **Primary**: Main call-to-action (one per page/section)
- **Secondary**: Alternative actions
- **Success**: Positive confirmations
- **Danger**: Destructive actions
- **Ghost**: Subtle tertiary actions
- **Link**: Navigation-like actions

---

### 🧱 HTML Variants

#### Variant: Basic Button

```html
<button class="btn btn--primary btn--medium">Primary Button</button>
<button class="btn btn--secondary btn--medium">Secondary Button</button>
<button class="btn btn--success btn--medium">Success Button</button>
<button class="btn btn--danger btn--medium">Danger Button</button>
<button class="btn btn--ghost btn--medium">Ghost Button</button>
<button class="btn btn--link btn--medium">Link Button</button>
```

*Description: Standard buttons with text labels in different variants.*

#### Variant: Button with Icon

```html
<button class="btn btn--primary btn--medium">
    <span class="btn-icon" style="mask-image: var(--icon-add-outline);" aria-hidden="true"></span>
    Add Item
</button>

<button class="btn btn--secondary btn--medium">
    Download
    <span class="btn-icon" style="mask-image: var(--icon-download-outline);" aria-hidden="true"></span>
</button>
```

*Description: Buttons with icons positioned before or after text labels.*

#### Variant: Icon-Only Button

```html
<button class="btn btn--secondary btn--icon-only btn--medium" aria-label="Settings">
    <span class="btn-icon" style="mask-image: var(--icon-settings-outline);" aria-hidden="true"></span>
</button>

<button class="btn btn--icon-only-minimal btn--medium" aria-label="Close">
    <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
</button>
```

*Description: Square buttons containing only icons. Standard version has background, minimal version is transparent.*

#### Variant: Menu Trigger Buttons

```html
<!-- Primary button with chevron for menu actions -->
<button class="btn btn--primary btn--medium btn--with-chevron menu-trigger" 
        data-menu="create-menu" 
        aria-haspopup="true" 
        aria-expanded="false">
    Create New
    <span class="menu-trigger-chevron" style="mask-image: var(--icon-chevron-down-outline);" aria-hidden="true"></span>
</button>

<!-- Secondary button with chevron -->
<button class="btn btn--secondary btn--medium btn--with-chevron menu-trigger" 
        data-menu="actions-menu" 
        aria-haspopup="true" 
        aria-expanded="false">
    Actions
    <span class="menu-trigger-chevron" style="mask-image: var(--icon-chevron-down-outline);" aria-hidden="true"></span>
</button>

<!-- Icon-only button with chevron (e.g., settings + chevron) -->
<button class="btn btn--icon-only-minimal btn--medium btn--with-chevron menu-trigger" 
        data-menu="settings-menu" 
        aria-haspopup="true" 
        aria-expanded="false" 
        aria-label="Settings menu">
    <span class="btn-icon" style="mask-image: var(--icon-settings-outline);" aria-hidden="true"></span>
    <span class="menu-trigger-chevron" style="mask-image: var(--icon-chevron-down-outline);" aria-hidden="true"></span>
</button>
```

*Description: Buttons that trigger dropdown menus with chevron indicators. Chevrons automatically swap between up/down when menus open/close. Use `.menu-trigger-chevron` class for proper JavaScript behavior.*

#### Variant: Size Variations

```html
<button class="btn btn--primary btn--small">Small Button</button>
<button class="btn btn--primary btn--medium">Medium Button</button>
<button class="btn btn--primary btn--large">Large Button</button>

<!-- Icon-only size variations -->
<button class="btn btn--icon-only-minimal btn--small" aria-label="Edit">
    <span class="btn-icon" style="mask-image: var(--icon-edit-outline);" aria-hidden="true"></span>
</button>
<button class="btn btn--icon-only-minimal btn--medium" aria-label="Edit">
    <span class="btn-icon" style="mask-image: var(--icon-edit-outline);" aria-hidden="true"></span>
</button>
<button class="btn btn--icon-only-minimal btn--large" aria-label="Edit">
    <span class="btn-icon" style="mask-image: var(--icon-edit-outline);" aria-hidden="true"></span>
</button>
```

*Description: Buttons in three sizes - small (32px), medium (40px), and large (48px).*

#### Variant: Inverse Buttons (Dark Backgrounds)

```html
<div style="background-color: var(--color-neutral-800); padding: 16px;">
    <button class="btn btn--inverse btn--medium">Inverse Button</button>
    
    <button class="btn btn--inverse btn--icon-only-minimal btn--medium" aria-label="Close">
        <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
    </button>
</div>
```

*Description: Buttons designed for use on dark backgrounds with white text and borders.*

#### Variant: Full Width Button

```html
<button class="btn btn--primary btn--medium btn--full-width">Full Width Button</button>
```

*Description: Button that expands to fill the width of its container.*

#### Variant: Disabled Button

```html
<button class="btn btn--primary btn--medium" disabled>Disabled Button</button>
<button class="btn btn--secondary btn--icon-only btn--medium" disabled aria-label="Disabled action">
    <span class="btn-icon" style="mask-image: var(--icon-settings-outline);" aria-hidden="true"></span>
</button>
```

*Description: Buttons in disabled state with reduced opacity and no interaction.*

---

### 🎯 Configuration Options

| Option | Type | Values / Example | Description |
|--------|------|------------------|-------------|
| Size classes | class | `btn--small`, `btn--medium`, `btn--large` | Required: Controls button dimensions and padding |
| Variant classes | class | `btn--primary`, `btn--secondary`, `btn--success`, `btn--danger`, `btn--ghost`, `btn--link`, `btn--inverse` | Required: Defines button appearance and purpose |
| Layout classes | class | `btn--icon-only`, `btn--icon-only-minimal`, `btn--full-width`, `btn--with-chevron` | Optional: Modifies button layout behavior |
| Menu attributes | attribute | `data-menu="menu-id"`, `aria-haspopup="true"`, `aria-expanded="false"` | Required for menu trigger buttons |
| `disabled` | attribute | `disabled` | Disables button interaction |
| `aria-label` | attribute | `"Close dialog"`, `"Add item"` | Required for icon-only buttons |
| `type` | attribute | `"button"`, `"submit"`, `"reset"` | Defines button behavior in forms |

---

### 🎨 CSS Classes

| Class Name | Role / Description |
|------------|-------------------|
| `.btn` | Base button class - required for all buttons |
| `.btn--small` | Small size (32px height, 4px/8px padding) |
| `.btn--medium` | Medium size (40px height, 8px/12px padding) - default |
| `.btn--large` | Large size (48px height, 12px/16px padding) |
| `.btn--primary` | Primary action button (blue background, white text) |
| `.btn--secondary` | Secondary action button (grey background, dark text) |
| `.btn--success` | Success/positive action button (green background, white text) |
| `.btn--danger` | Destructive action button (red background, white text) |
| `.btn--ghost` | Subtle action button (white background, border, dark text) |
| `.btn--link` | Navigation-style button (transparent, link color) |
| `.btn--inverse` | Dark background button (transparent, white text/border) |
| `.btn--icon-only` | Square button with background for icons only |
| `.btn--icon-only-minimal` | Square button without background for icons only |
| `.btn--full-width` | Button expands to container width |
| `.btn--with-chevron` | Button layout modifier for chevron-containing menu triggers |
| `.btn-icon` | Icon element within buttons (16px default, scales with size) |
| `.menu-trigger-chevron` | Chevron icon that swaps up/down when menus open (18px default, scales with size) |

**Base Button Styles:**
```css
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-8);
    border: 1px solid transparent;
    border-radius: var(--spacing-radius-default);
    cursor: pointer;
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-normal);
    white-space: nowrap;
    user-select: none;
}
```

**Button Sizes:**
- **Small**: 32px height, 14px icon, 4px/8px padding
- **Medium**: 40px height, 16px icon, 8px/12px padding (default)
- **Large**: 48px height, 18px icon, 12px/16px padding

**Icon-Only Dimensions:**
- **Small**: 32×32px with 4px padding
- **Medium**: 40×40px with 8px padding
- **Large**: 48×48px with 12px padding

**Menu Chevron Sizing:**
- **Small**: 14px chevron with 4px left margin
- **Medium**: 18px chevron with 8px left margin (default)
- **Large**: 20px chevron with 12px left margin

---

### ⚙️ JavaScript Behavior

Buttons are primarily CSS-based but can be enhanced with JavaScript for dynamic behaviors:

*Description: Optional JavaScript enhancements for loading states, confirmations, and form handling.*

**Interactive States:**
- **Default**: Normal button appearance
- **Hover**: Visual feedback on mouse over
- **Focus**: Keyboard navigation outline (2px focus ring)
- **Active**: Brief pressed state during click
- **Disabled**: Reduced opacity (0.5) with no interaction