## Cards

**Brief description:**\
*A flexible card component system that provides elevation and clear content boundaries for grouped information, creating visual hierarchy and organizing content into digestible sections.*

---

### ⚠️ Steering Notes (AI Priority)

- Always wrap card content in a `card-content` div for proper spacing and styling
- Group title and description in `card-header-content` to keep them stacked together
- Use `card-header-actions` for action buttons that should align to the right
- Always use icon-only minimal buttons (`btn--icon-only-minimal`) for card header actions
- Always use medium size (`btn--medium`) for card header buttons to ensure proper alignment
- Provide descriptive `aria-label` attributes for all icon-only buttons in card headers
- Use outline icon variants (`-outline`) for card header actions for consistency
- Choose appropriate header sizes based on content hierarchy (H2 for main sections, H4 variants for subsections)
- Apply shadows sparingly - only when elevation is needed to distinguish content
- Use primary cards for most content containers, secondary for de-emphasized content

---

### 🏦 Usage Instructions

Cards provide a consistent way to group related content with clear visual boundaries. They create hierarchy through elevation, padding, and structured headers.

**When to use cards:**
- Grouping related information or controls
- Creating visual separation between content sections
- Displaying data summaries or statistics
- Organizing dashboard widgets
- Containing forms or interactive elements

**Card Structure Hierarchy:**
1. **Card Container**: Base styling and background
2. **Card Header**: Optional title, description, and actions
3. **Card Content**: Main content area with proper spacing

**Dependencies:**
- `css/cards.css` - Card styles and variants
- Design tokens for spacing, colors, and typography
- Button components for header actions
- Icon system for action buttons

**Recommended Button Pattern for Card Headers:**
```html
<button class="btn btn--icon-only-minimal btn--medium" aria-label="Action description">
    <span class="btn-icon" style="mask-image: var(--icon-name-outline);" aria-hidden="true"></span>
</button>
```

---

### 🧱 HTML Variants

#### Variant: Basic Card

```html
<div class="card card--primary">
    <div class="card-content">
        <h3>Card Title</h3>
        <p>Your content goes here with proper spacing and styling.</p>
    </div>
</div>
```

*Description: Simple card with primary styling (white background, border) and content wrapper.*

#### Variant: Card with Header and Actions

```html
<div class="card card--primary card--shadow">
    <div class="card-header card-header--h4">
        <div class="card-header-content">
            <h4>Course Information</h4>
            <p>Web development fundamentals course</p>
        </div>
        <div class="card-header-actions">
            <button class="btn btn--icon-only-minimal btn--medium" aria-label="Course settings">
                <span class="btn-icon" style="mask-image: var(--icon-settings-outline);" aria-hidden="true"></span>
            </button>
            <button class="btn btn--icon-only-minimal btn--medium" aria-label="More options">
                <span class="btn-icon" style="mask-image: var(--icon-more-outline);" aria-hidden="true"></span>
            </button>
        </div>
    </div>
    <div class="card-content">
        <p>This course covers fundamental concepts in web development.</p>
        <p><strong>Duration:</strong> 8 weeks</p>
        <p><strong>Prerequisites:</strong> None</p>
    </div>
</div>
```

*Description: Full-featured card with structured header, multiple actions, and organized content.*

#### Variant: Background Variants

```html
<!-- Primary Card (most common) -->
<div class="card card--primary">
    <div class="card-content">
        <p>White background with border</p>
    </div>
</div>

<!-- White Card -->
<div class="card card--white">
    <div class="card-content">
        <p>Plain white background, no border</p>
    </div>
</div>

<!-- White Bordered Card -->
<div class="card card--white-bordered">
    <div class="card-content">
        <p>White background with border, no shadow</p>
    </div>
</div>

<!-- Secondary Card -->
<div class="card card--secondary">
    <div class="card-content">
        <p>Gray background for less prominent content</p>
    </div>
</div>

<!-- Secondary Bordered Card -->
<div class="card card--secondary card--secondary-bordered">
    <div class="card-content">
        <p>Gray background with border</p>
    </div>
</div>
```

*Description: Different background variants for various content prominence levels.*

#### Variant: Padding Options

```html
<!-- Compact Padding -->
<div class="card card--primary card--padding-compact">
    <div class="card-content">
        <p>Dense content layout with minimal spacing</p>
    </div>
</div>

<!-- Comfortable Padding (Default) -->
<div class="card card--primary card--padding-comfortable">
    <div class="card-content">
        <p>Balanced spacing for most use cases</p>
    </div>
</div>

<!-- Spacious Padding -->
<div class="card card--primary card--padding-spacious">
    <div class="card-content">
        <p>Generous spacing for important content</p>
    </div>
</div>
```

*Description: Three padding levels for different content density needs.*

#### Variant: Shadow Effects

```html
<!-- Standard Shadow -->
<div class="card card--primary card--shadow">
    <div class="card-content">
        <p>Subtle elevation for standard cards</p>
    </div>
</div>

<!-- Hover Shadow -->
<div class="card card--primary card--hover">
    <div class="card-content">
        <p>Prominent shadow for menus or overlays</p>
    </div>
</div>
```

*Description: Shadow variants for different elevation needs.*

#### Variant: Header Size Options

```html
<!-- H2 Header (Main Sections) -->
<div class="card card--primary">
    <div class="card-header card-header--h2">
        <div class="card-header-content">
            <h2>Main Section Title</h2>
        </div>
        <div class="card-header-actions">
            <button class="btn btn--icon-only-minimal btn--medium" aria-label="Section settings">
                <span class="btn-icon" style="mask-image: var(--icon-settings-outline);" aria-hidden="true"></span>
            </button>
        </div>
    </div>
    <div class="card-content">
        <p>Content for main page sections</p>
    </div>
</div>

<!-- H4 Large Header -->
<div class="card card--primary">
    <div class="card-header card-header--h4-large">
        <div class="card-header-content">
            <h4>Large Subsection</h4>
            <p>Optional description for context</p>
        </div>
        <div class="card-header-actions">
            <button class="btn btn--icon-only-minimal btn--medium" aria-label="Edit section">
                <span class="btn-icon" style="mask-image: var(--icon-edit-outline);" aria-hidden="true"></span>
            </button>
        </div>
    </div>
    <div class="card-content">
        <p>Content for prominent subsections</p>
    </div>
</div>

<!-- H4 Default Header -->
<div class="card card--primary">
    <div class="card-header card-header--h4">
        <div class="card-header-content">
            <h4>Standard Subsection</h4>
            <p>Optional description for context</p>
        </div>
        <div class="card-header-actions">
            <button class="btn btn--icon-only-minimal btn--medium" aria-label="More options">
                <span class="btn-icon" style="mask-image: var(--icon-more-outline);" aria-hidden="true"></span>
            </button>
        </div>
    </div>
    <div class="card-content">
        <p>Content for regular subsections</p>
    </div>
</div>

<!-- H4 Small Header -->
<div class="card card--primary">
    <div class="card-header card-header--h4-small">
        <div class="card-header-content">
            <h4>Small Subsection</h4>
            <p>Optional description for context</p>
        </div>
        <div class="card-header-actions">
            <button class="btn btn--icon-only-minimal btn--medium" aria-label="Close section">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
    </div>
    <div class="card-content">
        <p>Content for minor subsections</p>
    </div>
</div>
```

*Description: Different header sizes for content hierarchy - H2 for main sections, H4 variants for subsections.*

---

### 🎯 Configuration Options

| Option | Type | Values / Example | Description |
|--------|------|------------------|-------------|
| Background variants | class | `card--primary`, `card--white`, `card--white-bordered`, `card--secondary`, `card--secondary-bordered` | Required: Defines card background and border |
| Padding variants | class | `card--padding-compact`, `card--padding-comfortable`, `card--padding-spacious` | Optional: Controls internal spacing |
| Shadow variants | class | `card--shadow`, `card--hover` | Optional: Adds elevation effects |
| Header variants | class | `card-header--h2`, `card-header--h4-large`, `card-header--h4`, `card-header--h4-small` | Optional: Defines header typography scale |
| `.card-content` | class | Applied to content wrapper | Required: Ensures proper content spacing |
| `.card-header-content` | class | Applied to title/description wrapper | Required for headers: Groups title and description |
| `.card-header-actions` | class | Applied to action button container | Required for header actions: Aligns buttons to right |

---

### 🎨 CSS Classes

| Class Name | Role / Description |
|------------|-------------------|
| `.card` | Base card class - required for all cards (4px border radius, 100% width) |
| `.card--primary` | White background with border - most common variant |
| `.card--white` | Plain white background, no border or shadow |
| `.card--white-bordered` | White background with border, no shadow |
| `.card--secondary` | Gray background for less prominent content |
| `.card--secondary-bordered` | Gray background with border |
| `.card--padding-compact` | 12px padding for dense layouts |
| `.card--padding-comfortable` | 16px padding for balanced spacing |
| `.card--padding-spacious` | 24px padding for generous spacing (default) |
| `.card--shadow` | Standard drop shadow for subtle elevation |
| `.card--hover` | Prominent shadow for interactive elements/overlays |
| `.card-header` | Header container with flexbox layout (16px bottom margin) |
| `.card-header-content` | Content area for title and description (flex: 1) |
| `.card-header-actions` | Action button container (flex-shrink: 0, right-aligned) |
| `.card-header--h2` | H2 header styling for main sections |
| `.card-header--h4-large` | Large H4 header for prominent subsections |
| `.card-header--h4` | Default H4 header for regular subsections |
| `.card-header--h4-small` | Small H4 header for minor subsections |
| `.card-content` | Content wrapper ensuring proper spacing and margins |

**Base Card Styles:**
```css
.card {
    border-radius: 4px;
    padding: var(--spacing-card-padding-24);
    display: block;
    width: 100%;
}
```

**Header Structure:**
```css
.card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: var(--spacing-16);
}

.card-header-content {
    flex: 1;
    min-width: 0; /* Allows text wrapping */
}

.card-header-actions {
    flex-shrink: 0;
    margin-left: var(--spacing-12);
    display: flex;
    gap: var(--spacing-8);
}
```

**Shadow Effects:**
- **Standard**: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2)`
- **Hover**: `0 6px 3px rgba(0,0,0,0.25), 0 3px 6px rgba(0,0,0,0.1)`

---



**Common Card Actions:**
- `--icon-more-outline` - More options/menu
- `--icon-settings-outline` - Settings/configuration  
- `--icon-edit-outline` - Edit content
- `--icon-close-outline` - Close/dismiss
- `--icon-add-outline` - Add new item
- `--icon-delete-outline` - Delete/remove