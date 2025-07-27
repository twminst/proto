## Page Layout

**Brief description:**\
*A hierarchical page structure system that provides consistent spacing and typography for organizing content with page headers, sections, and modules.*

---

### ⚠️ Steering Notes (AI Priority)

- Always maintain the hierarchy: Page Header (H1) → Sections (H2) → Modules (H3)
- Use semantic HTML elements (`<header>`, `<section>`, `<main>`) for proper structure
- Include descriptions when content needs clarification - they provide important context
- Use horizontal rules sparingly for visual separation between major content areas
- Follow button guidelines for header actions (icon-only minimal buttons in medium size)
- Test responsive behavior at mobile breakpoints (768px and below)
- Keep content focused within each module - avoid overly complex nesting
- Maintain spacing consistency with the established token system
- **Form Integration**: When placing form components within page sections or modules, the first form element should have no top margin to prevent double spacing
- **Grid Layouts**: Explicit grid gaps should be used instead of relying on layout system spacing for form arrangements
- **Fieldsets**: Should integrate seamlessly without adding extra margins to the layout flow
- **Card Integration**: Cards work seamlessly within page sections and modules, with automatic spacing adjustments to prevent double margins
- **Mixed Content**: When combining forms and cards within the same section, maintain consistent spacing using the integrated layout system

---

### 🏦 Usage Instructions

The page layout system establishes a clear content hierarchy using three levels:

1. **Page Header (H1)**: The topmost level containing the page title, optional description, and action buttons
2. **Page Sections (H2)**: Major content areas that group related functionality  
3. **Page Modules (H3)**: Focused content blocks within sections for specific features or data

**Dependencies:**
- `css/layout.css` - Layout styles and spacing rules
- Design tokens for spacing, typography, and colors
- Button components for header actions
- Card components for content organization
- Form components for interactive content

**When to use:**
- All main application pages that need structured content organization
- Admin interfaces with multiple content areas
- Dashboard layouts with grouped functionality
- Any page requiring consistent spacing and typography hierarchy

---

### 🧱 HTML Variants

#### Variant: Complete Page Structure

```html
<main class="main-content main-content--centered">
    <header class="page-header">
        <div class="page-header-content">
            <h1>User Management</h1>
            <p class="page-header-description">Manage user accounts, permissions, and access levels.</p>
        </div>
        <div class="page-header-actions">
            <button class="btn btn--secondary btn--medium">Import Users</button>
            <button class="btn btn--icon-only-minimal btn--medium" aria-label="Settings">
                <span class="btn-icon" style="mask-image: var(--icon-settings-outline);" aria-hidden="true"></span>
            </button>
            <button class="btn btn--primary btn--medium">Add User</button>
        </div>
    </header>

    <section class="page-section">
        <h2>Active Users</h2>
        <p class="page-section-description">Currently active user accounts in the system.</p>
        
        <div class="page-section-content">
            <div class="page-module">
                <h3>User Statistics</h3>
                <p class="page-module-description">Overview of user activity and engagement.</p>
                
                <div class="page-module-content">
                    <!-- Module content -->
                </div>
            </div>
        </div>
    </section>
</main>
```

*Description: Complete page structure showing all three hierarchy levels with proper nesting.*

#### Variant: Page Header Only

```html
<header class="page-header">
    <div class="page-header-content">
        <h1>Course Administration</h1>
        <p class="page-header-description">Manage courses, enrollments, and educational content across your institution.</p>
    </div>
    <div class="page-header-actions">
        <button class="btn btn--secondary btn--medium">
            <span class="btn-icon" style="mask-image: var(--icon-upload-outline);" aria-hidden="true"></span>
            Import Courses
        </button>
        <button class="btn btn--primary btn--medium">
            <span class="btn-icon" style="mask-image: var(--icon-add-outline);" aria-hidden="true"></span>
            New Course
        </button>
    </div>
</header>
```

*Description: Page header with title, description, and action buttons for pages with simple content.*

#### Variant: Section with Multiple Modules

```html
<section class="page-section">
    <h2>Course Overview</h2>
    <p class="page-section-description">Monitor course activity and key metrics across your institution.</p>
    
    <div class="page-section-content">
        <div class="page-module">
            <h3>Course Statistics</h3>
            <p class="page-module-description">Real-time data on course enrollment and activity.</p>
            
            <div class="page-module-content">
                <!-- Statistics content -->
            </div>
        </div>
        
        <div class="page-module">
            <h3>Recent Activity</h3>
            <p class="page-module-description">Latest course actions and system events.</p>
            
            <div class="page-module-content">
                <!-- Activity content -->
            </div>
        </div>
    </div>
</section>
```

*Description: Section containing multiple related modules with consistent spacing.*

#### Variant: With Horizontal Rules

```html
<section class="page-section">
    <h2>User Administration</h2>
    <div class="page-section-content">
        <div class="page-module">
            <h3>Account Management</h3>
            <div class="page-module-content">
                <!-- Account content -->
            </div>
        </div>
        
        <hr>
        
        <div class="page-module">
            <h3>Permission Settings</h3>
            <div class="page-module-content">
                <!-- Permission content -->
            </div>
        </div>
    </div>
</section>

<hr>

<section class="page-section">
    <h2>System Settings</h2>
    <!-- Next section content -->
</section>
```

*Description: Using horizontal rules for visual separation between modules and sections.*

#### Variant: With Card Components

```html
<section class="page-section">
    <h2>Course Management</h2>
    <p class="page-section-description">Organize and manage course content with card-based layout</p>
    
    <div class="page-section-content">
        <div class="card card--primary card--shadow">
            <div class="card-header card-header--h4">
                <div class="card-header-content">
                    <h4>Course Information</h4>
                    <p>Basic course details and settings</p>
                </div>
                <div class="card-header-actions">
                    <button class="btn btn--icon-only-minimal btn--medium" aria-label="Course settings">
                        <span class="btn-icon" style="mask-image: var(--icon-settings-outline);" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
            <div class="card-content">
                <!-- Course information content -->
            </div>
        </div>
        
        <div class="card card--primary card--shadow">
            <div class="card-header card-header--h4">
                <div class="card-header-content">
                    <h4>Enrollment Settings</h4>
                    <p>Manage student access and registration</p>
                </div>
                <div class="card-header-actions">
                    <button class="btn btn--icon-only-minimal btn--medium" aria-label="Enrollment options">
                        <span class="btn-icon" style="mask-image: var(--icon-more-outline);" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
            <div class="card-content">
                <!-- Enrollment settings content -->
            </div>
        </div>
    </div>
</section>
```

*Description: Using card components within layout sections for enhanced visual organization and interactive headers.*

#### Variant: Mixed Cards and Forms

```html
<section class="page-section">
    <h2>User Profile</h2>
    <p class="page-section-description">Manage user information and preferences</p>
    
    <div class="page-section-content">
        <div class="card card--primary card--shadow">
            <div class="card-header card-header--h4">
                <div class="card-header-content">
                    <h4>Personal Information</h4>
                    <p>Update your basic profile details</p>
                </div>
                <div class="card-header-actions">
                    <button class="btn btn--icon-only-minimal btn--medium" aria-label="Edit profile">
                        <span class="btn-icon" style="mask-image: var(--icon-edit-outline);" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
            <div class="card-content">
                <div class="form-field">
                    <label for="user-name" class="form-label">Full Name</label>
                    <input type="text" id="user-name" class="form-input" value="John Doe">
                </div>
                <div class="form-field">
                    <label for="user-email" class="form-label">Email Address</label>
                    <input type="email" id="user-email" class="form-input" value="john@example.com">
                </div>
            </div>
        </div>
        
        <div class="card card--secondary">
            <div class="card-header card-header--h4-small">
                <div class="card-header-content">
                    <h4>Notification Preferences</h4>
                    <p>Choose how you want to receive updates</p>
                </div>
            </div>
            <div class="card-content">
                <div class="form-field">
                    <fieldset class="form-fieldset">
                        <legend class="form-legend">Communication Methods</legend>
                        <div class="form-checkbox-group">
                            <label class="form-checkbox-label">
                                <input type="checkbox" class="form-checkbox" checked>
                                <span class="form-checkbox-custom"></span>
                                Email notifications
                            </label>
                            <label class="form-checkbox-label">
                                <input type="checkbox" class="form-checkbox">
                                <span class="form-checkbox-custom"></span>
                                SMS updates
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</section>
```

*Description: Combining cards with form components for structured, interactive content sections.*

---

### 🎯 Configuration Options

| Option | Type | Values / Example | Description |
|--------|------|------------------|-------------|
| `.page-header-description` | class | Applied to `<p>` element | Optional description text below page title |
| `.page-section-description` | class | Applied to `<p>` element | Optional description text below section title |
| `.page-module-description` | class | Applied to `<p>` element | Optional description text below module title |
| `.page-header-actions` | class | Applied to container `<div>` | Container for action buttons in page header |
| `.page-section-content` | class | Applied to container `<div>` | Wrapper for section content with proper spacing |
| `.page-module-content` | class | Applied to container `<div>` | Wrapper for module content with proper spacing |

---

### 🎨 CSS Classes

| Class Name | Role / Description |
|------------|-------------------|
| `.page-header` | Root container for page title and actions (36px bottom margin) |
| `.page-header-content` | Content area with title and description (flex: 1, min-width: 500px) |
| `.page-header-actions` | Action button container (flex-shrink: 0, 12px gap) |
| `.page-section` | Section container with H2 heading (36px bottom margin) |
| `.page-section-content` | Section content wrapper (24px top margin, 24px spacing between children) |
| `.page-module` | Module container with H3 heading (24px bottom margin) |
| `.page-module-content` | Module content wrapper (16px top margin, 16px spacing between children) |

**Spacing System:**
- **H1/H2/H3 to description:** 4px
- **Header to content:** 24px (sections), 16px (modules)
- **Between sections:** 36px
- **Between section elements:** 24px
- **Between module elements:** 16px

**Typography:**
```css
/* All headings use consistent styling */
.page-header h1, .page-section h2, .page-module h3 {
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin: 0;
}

/* All descriptions use secondary text color */
.page-header-description, .page-section-description, .page-module-description {
    color: var(--color-text-secondary);
    margin-top: var(--spacing-4);
    margin-bottom: 0;
}
```

**Horizontal Rules:**
```css
hr {
    border: none;
    border-top: 1px solid var(--color-line-stroke);
    margin: 0; /* Base - contextual margins applied by location */
}

/* Contextual margins based on container */
.page-section hr { margin: var(--spacing-24) 0; }
.page-module hr { margin: var(--spacing-16) 0; }
.page-section + hr { margin: var(--spacing-36) 0; }
```

---

### ⚙️ JavaScript Behavior

The page layout system is purely CSS-based and requires no JavaScript for basic functionality. However, you can enhance it with responsive behaviors:

```js
// Responsive header action management
function handleHeaderActions() {
    const header = document.querySelector('.page-header');
    const actions = document.querySelector('.page-header-actions');
    
    if (!header || !actions) return;
    
    // Add responsive class based on content width
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            header.classList.toggle('page-header--narrow', width < 768);
        }
    });
    
    resizeObserver.observe(header);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', handleHeaderActions);

// Smooth scroll to sections (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
```

*Description: Optional JavaScript for responsive behavior and smooth scrolling enhancements.*

**Responsive Behavior:**
- **Desktop (768px+)**: Page header actions align right of title/description
- **Mobile (Under 768px)**: Page header actions stack below title/description with left alignment
- **Action Wrapping**: Action buttons can wrap to multiple lines if needed
- **Content Constraints**: Mobile removes min-width constraints for better flexibility

**Browser Support:**
- Modern browsers with flexbox support
- CSS custom properties (IE11+)
- ResizeObserver API for enhanced responsive behavior (optional)