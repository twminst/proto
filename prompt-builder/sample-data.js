// Sample Canvas Course Data

const SAMPLE_DATA = {
  terms: [
    { value: 'SPRING-2026', label: 'Spring 2026' },
    { value: 'FALL-2025', label: 'Fall 2025' },
    { value: 'SUMMER-2026', label: 'Summer 2026' },
    { value: 'WINTER-2026', label: 'Winter 2026' }
  ],

  courses: [
    // Spring 2026 Courses
    { id: '1698972', name: 'PSY1012 General Psychology', term: 'SPRING-2026' },
    { id: '1712556', name: 'Financial Literacy 101', term: 'SPRING-2026' },
    { id: '1712089', name: 'SPAN 502 - Advanced Spanish', term: 'SPRING-2026' },
    { id: '1728717', name: 'Introduction to Philosophy', term: 'SPRING-2026' },
    { id: '1733177', name: 'MATH-1010-020-Spring 2026', term: 'SPRING-2026' },
    { id: '2001234', name: 'BIO-101-Spring 2026', term: 'SPRING-2026' },
    { id: '2001235', name: 'CHEM-101-Spring 2026', term: 'SPRING-2026' },
    { id: '2001236', name: 'ENG-101-Spring 2026', term: 'SPRING-2026' },
    { id: '2001237', name: 'HIST-101-Spring 2026', term: 'SPRING-2026' },
    { id: '2001238', name: 'CS-101-Spring 2026', term: 'SPRING-2026' },
    { id: '2001239', name: 'ART-101-Spring 2026', term: 'SPRING-2026' },
    { id: '2001240', name: 'MUS-101-Spring 2026', term: 'SPRING-2026' },
    { id: '2001241', name: 'PE-101-Spring 2026', term: 'SPRING-2026' },
    { id: '2001242', name: 'BUS-101-Spring 2026', term: 'SPRING-2026' },

    // Fall 2025 Courses
    { id: '1650123', name: 'Introduction to Linguistics', term: 'FALL-2025' },
    { id: '1650124', name: 'Principles of Teaching & Learning', term: 'FALL-2025' },
    { id: '1650125', name: 'BIB1520 - Biblical Studies', term: 'FALL-2025' },
    { id: '1650126', name: 'CDE-103-3602', term: 'FALL-2025' },
    { id: '1650127', name: 'Biology 101', term: 'FALL-2025' },
    { id: '1650128', name: 'Chemistry 101', term: 'FALL-2025' },
    { id: '1650129', name: 'English 101', term: 'FALL-2025' },
    { id: '1650130', name: 'History 101', term: 'FALL-2025' },
    { id: '1650131', name: 'Physics 101', term: 'FALL-2025' },
    { id: '1650132', name: 'Calculus I', term: 'FALL-2025' },

    // Summer 2026 Courses
    { id: '2100001', name: 'Summer Biology Intensive', term: 'SUMMER-2026' },
    { id: '2100002', name: 'Summer Chemistry Lab', term: 'SUMMER-2026' },
    { id: '2100003', name: 'Summer Writing Workshop', term: 'SUMMER-2026' },
    { id: '2100004', name: 'Summer Math Review', term: 'SUMMER-2026' },
    { id: '2100005', name: 'Summer Spanish Immersion', term: 'SUMMER-2026' },

    // Winter 2026 Courses
    { id: '2200001', name: 'Winter Term Special Topics', term: 'WINTER-2026' },
    { id: '2200002', name: 'Winter Economics', term: 'WINTER-2026' },
    { id: '2200003', name: 'Winter Political Science', term: 'WINTER-2026' }
  ],

  // Helper function to get courses for a specific term
  getCoursesByTerm(termValue) {
    if (!termValue || termValue === '') {
      return this.courses;
    }
    return this.courses.filter(course => course.term === termValue);
  },

  // Helper function to get course by name
  getCourseByName(courseName) {
    return this.courses.find(course => course.name === courseName);
  }
};
