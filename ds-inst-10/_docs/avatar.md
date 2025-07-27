## Avatar

**Brief description:**\
*A circular avatar component that displays either a user's profile image or their initials. Available in 7 different sizes for various use cases throughout the interface.*

---

### ⚠️ Steering Notes (AI Priority)

- Always maintain 1:1 aspect ratio (perfect circle)
- Size progression follows 10px increments: 20, 30, 40, 50, 60, 70, 80px
- Initials avatars must use design system color tokens (--color-primary for text, --color-line-stroke for border)
- Image avatars should use object-fit: cover to maintain aspect ratio
- Always include meaningful alt text for accessibility
- Font sizes should scale appropriately with avatar size
- No external dependencies required

---

### 🏦 Usage Instructions

- Use for user identification in profiles, comments, navigation, team lists
- Image avatars are preferred when profile photos are available
- Initials avatars serve as fallbacks when no image is provided
- Choose size based on context (xxsmall/xsmall for compact lists, large/xlarge for profiles)
- Works standalone with no JavaScript initialization required
- Supports overlapping layouts for team member displays

---

### 🧱 HTML Variants

#### Variant: Image Avatar

```html
<div class="avatar avatar--medium">
    <img src="https://i.imgur.com/2CChjLg.png" alt="John Doe" />
</div>
```

*Description: Displays a user's profile image in a circular container.*

#### Variant: Initials Avatar

```html
<div class="avatar avatar--initials avatar--medium" title="John Doe">
    JD
</div>
```

*Description: Shows user initials with blue text on white background with gray border.*

#### Variant: Different Sizes

```html
<!-- Extra Extra Small -->
<div class="avatar avatar--xxsmall">
    <img src="path/to/image.jpg" alt="User" />
</div>

<!-- Extra Small -->
<div class="avatar avatar--xsmall">
    <img src="path/to/image.jpg" alt="User" />
</div>

<!-- Small -->
<div class="avatar avatar--small">
    <img src="path/to/image.jpg" alt="User" />
</div>

<!-- Medium (default) -->
<div class="avatar avatar--medium">
    <img src="path/to/image.jpg" alt="User" />
</div>

<!-- Large -->
<div class="avatar avatar--large">
    <img src="path/to/image.jpg" alt="User" />
</div>

<!-- Extra Large -->
<div class="avatar avatar--xlarge">
    <img src="path/to/image.jpg" alt="User" />
</div>

<!-- Extra Extra Large -->
<div class="avatar avatar--xxlarge">
    <img src="path/to/image.jpg" alt="User" />
</div>
```

*Description: Seven size variations available for different contexts.*

---

### 🎯 Configuration Options

| Option          | Type      | Values / Example           | Description                           |
| --------------- | --------- | -------------------------- | ------------------------------------- |
| `title`         | attribute | `"John Doe"`               | Tooltip text for initials avatars    |
| `alt`           | attribute | `"User Avatar"`            | Required alt text for image avatars  |
| Size modifier   | class     | `avatar--xxsmall` to `avatar--xxlarge` | Controls avatar dimensions |

---

### 🎨 CSS Classes

| Class Name              | Role / Description                      |
| ----------------------- | --------------------------------------- |
| `.avatar`               | Root element - creates circular container |
| `.avatar--initials`     | Modifier for initials-based avatars with border |
| `.avatar--xxsmall`      | Size modifier - 20px diameter          |
| `.avatar--xsmall`       | Size modifier - 30px diameter          |
| `.avatar--small`        | Size modifier - 40px diameter          |
| `.avatar--medium`       | Size modifier - 50px diameter          |
| `.avatar--large`        | Size modifier - 60px diameter          |
| `.avatar--xlarge`       | Size modifier - 70px diameter          |
| `.avatar--xxlarge`      | Size modifier - 80px diameter          |

---

### ⚙️ JavaScript Behavior

No JavaScript is required for basic avatar functionality. The component is purely CSS-based and works immediately upon inclusion in the DOM.

```js
// Optional: Dynamic avatar creation
function createAvatar(user, size = 'medium') {
    const avatar = document.createElement('div');
    avatar.className = `avatar avatar--${size}`;
    
    if (user.profileImage) {
        const img = document.createElement('img');
        img.src = user.profileImage;
        img.alt = user.name;
        avatar.appendChild(img);
    } else {
        avatar.className += ' avatar--initials';
        avatar.textContent = user.initials;
        avatar.title = user.name;
    }
    
    return avatar;
}
```

*Description: Optional utility function for programmatically creating avatars.*

- No initialization required
- No external libraries needed
- Works with static HTML