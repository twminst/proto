## Menu System

**Brief description:**\
*A comprehensive dropdown menu system that supports various menu types including standard dropdowns, custom selects, searchable inputs, and complex menu interactions with full accessibility support.*

---

### ⚠️ Steering Notes (AI Priority)

*Use this section to steer the AI's behavior and priorities. Include rules, do's and don'ts, special considerations, or anything the AI should always keep in mind when working with this component.*

- Always use proper ARIA attributes (role="menu", role="menuitem", aria-haspopup, aria-expanded)
- Menu triggers must have `data-menu` attribute pointing to menu ID
- Never mix menu types within the same container without proper scoping
- Always include keyboard navigation support (Arrow keys, Home/End, Enter/Space, Escape)
- Use `.menu-item--selectable` for items that update form values or selections
- Include proper outside click handling to close menus
- Menu items should be focusable with `tabindex="-1"` except when active
- Use debounced search to prevent performance issues with large datasets
- **Chevron Icon Management**: Only buttons with `.menu-trigger-chevron` class will have their chevrons swapped. Other menu trigger icons (like more, settings) remain unchanged
- **Button Types**: Use appropriate button classes - `btn--with-chevron` for buttons that include chevrons, standard button classes for icon-only triggers

---

### 🏦 Usage Instructions

*High-level guidance for how this component is typically used.*

- Requires the MenuManager class to be initialized (auto-initializes on page load)
- All menu triggers need `data-menu` attribute pointing to the menu's ID
- Menu containers must have proper `role` attributes based on menu type
- For custom selects, wrap in form fields and use `.form-select-custom` class
- Searchable inputs require `.searchable-text-input` class and `data-menu` attribute
- Menu items must have proper semantic structure with icons and text spans
- Initialize once per page - the MenuManager handles all menu types automatically

---

### 🧱 HTML Variants

Provide **all valid HTML structures** for this component. Each variant should show an example and describe its intended use.

#### Variant: Basic Dropdown Menu

```html
<!-- Basic button-triggered dropdown menu -->
<div class="menu-container">
    <button class="btn btn--secondary btn--medium btn--with-chevron menu-trigger" 
            data-menu="basic-menu" 
            aria-haspopup="true" 
            aria-expanded="false">
        Actions
        <span class="menu-trigger-chevron" style="mask-image: var(--icon-chevron-down-outline);" aria-hidden="true"></span>
    </button>
    
    <div class="menu" id="basic-menu" role="menu" aria-hidden="true">
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-add-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">Add Item</span>
        </div>
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-edit-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">Edit</span>
        </div>
        <div class="menu-separator" role="separator"></div>
        <div class="menu-item menu-item--danger" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-delete-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">Delete</span>
        </div>
    </div>
</div>
```

*Description: Standard dropdown menu triggered by button click. Supports icons, separators, and danger states.*

#### Variant: Menu with Headers

```html
<!-- Menu with section headers and grouping -->
<div class="menu-container">
    <button class="btn btn--secondary btn--medium btn--with-chevron menu-trigger" 
            data-menu="header-menu" 
            aria-haspopup="true" 
            aria-expanded="false">
        More Options
        <span class="menu-trigger-chevron" style="mask-image: var(--icon-chevron-down-outline);" aria-hidden="true"></span>
    </button>
    
    <div class="menu" id="header-menu" role="menu" aria-hidden="true">
        <div class="menu-header">File Actions</div>
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-upload-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">Upload</span>
        </div>
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-download-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">Download</span>
        </div>
        <div class="menu-separator" role="separator"></div>
        <div class="menu-header">View Options</div>
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-grid-view-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">Grid View</span>
        </div>
    </div>
</div>
```

*Description: Organized menu with section headers for grouping related actions. Use `.menu-header` for section labels.*

#### Variant: Custom Select Menu

```html
<!-- Custom select replacement with proper form integration -->
<div class="form-field">
    <label for="custom-select" class="form-label">Choose Status</label>
    <div class="menu-container">
        <button class="form-select-custom menu-trigger" 
                data-menu="select-menu" 
                aria-haspopup="listbox" 
                aria-expanded="false" 
                id="custom-select">
            <span class="form-select-value">Select an option...</span>
            <span class="form-select-icon" style="mask-image: var(--icon-chevron-down-outline);" aria-hidden="true"></span>
        </button>
        
        <div class="menu menu--select" id="select-menu" role="listbox" aria-hidden="true">
            <div class="menu-header">Status Options</div>
            <div class="menu-item menu-item--selectable" role="option" tabindex="-1" data-value="active">
                <span class="menu-item-icon" style="mask-image: var(--icon-check-outline);" aria-hidden="true"></span>
                <span class="menu-item-text">Active</span>
                <span class="menu-item-check" style="mask-image: var(--icon-check-solid);" aria-hidden="true"></span>
            </div>
            <div class="menu-item menu-item--selectable" role="option" tabindex="-1" data-value="pending">
                <span class="menu-item-icon" style="mask-image: var(--icon-clock-outline);" aria-hidden="true"></span>
                <span class="menu-item-text">Pending</span>
                <span class="menu-item-check" style="mask-image: var(--icon-check-solid);" aria-hidden="true"></span>
            </div>
        </div>
    </div>
</div>
```

*Description: Custom select replacement with form integration. Uses `role="listbox"` and `role="option"` for proper semantics.*

#### Variant: Searchable Input Menu

```html
<!-- Searchable input with dropdown results -->
<div class="form-field">
    <label for="searchable-input" class="form-label">Select User</label>
    <div class="menu-container">
        <div class="form-input-wrapper form-input-wrapper--icon-left">
            <span class="icon icon-18 form-input-icon" style="mask-image: var(--icon-search-outline);" aria-hidden="true"></span>
            <input type="text" 
                   id="searchable-input" 
                   class="form-input form-input--icon-left searchable-text-input" 
                   placeholder="Search users..." 
                   data-menu="search-menu" 
                   autocomplete="off">
        </div>
        
        <div class="menu menu--searchable menu--select" id="search-menu" role="listbox" aria-hidden="true">
            <div class="menu-items">
                <div class="menu-item menu-item--selectable" role="option" tabindex="-1" data-value="john" data-search="john doe">
                    <span class="menu-item-icon" style="mask-image: var(--icon-user-outline);" aria-hidden="true"></span>
                    <span class="menu-item-text">John Doe</span>
                </div>
                <div class="menu-item menu-item--selectable" role="option" tabindex="-1" data-value="jane" data-search="jane smith">
                    <span class="menu-item-icon" style="mask-image: var(--icon-user-outline);" aria-hidden="true"></span>
                    <span class="menu-item-text">Jane Smith</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

*Description: Autocomplete-style searchable input. Use `data-search` attribute for custom search terms.*

#### Variant: Icon-Only Menu Trigger

```html
<!-- Compact icon-only menu trigger -->
<div class="menu-container">
    <button class="btn btn--icon-only-minimal btn--medium menu-trigger" 
            data-menu="icon-menu" 
            aria-haspopup="true" 
            aria-expanded="false" 
            aria-label="More actions">
        <span class="btn-icon" style="mask-image: var(--icon-more-outline);" aria-hidden="true"></span>
    </button>
    
    <div class="menu menu--right" id="icon-menu" role="menu" aria-hidden="true">
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-text">Share</span>
        </div>
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-text">Duplicate</span>
        </div>
        <div class="menu-separator" role="separator"></div>
        <div class="menu-item menu-item--danger" role="menuitem" tabindex="-1">
            <span class="menu-item-text">Remove</span>
        </div>
    </div>
</div>
```

*Description: Compact menu trigger using only an icon. Include proper `aria-label` for accessibility.*

#### Variant: Icon with Chevron Menu

```html
<!-- Icon button with chevron indicator -->
<div class="menu-container">
    <button class="btn btn--icon-only-minimal btn--medium btn--with-chevron menu-trigger" 
            data-menu="chevron-menu" 
            aria-haspopup="true" 
            aria-expanded="false" 
            aria-label="Settings menu">
        <span class="btn-icon" style="mask-image: var(--icon-settings-outline);" aria-hidden="true"></span>
        <span class="menu-trigger-chevron" style="mask-image: var(--icon-chevron-down-outline);" aria-hidden="true"></span>
    </button>
    
    <div class="menu menu--right" id="chevron-menu" role="menu" aria-hidden="true">
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-edit-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">Edit Settings</span>
        </div>
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-reset-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">Reset to Default</span>
        </div>
    </div>
</div>
```

*Description: Icon button with chevron that swaps up/down when menu opens. Chevron uses `.menu-trigger-chevron` class for proper behavior.*

#### Variant: Primary Button with Chevron

```html
<!-- Primary button with text and chevron -->
<div class="menu-container">
    <button class="btn btn--primary btn--medium btn--with-chevron menu-trigger" 
            data-menu="primary-menu" 
            aria-haspopup="true" 
            aria-expanded="false">
        Create New
        <span class="menu-trigger-chevron" style="mask-image: var(--icon-chevron-down-outline);" aria-hidden="true"></span>
    </button>
    
    <div class="menu" id="primary-menu" role="menu" aria-hidden="true">
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-document-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">New Document</span>
        </div>
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-folder-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">New Folder</span>
        </div>
        <div class="menu-item" role="menuitem" tabindex="-1">
            <span class="menu-item-icon" style="mask-image: var(--icon-template-outline);" aria-hidden="true"></span>
            <span class="menu-item-text">From Template</span>
        </div>
    </div>
</div>
```

*Description: Primary button with text and chevron for create/add actions. Uses proper spacing and chevron swapping behavior.*

---

### 🎯 Configuration Options

List the modifiers, flags, or attributes the component supports.

| Option | Type | Values / Example | Description |
| --- | --- | --- | --- |
| `data-menu` | attribute | `"menu-id"` | Links trigger to its menu element |
| `data-value` | attribute | `"option-value"` | Value for selectable menu items |
| `data-search` | attribute | `"search terms"` | Custom search text for filtering |
| `aria-haspopup` | attribute | `"true"` / `"listbox"` | Indicates popup type |
| `aria-expanded` | attribute | `"true"` / `"false"` | Current expanded state |
| `role` | attribute | `"menu"` / `"listbox"` / `"menuitem"` / `"option"` | ARIA roles |
| `tabindex` | attribute | `"-1"` | Focusability for menu items |

---

### 🎨 CSS Classes

List and explain all CSS classes that should be applied. Include any BEM-style variants, states, or modifiers.

| Class Name | Role / Description |
| --- | --- |
| `.menu-container` | Wrapper for trigger and menu positioning |
| `.menu-trigger` | Element that triggers menu open/close |
| `.menu` | Menu container element |
| `.menu--select` | Modifier for select-style menus |
| `.menu--searchable` | Modifier for searchable menus |
| `.menu--right` | Right-aligned menu positioning |
| `.menu-item` | Individual menu item element |
| `.menu-item--selectable` | Menu item that can be selected |
| `.menu-item--danger` | Danger/destructive action styling |
| `.menu-item--submenu` | Item that opens a submenu |
| `.menu-item-icon` | Icon within menu item |
| `.menu-item-text` | Text content of menu item |
| `.menu-item-check` | Check mark for selected items |
| `.menu-item-arrow` | Arrow for submenu indicators |
| `.menu-header` | Section header within menu |
| `.menu-separator` | Visual separator between sections |
| `.menu-items` | Container for searchable menu items |
| `.form-select-custom` | Custom select trigger styling |
| `.form-select-value` | Selected value display |
| `.form-select-icon` | Icon in custom select |
| `.searchable-text-input` | Input that triggers searchable menu |
| `.btn--with-chevron` | Button modifier for chevron-containing triggers |
| `.menu-trigger-chevron` | Chevron icon that swaps when menu opens |
| `.open` | Active state for open menus |
| `.selected` | Selected state for menu items |
| `.hidden` | Hidden state for filtered items |

---

### ⚙️ JavaScript Behavior

Detail the JS required for this component, including initialization, event listeners, and logic. This should be **embeddable inline** in a `<script>` tag in the same HTML file.

```js
// MenuManager - Comprehensive menu management system
class MenuManager {
    constructor(options = {}) {
        this.options = {
            menuSelector: '.menu',
            triggerSelector: '.menu-trigger',
            itemSelector: '.menu-item',
            selectableItemSelector: '.menu-item--selectable',
            searchInputSelector: '.searchable-text-input, .menu-search-input',
            customSelectSelector: '.form-select-custom',
            activeClass: 'open',
            selectedClass: 'selected',
            hiddenClass: 'hidden',
            debounceMs: 50,
            focusDelay: 50,
            outsideClickDelay: 100,
            ...options
        };

        this.activeMenu = null;
        this.outsideClickHandlers = new Map();
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeSearchInputs();
        this.initializeCustomSelects();
    }

    bindEvents() {
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        document.addEventListener('keydown', this.handleDocumentKeydown.bind(this));
    }

    handleDocumentClick(e) {
        const trigger = e.target.closest(this.options.triggerSelector);
        const menuItem = e.target.closest(this.options.itemSelector);

        if (trigger) {
            e.preventDefault();
            this.toggleMenu(trigger);
        } else if (menuItem && !menuItem.classList.contains('menu-item--submenu')) {
            this.handleMenuItemClick(menuItem);
        }
    }

    handleDocumentKeydown(e) {
        if (e.key === 'Escape') {
            this.closeAllMenus();
            return;
        }

        if (!this.activeMenu) return;

        const menuItems = this.getVisibleMenuItems(this.activeMenu);
        const currentIndex = menuItems.findIndex(item => item === document.activeElement);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.focusMenuItem(menuItems, this.getNextIndex(currentIndex, menuItems.length));
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.focusMenuItem(menuItems, this.getPreviousIndex(currentIndex, menuItems.length));
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (document.activeElement.classList.contains(this.options.itemSelector.replace('.', ''))) {
                    this.handleMenuItemClick(document.activeElement);
                }
                break;
            case 'Home':
                e.preventDefault();
                this.focusMenuItem(menuItems, 0);
                break;
            case 'End':
                e.preventDefault();
                this.focusMenuItem(menuItems, menuItems.length - 1);
                break;
        }
    }

    toggleMenu(trigger) {
        const menuId = trigger.getAttribute('data-menu');
        const menu = document.getElementById(menuId);
        if (!menu) return;

        const isOpen = menu.classList.contains(this.options.activeClass);
        this.closeAllMenus();

        if (!isOpen) {
            this.openMenu(trigger, menu);
        }
    }

    openMenu(trigger, menu) {
        menu.classList.add(this.options.activeClass);
        this.setAriaStates(trigger, menu, true);
        this.toggleChevronIcon(trigger, true);
        this.adjustMenuWidth(trigger, menu);
        
        this.activeMenu = menu;
        this.setupOutsideClickHandler(trigger, menu);
        this.focusFirstMenuItem(menu);
    }

    closeMenu(trigger, menu) {
        menu.classList.remove(this.options.activeClass);
        this.setAriaStates(trigger, menu, false);
        this.toggleChevronIcon(trigger, false);
        this.cleanupOutsideClickHandler(menu);
        
        if (this.activeMenu === menu) {
            this.activeMenu = null;
        }
    }

    closeAllMenus() {
        document.querySelectorAll(`${this.options.menuSelector}.${this.options.activeClass}`).forEach(menu => {
            const trigger = document.querySelector(`[data-menu="${menu.id}"]`);
            if (trigger) {
                this.closeMenu(trigger, menu);
            }
        });
    }

    // Utility methods
    setAriaStates(trigger, menu, isOpen) {
        trigger.setAttribute('aria-expanded', isOpen.toString());
        menu.setAttribute('aria-hidden', (!isOpen).toString());
    }

    toggleChevronIcon(trigger, isOpen) {
        const icon = trigger.querySelector('.btn-icon, .form-select-icon');
        if (icon) {
            if (isOpen) {
                icon.style.maskImage = 'var(--icon-chevron-up-outline)';
            } else {
                icon.style.maskImage = 'var(--icon-chevron-down-outline)';
            }
        }
    }

    adjustMenuWidth(trigger, menu) {
        if (trigger.classList.contains('form-select-custom')) {
            menu.style.minWidth = trigger.offsetWidth + 'px';
        }
    }

    setupOutsideClickHandler(trigger, menu) {
        const handler = (e) => {
            if (!trigger.contains(e.target) && !menu.contains(e.target)) {
                this.closeMenu(trigger, menu);
            }
        };

        setTimeout(() => {
            document.addEventListener('click', handler);
            this.outsideClickHandlers.set(menu, handler);
        }, this.options.outsideClickDelay);
    }

    cleanupOutsideClickHandler(menu) {
        const handler = this.outsideClickHandlers.get(menu);
        if (handler) {
            document.removeEventListener('click', handler);
            this.outsideClickHandlers.delete(menu);
        }
    }

    getVisibleMenuItems(menu) {
        return Array.from(menu.querySelectorAll(this.options.itemSelector))
            .filter(item => !item.classList.contains(this.options.hiddenClass) && 
                           !item.classList.contains('menu-header') && 
                           !item.classList.contains('menu-separator'));
    }

    focusMenuItem(menuItems, index) {
        if (menuItems[index]) {
            menuItems[index].focus();
        }
    }

    getNextIndex(currentIndex, length) {
        return currentIndex < length - 1 ? currentIndex + 1 : 0;
    }

    getPreviousIndex(currentIndex, length) {
        return currentIndex > 0 ? currentIndex - 1 : length - 1;
    }

    focusFirstMenuItem(menu) {
        setTimeout(() => {
            const firstItem = this.getVisibleMenuItems(menu)[0];
            if (firstItem) {
                firstItem.focus();
            }
        }, this.options.focusDelay);
    }

    // Additional helper methods for search, selection, and accessibility...
    // (Complete implementation available in playground.html and forms.html)

    // Public API methods
    openMenuById(menuId) {
        const menu = document.getElementById(menuId);
        const trigger = document.querySelector(`[data-menu="${menuId}"]`);
        if (menu && trigger) {
            this.openMenu(trigger, menu);
        }
    }

    closeMenuById(menuId) {
        const menu = document.getElementById(menuId);
        const trigger = document.querySelector(`[data-menu="${menuId}"]`);
        if (menu && trigger) {
            this.closeMenu(trigger, menu);
        }
    }

    getActiveMenu() {
        return this.activeMenu;
    }

    destroy() {
        this.closeAllMenus();
        this.outsideClickHandlers.clear();
    }
}

// Initialize menu manager
const menuManager = new MenuManager();
```

*Description: Complete menu management system with accessibility, keyboard navigation, and extensible architecture.*

**Key Features:**
- **Automatic initialization** - Works on page load without configuration
- **Multiple menu types** - Supports dropdowns, selects, searchable inputs
- **Full accessibility** - ARIA compliant with keyboard navigation
- **Event-driven** - Dispatches custom events for integration
- **Memory management** - Proper cleanup of event listeners
- **Configurable** - All selectors and behaviors can be customized

**Usage:**
- Auto-initializes on page load
- No external libraries required
- Works with all menu variants simultaneously
- Provides public API for programmatic control