## Tray

**Brief description:**\
*A tray component that slides in from the right side of the screen to display contextual content, forms, or settings without navigating away from the current page. Trays allow users to maintain context while accessing additional functionality or information.*

---

### ⚠️ Steering Notes (AI Priority)

- Always include proper ARIA labels and semantic markup for accessibility compliance.
- Use semantic HTML5 elements (header, main, footer) within tray structure.
- Avoid inline styles - use CSS classes and CSS custom properties for theming.
- Component must work without external JavaScript libraries.
- Both the Close button and Cancel button should close the tray

---

### 🏦 Usage Instructions

**When to use trays:**
- Settings panels and configuration options
- Contextual forms that don't require full attention
- Additional information or details panels
- Navigation menus or filters
- Multi-step workflows that benefit from context retention
- Quick actions or tools that supplement main content

**When NOT to use trays:**
- Critical confirmations (use modals instead)
- Primary content that should be the main focus
- Complex workflows that need full screen space
- Content that users need to reference while working in the tray

**Dependencies:**
- Requires TrayManager JavaScript class for full functionality
- CSS custom properties for consistent theming
- Icon system for close buttons
- CSS transitions for smooth slide animations

**Initialization:**
```javascript
// Auto-initializes on page load
const trayManager = new TrayManager();

// Open tray programmatically
openTray('trayOverlaySmall', options);
```

---

### 🧱 HTML Variants

#### Variant: Basic Tray (Small)

```html
<div id="trayOverlaySmall" class="tray-overlay">
    <div class="tray tray--small">
        <div class="tray-header">
            <h3>Tray Title</h3>
            <button class="btn btn--icon-only-minimal btn--small" aria-label="Close tray">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
        <div class="tray-body">
            <p>Tray content goes here.</p>
        </div>
        <div class="tray-footer">
            <button class="btn btn--ghost btn--medium">Cancel</button>
            <button class="btn btn--primary btn--medium">Save</button>
        </div>
    </div>
</div>
```

*Description: Small tray (320px) for quick actions, simple forms, or compact information display.*

#### Variant: Medium Tray (Forms)

```html
<div id="trayOverlayMedium" class="tray-overlay">
    <div class="tray tray--medium">
        <div class="tray-header">
            <h3>Contact Form</h3>
            <button class="btn btn--icon-only-minimal btn--small" aria-label="Close tray">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
        <div class="tray-body">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" class="form-input" placeholder="Enter your name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-input" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" class="form-input" placeholder="Enter your message"></textarea>
            </div>
        </div>
        <div class="tray-footer">
            <button class="btn btn--ghost btn--medium">Cancel</button>
            <button class="btn btn--primary btn--medium">Submit</button>
        </div>
    </div>
</div>
```

*Description: Medium tray (480px) for forms and content that needs more space without blocking the main interface.*

#### Variant: Large Tray (Settings)

```html
<div id="trayOverlayLarge" class="tray-overlay">
    <div class="tray tray--large">
        <div class="tray-header">
            <h3>Settings</h3>
            <button class="btn btn--icon-only-minimal btn--small" aria-label="Close tray">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
        <div class="tray-body">
            <section class="settings-section">
                <h4>General Settings</h4>
                <div class="setting-item">
                    <label class="checkbox-label">
                        <input type="checkbox" checked>
                        Enable notifications
                    </label>
                </div>
                <div class="setting-item">
                    <label class="checkbox-label">
                        <input type="checkbox">
                        Auto-save drafts
                    </label>
                </div>
                <div class="setting-item">
                    <label for="theme">Theme</label>
                    <select id="theme" class="form-input">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>Auto</option>
                    </select>
                </div>
            </section>
        </div>
        <div class="tray-footer">
            <button class="btn btn--ghost btn--medium">Reset</button>
            <button class="btn btn--secondary btn--medium">Cancel</button>
            <button class="btn btn--primary btn--medium">Save Settings</button>
        </div>
    </div>
</div>
```

*Description: Large tray (640px) for detailed settings panels, comprehensive forms, or information displays.*

#### Variant: Extra Large Tray (Data Management)

```html
<div id="trayOverlayXLarge" class="tray-overlay">
    <div class="tray tray--xlarge">
        <div class="tray-header">
            <h3>User Management</h3>
            <button class="btn btn--icon-only-minimal btn--small" aria-label="Close tray">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
        <div class="tray-body">
            <div class="data-controls">
                <input type="search" placeholder="Search users..." class="form-input">
                <button class="btn btn--secondary btn--medium">Filter</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>[email]</td>
                        <td>Admin</td>
                        <td><span class="status-indicator status-indicator--success">Active</span></td>
                        <td>
                            <button class="btn btn--icon-only-minimal btn--small">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="tray-footer">
            <button class="btn btn--ghost btn--medium">Export</button>
            <button class="btn btn--secondary btn--medium">Cancel</button>
            <button class="btn btn--primary btn--medium">Apply Changes</button>
        </div>
    </div>
</div>
```

*Description: Extra large tray (800px) for complex workflows, data tables, or comprehensive dashboards.*

---

### 🎯 Configuration Options

| Option    | Type      | Values / Example                    | Description                                    |
| --------- | --------- | ----------------------------------- | ---------------------------------------------- |
| `size`    | string    | `"small"` / `"medium"` / `"large"` / `"xlarge"` | Controls tray width and layout |
| `title`   | string    | `"Tray Title"`                      | Sets the tray header title text               |
| `body`    | string    | `"<p>HTML content</p>"`             | Sets the tray body HTML content               |
| `id`      | attribute | `"trayOverlaySmall"`                | Unique identifier for targeting specific tray |

---

### 🎨 CSS Classes

| Class Name                | Role / Description                                    |
| ------------------------- | ----------------------------------------------------- |
| `.tray-overlay`           | Overlay container (may or may not have backdrop)     |
| `.tray-overlay.active`    | Active state - makes tray visible and slides in      |
| `.tray`                   | Tray container with default behavior                 |
| `.tray--small`            | Small tray modifier (320px width)                    |
| `.tray--medium`           | Medium tray modifier (480px width)                   |
| `.tray--large`            | Large tray modifier (640px width)                    |
| `.tray--xlarge`           | Extra large tray modifier (800px width)              |
| `.tray-header`            | Header section containing title and close button     |
| `.tray-body`              | Main content area with scrollable overflow           |
| `.tray-footer`            | Footer section containing action buttons             |

---

### ⚙️ JavaScript Behavior

The TrayManager class handles all tray interactions automatically. Include this code in your HTML file:

```js
// Tray Manager Class
class TrayManager {
    constructor() {
        this.activeTray = null;
        this.init();
    }

    init() {
        // Auto-discover all trays on the page
        const trays = document.querySelectorAll('.tray-overlay');
        trays.forEach(tray => this.setupTray(tray));

        // Global escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeTray) {
                this.close();
            }
        });
    }

    setupTray(trayOverlay) {
        const tray = trayOverlay.querySelector('.tray');
        const closeBtn = tray.querySelector('[id*="close"], [aria-label*="Close"]');
        const cancelBtn = tray.querySelector('[id*="cancel"]');

        // Close on overlay click (optional - trays might not want this)
        trayOverlay.addEventListener('click', (e) => {
            if (e.target === trayOverlay) {
                this.close();
            }
        });

        // Close button handlers
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.close());
        }

        // Focus trap
        trayOverlay.addEventListener('keydown', (e) => {
            if (!trayOverlay.classList.contains('active')) return;
            this.handleFocusTrap(e, tray);
        });
    }

    open(trayId, options = {}) {
        // Close any currently open tray
        this.close();

        const trayOverlay = document.getElementById(trayId);
        if (!trayOverlay) {
            console.error(`Tray with id "${trayId}" not found`);
            return;
        }

        const tray = trayOverlay.querySelector('.tray');
        
        // Apply size class if specified
        if (options.size) {
            tray.className = tray.className.replace(/tray--\w+/g, '');
            if (options.size !== 'default') {
                tray.classList.add(`tray--${options.size}`);
            }
        }

        // Set content if provided
        if (options.title) {
            const titleEl = tray.querySelector('.tray-header h3');
            if (titleEl) titleEl.textContent = options.title;
        }

        if (options.body) {
            const bodyEl = tray.querySelector('.tray-body');
            if (bodyEl) bodyEl.innerHTML = options.body;
        }

        // Show tray
        trayOverlay.classList.add('active');
        this.activeTray = trayOverlay;

        // Focus management
        const closeBtn = tray.querySelector('[id*="close"], [aria-label*="Close"]');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }

        // Store opener for focus return
        this.opener = document.activeElement;
    }

    close() {
        if (!this.activeTray) return;

        this.activeTray.classList.remove('active');
        
        // Return focus to opener
        if (this.opener && this.opener.focus) {
            this.opener.focus();
        }

        this.activeTray = null;
        this.opener = null;
    }

    handleFocusTrap(e, tray) {
        if (e.key !== 'Tab') return;

        const focusableElements = tray.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

// Initialize tray manager
const trayManager = new TrayManager();

// Simple API for opening trays
function openTray(trayId, options = {}) {
    trayManager.open(trayId, options);
}

function closeTray() {
    trayManager.close();
}

// Example usage
document.getElementById('openTrayBtn')?.addEventListener('click', () => {
    openTray('trayOverlayMedium', {
        title: 'Settings Panel',
        body: '<p>This is dynamically generated tray content.</p>',
        size: 'medium'
    });
});
```

*Description: Complete tray management system with automatic initialization, focus management, and smooth slide animations.*

**Key Features:**
- Runs on DOMContentLoaded automatically
- No external libraries required
- Handles focus trapping and keyboard navigation
- Supports dynamic content and sizing
- Manages multiple trays (only one open at a time)
- Smooth slide-in animation from the right
- Optional overlay click to close (configurable per use case)

