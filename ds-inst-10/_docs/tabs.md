## Tabs

**Brief description:**\
*A navigation component that allows users to switch between different content sections. Includes primary tabs for main page navigation and secondary tabs for content filtering and organization.*

---

### ⚠️ Steering Notes (AI Priority)

*Use this section to steer the AI's behavior and priorities. Include rules, do's and don'ts, special considerations, or anything the AI should always keep in mind when working with this component.*

- Always use proper ARIA attributes (role="tablist", role="tab", role="tabpanel")
- Primary tabs MUST only be used directly below page headers
- Secondary tabs can be used anywhere within content areas
- Never mix primary and secondary tab content panel selectors (causes conflicts)
- Always scope secondary tabs to their parent container
- Include keyboard navigation support (arrow keys, Home/End, Enter/Space)
- Maintain transparent backgrounds for tabs unless explicitly styled otherwise
- Always include the `.tab-spacer` element for secondary tabs

---

### 🏦 Usage Instructions

*High-level guidance for how this component is typically used.*

- **Primary tabs**: Use directly below page titles for main navigation between major content sections
- **Secondary tabs**: Use within content areas for filtering, categorization, or sub-navigation
- Requires the TabManager class to be initialized (auto-initializes on DOM load)
- Each tab must have proper `aria-controls` pointing to its content panel
- Content panels must have corresponding `role="tabpanel"` and `aria-labelledby` attributes
- Secondary tabs must be wrapped in a scoping container (typically `.tab-demo`)

---

### 🧱 HTML Variants

Provide **all valid HTML structures** for this component. Each variant should show an example and describe its intended use.

#### Variant: Primary Tabs

```html
<!-- Primary tabs - use directly below page header -->
<nav class="tabs tabs--primary" role="tablist" aria-label="Main Navigation">
    <button class="tab tab--active" role="tab" aria-selected="true" aria-controls="overview-panel" id="overview-tab">
        Overview
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="courses-panel" id="courses-tab">
        Courses
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="analytics-panel" id="analytics-tab">
        Analytics
    </button>
</nav>

<!-- Primary tab content panels -->
<div class="tab-content-container">
    <div class="tab-content tab-content--active" role="tabpanel" id="overview-panel" aria-labelledby="overview-tab">
        <h2>Overview Content</h2>
        <p>Main overview content goes here.</p>
    </div>
    <div class="tab-content" role="tabpanel" id="courses-panel" aria-labelledby="courses-tab">
        <h2>Courses Content</h2>
        <p>Courses content goes here.</p>
    </div>
    <div class="tab-content" role="tabpanel" id="analytics-panel" aria-labelledby="analytics-tab">
        <h2>Analytics Content</h2>
        <p>Analytics content goes here.</p>
    </div>
</div>
```

*Description: Primary tabs for main page navigation. Must be used directly below page titles. Features transparent background with animated bottom stroke indicator.*

#### Variant: Secondary Tabs

```html
<!-- Secondary tabs - can be used anywhere within content -->
<div class="tab-demo">
    <nav class="tabs tabs--secondary" role="tablist" aria-label="Content Filters">
        <button class="tab tab--active" role="tab" aria-selected="true" aria-controls="published-content" id="published-tab">
            Published
        </button>
        <button class="tab" role="tab" aria-selected="false" aria-controls="draft-content" id="draft-tab">
            Drafts
        </button>
        <button class="tab" role="tab" aria-selected="false" aria-controls="archived-content" id="archived-tab">
            Archived
        </button>
        <div class="tab-spacer"></div>
    </nav>
    
    <div class="tab-content tab-content--active" role="tabpanel" id="published-content" aria-labelledby="published-tab">
        <h4>Published Content</h4>
        <p>Published content goes here.</p>
    </div>
    <div class="tab-content" role="tabpanel" id="draft-content" aria-labelledby="draft-tab">
        <h4>Draft Content</h4>
        <p>Draft content goes here.</p>
    </div>
    <div class="tab-content" role="tabpanel" id="archived-content" aria-labelledby="archived-tab">
        <h4>Archived Content</h4>
        <p>Archived content goes here.</p>
    </div>
</div>
```

*Description: Secondary tabs for content filtering and organization. Button-styled with rounded top corners and stroke line that fills remaining space. Must include `.tab-spacer` element.*

---

### 🎯 Configuration Options

List the modifiers, flags, or attributes the component supports.

| Option          | Type      | Values / Example           | Description                           |
| --------------- | --------- | -------------------------- | ------------------------------------- |
| `aria-selected` | attribute | `true` / `false`           | Indicates active/inactive tab state   |
| `aria-controls` | attribute | `"panel-id"`               | Links tab to its content panel        |
| `aria-labelledby` | attribute | `"tab-id"`               | Links content panel to its tab        |
| `role`          | attribute | `"tablist"` / `"tab"` / `"tabpanel"` | ARIA roles for accessibility |
| `.tab--active`  | class     | boolean (present or not)   | Marks the currently selected tab      |
| `.tab-content--active` | class | boolean (present or not) | Shows the active content panel        |

---

### 🎨 CSS Classes

List and explain all CSS classes that should be applied. Include any BEM-style variants, states, or modifiers.

| Class Name              | Role / Description                      |
| ----------------------- | --------------------------------------- |
| `.tabs`                 | Root container for tab navigation       |
| `.tabs--primary`        | Primary tab variant (below page titles) |
| `.tabs--secondary`      | Secondary tab variant (within content)  |
| `.tab`                  | Individual tab element                  |
| `.tab--active`          | Active state for selected tab           |
| `.tab-content`          | Content panel controlled by tabs        |
| `.tab-content--active`  | Active state for visible content panel  |
| `.tab-content-container`| Container for primary tab content panels|
| `.tab-spacer`           | Spacer element for secondary tab stroke line |
| `.tab-demo`             | Scoping container for secondary tabs    |

---

### ⚙️ JavaScript Behavior

Detail the JS required for this component, including initialization, event listeners, and logic. This should be **embeddable inline** in a `<script>` tag in the same HTML file.

```js
// TabManager Class - Reusable tab management functionality
class TabManager {
    constructor(options = {}) {
        this.options = {
            primaryTabsSelector: '.tabs--primary',
            secondaryTabsSelector: '.tabs--secondary',
            tabSelector: '.tab',
            primaryContentSelector: '.tab-content-container > .tab-content',
            secondaryContentSelector: '.tab-content',
            activeTabClass: 'tab--active',
            activeContentClass: 'tab-content--active',
            secondaryContainerSelector: '.tab-demo',
            ...options
        };
        
        this.init();
    }

    init() {
        this.initializeTabs();
        this.setupKeyboardHandlers();
    }

    initializeTabs() {
        const tabContainers = document.querySelectorAll('.tabs');

        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll(this.options.tabSelector);
            const isSecondaryTabs = container.classList.contains('tabs--secondary');
            const isPrimaryTabs = container.classList.contains('tabs--primary');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => this.handleTabClick(tab, container, isPrimaryTabs, isSecondaryTabs));
                tab.addEventListener('keydown', (e) => this.handleKeyNavigation(e, tab, tabs));
            });
        });
    }

    handleTabClick(clickedTab, container, isPrimaryTabs, isSecondaryTabs) {
        const tabs = container.querySelectorAll(this.options.tabSelector);
        
        // Remove active state from all tabs in this container
        tabs.forEach(tab => {
            tab.classList.remove(this.options.activeTabClass);
            tab.setAttribute('aria-selected', 'false');
        });

        // Add active state to clicked tab
        clickedTab.classList.add(this.options.activeTabClass);
        clickedTab.setAttribute('aria-selected', 'true');

        // Handle tab panels with proper scoping
        const targetPanelId = clickedTab.getAttribute('aria-controls');
        if (targetPanelId) {
            this.switchTabPanels(targetPanelId, container, isPrimaryTabs, isSecondaryTabs);
        }
    }

    switchTabPanels(targetPanelId, container, isPrimaryTabs, isSecondaryTabs) {
        if (isPrimaryTabs) {
            // For primary tabs, target main content panels only
            const allPanels = document.querySelectorAll(this.options.primaryContentSelector);
            
            // Hide all primary panels
            allPanels.forEach(panel => {
                panel.classList.remove(this.options.activeContentClass);
            });

            // Show target panel
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.add(this.options.activeContentClass);
            }
        } else if (isSecondaryTabs) {
            // For secondary tabs, scope to nearest container to avoid conflicts
            const parentContainer = container.closest(this.options.secondaryContainerSelector) || container.parentElement;
            const allPanels = parentContainer.querySelectorAll(this.options.secondaryContentSelector);
            
            // Hide all secondary panels in this scope
            allPanels.forEach(panel => {
                panel.classList.remove(this.options.activeContentClass);
            });

            // Show target panel
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.add(this.options.activeContentClass);
            }
        }
    }

    handleKeyNavigation(e, currentTab, tabs) {
        let targetTab = null;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                const prevTab = currentTab.previousElementSibling;
                targetTab = prevTab || tabs[tabs.length - 1];
                break;
            case 'ArrowRight':
                e.preventDefault();
                const nextTab = currentTab.nextElementSibling;
                targetTab = nextTab || tabs[0];
                break;
            case 'Home':
                e.preventDefault();
                targetTab = tabs[0];
                break;
            case 'End':
                e.preventDefault();
                targetTab = tabs[tabs.length - 1];
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                currentTab.click();
                break;
        }

        if (targetTab) {
            targetTab.focus();
        }
    }

    setupKeyboardHandlers() {
        // Global escape key handler for any additional functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey(e);
            }
        });
    }

    handleEscapeKey(e) {
        // Override this method for custom escape behavior
    }

    // Public methods for programmatic control
    activateTab(tabId) {
        const tab = document.getElementById(tabId);
        if (tab && tab.classList.contains(this.options.tabSelector.replace('.', ''))) {
            tab.click();
        }
    }

    activateTabByIndex(containerSelector, index) {
        const container = document.querySelector(containerSelector);
        if (container) {
            const tabs = container.querySelectorAll(this.options.tabSelector);
            if (tabs[index]) {
                tabs[index].click();
            }
        }
    }

    getActiveTab(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (container) {
            return container.querySelector(this.options.tabSelector + this.options.activeTabClass.replace(/^\./, '.'));
        }
        return null;
    }

    // Static method for quick initialization
    static init(options = {}) {
        return new TabManager(options);
    }
}

// Initialize tab manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => TabManager.init());
```

*Description: Complete tab management with proper scoping, keyboard navigation, and accessibility support.*

**Key Features:**
- Auto-initializes on DOM load
- Proper scoping prevents primary/secondary tab conflicts
- Full keyboard navigation (Arrow keys, Home/End, Enter/Space)
- ARIA state management
- Public methods for programmatic control
- Configurable options for customization

**Usage:**
- Runs automatically on page load
- No external libraries required
- Works with both primary and secondary tab types simultaneously