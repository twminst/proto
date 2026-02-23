// Ignite Agent Prompt Builder Configuration

const PROMPTS_CONFIG = {
  categories: [
    {
      id: 'create',
      title: 'Create in Canvas',
      description: 'Generate Canvas content using course materials and data',
      icon: '✏️'
    },
    {
      id: 'manage',
      title: 'Manage & Report',
      description: 'Retrieve and analyze Canvas data and perform batch changes',
      icon: '📊'
    },
    {
      id: 'student-management',
      title: 'Student Management',
      description: 'Monitor student progress, engagement, and manage submissions',
      icon: '👥'
    },
    {
      id: 'course-analysis',
      title: 'Course Analysis',
      description: 'Evaluate course design and pedagogical effectiveness',
      icon: '🔍'
    }
  ],

  actions: [
    // CREATE IN CANVAS ACTIONS
    {
      id: 'create-course',
      title: 'Create Course',
      description: 'Create a new course',
      category: 'create',
      icon: 'book-open',
      formFields: [
        {
          fieldType: 'text',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'e.g., Introduction to Psychology',
          defaultValue: 'Advanced Web Development'
        },
        {
          fieldType: 'text',
          name: 'courseCode',
          label: 'Course Code',
          required: false,
          placeholder: 'e.g., PSY-101',
          defaultValue: 'CS-301'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: true,
          defaultValue: 'SPRING-2026',
          helpText: 'Which term is this course for?'
        },
        {
          fieldType: 'datetime-local',
          name: 'startDate',
          label: 'Start Date',
          required: false,
          advanced: true,
          defaultValue: '2026-01-15T00:00'
        },
        {
          fieldType: 'datetime-local',
          name: 'endDate',
          label: 'End Date',
          required: false,
          advanced: true,
          defaultValue: '2026-05-15T23:59'
        },
        {
          fieldType: 'textarea',
          name: 'description',
          label: 'Course Description',
          required: false,
          advanced: true,
          placeholder: 'Brief description of the course...',
          rows: 4,
          defaultValue: 'A comprehensive course covering modern web development frameworks, responsive design, and full-stack application development.'
        },
        {
          fieldType: 'checkbox',
          name: 'useTemplate',
          label: 'Copy from Template/Blueprint',
          helpText: 'Create this course from an existing template',
          advanced: true,
          default: true
        },
        {
          fieldType: 'text',
          name: 'templateCourseName',
          label: 'Template Course Name',
          required: false,
          advanced: true,
          conditional: { field: 'useTemplate', value: true },
          placeholder: 'e.g., Web Dev Master Template',
          defaultValue: 'CS Master Template Spring 2026'
        },
        {
          fieldType: 'number',
          name: 'enrollmentLimit',
          label: 'Enrollment Limit (Optional)',
          required: false,
          advanced: true,
          placeholder: 'e.g., 30',
          min: 1,
          max: 500
        },
        {
          fieldType: 'checkbox',
          name: 'publishImmediately',
          label: 'Publish Immediately',
          helpText: 'Make visible to students right away (otherwise saved as draft)',
          advanced: true,
          default: false
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any other requirements?',
          rows: 2,
          defaultValue: 'Add me as the primary instructor.'
        }
      ],
      promptTemplate: 'Create a new course called "{courseName}"{courseCode} in the {termFormatted} term{startDate}{endDate}{description}{useTemplate}{enrollmentLimit}{publishImmediately}{additionalInstructions}',
      templateRules: {
        courseCode: { condition: 'notEmpty', template: ' with course code "{courseCode}"' },
        startDate: { condition: 'notEmpty', template: ', starting {startDate}' },
        endDate: { condition: 'notEmpty', template: ' and ending {endDate}' },
        description: { condition: 'notEmpty', template: '. Course description: "{description}"' },
        useTemplate: { condition: 'true', template: '. Copy content from the "{templateCourseName}" template course' },
        enrollmentLimit: { condition: 'notEmpty', template: '. Set enrollment limit to {enrollmentLimit} students' },
        publishImmediately: { condition: 'true', template: '. Publish the course immediately so students can access it' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'create-assignment',
      title: 'Create Assignment',
      description: 'Create a new assignment in a course',
      category: 'create',
      icon: 'file-text',
      formFields: [
        {
          fieldType: 'text',
          name: 'assignmentName',
          label: 'Assignment Name',
          required: true,
          placeholder: 'e.g., Week 1 Assignment',
          defaultValue: 'Week 1 Essay'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'Introduction to Philosophy'
        },
        {
          fieldType: 'datetime-local',
          name: 'dueDate',
          label: 'Due Date',
          required: false,
          defaultValue: '2026-02-28T23:59'
        },
        {
          fieldType: 'number',
          name: 'points',
          label: 'Points Possible',
          required: false,
          placeholder: '100',
          min: 0,
          defaultValue: '100'
        },
        {
          fieldType: 'select',
          name: 'submissionType',
          label: 'Submission Type',
          required: false,
          defaultValue: 'online_text_entry',
          options: [
            { value: '', label: 'Not specified' },
            { value: 'online_text_entry', label: 'Text Entry' },
            { value: 'online_upload', label: 'File Upload' },
            { value: 'online_url', label: 'Website URL' },
            { value: 'external_tool', label: 'External Tool' }
          ]
        },
        {
          fieldType: 'textarea',
          name: 'description',
          label: 'Assignment Description',
          required: false,
          placeholder: 'Instructions for students',
          rows: 4,
          defaultValue: 'Write a 3-5 page essay on the topic discussed in class. Include at least three academic sources and follow MLA format.'
        },
        {
          fieldType: 'checkbox',
          name: 'attachFiles',
          label: 'Attach Files to Assignment',
          advanced: true,
          helpText: 'Attach files like rubrics or templates',
          default: false
        },
        {
          fieldType: 'file-upload',
          name: 'files',
          label: 'Files to Attach',
          advanced: true,
          required: false,
          conditional: { field: 'attachFiles', value: true },
          helpText: 'Drag and drop or click to select files',
          accept: '.pdf,.doc,.docx,.txt'
        },
        {
          fieldType: 'text',
          name: 'assignmentGroup',
          label: 'Assignment Group',
          advanced: true,
          required: false,
          placeholder: 'e.g., Homework, Quizzes, Projects',
          defaultValue: 'Essays'
        },
        {
          fieldType: 'checkbox',
          name: 'addToModule',
          label: 'Add to Module',
          advanced: true,
          helpText: 'Also add this assignment to a module',
          default: true
        },
        {
          fieldType: 'text',
          name: 'moduleName',
          label: 'Module Name',
          advanced: true,
          required: false,
          conditional: { field: 'addToModule', value: true },
          placeholder: 'e.g., Week 1',
          defaultValue: 'Week 1: Introduction to Ethics'
        },
        {
          fieldType: 'checkbox',
          name: 'publishImmediately',
          label: 'Publish Immediately',
          advanced: true,
          helpText: 'Make visible to students right away (otherwise saved as draft)',
          default: false
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any other requirements?',
          rows: 2,
          defaultValue: 'Send an announcement to students when this is created.'
        }
      ],
      promptTemplate: 'Create an assignment called "{assignmentName}" in the {courseName} course{termInfo}{dueDate}{points}{submissionType}{description}{attachFiles}{assignmentGroup}{moduleName}{publishImmediately}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        dueDate: { condition: 'notEmpty', template: ', due on {dueDate}' },
        points: { condition: 'notEmpty', template: ', worth {points} points' },
        submissionType: { condition: 'notEmpty', template: ', with submission type: {submissionType}' },
        description: { condition: 'notEmpty', template: ', with the description: "{description}"' },
        attachFiles: { field: 'filesList', condition: 'notEmpty', template: '. Attach these files: {filesList}' },
        assignmentGroup: { condition: 'notEmpty', template: ' in the "{assignmentGroup}" assignment group' },
        moduleName: { condition: 'notEmpty', template: '. Also add this assignment to the "{moduleName}" module' },
        publishImmediately: { condition: 'true', template: '. Publish immediately so students can see it' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'create-quiz',
      title: 'Create Quiz',
      description: 'Create a new quiz (New Quizzes)',
      category: 'create',
      icon: 'rocket',
      formFields: [
        {
          fieldType: 'text',
          name: 'quizTitle',
          label: 'Quiz Title',
          required: true,
          placeholder: 'e.g., Chapter 1 Quiz',
          defaultValue: 'Chapter 3: Cell Biology Quiz'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'BIO-101-Spring 2026'
        },
        {
          fieldType: 'datetime-local',
          name: 'dueDate',
          label: 'Due Date',
          required: false,
          defaultValue: '2026-03-15T23:59'
        },
        {
          fieldType: 'number',
          name: 'points',
          label: 'Points Possible',
          required: false,
          placeholder: '100',
          min: 0,
          defaultValue: '50'
        },
        {
          fieldType: 'number',
          name: 'timeLimit',
          label: 'Time Limit (minutes)',
          required: false,
          min: 1,
          max: 300,
          defaultValue: '30'
        },
        {
          fieldType: 'checkbox',
          name: 'attachMaterials',
          label: 'Attach Reference Materials',
          advanced: true,
          helpText: 'Attach files students can reference during quiz',
          default: false
        },
        {
          fieldType: 'file-upload',
          name: 'materials',
          label: 'Materials to Attach',
          advanced: true,
          required: false,
          conditional: { field: 'attachMaterials', value: true },
          helpText: 'Drag and drop or click to select reference materials',
          accept: '.pdf,.doc,.docx,.jpg,.png'
        },
        {
          fieldType: 'checkbox',
          name: 'useQuestionBank',
          label: 'Draw from Question Bank',
          advanced: true,
          helpText: 'Create quiz that pulls questions from a question bank',
          default: true
        },
        {
          fieldType: 'text',
          name: 'questionBankName',
          label: 'Question Bank Name',
          advanced: true,
          required: false,
          conditional: { field: 'useQuestionBank', value: true },
          defaultValue: 'Chapter 3 Questions'
        },
        {
          fieldType: 'checkbox',
          name: 'shuffleAnswers',
          label: 'Shuffle Answers',
          advanced: true,
          default: true
        },
        {
          fieldType: 'checkbox',
          name: 'publishImmediately',
          label: 'Publish Immediately',
          advanced: true,
          helpText: 'Make visible to students right away (otherwise saved as draft)',
          default: false
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any other requirements?',
          rows: 2,
          defaultValue: 'Allow 2 attempts, keep highest score.'
        }
      ],
      promptTemplate: 'Create a quiz titled "{quizTitle}" in the {courseName} course{termInfo}{dueDate}{points}{timeLimit}{attachMaterials}{questionBank}{shuffleAnswers}{publishImmediately}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        dueDate: { condition: 'notEmpty', template: ', due on {dueDate}' },
        points: { condition: 'notEmpty', template: ', worth {points} points' },
        timeLimit: { condition: 'notEmpty', template: ' with a {timeLimit} minute time limit' },
        attachMaterials: { field: 'materialsList', condition: 'notEmpty', template: '. Attach these reference materials: {materialsList}' },
        questionBank: { condition: 'useQuestionBank', template: ' that draws questions from the "{questionBankName}" question bank' },
        shuffleAnswers: { condition: 'true', template: '. Shuffle answers for each question' },
        publishImmediately: { condition: 'true', template: '. Publish immediately so students can see it' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'create-module',
      title: 'Create Module',
      description: 'Create a new module in a course',
      category: 'create',
      icon: 'package',
      formFields: [
        {
          fieldType: 'text',
          name: 'moduleName',
          label: 'Module Name',
          required: true,
          placeholder: 'e.g., Week 1: Introduction',
          defaultValue: 'Week 3: Advanced Topics'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'FALL-2025',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'Introduction to Linguistics'
        },
        {
          fieldType: 'number',
          name: 'position',
          label: 'Position',
          advanced: true,
          required: false,
          placeholder: 'e.g., 1 for top of list',
          min: 1,
          helpText: 'Where in the module list should this appear?',
          defaultValue: '3'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any other requirements?',
          rows: 2,
          defaultValue: 'Lock this module until Week 2 is completed.'
        }
      ],
      promptTemplate: 'Create a new module called "{moduleName}" in the {courseName} course{termInfo}{position}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        position: { condition: 'notEmpty', template: ' at position {position}' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'create-page',
      title: 'Create Page',
      description: 'Create a new page in a course',
      category: 'create',
      icon: 'file',
      formFields: [
        {
          fieldType: 'text',
          name: 'pageTitle',
          label: 'Page Title',
          required: true,
          placeholder: 'e.g., Course Policies',
          defaultValue: 'Assignment Solutions'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'MATH-1010-020-Spring 2026'
        },
        {
          fieldType: 'textarea',
          name: 'content',
          label: 'Page Content',
          required: false,
          placeholder: 'Content for the page...',
          rows: 6,
          defaultValue: 'Here are the solutions to the homework assignments. Review these after submitting your work.'
        },
        {
          fieldType: 'checkbox',
          name: 'attachFiles',
          label: 'Attach Files to Page',
          advanced: true,
          helpText: 'Attach additional files to this page',
          default: false
        },
        {
          fieldType: 'file-upload',
          name: 'pageFiles',
          label: 'Files to Attach',
          advanced: true,
          required: false,
          conditional: { field: 'attachFiles', value: true },
          helpText: 'Drag and drop or click to select files',
          accept: '.pdf,.doc,.docx,.txt,.jpg,.png'
        },
        {
          fieldType: 'checkbox',
          name: 'setAsFrontPage',
          label: 'Set as Course Front Page',
          advanced: true,
          helpText: 'Make this the course home page',
          default: false
        },
        {
          fieldType: 'checkbox',
          name: 'conditionalAccess',
          label: 'Add Conditional Access',
          advanced: true,
          helpText: 'Restrict access based on certain criteria',
          default: true
        },
        {
          fieldType: 'textarea',
          name: 'accessCriteria',
          label: 'Access Criteria',
          advanced: true,
          required: false,
          conditional: { field: 'conditionalAccess', value: true },
          placeholder: 'e.g., Only available to students who received a non-zero score on Assignment X',
          rows: 3,
          defaultValue: 'Only available to students who received a non-zero score on Homework 1'
        },
        {
          fieldType: 'checkbox',
          name: 'publishImmediately',
          label: 'Publish Immediately',
          advanced: true,
          helpText: 'Make visible to students right away (otherwise saved as draft)',
          default: false
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any other requirements?',
          rows: 2,
          defaultValue: 'Keep as draft until next week.'
        }
      ],
      promptTemplate: 'Create a page titled "{pageTitle}" in the {courseName} course{termInfo}{content}{attachFiles}{frontPage}{conditionalAccess}{publishImmediately}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        content: { condition: 'notEmpty', template: ' with the following content: "{content}"' },
        attachFiles: { field: 'pageFilesList', condition: 'notEmpty', template: '. Attach these files: {pageFilesList}' },
        frontPage: { condition: 'true', template: '. Set it as the course front page' },
        conditionalAccess: { condition: 'conditionalAccess', template: '. {accessCriteria}' },
        publishImmediately: { condition: 'true', template: '. Publish immediately so students can see it' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'create-announcement',
      title: 'Create Announcement',
      description: 'Create a new announcement in a course',
      category: 'create',
      icon: 'megaphone',
      formFields: [
        {
          fieldType: 'text',
          name: 'announcementTitle',
          label: 'Announcement Title',
          required: true,
          placeholder: 'e.g., Welcome to the Course',
          defaultValue: 'Week 3 Assignment Reminder'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'FALL-2025',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'Introduction to Linguistics'
        },
        {
          fieldType: 'textarea',
          name: 'message',
          label: 'Message',
          required: true,
          placeholder: 'Your announcement message...',
          rows: 6,
          defaultValue: 'Hello everyone! This is a reminder that the Week 3 assignment is due this Friday at 11:59 PM. Please reach out if you have any questions.'
        },
        {
          fieldType: 'checkbox',
          name: 'attachFiles',
          label: 'Attach Files to Announcement',
          advanced: true,
          helpText: 'Attach additional files',
          default: false
        },
        {
          fieldType: 'file-upload',
          name: 'announcementFiles',
          label: 'Files to Attach',
          advanced: true,
          required: false,
          conditional: { field: 'attachFiles', value: true },
          helpText: 'Drag and drop or click to select files',
          accept: '.pdf,.doc,.docx,.jpg,.png,.txt'
        },
        {
          fieldType: 'checkbox',
          name: 'scheduleDelay',
          label: 'Schedule for Later',
          advanced: true,
          helpText: 'Post the announcement at a specific date/time',
          default: true
        },
        {
          fieldType: 'datetime-local',
          name: 'postDate',
          label: 'Post Date',
          advanced: true,
          required: false,
          conditional: { field: 'scheduleDelay', value: true },
          defaultValue: '2026-02-24T09:00'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any other requirements?',
          rows: 2,
          defaultValue: 'Also send this as an email notification.'
        }
      ],
      promptTemplate: 'Create an announcement titled "{announcementTitle}" in the {courseName} course{termInfo} with the message: "{message}"{attachFiles}{postDate}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        attachFiles: { field: 'announcementFilesList', condition: 'notEmpty', template: '. Attach these files: {announcementFilesList}' },
        postDate: { condition: 'notEmpty', template: '. Schedule it to post on {postDate}' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },

    // MANAGE & REPORT ACTIONS
    {
      id: 'list-assignments',
      title: 'List Assignments',
      description: 'Get all assignments in a course',
      category: 'manage',
      icon: 'clipboard-list',
      formFields: [
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'MATH-1010-020-Spring 2026'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any filtering or sorting preferences?',
          rows: 2,
          defaultValue: 'Show only assignments due in the next 2 weeks.'
        }
      ],
      promptTemplate: 'List all assignments in the {courseName} course{termInfo}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'list-modules',
      title: 'List Modules',
      description: 'Get all modules in a course',
      category: 'manage',
      icon: 'layers',
      formFields: [
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'FALL-2025',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'Introduction to Linguistics'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any additional requirements?',
          rows: 2,
          defaultValue: 'Include the number of items in each module.'
        }
      ],
      promptTemplate: 'List all modules in the {courseName} course{termInfo}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'get-module-items',
      title: 'Get Module Items',
      description: 'View contents of a specific module',
      category: 'manage',
      icon: 'list',
      formFields: [
        {
          fieldType: 'text',
          name: 'moduleName',
          label: 'Module Name',
          required: true,
          placeholder: 'e.g., Module 3: Foundations of Money',
          defaultValue: 'Module 3: Foundations of Money'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'Financial Literacy 101'
        },
        {
          fieldType: 'text',
          name: 'courseId',
          label: 'Course ID (Optional)',
          advanced: true,
          required: false,
          placeholder: 'e.g., 1712556',
          helpText: 'Optional: Makes lookup faster',
          defaultValue: '1712556'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any additional requirements?',
          rows: 2,
          defaultValue: 'Show completion status for each item.'
        }
      ],
      promptTemplate: 'Get module items for {moduleName} in {courseName}{termInfo}{courseId}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        courseId: { condition: 'notEmpty', template: ' (course ID: {courseId})' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'update-due-date',
      title: 'Update Due Date',
      description: 'Change the due date for assignments or quizzes',
      category: 'manage',
      icon: 'calendar',
      formFields: [
        {
          fieldType: 'textarea',
          name: 'itemDescription',
          label: 'What items should be updated?',
          required: true,
          placeholder: 'Describe which assignments/quizzes to update...',
          rows: 3,
          helpText: 'e.g., "All Chapter quizzes" or "Assignment 1 and Assignment 2"',
          defaultValue: 'All assignments in Week 3'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: false,
          placeholder: 'Type to search courses...',
          helpText: 'Optional but recommended',
          defaultValue: 'BIO-101-Spring 2026'
        },
        {
          fieldType: 'datetime-local',
          name: 'newDueDate',
          label: 'New Due Date',
          required: true,
          defaultValue: '2026-03-20T23:59'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any additional requirements?',
          rows: 2,
          defaultValue: 'Send an announcement about the date change.'
        }
      ],
      promptTemplate: 'Update the due date for {itemDescription}{courseName}{termInfo} to {newDueDate}{additionalInstructions}',
      templateRules: {
        courseName: { condition: 'notEmpty', template: ' in the {courseName} course' },
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },

    // STUDENT MANAGEMENT ACTIONS
    {
      id: 'send-message-to-students',
      title: 'Send Message to Students',
      description: 'Send a message via Canvas inbox or email',
      category: 'student-management',
      icon: 'message-square',
      formFields: [
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'PSY1012 General Psychology'
        },
        {
          fieldType: 'select',
          name: 'recipientType',
          label: 'Send To',
          required: true,
          defaultValue: 'criteria',
          options: [
            { value: '', label: 'Select recipient type' },
            { value: 'all', label: 'All students in course' },
            { value: 'criteria', label: 'Students who meet specific criteria' },
            { value: 'specific', label: 'Specific students by name' }
          ]
        },
        {
          fieldType: 'textarea',
          name: 'criteriaDescription',
          label: 'Criteria Description',
          required: false,
          conditional: { field: 'recipientType', value: 'criteria' },
          placeholder: 'e.g., "Students who haven\'t submitted Assignment 1"',
          rows: 2,
          defaultValue: 'Students who haven\'t logged in during the last 7 days'
        },
        {
          fieldType: 'textarea',
          name: 'studentNames',
          label: 'Student Names',
          required: false,
          conditional: { field: 'recipientType', value: 'specific' },
          placeholder: 'List student names...',
          rows: 3
        },
        {
          fieldType: 'text',
          name: 'subject',
          label: 'Message Subject',
          required: true,
          placeholder: 'e.g., Check-in: How are you doing?',
          defaultValue: 'Checking in - Let\'s get back on track'
        },
        {
          fieldType: 'textarea',
          name: 'messageBody',
          label: 'Message Body',
          required: true,
          placeholder: 'Your message...',
          rows: 8,
          defaultValue: 'Hi there! I noticed you haven\'t logged into the course recently and wanted to check in. Is there anything I can help with? Please let me know if you have questions or need support.'
        },
        {
          fieldType: 'select',
          name: 'sendAs',
          label: 'Send As',
          advanced: true,
          required: false,
          defaultValue: 'both',
          options: [
            { value: '', label: 'Canvas message only' },
            { value: 'email', label: 'Email notification' },
            { value: 'both', label: 'Both message and email' }
          ]
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any other requirements?',
          rows: 2
        }
      ],
      promptTemplate: 'Send a message to {recipientDescription} in {courseName}{termInfo} with subject "{subject}" and message: "{messageBody}"{sendAs}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        sendAs: { condition: 'notEmpty', template: '. Send as {sendAs}' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'find-students-not-logged-in',
      title: 'Students Not Logged In',
      description: 'Find students who haven\'t logged into a course',
      category: 'student-management',
      icon: 'user-x',
      formFields: [
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Type to search courses...',
          defaultValue: 'PSY1012 General Psychology'
        },
        {
          fieldType: 'select',
          name: 'timeframe',
          label: 'Timeframe',
          required: false,
          defaultValue: 'in the last 7 days',
          options: [
            { value: '', label: 'Ever (never logged in)' },
            { value: 'in the last 7 days', label: 'Last 7 days' },
            { value: 'in the last 14 days', label: 'Last 14 days' },
            { value: 'in the last 30 days', label: 'Last 30 days' }
          ]
        },
        {
          fieldType: 'checkbox',
          name: 'includeLastLogin',
          label: 'Include Last Login Date',
          advanced: true,
          default: true,
          helpText: 'Show when each student last logged in'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'What should we do with this list?',
          rows: 2,
          defaultValue: 'Send them an encouraging email to check in.'
        }
      ],
      promptTemplate: 'Get a list of students who have not logged into the {courseName} course{termInfo}{timeframe}{includeLastLogin}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        timeframe: { condition: 'notEmpty', template: ' {timeframe}' },
        includeLastLogin: { condition: 'true', template: '. Include their last login date' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'find-students-incomplete-module',
      title: 'Students With Incomplete Module',
      description: 'Find students who haven\'t completed a module',
      category: 'student-management',
      icon: 'circle-x',
      formFields: [
        {
          fieldType: 'text',
          name: 'moduleName',
          label: 'Module Name',
          required: true,
          placeholder: 'e.g., Unit 2',
          defaultValue: 'Unit 2'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'FALL-2025',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Select a course',
          defaultValue: 'Principles of Teaching & Learning'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any additional requirements?',
          rows: 2,
          defaultValue: 'Include their progress percentage for the module.'
        }
      ],
      promptTemplate: 'Find students who have not completed the {moduleName} module in the {courseName} course{termInfo}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'find-students-by-grade',
      title: 'Students By Grade Threshold',
      description: 'Find students below a certain grade',
      category: 'student-management',
      icon: 'bar-chart-2',
      formFields: [
        {
          fieldType: 'select',
          name: 'gradeThreshold',
          label: 'Grade Threshold',
          required: true,
          defaultValue: 'less than a C',
          options: [
            { value: '', label: 'Select threshold' },
            { value: 'less than a C', label: 'Below C' },
            { value: 'less than a D', label: 'Below D (failing)' },
            { value: 'less than 70%', label: 'Below 70%' },
            { value: 'less than 60%', label: 'Below 60%' },
            { value: 'less than 50%', label: 'Below 50%' }
          ]
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Select a course',
          defaultValue: 'Introduction to Psychology'
        },
        {
          fieldType: 'text',
          name: 'courseId',
          label: 'Course ID (Optional)',
          advanced: true,
          required: false,
          placeholder: 'e.g., 1698972',
          defaultValue: '1698972'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any additional requirements?',
          rows: 2,
          defaultValue: 'Offer them extra credit opportunities.'
        }
      ],
      promptTemplate: 'Find students with grades {gradeThreshold} in {courseName}{termInfo}{courseId}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        courseId: { condition: 'notEmpty', template: ' (course ID: {courseId})' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'find-low-engagement',
      title: 'Low Engagement Students',
      description: 'Find students with low participation',
      category: 'student-management',
      icon: 'alert-triangle',
      formFields: [
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'FALL-2025',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Select a course',
          defaultValue: 'BIB1520 - Biblical Studies'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'What defines low engagement for you?',
          rows: 2,
          defaultValue: 'Include students with less than 50% page views and no discussion posts.'
        }
      ],
      promptTemplate: 'Find students with low engagement in the {courseName} course{termInfo}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'list-missing-submissions',
      title: 'List Missing Submissions',
      description: 'Find students who haven\'t submitted an assignment',
      category: 'student-management',
      icon: 'clipboard-x',
      formFields: [
        {
          fieldType: 'text',
          name: 'assignmentName',
          label: 'Assignment Name',
          required: true,
          placeholder: 'e.g., Homework 1',
          defaultValue: 'Homework 1'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Select a course',
          defaultValue: 'MATH-1010-020-Spring 2026'
        },
        {
          fieldType: 'checkbox',
          name: 'includeZeroScores',
          label: 'Include Students with Zero Scores',
          advanced: true,
          default: true,
          helpText: 'Also show students who submitted but received 0 points'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any additional requirements?',
          rows: 2,
          defaultValue: 'Send them a reminder email about the missing work.'
        }
      ],
      promptTemplate: 'Show me students who haven\'t submitted "{assignmentName}" in {courseName}{termInfo}{includeZeroScores}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        includeZeroScores: {
          condition: 'true',
          template: '. Include students with zero scores'
        },
        additionalInstructions: {
          condition: 'notEmpty',
          template: '. {additionalInstructions}'
        }
      }
    },
    {
      id: 'get-assignment-submissions',
      title: 'Get Assignment Submissions',
      description: 'View all submissions for an assignment',
      category: 'student-management',
      icon: 'inbox',
      formFields: [
        {
          fieldType: 'text',
          name: 'assignmentName',
          label: 'Assignment Name',
          required: true,
          placeholder: 'e.g., Final Essay',
          defaultValue: 'Final Essay'
        },
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'FALL-2025',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Select a course',
          defaultValue: 'English 101'
        },
        {
          fieldType: 'select',
          name: 'filterBy',
          label: 'Filter Submissions',
          advanced: true,
          required: false,
          options: [
            { value: '', label: 'All submissions' },
            { value: 'graded', label: 'Only graded' },
            { value: 'ungraded', label: 'Only ungraded' },
            { value: 'late', label: 'Only late submissions' }
          ]
        },
        {
          fieldType: 'checkbox',
          name: 'includeComments',
          label: 'Include Submission Comments',
          advanced: true,
          default: true
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any additional requirements?',
          rows: 2,
          defaultValue: 'Show submission timestamps.'
        }
      ],
      promptTemplate: 'Get all submissions for "{assignmentName}" in {courseName}{termInfo}{filterBy}{includeComments}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        filterBy: {
          condition: 'notEmpty',
          template: ', showing only {filterBy} submissions'
        },
        includeComments: {
          condition: 'true',
          template: '. Include submission comments'
        },
        additionalInstructions: {
          condition: 'notEmpty',
          template: '. {additionalInstructions}'
        }
      }
    },

    // COURSE ANALYSIS ACTIONS
    {
      id: 'analyze-design-features',
      title: 'Analyze Design Features',
      description: 'Identify standout design features in a course',
      category: 'course-analysis',
      icon: 'layout-dashboard',
      formFields: [
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Select a course',
          defaultValue: 'Financial Literacy 101'
        },
        {
          fieldType: 'text',
          name: 'courseId',
          label: 'Course ID (Optional)',
          advanced: true,
          required: false,
          placeholder: 'e.g., 1712556',
          defaultValue: '1712556'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any specific aspects to focus on?',
          rows: 2,
          defaultValue: 'Focus on accessibility and visual design elements.'
        }
      ],
      promptTemplate: 'Analyze the design features of {courseName}{termInfo}{courseId} and highlight what stands out{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        courseId: { condition: 'notEmpty', template: ' (course ID: {courseId})' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'evaluate-backward-design',
      title: 'Backward Design Evaluation',
      description: 'Evaluate course from backward design perspective',
      category: 'course-analysis',
      icon: 'refresh-cw',
      formFields: [
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'SPRING-2026',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Select a course',
          defaultValue: 'Introduction to Philosophy'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any specific aspects to evaluate?',
          rows: 2,
          defaultValue: 'Focus on alignment between learning outcomes and assessments.'
        }
      ],
      promptTemplate: 'Evaluate the {courseName} course{termInfo} from a backward design point of view{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    },
    {
      id: 'get-design-tips',
      title: 'Instructional Design Tips',
      description: 'Get improvement suggestions for a course',
      category: 'course-analysis',
      icon: 'lightbulb',
      formFields: [
        {
          fieldType: 'term-select',
          name: 'term',
          label: 'Term',
          required: false,
          defaultValue: 'FALL-2025',
          helpText: 'Select term to filter courses'
        },
        {
          fieldType: 'course-select',
          name: 'courseName',
          label: 'Course Name',
          required: true,
          placeholder: 'Select a course',
          defaultValue: 'Biology 101'
        },
        {
          fieldType: 'text',
          name: 'courseUrl',
          label: 'Course URL (Optional)',
          advanced: true,
          required: false,
          placeholder: 'e.g., https://canvas.edu/courses/12345',
          defaultValue: 'https://nmsu.instructure.com/courses/1728717'
        },
        {
          fieldType: 'textarea',
          name: 'additionalInstructions',
          label: 'Additional Instructions',
          required: false,
          placeholder: 'Any specific areas of concern?',
          rows: 2,
          defaultValue: 'Focus on improving student engagement and interaction.'
        }
      ],
      promptTemplate: 'Provide instructional design tips for {courseName}{termInfo}{courseUrl}{additionalInstructions}',
      templateRules: {
        termInfo: { field: 'term', condition: 'notEmpty', template: ' in the {termFormatted} term' },
        courseUrl: { condition: 'notEmpty', template: ': {courseUrl}' },
        additionalInstructions: { condition: 'notEmpty', template: '. {additionalInstructions}' }
      }
    }
  ]
};
