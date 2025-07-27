## Pagination

**Brief description:**\
*A navigation component for paginated content with first, previous, next, and last controls along with a page number input field.*

---

### ⚠️ Steering Notes (AI Priority)

- Always use minimal icon-only buttons (`btn btn--icon-only-minimal btn--medium`) for navigation controls
- Input field must be text type (not number) to avoid browser arrow controls
- Use proper ARIA labels for accessibility (each button needs aria-label)
- Auto-select input text on focus for better UX
- Component must work as a reusable JavaScript class with event delegation
- Icons must use outline variants: `--icon-arrow-double-left-outline`, `--icon-chevron-left-outline`, `--icon-chevron-right-outline`, `--icon-arrow-double-right-outline`
- Keep 8px gap between all elements as specified in requirements
- Use `updateUI()` method for performance instead of full re-render
- No input event listener (removed to avoid number input arrow handling)

---

### 🏦 Usage Instructions

- Use for navigating through paginated content like tables, lists, or search results
- Initialize with a container element ID and options object
- Provide `onPageChange` callback to handle page navigation
- Buttons are automatically disabled at boundaries (first/last pages)
- Input validates page numbers and resets invalid entries

---

### 🧱 HTML Variants

#### Variant: Container Element

```html
<!-- Container for pagination - JavaScript will populate this -->
<div id="pagination1" class="pagination"></div>
```

*Description: Empty container that the Pagination class will populate with controls.*

#### Variant: With Table Integration

```html
<!-- Table with pagination -->
<div class="table-container">
    <table class="table">
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
            </tr>
        </thead>
        <tbody id="tableBody">
            <!-- Dynamic content -->
        </tbody>
    </table>
</div>
<div id="pagination2" class="pagination"></div>
```

*Description: Pagination positioned below a table for content navigation.*

---

### 🎯 Configuration Options

| Option          | Type     | Values / Example              | Description                                    |
| --------------- | -------- | ----------------------------- | ---------------------------------------------- |
| `currentPage`   | number   | `1` (default)                 | Initial page number to display                 |
| `totalPages`    | number   | `1` (default)                 | Total number of pages available               |
| `onPageChange`  | function | `(page) => { ... }`           | Callback function called when page changes     |

---

### 🎨 CSS Classes

| Class Name           | Role / Description                              |
| -------------------- | ----------------------------------------------- |
| `.pagination`        | Root container with flexbox layout             |
| `.pagination-input`  | Text input for direct page number entry        |
| `.pagination-total`  | Text showing "of X" total pages                |

---

### ⚙️ JavaScript Behavior

Initialize the pagination component with a container ID and options:

```js
// Basic pagination
const pagination1 = new Pagination('pagination1', {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => {
        console.log('Page changed to:', page);
    }
});

// Pagination with table integration
const pagination2 = new Pagination('pagination2', {
    currentPage: 1,
    totalPages: Math.ceil(data.length / itemsPerPage),
    onPageChange: (page) => {
        updateTableContent(page);
    }
});

// Update total pages dynamically (uses updateUI for performance)
pagination1.setTotalPages(15);

// Get current page
const currentPage = pagination1.getCurrentPage();

// Navigate to specific page programmatically
pagination1.goToPage(5);
```

**Class Methods:**
- `new Pagination(containerId, options)` - Initialize pagination
- `setTotalPages(totalPages)` - Update total page count
- `getCurrentPage()` - Get current page number
- `goToPage(pageNumber)` - Navigate to specific page

**Event Handling:**
- **Button clicks**: Navigate first/previous/next/last using event delegation
- **Enter key**: Submit page number from input
- **Input blur**: Submit page number when leaving field  
- **Input focus**: Auto-select all text for easy replacement
- **No input event**: Removed to avoid number input arrow interference

**Validation:**
- Input validates page numbers are within valid range (1 to totalPages)
- Invalid entries are reset to current page
- Buttons are disabled contextually at boundaries

**Performance Features:**
- Runs without external libraries
- Uses event delegation for optimal performance
- `updateUI()` method for minimal DOM updates instead of full re-render
- Cached input reference to avoid repeated queries