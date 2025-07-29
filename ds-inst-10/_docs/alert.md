## Alert

**Brief description:**\
*A flexible alert component that displays important messages to users with different semantic variants (info, success, warning, error) and optional dismissible functionality.*

---

### ⚠️ Steering Notes (AI Priority)

- Always use semantic HTML with proper ARIA labels for accessibility
- Alert variants must use the correct icon and color tokens for each type
- The alert component requires the design system's button component for dismiss functionality
- Component must work without external JavaScript libraries
- Icons use CSS mask-image technique with design system icon tokens
- Always include the icon section - alerts without icons are not supported

---

### 🏦 Usage Instructions

- Use for system messages, notifications, and important user feedback
- Place alerts at the top of content areas or as floating notifications
- Requires CSS color tokens and icon tokens to be loaded
- Depends on the design system's button component for dismissible functionality
- Initialize JavaScript for dismissible alerts and dynamic alert creation

---

### 🧱 HTML Variants

#### Variant: Info Alert (Default)

```html
<div class="alert alert--info">
    <div class="alert__icon-section">
        <div class="alert__icon alert__icon--info"></div>
    </div>
    <div class="alert__content">
        <div class="alert__text">Buying the right telescope to take your love of astronomy to the next level is a big next step in the development of your passion for the stars.</div>
    </div>
</div>
```

*Description: Default blue info alert for general information.*

#### Variant: Success Alert

```html
<div class="alert alert--success">
    <div class="alert__icon-section">
        <div class="alert__icon alert__icon--success"></div>
    </div>
    <div class="alert__content">
        <div class="alert__text">Your action has been completed successfully. All changes have been saved.</div>
    </div>
</div>
```

*Description: Green success alert for positive feedback.*

#### Variant: Warning Alert

```html
<div class="alert alert--warning">
    <div class="alert__icon-section">
        <div class="alert__icon alert__icon--warning"></div>
    </div>
    <div class="alert__content">
        <div class="alert__text">Please review your input before proceeding. Some fields may need attention.</div>
    </div>
</div>
```

*Description: Yellow warning alert for caution messages.*

#### Variant: Error Alert

```html
<div class="alert alert--error">
    <div class="alert__icon-section">
        <div class="alert__icon alert__icon--error"></div>
    </div>
    <div class="alert__content">
        <div class="alert__text">There was an error processing your request. Please try again or contact support.</div>
    </div>
</div>
```

*Description: Red error alert for error messages.*

#### Variant: Dismissible Alert

```html
<div class="alert alert--info alert--dismissible" id="dismissibleAlert">
    <div class="alert__icon-section">
        <div class="alert__icon alert__icon--info"></div>
    </div>
    <div class="alert__content">
        <div class="alert__text">This alert can be dismissed by clicking the close button on the right side.</div>
        <button class="btn btn--icon-only-minimal btn--small" aria-label="Close alert" onclick="dismissAlert('dismissibleAlert')">
            <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
        </button>
    </div>
</div>
```

*Description: Alert with close button for user dismissal.*

#### Variant: Floating Alert

```html
<div class="alert alert--info alert--dismissible alert--floating" id="floatingAlert">
    <div class="alert__icon-section">
        <div class="alert__icon alert__icon--info"></div>
    </div>
    <div class="alert__content">
        <div class="alert__text">This is a floating notification alert.</div>
        <button class="btn btn--icon-only-minimal btn--small" aria-label="Close alert" onclick="dismissAlert('floatingAlert')">
            <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
        </button>
    </div>
</div>
```

*Description: Floating alert with shadow for dynamic notifications.*

---

### 🎯 Configuration Options

| Option            | Type  | Values                              | Description                          |
| ----------------- | ----- | ----------------------------------- | ------------------------------------ |
| `.alert--info`    | class | boolean (present or not)            | Blue info variant (default)          |
| `.alert--success` | class | boolean (present or not)            | Green success variant                |
| `.alert--warning` | class | boolean (present or not)            | Yellow warning variant               |
| `.alert--error`   | class | boolean (present or not)            | Red error variant                    |
| `.alert--dismissible` | class | boolean (present or not)        | Enables slide-in animation           |
| `.alert--dismissing`  | class | boolean (present or not)        | Triggers slide-out animation         |
| `.alert--floating`    | class | boolean (present or not)        | Floating style with shadow           |

---

### 🎨 CSS Classes

| Class Name                | Role / Description                           |
| ------------------------- | -------------------------------------------- |
| `.alert`                  | Root element - base alert container          |
| `.alert--info`            | Info variant with blue color scheme         |
| `.alert--success`         | Success variant with green color scheme     |
| `.alert--warning`         | Warning variant with yellow color scheme    |
| `.alert--error`           | Error variant with red color scheme         |
| `.alert--dismissible`     | Adds slide-in animation                      |
| `.alert--dismissing`      | Triggers slide-out animation for removal    |
| `.alert--floating`        | Floating style with box shadow              |
| `.alert__icon-section`    | Icon container with colored background      |
| `.alert__icon`            | Icon element using mask-image technique     |
| `.alert__icon--info`      | Info icon (info-borderless-solid)          |
| `.alert__icon--success`   | Success icon (check-solid)                 |
| `.alert__icon--warning`   | Warning icon (warning-solid)               |
| `.alert__icon--error`     | Error icon (unpublish-solid)               |
| `.alert__content`         | Content container with white background    |
| `.alert__text`            | Text content with proper typography        |

---

### ⚙️ JavaScript Behavior

```js
function dismissAlert(alertId) {
    const alert = document.getElementById(alertId);
    if (alert) {
        alert.classList.add('alert--dismissing');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }
}

function showAlert(type, message, dismissible = true) {
    const alertContainer = document.getElementById('alertContainer');
    const alertId = 'alert-' + Date.now();
    
    const alertHTML = `
        <div class="alert alert--${type} alert--dismissible alert--floating" id="${alertId}">
            <div class="alert__icon-section">
                <span class="alert__icon alert__icon--${type}" aria-hidden="true"></span>
            </div>
            <div class="alert__content">
                <div class="alert__text">${message}</div>
                ${dismissible ? `
                    <button class="btn btn--icon-only-minimal btn--small" aria-label="Close alert" onclick="dismissAlert('${alertId}')">
                        <span class="btn-icon" style="mask-image: var(--icon-close-outline);" aria-hidden="true"></span>
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto-dismiss after 5 seconds if dismissible
    if (dismissible) {
        setTimeout(() => {
            dismissAlert(alertId);
        }, 5000);
    }
}
```

*Description: **`dismissAlert()`** handles alert removal with animation. **`showAlert()`** creates dynamic floating alerts.*

- Requires an alert container element with ID 'alertContainer'
- Auto-dismisses floating alerts after 5 seconds
- No external libraries required
- Uses 300ms animation timing for smooth transitions