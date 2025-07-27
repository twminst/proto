## Status Indicators

**Brief description:**\
*Compact, pill-shaped components that display status information with optional icons, labels, and values, providing quick visual reference for the state or condition of items using semantic colors.*

---

### ⚠️ Steering Notes (AI Priority)

- Always use semantic state classes that match the meaning of the status being displayed
- Use 14px icons (`icon-14` class) for proper scaling within status indicators
- Include `aria-hidden="true"` for decorative icons when text provides context
- Keep labels concise and always end with a colon (e.g., "Status:", "Due:")
- Use sentence case for both labels and values for consistency
- Choose semantically appropriate icons that reinforce the status meaning
- Ensure sufficient color contrast for accessibility compliance
- Don't mix different status meanings within the same state variant
- Use consistent label formats across the application
- Consider adding `aria-label` for icon-only indicators

---

### 🏦 Usage Instructions

Status indicators help users quickly scan and understand the status of items in lists, tables, or individual contexts. They use semantic colors and icons to communicate different states effectively.

**When to use status indicators:**
- Assignment completion status
- Due date indicators
- Grade or review status
- Error and warning states
- Priority levels
- Progress indicators
- Feature flags or types
- System health status

**Status Hierarchy:**
- **Success**: Positive outcomes, completed tasks, successful operations
- **Warning**: Attention-requiring items, upcoming deadlines, caution scenarios
- **Danger**: Critical issues, failures, urgent attention items
- **Primary**: Featured items, notifications, important information
- **Neutral**: Standard information, in-progress items, default states

**Dependencies:**
- `css/statusindicator.css` - Status indicator styles
- Design tokens for colors, typography, and spacing
- Icon system for status icons

**Content Structure:**
- **Labels**: Bold text ending with colon (e.g., "Status:", "Due:")
- **Values**: Regular weight text providing actual information
- **Icons**: 14px semantic icons that reinforce meaning

---

### 🧱 HTML Variants

#### Variant: Complete Status Indicator (Icon + Label + Value)

```html
<div class="status-indicator status-indicator--success">
    <span class="icon icon-14" style="mask-image: var(--icon-check-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Status:</span>
    <span class="status-indicator-value">Complete</span>
</div>

<div class="status-indicator status-indicator--warning">
    <span class="icon icon-14" style="mask-image: var(--icon-warning-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Due:</span>
    <span class="status-indicator-value">Tomorrow</span>
</div>

<div class="status-indicator status-indicator--danger">
    <span class="icon icon-14" style="mask-image: var(--icon-alert-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Status:</span>
    <span class="status-indicator-value">Failed</span>
</div>
```

*Description: Full status indicators with icon, label, and value for maximum context.*

#### Variant: Label and Value Only

```html
<div class="status-indicator status-indicator--primary">
    <span class="status-indicator-label">Priority:</span>
    <span class="status-indicator-value">High</span>
</div>

<div class="status-indicator status-indicator--warning">
    <span class="status-indicator-label">Issues:</span>
    <span class="status-indicator-value">2 found</span>
</div>

<div class="status-indicator">
    <span class="status-indicator-label">Progress:</span>
    <span class="status-indicator-value">In progress</span>
</div>
```

*Description: Status indicators without icons when visual context is clear from text.*

#### Variant: Value Only

```html
<div class="status-indicator status-indicator--success">
    <span class="status-indicator-value">Passed</span>
</div>

<div class="status-indicator status-indicator--danger">
    <span class="status-indicator-value">Overdue</span>
</div>

<div class="status-indicator status-indicator--warning">
    <span class="status-indicator-value">Pending Review</span>
</div>
```

*Description: Simple status indicators with just the status value.*

#### Variant: Icon Only

```html
<div class="status-indicator status-indicator--success" aria-label="Complete">
    <span class="icon icon-14" style="mask-image: var(--icon-check-outline);" aria-hidden="true"></span>
</div>

<div class="status-indicator status-indicator--warning" aria-label="Warning">
    <span class="icon icon-14" style="mask-image: var(--icon-warning-outline);" aria-hidden="true"></span>
</div>

<div class="status-indicator status-indicator--danger" aria-label="Error">
    <span class="icon icon-14" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
</div>
```

*Description: Minimal status indicators using only icons with accessible labels.*

#### Variant: All Status States

```html
<!-- Success State -->
<div class="status-indicator status-indicator--success">
    <span class="icon icon-14" style="mask-image: var(--icon-check-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Grade:</span>
    <span class="status-indicator-value">Passed</span>
</div>

<!-- Warning State -->
<div class="status-indicator status-indicator--warning">
    <span class="icon icon-14" style="mask-image: var(--icon-warning-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Due:</span>
    <span class="status-indicator-value">Tomorrow</span>
</div>

<!-- Danger State -->
<div class="status-indicator status-indicator--danger">
    <span class="icon icon-14" style="mask-image: var(--icon-alert-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Status:</span>
    <span class="status-indicator-value">Failed</span>
</div>

<!-- Primary State -->
<div class="status-indicator status-indicator--primary">
    <span class="icon icon-14" style="mask-image: var(--icon-info-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Priority:</span>
    <span class="status-indicator-value">High</span>
</div>

<!-- Neutral State (Default) -->
<div class="status-indicator">
    <span class="icon icon-14" style="mask-image: var(--icon-clock-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Status:</span>
    <span class="status-indicator-value">In progress</span>
</div>
```

*Description: All available status states showing semantic color usage.*

#### Variant: Common Use Cases

```html
<!-- Assignment Status -->
<div class="status-indicator status-indicator--success">
    <span class="icon icon-14" style="mask-image: var(--icon-check-outline);" aria-hidden="true"></span>
    <span class="status-indicator-value">Submitted</span>
</div>

<!-- Due Date -->
<div class="status-indicator status-indicator--warning">
    <span class="icon icon-14" style="mask-image: var(--icon-clock-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Due:</span>
    <span class="status-indicator-value">2 days</span>
</div>

<!-- Grade Status -->
<div class="status-indicator status-indicator--success">
    <span class="status-indicator-label">Grade:</span>
    <span class="status-indicator-value">A-</span>
</div>

<!-- Error Count -->
<div class="status-indicator status-indicator--danger">
    <span class="icon icon-14" style="mask-image: var(--icon-warning-outline);" aria-hidden="true"></span>
    <span class="status-indicator-label">Errors:</span>
    <span class="status-indicator-value">3</span>
</div>

<!-- Feature Flag -->
<div class="status-indicator status-indicator--primary">
    <span class="status-indicator-value">Beta</span>
</div>
```

*Description: Real-world examples showing common status indicator use cases.*

---

### 🎯 Configuration Options

| Option | Type | Values / Example | Description |
|--------|------|------------------|-------------|
| State classes | class | `status-indicator--success`, `status-indicator--warning`, `status-indicator--danger`, `status-indicator--primary` | Optional: Defines semantic color and meaning |
| `.status-indicator-label` | class | Applied to label text | Optional: Bold text for status labels (include colon) |
| `.status-indicator-value` | class | Applied to value text | Optional: Regular weight text for status values |
| `aria-label` | attribute | `"Complete"`, `"Warning"` | Required for icon-only indicators |
| Icon size | class | `icon-14` | Required for icons: Use 14px icons for proper scaling |

---

### 🎨 CSS Classes

| Class Name | Role / Description |
|------------|-------------------|
| `.status-indicator` | Base status indicator class - pill shape, 24px height, neutral colors |
| `.status-indicator--success` | Success state - green border and text for positive outcomes |
| `.status-indicator--warning` | Warning state - orange border and text for attention items |
| `.status-indicator--danger` | Danger state - red border and text for critical issues |
| `.status-indicator--primary` | Primary state - blue border and text for important information |
| `.status-indicator-label` | Bold text for status labels (should end with colon) |
| `.status-indicator-value` | Regular weight text for status values |

**Base Status Indicator Styles:**
```css
.status-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 24px;
    padding: 0 8px;
    background-color: var(--color-background-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: 12px;
    font-family: var(--font-family-primary);
    font-size: var(--font-size-body-small);
    line-height: 1;
    color: var(--color-text-primary);
    vertical-align: middle;
}
```

**State Color Mapping:**
| State | Border Token | Text/Icon Color Token |
|-------|-------------|----------------------|
| Success | `--color-border-success` | `--color-success` |
| Warning | `--color-border-warning` | `--color-warning` |
| Danger | `--color-border-error` | `--color-error` |
| Primary | `--color-border-focus` | `--color-primary` |
| Neutral | `--color-border-primary` | `--color-text-primary` |

**Icon Integration:**
```css
.status-indicator .icon {
    margin-right: 4px;
}

.status-indicator .icon:last-child {
    margin-right: 0;
}
```

**Text Elements:**
```css
.status-indicator-label {
    font-weight: var(--font-weight-bold);
}

.status-indicator-value {
    font-weight: var(--font-weight-normal);
}
```

---

### ⚙️ JavaScript Behavior

Status indicators are primarily CSS-based but can be enhanced with JavaScript for dynamic behaviors:

```js
// Status indicator utilities and enhancements
function initializeStatusIndicators() {
    // Dynamic status updates
    function updateStatus(element, newState, newValue, newIcon = null) {
        // Remove existing state classes
        element.classList.remove(
            'status-indicator--success',
            'status-indicator--warning', 
            'status-indicator--danger',
            'status-indicator--primary'
        );
        
        // Add new state class
        if (newState !== 'neutral') {
            element.classList.add(`status-indicator--${newState}`);
        }
        
        // Update value
        const valueElement = element.querySelector('.status-indicator-value');
        if (valueElement) {
            valueElement.textContent = newValue;
        }
        
        // Update icon if provided
        if (newIcon) {
            const iconElement = element.querySelector('.icon');
            if (iconElement) {
                iconElement.style.maskImage = `var(--icon-${newIcon})`;
            }
        }
        
        // Update aria-label for icon-only indicators
        if (!element.querySelector('.status-indicator-label, .status-indicator-value')) {
            element.setAttribute('aria-label', newValue);
        }
    }
    
    // Status animation on change
    function animateStatusChange(element) {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Auto-update status based on data attributes
    function autoUpdateStatuses() {
        document.querySelectorAll('[data-status-source]').forEach(indicator => {
            const source = indicator.dataset.statusSource;
            const element = document.querySelector(source);
            
            if (element) {
                const value = element.textContent || element.value;
                const state = determineStateFromValue(value);
                updateStatus(indicator, state.type, state.text, state.icon);
            }
        });
    }
    
    // Determine status state from value
    function determineStateFromValue(value) {
        const lowerValue = value.toLowerCase();
        
        // Success patterns
        if (['complete', 'passed', 'success', 'done', 'submitted'].some(term => lowerValue.includes(term))) {
            return { type: 'success', text: value, icon: 'check-outline' };
        }
        
        // Warning patterns
        if (['warning', 'pending', 'due soon', 'review'].some(term => lowerValue.includes(term))) {
            return { type: 'warning', text: value, icon: 'warning-outline' };
        }
        
        // Danger patterns
        if (['error', 'failed', 'overdue', 'critical'].some(term => lowerValue.includes(term))) {
            return { type: 'danger', text: value, icon: 'alert-outline' };
        }
        
        // Primary patterns
        if (['important', 'high', 'priority', 'featured'].some(term => lowerValue.includes(term))) {
            return { type: 'primary', text: value, icon: 'info-outline' };
        }
        
        // Default neutral
        return { type: 'neutral', text: value, icon: 'clock-outline' };
    }
    
    // Status indicator factory
    function createStatusIndicator(config) {
        const indicator = document.createElement('div');
        indicator.className = `status-indicator${config.state ? ` status-indicator--${config.state}` : ''}`;
        
        if (config.icon) {
            const icon = document.createElement('span');
            icon.className = 'icon icon-14';
            icon.style.maskImage = `var(--icon-${config.icon})`;
            icon.setAttribute('aria-hidden', 'true');
            indicator.appendChild(icon);
        }
        
        if (config.label) {
            const label = document.createElement('span');
            label.className = 'status-indicator-label';
            label.textContent = config.label;
            indicator.appendChild(label);
        }
        
        if (config.value) {
            const value = document.createElement('span');
            value.className = 'status-indicator-value';
            value.textContent = config.value;
            indicator.appendChild(value);
        }
        
        // Add aria-label for icon-only indicators
        if (config.icon && !config.label && !config.value) {
            indicator.setAttribute('aria-label', config.ariaLabel || 'Status indicator');
        }
        
        return indicator;
    }
    
    // Batch status updates with animation
    function batchUpdateStatuses(updates) {
        updates.forEach((update, index) => {
            setTimeout(() => {
                const element = document.querySelector(update.selector);
                if (element) {
                    updateStatus(element, update.state, update.value, update.icon);
                    animateStatusChange(element);
                }
            }, index * 100); // Stagger animations
        });
    }
    
    // Initialize auto-updates
    autoUpdateStatuses();
    
    // Set up periodic updates if needed
    if (document.querySelector('[data-auto-refresh]')) {
        setInterval(autoUpdateStatuses, 30000); // Every 30 seconds
    }
}

// Usage examples
document.addEventListener('DOMContentLoaded', initializeStatusIndicators);

// Example: Create status indicator programmatically
function addStatusToElement(container, status) {
    const indicator = createStatusIndicator({
        state: status.type,
        icon: status.icon,
        label: status.label,
        value: status.value,
        ariaLabel: status.ariaLabel
    });
    
    container.appendChild(indicator);
    animateStatusChange(indicator);
}

// Example: Update assignment status
function updateAssignmentStatus(assignmentId, newStatus) {
    const indicator = document.querySelector(`[data-assignment="${assignmentId}"] .status-indicator`);
    if (indicator) {
        const statusConfig = {
            'submitted': { state: 'success', value: 'Submitted', icon: 'check-outline' },
            'late': { state: 'warning', value: 'Late', icon: 'clock-outline' },
            'missing': { state: 'danger', value: 'Missing', icon: 'alert-outline' }
        };
        
        const config = statusConfig[newStatus];
        if (config) {
            updateStatus(indicator, config.state, config.value, config.icon);
            animateStatusChange(indicator);
        }
    }
}
```

*Description: JavaScript enhancements for dynamic status updates, animations, and programmatic creation.*

**Common Status Icons:**
- **Success**: `check-outline`, `check-solid`
- **Warning**: `warning-outline`, `clock-outline`
- **Danger**: `alert-outline`, `close-outline`, `warning-outline`
- **Primary**: `info-outline`, `star-outline`
- **Neutral**: `clock-outline`, `dot-outline`

**Accessibility Features:**
- Semantic color coding with sufficient contrast ratios
- ARIA labels for icon-only indicators
- Screen reader friendly text structure
- Keyboard navigation support when interactive

**Performance Considerations:**
- Lightweight CSS implementation (~1KB minified)
- No JavaScript required for basic functionality
- Efficient flexbox layout prevents reflows
- Design token integration for consistent theming

**Browser Support:**
- Modern browsers with flexbox support
- CSS custom properties (IE11+ with polyfill)
- CSS mask for icons (graceful degradation in older browsers)