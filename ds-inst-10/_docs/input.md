## Form Inputs & Controls

**Brief description:**\
*Comprehensive form input components including text fields, validation states, custom controls, and interactive elements. Provides consistent styling and behavior for all form interactions following design system patterns.*

---

### ⚠️ Steering Notes (AI Priority)

*Use this section to steer the AI's behavior and priorities. Include rules, do's and don'ts, special considerations, or anything the AI should always keep in mind when working with this component.*

- Always wrap form inputs in `.form-field` containers for proper spacing and validation
- Use `.form-input-wrapper` for inputs with icons or action buttons
- Never use native `<select>` elements - always use the custom menu component for dropdowns
- Custom select chevron icons should swap between up/down variants, not rotate with CSS transforms
- **Layout Integration**: When using forms within `.page-section-content` or `.page-module-content`, rely on the layout system's spacing rather than adding extra margins to form containers
- Include proper labels with `for` attributes linking to input IDs
- Use `.form-label-required` span for required field indicators (*)
- Error states must include both visual styling and `.form-message--error` text
- All form controls must be keyboard accessible and screen reader friendly
- File uploads should use the custom `.form-file-upload` component
- Group related inputs using `<fieldset>` and `<legend>` elements
- Always provide help text for complex validation requirements

---

### 🏦 Usage Instructions

*High-level guidance for how this component is typically used.*

- Wrap all form controls in proper semantic structure (`.form-field`, labels, fieldsets)
- Use validation JavaScript functions (`showFormError`, `clearFormErrors`) for error handling
- For select/dropdown functionality, implement using the Menu component (see menu.md)
- File uploads require custom JavaScript for file handling and feedback
- Structure complex forms using `.page-module` and `.page-section` containers
- Include real-time validation for better user experience
- Always test with keyboard navigation and screen readers
- Use consistent spacing and layout patterns across forms

---

### 🧱 HTML Variants

Provide **all valid HTML structures** for this component. Each variant should show an example and describe its intended use.

#### Variant: Basic Text Input

```html
<!-- Standard text input with proper labeling -->
<div class="form-field">
    <label for="basic-text" class="form-label">Basic Text Input</label>
    <input type="text" id="basic-text" class="form-input" placeholder="Enter text here">
</div>
```

*Description: Standard text input for general text entry. Always include proper labels.*

#### Variant: Required Field

```html
<!-- Required field with asterisk indicator -->
<div class="form-field">
    <label for="required-input" class="form-label">
        Required Field <span class="form-label-required">*</span>
    </label>
    <input type="text" id="required-input" class="form-input" placeholder="This field is required" required>
</div>
```

*Description: Required input with visual indicator. Use `required` attribute for validation.*

#### Variant: Input with Left Icon

```html
<!-- Input with decorative left icon -->
<div class="form-field">
    <label for="search-input" class="form-label">Search</label>
    <div class="form-input-wrapper form-input-wrapper--icon-left">
        <span class="icon icon-18 form-input-icon" 
              style="mask-image: var(--icon-search-outline);" 
              aria-hidden="true"></span>
        <input type="text" id="search-input" 
               class="form-input form-input--icon-left" 
               placeholder="Search for courses...">
    </div>
</div>
```

*Description: Input with left-side icon for context. Icons are decorative and aria-hidden.*

#### Variant: Password with Toggle

```html
<!-- Password input with show/hide toggle -->
<div class="form-field">
    <label for="password-toggle" class="form-label">Password</label>
    <div class="form-input-wrapper form-input-wrapper--icon-right">
        <input type="password" id="password-toggle" 
               class="form-input form-input--icon-right" 
               placeholder="Enter password">
        <button type="button" class="form-input-action-btn" 
                onclick="togglePassword('password-toggle', this)" 
                aria-label="Toggle password visibility">
            <span class="icon icon-18 form-input-icon" 
                  style="mask-image: var(--icon-eye-show-outline);" 
                  aria-hidden="true"></span>
        </button>
    </div>
</div>
```

*Description: Password input with visibility toggle button. Includes proper accessibility labels.*

#### Variant: Error State Input

```html
<!-- Input in error state with validation message -->
<div class="form-field">
    <label for="error-input" class="form-label">Email Address</label>
    <div class="form-input-wrapper form-input-wrapper--error">
        <input type="email" id="error-input" 
               class="form-input form-input--error" 
               value="invalid-email">
    </div>
    <div class="form-message form-message--error">
        <span class="icon icon-18 form-message-icon" 
              style="mask-image: var(--icon-warning-outline);" 
              aria-hidden="true"></span>
        Please enter a valid email address
    </div>
</div>
```

*Description: Error state with validation message. Use for real-time validation feedback.*

#### Variant: Input with Help Text

```html
<!-- Input with helpful guidance text -->
<div class="form-field">
    <label for="help-input" class="form-label">Username</label>
    <input type="text" id="help-input" class="form-input" placeholder="Enter username">
    <div class="form-help-text">
        Must be 3-20 characters, letters and numbers only
    </div>
</div>
```

*Description: Input with guidance text below. Use for explaining validation requirements.*

#### Variant: Disabled Input

```html
<!-- Disabled input field -->
<div class="form-field">
    <label for="disabled-input" class="form-label form-label--disabled">Disabled Input</label>
    <input type="text" id="disabled-input" 
           class="form-input form-input--disabled" 
           value="Cannot edit this field" 
           disabled>
</div>
```

*Description: Disabled input state. Include disabled class on both label and input.*

#### Variant: Textarea

```html
<!-- Multi-line text input -->
<div class="form-field">
    <label for="textarea-input" class="form-label">Message</label>
    <textarea id="textarea-input" class="form-textarea" rows="4" 
              placeholder="Enter your message here..."></textarea>
</div>
```

*Description: Multi-line text area for longer content. Specify appropriate row count.*

#### Variant: Custom Select (Use Menu Component)

```html
<!-- Custom select using Menu component - DO NOT use native select -->
<div class="form-field">
    <label for="custom-select" class="form-label">Choose Status</label>
    <div class="menu-container">
        <button class="form-select-custom menu-trigger" 
                data-menu="select-menu" 
                aria-haspopup="listbox" 
                aria-expanded="false" 
                id="custom-select">
            <span class="form-select-value">Select an option...</span>
            <span class="form-select-icon" 
                  style="mask-image: var(--icon-chevron-down-outline);" 
                  aria-hidden="true"></span>
        </button>
        <div class="menu menu--select" id="select-menu" role="listbox" aria-hidden="true">
            <div class="menu-item menu-item--selectable" role="option" tabindex="-1" data-value="active">
                <span class="menu-item-text">Active</span>
            </div>
            <div class="menu-item menu-item--selectable" role="option" tabindex="-1" data-value="inactive">
                <span class="menu-item-text">Inactive</span>
            </div>
        </div>
    </div>
</div>
```

*Description: **IMPORTANT**: Always use Menu component for selects. Never use native `<select>` elements. See menu.md for full documentation.*

#### Variant: Checkbox Group

```html
<!-- Group of related checkboxes -->
<div class="form-field">
    <fieldset class="form-fieldset">
        <legend class="form-legend">Preferences</legend>
        <div class="form-checkbox-group">
            <label class="form-checkbox-label">
                <input type="checkbox" class="form-checkbox" checked>
                <span class="form-checkbox-custom"></span>
                Email notifications
            </label>
            <label class="form-checkbox-label">
                <input type="checkbox" class="form-checkbox">
                <span class="form-checkbox-custom"></span>
                SMS notifications
            </label>
            <label class="form-checkbox-label">
                <input type="checkbox" class="form-checkbox">
                <span class="form-checkbox-custom"></span>
                Newsletter subscription
            </label>
        </div>
    </fieldset>
</div>
```

*Description: Grouped checkboxes with fieldset structure. Use for related options.*

#### Variant: Radio Button Group

```html
<!-- Group of mutually exclusive options -->
<div class="form-field">
    <fieldset class="form-fieldset">
        <legend class="form-legend">Account Type</legend>
        <div class="form-radio-group">
            <label class="form-radio-label">
                <input type="radio" name="account-type" class="form-radio" value="student" checked>
                <span class="form-radio-custom"></span>
                Student
            </label>
            <label class="form-radio-label">
                <input type="radio" name="account-type" class="form-radio" value="teacher">
                <span class="form-radio-custom"></span>
                Teacher
            </label>
            <label class="form-radio-label">
                <input type="radio" name="account-type" class="form-radio" value="admin">
                <span class="form-radio-custom"></span>
                Administrator
            </label>
        </div>
    </fieldset>
</div>
```

*Description: Radio button group for exclusive choices. Always include fieldset with legend.*

#### Variant: File Upload

```html
<!-- Custom file upload component -->
<div class="form-field">
    <label for="file-upload" class="form-label">Upload Files</label>
    <div class="form-file-upload" onclick="document.getElementById('file-upload').click()">
        <input type="file" id="file-upload" class="form-file-input" 
               multiple accept=".pdf,.doc,.docx,.jpg,.png">
        <div class="form-file-upload-content">
            <span class="icon icon-28 form-file-upload-icon" 
                  style="mask-image: var(--icon-upload-outline);" 
                  aria-hidden="true"></span>
            <div class="form-file-upload-text">
                <strong>Click to upload</strong> or drag and drop
            </div>
            <div class="form-file-upload-hint">
                PDF, DOC, JPG, PNG up to 10MB
            </div>
        </div>
    </div>
</div>
```

*Description: Custom file upload with drag-and-drop styling. Requires JavaScript for file handling.*

#### Variant: Error State Checkbox

```html
<!-- Checkbox in error state -->
<div class="form-field">
    <label class="form-checkbox-label">
        <input type="checkbox" class="form-checkbox form-checkbox--error" required>
        <span class="form-checkbox-custom form-checkbox-custom--error"></span>
        Terms and Conditions <span class="form-label-required">*</span>
    </label>
    <div class="form-message form-message--error">
        <span class="icon icon-18 form-message-icon" 
              style="mask-image: var(--icon-warning-outline);" 
              aria-hidden="true"></span>
        You must accept the terms and conditions
    </div>
</div>
```

*Description: Checkbox with error state styling. Include error message for validation feedback.*

#### Variant: Structured Form Layout

```html
<!-- Complete form with proper structure -->
<form>
    <!-- Personal Information Module -->
    <div class="page-module">
        <fieldset class="form-fieldset">
            <legend class="form-legend">Personal Information</legend>
            
            <div class="page-module-content">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-16);">
                    <div class="form-field">
                        <label for="first-name" class="form-label">
                            First Name <span class="form-label-required">*</span>
                        </label>
                        <input type="text" id="first-name" class="form-input" required>
                    </div>
                    <div class="form-field">
                        <label for="last-name" class="form-label">
                            Last Name <span class="form-label-required">*</span>
                        </label>
                        <input type="text" id="last-name" class="form-input" required>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>

    <!-- Form Actions -->
    <div style="display: flex; gap: var(--spacing-12); justify-content: flex-end;">
        <button type="button" class="btn btn--secondary btn--medium">Cancel</button>
        <button type="submit" class="btn btn--primary btn--medium">Submit Form</button>
    </div>
</form>
```

*Description: Complete form structure with modules, fieldsets, and action buttons. Use for complex forms.*

---

### 🎯 Configuration Options

List the modifiers, flags, or attributes the component supports.

| Option | Type | Values / Example | Description |
| --- | --- | --- | --- |
| `type` | attribute | `"text"` / `"email"` / `"password"` / `"file"` | Input type specification |
| `required` | attribute | boolean | Marks field as required for validation |
| `disabled` | attribute | boolean | Disables input interaction |
| `placeholder` | attribute | `"Enter text here"` | Placeholder text for inputs |
| `rows` | attribute | `"4"` | Number of rows for textarea |
| `multiple` | attribute | boolean | Allow multiple file selection |
| `accept` | attribute | `".pdf,.jpg"` | File type restrictions |
| `autocomplete` | attribute | `"off"` / `"email"` | Browser autocomplete behavior |
| `aria-label` | attribute | `"Toggle visibility"` | Accessibility label for screen readers |
| `for` | attribute | `"input-id"` | Links label to input element |

---

### 🎨 CSS Classes

List and explain all CSS classes that should be applied. Include any BEM-style variants, states, or modifiers.

| Class Name | Role / Description |
| --- | --- |
| `.form-field` | Container for label, input, and messages |
| `.form-label` | Label styling for form inputs |
| `.form-label--disabled` | Disabled state for labels |
| `.form-label-required` | Required field indicator (*) |
| `.form-input` | Base input field styling |
| `.form-input--icon-left` | Input with left-side icon padding |
| `.form-input--icon-right` | Input with right-side icon padding |
| `.form-input--error` | Error state styling for inputs |
| `.form-input--disabled` | Disabled state styling |
| `.form-input-wrapper` | Container for inputs with icons/buttons |
| `.form-input-wrapper--icon-left` | Wrapper with left icon styling |
| `.form-input-wrapper--icon-right` | Wrapper with right icon styling |
| `.form-input-wrapper--error` | Error state for input wrapper |
| `.form-input-icon` | Icon styling within input wrapper |
| `.form-input-action-btn` | Action button within input (e.g., password toggle) |
| `.form-textarea` | Textarea specific styling |
| `.form-select-custom` | Custom select button (use with Menu component) |
| `.form-select-value` | Selected value display in custom select |
| `.form-select-icon` | Chevron icon in custom select |
| `.form-checkbox` | Checkbox input element |
| `.form-checkbox-custom` | Custom checkbox visual element |
| `.form-checkbox--error` | Error state for checkbox |
| `.form-checkbox-custom--error` | Error state for custom checkbox visual |
| `.form-checkbox-label` | Label container for checkbox |
| `.form-checkbox-group` | Container for multiple checkboxes |
| `.form-radio` | Radio input element |
| `.form-radio-custom` | Custom radio visual element |
| `.form-radio--error` | Error state for radio button |
| `.form-radio-custom--error` | Error state for custom radio visual |
| `.form-radio-label` | Label container for radio button |
| `.form-radio-group` | Container for radio button group |
| `.form-fieldset` | Fieldset container for grouped inputs |
| `.form-legend` | Legend styling for fieldsets |
| `.form-file-upload` | Custom file upload container |
| `.form-file-input` | Hidden file input |
| `.form-file-upload-content` | Visual file upload area |
| `.form-file-upload-icon` | Icon in file upload area |
| `.form-file-upload-text` | Main text in file upload |
| `.form-file-upload-hint` | Hint text in file upload |
| `.form-message` | Base message styling |
| `.form-message--error` | Error message styling |
| `.form-message-icon` | Icon in form messages |
| `.form-help-text` | Help text below inputs |

---

### ⚙️ JavaScript Behavior

Detail the JS required for this component, including initialization, event listeners, and logic. This should be **embeddable inline** in a `<script>` tag in the same HTML file.

```js
// Password toggle functionality
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('.form-input-icon');

    if (input.type === 'password') {
        input.type = 'text';
        icon.style.maskImage = 'var(--icon-eye-hide-outline)';
        button.setAttribute('aria-label', 'Hide password');
    } else {
        input.type = 'password';
        icon.style.maskImage = 'var(--icon-eye-show-outline)';
        button.setAttribute('aria-label', 'Show password');
    }
}

// Form validation utilities
function showFormError(field, message) {
    const fieldContainer = field.closest('.form-field');
    const errorMessage = fieldContainer.querySelector('.form-message--error');
    const wrapper = fieldContainer.querySelector('.form-input-wrapper');

    // Add error styling
    if (wrapper) {
        wrapper.classList.add('form-input-wrapper--error');
    } else {
        field.classList.add(
            field.tagName.toLowerCase() === 'select' ? 
            'form-select--error' : 
            'form-input--error'
        );
    }

    // Show error message
    if (errorMessage) {
        errorMessage.innerHTML = `
            <span class="icon icon-18 form-message-icon" 
                  style="mask-image: var(--icon-warning-outline);" 
                  aria-hidden="true"></span>
            ${message}
        `;
        errorMessage.style.display = 'flex';
    }
}

function clearFormErrors(form) {
    // Clear error messages
    form.querySelectorAll('.form-message--error').forEach(msg => {
        msg.style.display = 'none';
        msg.textContent = '';
    });

    // Clear error styling
    form.querySelectorAll('.form-input--error, .form-select--error').forEach(input => {
        input.classList.remove('form-input--error', 'form-select--error');
    });

    form.querySelectorAll('.form-input-wrapper--error').forEach(wrapper => {
        wrapper.classList.remove('form-input-wrapper--error');
    });
}

// Form validation function
function validateForm(event) {
    event.preventDefault();
    
    const form = event.target;
    let isValid = true;

    // Clear previous errors
    clearFormErrors(form);

    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFormError(field, 'This field is required');
            isValid = false;
        }
    });

    // Validate email
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            showFormError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }

    // Validate password length
    const passwordField = form.querySelector('[type="password"]');
    if (passwordField && passwordField.value && passwordField.value.length < 6) {
        showFormError(passwordField, 'Password must be at least 6 characters long');
        isValid = false;
    }

    if (isValid) {
        // Process form submission
        console.log('Form is valid, submitting...');
        // Add your form submission logic here
    }

    return false; // Prevent default form submission
}

// File upload handling
document.getElementById('file-upload')?.addEventListener('change', function(e) {
    const files = e.target.files;
    const uploadArea = document.querySelector('.form-file-upload-content');

    if (files.length > 0) {
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        uploadArea.innerHTML = `
            <span class="icon icon-28 form-file-upload-icon" 
                  style="mask-image: var(--icon-check-outline);" 
                  aria-hidden="true"></span>
            <div class="form-file-upload-text">
                <strong>${files.length} file${files.length > 1 ? 's' : ''} selected</strong>
            </div>
            <div class="form-file-upload-hint">
                ${fileNames.length > 50 ? fileNames.substring(0, 50) + '...' : fileNames}
            </div>
        `;
    }
});

// Real-time email validation example
document.getElementById('email-field')?.addEventListener('input', function(e) {
    const email = e.target.value;
    const wrapper = e.target.closest('.form-input-wrapper');
    
    wrapper.classList.remove('form-input-wrapper--error');
    
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            wrapper.classList.add('form-input-wrapper--error');
        }
    }
});

// Real-time password validation example
document.getElementById('password-field')?.addEventListener('input', function(e) {
    const password = e.target.value;
    const wrapper = e.target.closest('.form-input-wrapper');
    const helpText = e.target.closest('.form-field').querySelector('.form-help-text');
    
    wrapper.classList.remove('form-input-wrapper--error');
    
    if (password && password.length < 6) {
        wrapper.classList.add('form-input-wrapper--error');
        if (helpText) {
            helpText.textContent = 'Password must be at least 6 characters long';
            helpText.style.color = 'var(--color-error)';
        }
    } else if (helpText) {
        helpText.textContent = 'Must be at least 6 characters long';
        helpText.style.color = 'var(--color-text-secondary)';
    }
});
```

*Description: Complete form handling with validation, error management, and interactive features.*

**Key Features:**
- **Password visibility toggle** - Shows/hides password with proper ARIA labels
- **Form validation utilities** - Reusable functions for error handling
- **Real-time validation** - Immediate feedback for email and password fields
- **File upload handling** - Custom feedback for file selection
- **Error state management** - Consistent error styling and messaging
- **Accessibility support** - Proper ARIA attributes and keyboard navigation

**Important Notes:**
- **Never use native `<select>` elements** - Always implement dropdowns using the Menu component
- **Always include proper labels** - Essential for accessibility and form submission
- **Use semantic fieldsets** - Group related inputs for better structure
- **Include validation feedback** - Both visual and text-based error messages
- **Test with keyboard navigation** - Ensure all inputs are accessible via keyboard