## Icons

**Brief description:**\
*A comprehensive icon system that provides consistent vector icons throughout the application using CSS mask images for easy color control and scaling.*

---

### ⚠️ Steering Notes (AI Priority)

- Always use `aria-hidden="true"` for decorative icons that don't add meaning beyond accompanying text
- Provide `aria-label` attributes for standalone icons that convey meaning
- Use predefined size classes (`icon-14`, `icon-16`, etc.) rather than custom dimensions for consistency
- Let icons inherit color from parent elements when possible using `currentColor`
- Ensure sufficient color contrast for accessibility compliance
- Use outline variants for default states and solid variants for selected/active states
- Wrap interactive icons in focusable elements like buttons for keyboard accessibility

---

### 🏦 Usage Instructions

The icon system uses CSS mask images to display SVG icons as data URLs stored in CSS custom properties. This approach allows for:

- **Color Control**: Icons inherit color from `currentColor` or can be customized via `background-color`
- **Scalability**: Vector-based icons scale without quality loss
- **Performance**: No additional HTTP requests for icon files
- **Consistency**: Uniform rendering across browsers

**Dependencies:**
- `css/icons.css` - Base icon styles and size variants
- `css/tokens/icons.css` - Icon definitions as CSS custom properties

**Icon Naming Convention:**
- Outline variant: `--icon-[name]-outline`
- Solid variant: `--icon-[name]-solid`

---

### 🧱 HTML Variants

#### Variant: Basic Icon

```html
<span class="icon" style="mask-image: var(--icon-add-outline);" aria-hidden="true"></span>
```

*Description: Default 18×18px icon for general use alongside text.*

#### Variant: Sized Icon

```html
<span class="icon icon-24" style="mask-image: var(--icon-add-outline);" aria-hidden="true"></span>
```

*Description: Icon with specific size using predefined size classes.*

#### Variant: Standalone Icon (Accessible)

```html
<span class="icon" style="mask-image: var(--icon-info-outline);" aria-label="Information"></span>
```

*Description: Icon that conveys meaning on its own, requires accessible label.*

#### Variant: Icon Button

```html
<button class="btn btn--icon-only" aria-label="Add item">
    <span class="icon" style="mask-image: var(--icon-add-outline);" aria-hidden="true"></span>
</button>
```

*Description: Interactive icon wrapped in a button element for accessibility.*

#### Variant: Icon with Text

```html
<div class="icon-with-text">
    <span class="icon" style="mask-image: var(--icon-info-outline);" aria-hidden="true"></span>
    <span>Important information</span>
</div>
```

*Description: Icon paired with descriptive text, icon is decorative.*

#### Variant: Custom Color Icon

```html
<span class="icon" style="mask-image: var(--icon-warning-outline); background-color: red;" aria-hidden="true"></span>
```

*Description: Icon with custom color override.*

---

### 🎯 Configuration Options

| Option | Type | Values / Example | Description |
|--------|------|------------------|-------------|
| `mask-image` | CSS property | `var(--icon-[name]-outline)` | Required: Specifies which icon to display |
| `background-color` | CSS property | `red`, `#ff0000`, `currentColor` | Optional: Override icon color |
| `aria-hidden` | attribute | `"true"` | Use for decorative icons |
| `aria-label` | attribute | `"Add item"`, `"Information"` | Required for standalone meaningful icons |

---

### 🎨 CSS Classes

| Class Name | Role / Description |
|------------|-------------------|
| `.icon` | Base icon class (18×18px default) |
| `.icon-14` | Size modifier for 14×14px icons |
| `.icon-16` | Size modifier for 16×16px icons |
| `.icon-18` | Size modifier for 18×18px icons (same as default) |
| `.icon-24` | Size modifier for 24×24px icons |
| `.icon-28` | Size modifier for 28×28px icons |
| `.icon-40` | Size modifier for 40×40px icons |

**Base Icon Styles:**
```css
.icon {
    display: inline-block;
    mask-size: contain;
    background-color: currentColor;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
}
```

---

### ⚙️ JavaScript Behavior

Icons are purely CSS-based and require no JavaScript for basic functionality. However, you can enhance them with interactive behaviors:

```js
// Toggle icon state (outline/solid)
document.querySelectorAll('.toggle-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const currentIcon = icon.style.maskImage;
    const isOutline = currentIcon.includes('-outline');
    const iconName = currentIcon.match(/--icon-([^-]+)/)[1];
    
    icon.style.maskImage = isOutline 
      ? `var(--icon-${iconName}-solid)`
      : `var(--icon-${iconName}-outline)`;
  });
});

// Animate icon rotation
document.querySelectorAll('.rotating-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.transform = 'rotate(90deg)';
    icon.style.transition = 'transform 0.3s ease';
  });
  
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = 'rotate(0deg)';
  });
});
```

*Description: Optional JavaScript for interactive icon behaviors like state toggling and animations.*

**Available Icons:**
The system includes 200+ icons in both outline and solid variants. Common icons include:

---

### Navigation & Layout

| Token ID                      | Description                 | Aliases                     |
|-------------------------------|-----------------------------|-----------------------------|
| `--icon-menu-outline`        | Hamburger menu              | menu, nav, bars             |
| `--icon-chevron-outline`     | Expand or collapse          | arrow, caret                |
| `--icon-home-outline`        | Home page                   | home, institution, school   |
| `--icon-compass-outline`     | Explore or browse           | discover                    |
| `--icon-more-outline`        | Overflow menu               | ellipsis, kebab, meatballs  |
| `--icon-close-outline`       | Close or dismiss            | x, cancel, exit             |

---

### Actions

| Token ID                      | Description           | Aliases                     |
|-------------------------------|-----------------------|-----------------------------|
| `--icon-plus-outline`        | Add item              | new, create, add            |
| `--icon-edit-outline`        | Edit or modify        | pencil, update              |
| `--icon-delete-outline`       | Delete                | remove, discard             |
| `--icon-copy-outline`        | Copy or duplicate     | clone, duplicate            |
| `--icon-upload-outline`      | Upload a file         | send, import                |
| `--icon-download-outline`    | Download a file       | save, export                |
| `--icon-refresh-outline`     | Refresh or sync       | reload, update              |
| `--icon-drag-handle-outline`  | Drag handle           | reorder, move               |
| `--icon-publish-outline`  | Published           | enabled              |
| `--icon-unpublish-outline`  | Unpublished           | disabled            |
---

### Content & Media

| Token ID                      | Description            | Aliases                    |
|-------------------------------|------------------------|----------------------------|
| `--icon-image-outline`       | Image or media         | photo, picture             |
| `--icon-media-play-outline`  | Video playback         | video, media, start        |
| `--icon-file-outline`        | Document or file       | doc, page                  |
| `--icon-link-outline`        | Hyperlink              | chain, anchor              |
| `--icon-bookmark-outline`    | Save or mark           | star, pin, favorite        |
| `--icon-tag-outline`         | Categorize or label    | label, badge               |

---

### Feedback & Status

| Token ID                      | Description           | Aliases                     |
|-------------------------------|-----------------------|-----------------------------|
| `--icon-check-outline`       | Success or complete   | done, tick                  |
| `--icon-close-outline`           | Cancel or error       | close, fail                 |
| `--icon-warning-outline`     | Caution               | alert, triangle             |
| `--icon-info-outline`        | Information           | help, question              |
| `--icon-message-mark-read-outline`  | Status indicator      | badge, bubble               |

---

### Search & Filters

| Token ID                      | Description           | Aliases                     |
|-------------------------------|-----------------------|-----------------------------|
| `--icon-search-outline`      | Search                | magnifier, find             |
| `--icon-filter-outline`      | Filter view           | funnel                      |
| `--icon-sort-outline`        | Sort items            | order, arrange              |
| `--icon-settings-outline`    | Preferences           | sliders, config             |

---

### Authentication & User

| Token ID                      | Description           | Aliases                     |
|-------------------------------|-----------------------|-----------------------------|
| `--icon-user-outline`        | Profile or account    | avatar, person              |
| `--icon-lock-outline`        | Security or password  | key, restrict               |
| `--icon-shield-outline`      | Permissions or admin  | protect, secure             |

---

### Social & Collaboration

| Token ID                      | Description           | Aliases                     |
|-------------------------------|-----------------------|-----------------------------|
| `--icon-chat-outline`        | Messaging             | message, comment            |
| `--icon-bell-outline`        | Notifications         | alert, ring                 |
| `--icon-star-outline`       | Favorite      | love, endorse               |
| `--icon-share-outline`       | Distribute or forward | send, external              |
| `--icon-group-outline`       | Team or users         | people, members             |



*Note: See `css/tokens/icons.css` for the complete list of available icons.*