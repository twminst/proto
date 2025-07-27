## Tag Component

**Brief description:**\
*Pill-shaped tags used to represent categories, groups, or filters with optional dismiss functionality.*

---

### ⚠️ Steering Notes (AI Priority)

- Always wrap tag text in `<span class="tag__text">` for proper text truncation
- Use proper ARIA labels for dismissable buttons (`aria-label="Remove [tag name]"`)
- Disabled tags must have `tabindex="-1"` and `aria-disabled="true"` on close buttons
- Keep max-width at 160px with ellipsis overflow
- Always use semantic HTML with proper button elements for dismissable functionality
- No external dependencies required - uses only CSS tokens from the design system

---

### 🏦 Usage Instructions

- Use for categorization, filtering interfaces, or displaying selected items
- Commonly used in search filters, content tagging, or selection interfaces
- Requires CSS tokens for colors, spacing, typography, and icons to be available
- JavaScript is optional - only needed for dismissable functionality
- Works responsively across all screen sizes

---

### 🧱 HTML Variants

#### Variant: Basic Tag

```html
<span class="tag tag--medium">
  <span class="tag__text">Category Name</span>
</span>
```

*Description: Basic non-interactive tag for displaying categories or labels.*

#### Variant: Small Tag

```html
<span class="tag tag--small">
  <span class="tag__text">Filter</span>
</span>
```

*Description: Compact version for dense layouts (20px height).*

#### Variant: Large Tag

```html
<span class="tag tag--large">
  <span class="tag__text">Category Name</span>
</span>
```

*Description: Larger version for emphasis or less dense layouts (36px height).*

#### Variant: Dismissable Tag

```html
<span class="tag tag--medium tag--dismissable">
  <span class="tag__text">Applied Filter</span>
  <button class="tag__close" aria-label="Remove Applied Filter">
    <span class="tag__close-icon"></span>
  </button>
</span>
```

*Description: Interactive tag with close button for removing filters or selections.*

#### Variant: Disabled Tag

```html
<span class="tag tag--medium tag--disabled">
  <span class="tag__text">Disabled</span>
</span>
```

*Description: Non-interactive disabled state at 50% opacity.*

#### Variant: Disabled Dismissable Tag

```html
<span class="tag tag--medium tag--dismissable tag--disabled">
  <span class="tag__text">Disabled Filter</span>
  <button class="tag__close" aria-label="Remove Disabled Filter" tabindex="-1" aria-disabled="true">
    <span class="tag__close-icon"></span>
  </button>
</span>
```

*Description: Dismissable tag in disabled state - close button is not focusable or clickable.*

---

### 🎯 Configuration Options

| Option             | Type      | Values                    | Description                           |
| ------------------ | --------- | ------------------------- | ------------------------------------- |
| `.tag--small`      | class     | boolean (present or not)  | Makes tag 20px height with xsmall text |
| `.tag--medium`     | class     | boolean (present or not)  | Makes tag 28px height with small text |
| `.tag--large`      | class     | boolean (present or not)  | Makes tag 36px height with regular text |
| `.tag--dismissable`| class     | boolean (present or not)  | Adds close button functionality |
| `.tag--disabled`   | class     | boolean (present or not)  | Disables interaction and reduces opacity |
| `aria-label`       | attribute | string                    | Required on close buttons for accessibility |
| `tabindex="-1"`    | attribute | "-1"                      | Required on disabled close buttons |
| `aria-disabled`    | attribute | "true"                    | Required on disabled close buttons |

---

### 🎨 CSS Classes

| Class Name        | Role / Description                                    |
| ----------------- | ----------------------------------------------------- |
| `.tag`            | Root element - provides base pill styling            |
| `.tag__text`      | Text wrapper - handles truncation with ellipsis      |
| `.tag--small`     | Size modifier - 20px height, xsmall font             |
| `.tag--medium`    | Size modifier - 28px height, small font              |
| `.tag--large`     | Size modifier - 36px height, regular font            |
| `.tag--dismissable` | Behavior modifier - enables close button           |
| `.tag--disabled`  | State modifier - 50% opacity, prevents interaction   |
| `.tag__close`     | Close button styling and positioning                 |
| `.tag__close-icon`| Icon styling using CSS mask for close button         |

---

### ⚙️ JavaScript Behavior

Detail the JS required for dismissable tags. This should be **embeddable inline** in a `<script>` tag in the same HTML file.

```js
// Tag dismissal functionality
document.querySelectorAll('.tag__close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const tag = this.closest('.tag');
    if (!tag.classList.contains('tag--disabled')) {
      tag.remove();
    }
  });
});
```

*Description: Removes the entire tag when close button is clicked, but only if the tag is not disabled.*

- Runs after DOM content is loaded
- Prevents disabled tags from being dismissed
- No external libraries required
- Uses event delegation for dynamic tags