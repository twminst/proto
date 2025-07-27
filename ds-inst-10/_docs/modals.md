## Modal

**Brief description:**\
*A modal dialog component that displays overlay content requiring user interaction before returning to the main interface. Modals block interaction with the underlying page and provide focused experiences for forms, confirmations, and detailed information.*

---

### ⚠️ Steering Notes (AI Priority)

- Always include proper ARIA labels and semantic markup for accessibility compliance.
- Use CSS classes and CSS custom properties for theming.
- Component must work without external JavaScript libraries.
- Both the Close button and Cancel button should close the modal

---

### 🏦 Usage Instructions

**Dependencies:**
- Requires ModalManager JavaScript class for full functionality
- CSS custom properties for consistent theming
- Icon system for close buttons

**Initialization:**
```javascript
// Auto-initializes on page load
const modalManager = new ModalManager();

// Open modal programmatically
openModal('modalOverlay', options);
```

---

### 🧱 HTML Variants

#### Variant: Basic Modal

```html
<div id="modalOverlay" class="modal-overlay">
    <div class="modal">
        <div class="modal-header">
            <h3>Modal Title</h3>
            <button class="btn btn--icon-only-minimal btn--small" aria-label="Close modal">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
        <div class="modal-body">
            <p>Modal content goes here.</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn--ghost btn--medium">Cancel</button>
            <button class="btn btn--primary btn--medium">Submit</button>
        </div>
    </div>
</div>
```

*Description: Standard modal with header, body, and footer sections.*

#### Variant: Small Modal (Confirmation)

```html
<div id="confirmModal" class="modal-overlay">
    <div class="modal modal--small">
        <div class="modal-header">
            <h3>Confirm Action</h3>
            <button class="btn btn--icon-only-minimal btn--small" aria-label="Close modal">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
        <div class="modal-body">
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn--ghost btn--medium">Cancel</button>
            <button class="btn btn--danger btn--medium">Delete</button>
        </div>
    </div>
</div>
```

*Description: Small modal (400px) optimized for confirmations and simple interactions.*

#### Variant: Large Modal (Complex Forms)

```html
<div id="formModal" class="modal-overlay">
    <div class="modal modal--large">
        <div class="modal-header">
            <h3>User Profile Settings</h3>
            <button class="btn btn--icon-only-minimal btn--small" aria-label="Close modal">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
        <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-16);">
                <div>
                    <label>First Name</label>
                    <input type="text" class="form-input">
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" class="form-input">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn--ghost btn--medium">Cancel</button>
            <button class="btn btn--primary btn--medium">Save Profile</button>
        </div>
    </div>
</div>
```

*Description: Large modal (840px) for complex forms and detailed content.*

#### Variant: Extra Large Modal (Data Tables)

```html
<div id="dataModal" class="modal-overlay">
    <div class="modal modal--xlarge">
        <div class="modal-header">
            <h3>User Management</h3>
            <button class="btn btn--icon-only-minimal btn--small" aria-label="Close modal">
                <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
            </button>
        </div>
        <div class="modal-body">
            <table class="data-table">
                <!-- Table content -->
            </table>
        </div>
        <div class="modal-footer">
            <button class="btn btn--ghost btn--medium">Close</button>
            <button class="btn btn--primary btn--medium">Save Changes</button>
        </div>
    </div>
</div>
```

*Description: Extra large modal (90vw) for data tables and extensive content.*

---

### 🎯 Configuration Options

| Option    | Type      | Values / Example                    | Description                                    |
| --------- | --------- | ----------------------------------- | ---------------------------------------------- |
| `size`    | string    | `"small"` / `"default"` / `"large"` / `"xlarge"` | Controls modal width and layout |
| `title`   | string    | `"Modal Title"`                     | Sets the modal header title text              |
| `body`    | string    | `"<p>HTML content</p>"`             | Sets the modal body HTML content              |
| `id`      | attribute | `"modalOverlay"`                    | Unique identifier for targeting specific modal |

---

### 🎨 CSS Classes

| Class Name                | Role / Description                                    |
| ------------------------- | ----------------------------------------------------- |
| `.modal-overlay`          | Overlay background that covers the entire viewport    |
| `.modal-overlay.active`   | Active state - makes modal visible                   |
| `.modal`                  | Modal container with default width (600px)           |
| `.modal--small`           | Small modal modifier (400px width)                   |
| `.modal--large`           | Large modal modifier (840px width)                   |
| `.modal--xlarge`          | Extra large modal modifier (90vw width)              |
| `.modal-header`           | Header section containing title and close button     |
| `.modal-body`             | Main content area                                     |
| `.modal-footer`           | Footer section containing action buttons             |
| `.modal-open`             | Applied to `<body>` when modal is open (prevents scrolling) |

---

### ⚙️ JavaScript Behavior

The ModalManager class handles all modal interactions automatically. Include this code in your HTML file:

```js
// Modal Manager Class
class ModalManager {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        // Auto-discover all modals on the page
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => this.setupModal(modal));

        // Global escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close();
            }
        });
    }

    setupModal(modalOverlay) {
        const modal = modalOverlay.querySelector('.modal');
        const closeBtn = modal.querySelector('[id*="close"], [aria-label*="Close"]');
        const cancelBtn = modal.querySelector('[id*="cancel"]');

        // Close on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
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
        modalOverlay.addEventListener('keydown', (e) => {
            if (!modalOverlay.classList.contains('active')) return;
            this.handleFocusTrap(e, modal);
        });
    }

    open(modalId, options = {}) {
        // Close any currently open modal
        this.close();

        const modalOverlay = document.getElementById(modalId);
        if (!modalOverlay) {
            console.error(`Modal with id "${modalId}" not found`);
            return;
        }

        const modal = modalOverlay.querySelector('.modal');
        
        // Apply size class if specified
        if (options.size) {
            modal.className = modal.className.replace(/modal--\w+/g, '');
            if (options.size !== 'default') {
                modal.classList.add(`modal--${options.size}`);
            }
        }

        // Set content if provided
        if (options.title) {
            const titleEl = modal.querySelector('.modal-header h3');
            if (titleEl) titleEl.textContent = options.title;
        }

        if (options.body) {
            const bodyEl = modal.querySelector('.modal-body');
            if (bodyEl) bodyEl.innerHTML = options.body;
        }

        // Show modal
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        this.activeModal = modalOverlay;

        // Focus management
        const closeBtn = modal.querySelector('[id*="close"], [aria-label*="Close"]');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }

        // Store opener for focus return
        this.opener = document.activeElement;
    }

    close() {
        if (!this.activeModal) return;

        this.activeModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Return focus to opener
        if (this.opener && this.opener.focus) {
            this.opener.focus();
        }

        this.activeModal = null;
        this.opener = null;
    }

    handleFocusTrap(e, modal) {
        if (e.key !== 'Tab') return;

        const focusableElements = modal.querySelectorAll(
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

// Initialize modal manager
const modalManager = new ModalManager();

// Simple API for opening modals
function openModal(modalId, options = {}) {
    modalManager.open(modalId, options);
}

function closeModal() {
    modalManager.close();
}

// Example usage
document.getElementById('openModalBtn')?.addEventListener('click', () => {
    openModal('modalOverlay', {
        title: 'Example Modal',
        body: '<p>This is dynamically generated content.</p>',
        size: 'large'
    });
});
```

*Description: Complete modal management system with automatic initialization, focus management, and accessibility features.*