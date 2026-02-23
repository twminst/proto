// Ignite Agent Prompt Builder - Main Application

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const AppState = {
  currentView: 'categories', // categories | actions | form | result
  selectedCategory: null,
  selectedAction: null,
  formData: {},
  generatedPrompt: null,

  setState(updates) {
    Object.assign(this, updates);
    this.render();
  },

  reset() {
    this.currentView = 'categories';
    this.selectedCategory = null;
    this.selectedAction = null;
    this.formData = {};
    this.generatedPrompt = null;
    this.render();
  },

  render() {
    const app = document.getElementById('app');

    switch(this.currentView) {
      case 'categories':
        app.innerHTML = renderCategories();
        break;
      case 'actions':
        app.innerHTML = renderActions(this.selectedCategory);
        break;
      case 'form':
        renderForm(this.selectedAction);
        break;
      case 'result':
        app.innerHTML = renderResult(this.generatedPrompt);
        break;
    }
  }
};

// ============================================================================
// PROMPT GENERATOR
// ============================================================================

class PromptGenerator {
  constructor(config) {
    this.config = config;
  }

  generate(formData) {
    let prompt = this.config.promptTemplate;

    // Pre-process special fields
    const processedData = this.preprocessFormData(formData);

    // Get list of fields that have template rules (these will be handled in second pass)
    const templateRuleFields = this.config.templateRules ?
      Object.keys(this.config.templateRules) : [];

    // First pass: replace simple placeholders (skip fields with template rules)
    Object.keys(processedData).forEach(key => {
      // Skip if this field has a template rule
      if (templateRuleFields.includes(key)) {
        return;
      }

      const value = processedData[key];
      if (value !== null && value !== undefined && value !== '') {
        // Format datetime values
        if (value instanceof Date || key.includes('Date')) {
          const formatted = this.formatDate(value);
          prompt = prompt.replace(new RegExp(`\\{${key}\\}`, 'g'), formatted);
        } else {
          prompt = prompt.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
      }
    });

    // Second pass: process conditional sections using templateRules
    if (this.config.templateRules) {
      Object.keys(this.config.templateRules).forEach(key => {
        const rule = this.config.templateRules[key];
        const fieldName = rule.field || key;
        const fieldValue = processedData[fieldName];

        let replacement = '';

        if (this.shouldIncludeSection(rule, fieldValue, processedData)) {
          replacement = this.processTemplate(rule.template, processedData);
        }

        prompt = prompt.replace(new RegExp(`\\{${key}\\}`, 'g'), replacement);
      });
    }

    // Clean up the prompt
    prompt = this.cleanPrompt(prompt);

    return prompt;
  }

  preprocessFormData(formData) {
    const processed = { ...formData };

    // Handle term formatting
    if (processed.term) {
      const termMap = {
        'SPRING-2026': 'Spring 2026',
        'FALL-2025': 'Fall 2025',
        'SUMMER-2026': 'Summer 2026',
        'WINTER-2026': 'Winter 2026'
      };
      processed.termFormatted = termMap[processed.term] || processed.term;
    }

    // Handle recipient type mapping for send-message-to-students
    if (processed.recipientType) {
      if (processed.recipientType === 'all') {
        processed.recipientDescription = 'all students';
      } else if (processed.recipientType === 'criteria' && processed.criteriaDescription) {
        processed.recipientDescription = processed.criteriaDescription;
      } else if (processed.recipientType === 'specific' && processed.studentNames) {
        processed.recipientDescription = `these specific students: ${processed.studentNames}`;
      } else {
        processed.recipientDescription = 'students';
      }
    }

    // Handle file uploads - format file lists for prompts
    Object.keys(processed).forEach(key => {
      if (Array.isArray(processed[key]) && processed[key].length > 0 && processed[key][0].name) {
        // This is a file array
        const fileNames = processed[key].map(f => f.name).join(', ');
        processed[`${key}List`] = fileNames;
      }
    });

    // Handle criteria mapping for grading prompts
    if (processed.criteria) {
      const criteriaMap = {
        'all_students': 'all students',
        'submitted': 'all students who submitted',
        'completed_with_posts': 'all students who completed the assignment with original and peer posts',
        'specific_students': 'the following students'
      };
      processed.criteriaText = criteriaMap[processed.criteria] || processed.criteria;
    }

    // Handle download scope mapping for file downloads
    if (processed.downloadScope) {
      if (processed.downloadScope === 'all') {
        processed.downloadText = 'all files';
      } else if (processed.downloadScope === 'folder' && processed.folderName) {
        processed.downloadText = `all files from the "${processed.folderName}" folder`;
      } else if (processed.downloadScope === 'type' && processed.fileType) {
        processed.downloadText = `all ${processed.fileType} files`;
      } else {
        processed.downloadText = 'files';
      }
    }

    return processed;
  }

  shouldIncludeSection(rule, fieldValue, formData) {
    switch(rule.condition) {
      case 'notEmpty':
        return fieldValue && fieldValue !== '' && fieldValue !== null && fieldValue !== undefined;
      case 'true':
        return fieldValue === true || fieldValue === 'true';
      case 'false':
        return fieldValue === false || fieldValue === 'false';
      case 'useQuestionBank':
        return formData.useQuestionBank === true;
      case 'conditionalAccess':
        return formData.conditionalAccess === true;
      default:
        if (typeof rule.condition === 'function') {
          return rule.condition(formData);
        }
        return true;
    }
  }

  processTemplate(template, formData) {
    let result = template;
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (value !== null && value !== undefined && value !== '') {
        // Format datetime values
        if (value instanceof Date || key.includes('Date')) {
          const formatted = this.formatDate(value);
          result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), formatted);
        } else {
          result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
      }
    });
    return result;
  }

  formatDate(value) {
    if (!value) return '';

    // Handle datetime-local input format
    if (typeof value === 'string' && value.includes('T')) {
      const date = new Date(value);
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }

    return value;
  }

  cleanPrompt(prompt) {
    return prompt
      .replace(/\s+/g, ' ')           // Multiple spaces to single
      .replace(/\s+\./g, '.')         // Space before period
      .replace(/\s+,/g, ',')          // Space before comma
      .replace(/,\s*,/g, ',')         // Double commas
      .replace(/\.\./g, '.')          // Double periods
      .replace(/\s+:/g, ':')          // Space before colon
      .replace(/\.\s*\./g, '.')       // Period space period
      .replace(/,\s*\./g, '.')        // Comma period
      .trim();
  }
}

// ============================================================================
// FORM BUILDER
// ============================================================================

class FormBuilder {
  constructor(actionConfig) {
    this.config = actionConfig;
  }

  build() {
    const form = document.createElement('form');
    form.id = 'prompt-form';
    form.onsubmit = (e) => {
      e.preventDefault();
      handleFormSubmit();
    };

    // Separate fields into categories
    const basicFields = this.config.formFields.filter(field => !field.advanced && field.name !== 'additionalInstructions');
    const advancedFields = this.config.formFields.filter(field => field.advanced && field.name !== 'additionalInstructions');
    const additionalInstructionsField = this.config.formFields.find(field => field.name === 'additionalInstructions');

    // Add basic fields
    basicFields.forEach(field => {
      const fieldElement = this.createField(field);
      form.appendChild(fieldElement);
    });

    // Add advanced options section only if there are advanced fields (excluding additionalInstructions)
    if (advancedFields.length > 0) {
      const advancedSection = document.createElement('div');
      advancedSection.className = 'advanced-options-section';

      // Toggle button
      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.className = 'advanced-options-toggle';
      toggleButton.innerHTML = `
        <span class="advanced-options-toggle-icon">▶</span>
        <span>Advanced Options</span>
      `;

      // Content container
      const contentDiv = document.createElement('div');
      contentDiv.className = 'advanced-options-content';

      advancedFields.forEach(field => {
        const fieldElement = this.createField(field);
        fieldElement.classList.add('advanced-field');
        contentDiv.appendChild(fieldElement);
      });

      // Toggle functionality
      toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.classList.contains('expanded');
        if (isExpanded) {
          toggleButton.classList.remove('expanded');
          contentDiv.classList.remove('expanded');
        } else {
          toggleButton.classList.add('expanded');
          contentDiv.classList.add('expanded');
        }
      });

      advancedSection.appendChild(toggleButton);
      advancedSection.appendChild(contentDiv);
      form.appendChild(advancedSection);
    }

    // Add additionalInstructions field if it exists (always visible, after advanced options)
    if (additionalInstructionsField) {
      const fieldElement = this.createField(additionalInstructionsField);
      form.appendChild(fieldElement);
    }

    // Add form actions
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'form-actions';
    actionsDiv.innerHTML = `
      <button type="button" class="button-secondary" id="back-to-actions">
        ← Back
      </button>
      <button type="submit" class="button-primary">
        Generate Prompt
      </button>
    `;
    form.appendChild(actionsDiv);

    return form;
  }

  createField(fieldConfig) {
    if (fieldConfig.fieldType === 'checkbox') {
      return this.createCheckboxField(fieldConfig);
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'form-field';

    if (fieldConfig.conditional) {
      wrapper.dataset.conditional = JSON.stringify(fieldConfig.conditional);
      wrapper.style.display = 'none';
    }

    const label = this.createLabel(fieldConfig);
    wrapper.appendChild(label);

    const input = this.createInput(fieldConfig);
    wrapper.appendChild(input);

    if (fieldConfig.helpText) {
      const helpText = document.createElement('p');
      helpText.className = 'help-text';
      helpText.textContent = fieldConfig.helpText;
      wrapper.appendChild(helpText);
    }

    return wrapper;
  }

  createCheckboxField(fieldConfig) {
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-field';

    if (fieldConfig.conditional) {
      wrapper.dataset.conditional = JSON.stringify(fieldConfig.conditional);
      wrapper.style.display = 'none';
    }

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = fieldConfig.name;
    input.name = fieldConfig.name;
    if (fieldConfig.default) input.checked = true;

    const label = document.createElement('label');
    label.setAttribute('for', fieldConfig.name);
    label.textContent = fieldConfig.label;

    wrapper.appendChild(input);
    wrapper.appendChild(label);

    if (fieldConfig.helpText) {
      const helpText = document.createElement('p');
      helpText.className = 'help-text';
      helpText.textContent = fieldConfig.helpText;
      wrapper.appendChild(helpText);
    }

    return wrapper;
  }

  createLabel(fieldConfig) {
    const label = document.createElement('label');
    label.setAttribute('for', fieldConfig.name);
    label.textContent = fieldConfig.label;

    if (fieldConfig.required) {
      const required = document.createElement('span');
      required.className = 'required';
      required.textContent = ' *';
      label.appendChild(required);
    }

    return label;
  }

  createInput(fieldConfig) {
    switch(fieldConfig.fieldType) {
      case 'textarea':
        return this.createTextarea(fieldConfig);
      case 'select':
        return this.createSelect(fieldConfig);
      case 'term-select':
        return this.createTermSelect(fieldConfig);
      case 'course-select':
        return this.createCourseSelect(fieldConfig);
      case 'file-upload':
        return this.createFileUpload(fieldConfig);
      default:
        return this.createTextInput(fieldConfig);
    }
  }

  createTextInput(fieldConfig) {
    const input = document.createElement('input');
    input.type = fieldConfig.fieldType === 'number' ? 'number' :
                 fieldConfig.fieldType === 'datetime-local' ? 'datetime-local' :
                 'text';
    input.id = fieldConfig.name;
    input.name = fieldConfig.name;
    input.placeholder = fieldConfig.placeholder || '';

    if (fieldConfig.required) input.required = true;
    if (fieldConfig.min !== undefined) input.min = fieldConfig.min;
    if (fieldConfig.max !== undefined) input.max = fieldConfig.max;
    if (fieldConfig.default !== undefined) input.value = fieldConfig.default;
    if (fieldConfig.defaultValue !== undefined) input.value = fieldConfig.defaultValue;

    return input;
  }

  createTextarea(fieldConfig) {
    const textarea = document.createElement('textarea');
    textarea.id = fieldConfig.name;
    textarea.name = fieldConfig.name;
    textarea.placeholder = fieldConfig.placeholder || '';
    textarea.rows = fieldConfig.rows || 3;

    if (fieldConfig.required) textarea.required = true;
    if (fieldConfig.defaultValue !== undefined) textarea.value = fieldConfig.defaultValue;

    return textarea;
  }

  createSelect(fieldConfig) {
    const select = document.createElement('select');
    select.id = fieldConfig.name;
    select.name = fieldConfig.name;

    if (fieldConfig.required) select.required = true;

    fieldConfig.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      if (fieldConfig.defaultValue && option.value === fieldConfig.defaultValue) {
        optionElement.selected = true;
      }
      select.appendChild(optionElement);
    });

    return select;
  }

  createTermSelect(fieldConfig) {
    const select = document.createElement('select');
    select.id = fieldConfig.name;
    select.name = fieldConfig.name;
    select.className = 'term-select';

    if (fieldConfig.required) select.required = true;

    // Add empty option
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = 'Select a term';
    select.appendChild(emptyOption);

    // Add terms from sample data
    SAMPLE_DATA.terms.forEach(term => {
      const optionElement = document.createElement('option');
      optionElement.value = term.value;
      optionElement.textContent = term.label;
      if (fieldConfig.defaultValue && term.value === fieldConfig.defaultValue) {
        optionElement.selected = true;
      }
      select.appendChild(optionElement);
    });

    return select;
  }

  createCourseSelect(fieldConfig) {
    const select = document.createElement('select');
    select.id = fieldConfig.name;
    select.name = fieldConfig.name;
    select.className = 'course-select';

    if (fieldConfig.required) select.required = true;

    // Add empty option
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '-- Select a course --';
    select.appendChild(emptyOption);

    // Initially populate with all courses
    SAMPLE_DATA.courses.forEach(course => {
      const option = document.createElement('option');
      option.value = course.name;
      option.textContent = course.name;
      option.setAttribute('data-term', course.term);
      if (fieldConfig.defaultValue && course.name === fieldConfig.defaultValue) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    return select;
  }

  createFileUpload(fieldConfig) {
    const container = document.createElement('div');
    container.className = 'file-upload-container';

    // Hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = fieldConfig.name;
    fileInput.name = fieldConfig.name;
    fileInput.className = 'file-upload-input';
    fileInput.multiple = true;
    if (fieldConfig.accept) fileInput.accept = fieldConfig.accept;

    // Drag and drop area
    const dropArea = document.createElement('div');
    dropArea.className = 'file-upload-area';
    dropArea.innerHTML = `
      <div class="file-upload-icon">📎</div>
      <div class="file-upload-text">Drop files here or click to browse</div>
      <div class="file-upload-hint">${fieldConfig.helpText || 'Upload files to attach'}</div>
    `;

    // File list display
    const fileList = document.createElement('ul');
    fileList.className = 'file-list';
    fileList.style.display = 'none';

    // Store files in a data attribute for form submission
    const filesData = [];

    // Click to browse
    dropArea.addEventListener('click', () => {
      fileInput.click();
    });

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    // Highlight drop area when dragging over
    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => {
        dropArea.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove('drag-over');
      });
    });

    // Handle dropped files
    dropArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files);
    });

    // Handle selected files
    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });

    const handleFiles = (files) => {
      filesData.length = 0; // Clear array
      fileList.innerHTML = '';

      if (files.length === 0) {
        fileList.style.display = 'none';
        return;
      }

      fileList.style.display = 'block';

      Array.from(files).forEach((file, index) => {
        filesData.push({
          name: file.name,
          size: file.size,
          type: file.type
        });

        const li = document.createElement('li');
        li.className = 'file-item';
        li.innerHTML = `
          <div class="file-item-info">
            <span class="file-item-icon">📄</span>
            <span class="file-item-name">${file.name}</span>
            <span class="file-item-size">(${formatFileSize(file.size)})</span>
          </div>
          <button type="button" class="file-item-remove" data-index="${index}" aria-label="Remove file">×</button>
        `;

        // Remove file handler
        li.querySelector('.file-item-remove').addEventListener('click', function() {
          const idx = parseInt(this.dataset.index);
          filesData.splice(idx, 1);

          // Rebuild file list
          fileList.innerHTML = '';
          filesData.forEach((fileData, newIndex) => {
            const newLi = document.createElement('li');
            newLi.className = 'file-item';
            newLi.innerHTML = `
              <div class="file-item-info">
                <span class="file-item-icon">📄</span>
                <span class="file-item-name">${fileData.name}</span>
                <span class="file-item-size">(${formatFileSize(fileData.size)})</span>
              </div>
              <button type="button" class="file-item-remove" data-index="${newIndex}" aria-label="Remove file">×</button>
            `;
            fileList.appendChild(newLi);
          });

          if (filesData.length === 0) {
            fileList.style.display = 'none';
          }
        });

        fileList.appendChild(li);
      });

      // Store files data as JSON in a hidden input for form submission
      let hiddenInput = container.querySelector(`input[name="${fieldConfig.name}-data"]`);
      if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = `${fieldConfig.name}-data`;
        container.appendChild(hiddenInput);
      }
      hiddenInput.value = JSON.stringify(filesData);
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    container.appendChild(fileInput);
    container.appendChild(dropArea);
    container.appendChild(fileList);

    return container;
  }
}

// ============================================================================
// CONDITIONAL FIELD HANDLER
// ============================================================================

class ConditionalFieldHandler {
  constructor(formElement) {
    this.form = formElement;
    this.conditionalFields = this.findConditionalFields();
    this.attachListeners();
    this.evaluateConditions(); // Initial evaluation
  }

  findConditionalFields() {
    return Array.from(this.form.querySelectorAll('[data-conditional]'))
      .map(field => ({
        element: field,
        condition: JSON.parse(field.dataset.conditional)
      }));
  }

  attachListeners() {
    this.conditionalFields.forEach(({ condition }) => {
      const triggerField = this.form.querySelector(`[name="${condition.field}"]`);
      if (triggerField) {
        triggerField.addEventListener('change', () => this.evaluateConditions());
        triggerField.addEventListener('input', () => this.evaluateConditions());
      }
    });
  }

  evaluateConditions() {
    this.conditionalFields.forEach(({ element, condition }) => {
      const triggerField = this.form.querySelector(`[name="${condition.field}"]`);
      const triggerValue = this.getFieldValue(triggerField);

      if (this.conditionMet(triggerValue, condition.value)) {
        element.style.display = element.classList.contains('checkbox-field') ? 'flex' : 'block';
        const input = element.querySelector('input, textarea, select');
        if (element.dataset.originalRequired) {
          input.required = true;
        }
      } else {
        element.style.display = 'none';
        const input = element.querySelector('input, textarea, select');
        if (input && input.required) {
          element.dataset.originalRequired = 'true';
          input.required = false;
        }
      }
    });
  }

  getFieldValue(field) {
    if (!field) return null;
    if (field.type === 'checkbox') {
      return field.checked;
    }
    return field.value;
  }

  conditionMet(actualValue, expectedValue) {
    if (typeof expectedValue === 'boolean') {
      return actualValue === expectedValue;
    }
    return actualValue == expectedValue;
  }
}

// ============================================================================
// COURSE FILTER HANDLER
// ============================================================================

class CourseFilterHandler {
  constructor(formElement) {
    this.form = formElement;
    this.termSelect = this.form.querySelector('.term-select');
    this.courseSelects = this.form.querySelectorAll('.course-select');

    if (this.termSelect && this.courseSelects.length > 0) {
      this.attachListeners();
    }
  }

  attachListeners() {
    this.termSelect.addEventListener('change', () => {
      this.filterCourses();
    });
  }

  filterCourses() {
    const selectedTerm = this.termSelect.value;

    this.courseSelects.forEach(select => {
      // Store current value
      const currentValue = select.value;

      // Clear existing options
      select.innerHTML = '';

      // Add empty option
      const emptyOption = document.createElement('option');
      emptyOption.value = '';
      emptyOption.textContent = '-- Select a course --';
      select.appendChild(emptyOption);

      // Get courses for selected term (or all if no term selected)
      const courses = selectedTerm
        ? SAMPLE_DATA.getCoursesByTerm(selectedTerm)
        : SAMPLE_DATA.courses;

      // Populate select with filtered courses
      courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.name;
        option.textContent = course.name;
        option.setAttribute('data-term', course.term);
        select.appendChild(option);
      });

      // Restore value if it's still in the filtered list
      const isValidCourse = courses.some(c => c.name === currentValue);
      if (isValidCourse) {
        select.value = currentValue;
      }
    });
  }
}

// ============================================================================
// RENDER FUNCTIONS
// ============================================================================

function renderCategories() {
  const categories = PROMPTS_CONFIG.categories.map(category => `
    <div class="category-card" data-category="${category.id}">
      <div class="category-icon">${category.icon}</div>
      <h3 class="category-title">${category.title}</h3>
      <p class="category-description">${category.description}</p>
    </div>
  `).join('');

  return `
    <div class="category-grid">
      ${categories}
    </div>
  `;
}

function renderActions(categoryId) {
  const category = PROMPTS_CONFIG.categories.find(c => c.id === categoryId);
  const actions = PROMPTS_CONFIG.actions.filter(a => a.category === categoryId);

  const actionButtons = actions.map(action => `
    <button class="action-button" data-action="${action.id}">
      <span class="action-icon">${action.icon}</span>
      <span class="action-label">${action.title}</span>
    </button>
  `).join('');

  return `
    <div class="action-selection">
      <h2>${category.title}</h2>
      <p class="subtitle">${category.description}</p>
      <div class="action-grid">
        ${actionButtons}
      </div>
      <button class="back-button" id="back-to-categories">← Back to Categories</button>
    </div>
  `;
}

function renderForm(actionId) {
  const action = PROMPTS_CONFIG.actions.find(a => a.id === actionId);

  // Open modal
  const modal = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  modalTitle.textContent = action.title;

  const formBuilder = new FormBuilder(action);
  const form = formBuilder.build();

  modalBody.innerHTML = '';
  modalBody.appendChild(form);

  modal.style.display = 'flex';

  // Initialize conditional field handler
  new ConditionalFieldHandler(form);

  // Initialize course filter handler
  new CourseFilterHandler(form);
}

function renderResult(prompt) {
  return `
    <div class="prompt-result">
      <div class="prompt-header">
        <h3>Generated Prompt</h3>
        <button class="edit-prompt-button" id="edit-prompt">Edit</button>
      </div>
      <div class="prompt-text" id="prompt-text" contenteditable="false">${prompt}</div>
      <div class="prompt-actions">
        <button class="button-secondary" id="copy-prompt">
          📋 Copy to Clipboard
        </button>
        <button class="button-primary" id="use-prompt">
          Use This Prompt
        </button>
      </div>
      <div class="prompt-footer">
        <button class="link-button" id="start-over">
          ← Create Another Prompt
        </button>
      </div>
    </div>
  `;
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

function handleFormSubmit() {
  const form = document.getElementById('prompt-form');
  const formData = new FormData(form);
  const data = {};

  // Collect all form data
  for (let [key, value] of formData.entries()) {
    // Skip file-data fields, we'll handle them separately
    if (!key.endsWith('-data')) {
      data[key] = value;
    }
  }

  // Handle checkboxes (they won't appear in formData if unchecked)
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    data[checkbox.name] = checkbox.checked;
  });

  // Handle file upload data
  const fileDataInputs = form.querySelectorAll('input[name$="-data"]');
  fileDataInputs.forEach(input => {
    const fieldName = input.name.replace('-data', '');
    if (input.value) {
      try {
        const files = JSON.parse(input.value);
        if (files.length > 0) {
          data[fieldName] = files;
        }
      } catch (e) {
        console.error('Error parsing file data:', e);
      }
    }
  });

  // Store form data
  AppState.formData = data;

  // Generate prompt
  const action = PROMPTS_CONFIG.actions.find(a => a.id === AppState.selectedAction);
  const generator = new PromptGenerator(action);
  const prompt = generator.generate(data);

  // Close modal
  closeModal();

  // Show result
  AppState.setState({
    currentView: 'result',
    generatedPrompt: prompt
  });
}

function closeModal() {
  const modal = document.getElementById('modal-overlay');
  modal.style.display = 'none';
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  toastMessage.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Prompt copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      showToast('Failed to copy to clipboard', 'error');
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Prompt copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy to clipboard', 'error');
    }
    document.body.removeChild(textarea);
  }
}

// ============================================================================
// EVENT DELEGATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  AppState.render();

  // Event delegation for dynamic content
  document.body.addEventListener('click', (e) => {
    const target = e.target;

    // Category selection
    if (target.closest('.category-card')) {
      const categoryId = target.closest('.category-card').dataset.category;
      AppState.setState({
        currentView: 'actions',
        selectedCategory: categoryId
      });
    }

    // Action selection
    if (target.closest('.action-button')) {
      const actionId = target.closest('.action-button').dataset.action;
      AppState.setState({
        currentView: 'form',
        selectedAction: actionId
      });
      renderForm(actionId);
    }

    // Back to categories
    if (target.id === 'back-to-categories') {
      AppState.setState({
        currentView: 'categories',
        selectedCategory: null
      });
    }

    // Back to actions (from form)
    if (target.id === 'back-to-actions' || target.closest('#back-to-actions')) {
      closeModal();
      AppState.setState({
        currentView: 'actions'
      });
      return;
    }

    // Close modal button
    if (target.id === 'close-modal' || target.closest('#close-modal')) {
      closeModal();
      AppState.setState({
        currentView: 'actions'
      });
      return;
    }

    // Close modal by clicking overlay (outside modal)
    if (target.id === 'modal-overlay') {
      closeModal();
      AppState.setState({
        currentView: 'actions'
      });
      return;
    }

    // Edit prompt
    if (target.id === 'edit-prompt') {
      const promptText = document.getElementById('prompt-text');
      const isEditable = promptText.contentEditable === 'true';

      if (isEditable) {
        promptText.contentEditable = 'false';
        target.textContent = 'Edit';
        AppState.generatedPrompt = promptText.textContent;
      } else {
        promptText.contentEditable = 'true';
        promptText.focus();
        target.textContent = 'Done';
      }
    }

    // Copy prompt
    if (target.id === 'copy-prompt') {
      const promptText = document.getElementById('prompt-text').textContent;
      copyToClipboard(promptText);
    }

    // Use prompt (same as copy for now)
    if (target.id === 'use-prompt') {
      const promptText = document.getElementById('prompt-text').textContent;
      copyToClipboard(promptText);
    }

    // Start over
    if (target.id === 'start-over') {
      AppState.reset();
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
      const modal = document.getElementById('modal-overlay');
      if (modal.style.display === 'flex') {
        closeModal();
        AppState.setState({
          currentView: 'actions'
        });
      }
    }
  });
});
