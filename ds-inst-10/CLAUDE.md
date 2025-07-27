# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Voice and Tone

When responding, avoid talking in absolutes, especially while troubleshootings. Rather than say "this is fixed", say "this should be fixed." 

## Project Overview

This is **InstUI 10** - a prototype design system for Instructure UI components. It's a static HTML/CSS prototype system that showcases modern educational interface components without dependencies on JavaScript frameworks or build tools.

## Architecture

### File Structure
- **`css/`** - Component stylesheets and design tokens
  - `main.css` - Main stylesheet importing all components and tokens
  - `index.css` - Compiled version with all dependencies
  - `tokens/` - Design system tokens (colors, spacing, typography, icons)
  - Individual component CSS files (buttons.css, modals.css, etc.)
- **`_docs/`** - Component documentation using standardized template
- **`assets/icons/`** - SVG icon library (outline and solid variants)
- **`*.html`** - Demo pages showcasing component implementations

### Component System
Components follow a modular CSS architecture:
- Base classes (e.g., `.btn`, `.modal`, `.card`)
- Size modifiers (e.g., `--small`, `--medium`, `--large`)
- Variant modifiers (e.g., `--primary`, `--secondary`)
- State classes (e.g., `.is-active`, `.is-disabled`)

### Icon System
Icons use CSS mask images stored as CSS custom properties in `css/tokens/icons.css`. This allows for color control and consistent scaling across all components.

### Design Tokens
The system uses CSS custom properties organized in:
- **Colors**: Semantic color palette with variants
- **Spacing**: Consistent spacing scale 
- **Typography**: Font families, sizes, and weights
- **Icons**: SVG icons as data URLs for mask images

## Development Workflow

### No Build Process
This is a static prototype - no package.json, build tools, or dependencies. All CSS is hand-written and can be edited directly.

### Testing Changes
1. Edit CSS files directly in the `css/` directory
2. Open HTML demo files in a browser to see changes
3. Use browser developer tools for debugging

### Adding New Components
1. Create new CSS file in `css/` directory
2. Import in `css/main.css`
3. Create documentation in `_docs/` using `_template.md`
4. Add demo examples to existing HTML files or create new ones

## Key Conventions

### CSS Methodology
- BEM-inspired naming with component-based architecture
- Use design tokens (CSS custom properties) for consistency
- Avoid magic numbers - use token values
- Maintain accessibility standards (proper contrast, focus states)

### Component Documentation
All components in `_docs/` follow a standardized format:
- **Steering Notes**: AI-specific guidance and constraints
- **Usage Instructions**: When/how to use the component
- **HTML Variants**: All valid markup patterns
- **Configuration Options**: Modifiers and attributes
- **CSS Classes**: Complete class reference
- **JavaScript Behavior**: Inline JavaScript when needed

### Icon Usage
- Use `aria-hidden="true"` for decorative icons
- Provide `aria-label` for standalone meaningful icons
- Use predefined size classes (icon-14, icon-16, icon-20, etc.)
- Prefer outline variants for default states, solid for active/selected

### Accessibility Requirements
- Semantic HTML elements preferred over divs
- Proper ARIA attributes for interactive elements
- Sufficient color contrast for all text/background combinations
- Keyboard navigation support for interactive components
- Screen reader compatibility

## Component Categories

### Layout Components
- Sidebar navigation
- Grid systems
- Wrapper containers

### Interactive Components  
- Buttons (multiple variants and sizes)
- Menus and dropdowns
- Modals and trays
- Tabs and pagination
- Form inputs

### Display Components
- Cards and layouts
- Icons and typography
- Status indicators
- Tables and data display
- Tags and avatars

## Important Notes

- This is a **prototype system** - not production code
- Focus on design exploration and component demonstration
- No external dependencies or build processes
- All JavaScript should be inline and vanilla (no frameworks)
- Components must work across modern browsers without polyfills