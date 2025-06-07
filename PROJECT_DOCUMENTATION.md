
# Resume Builder Project Documentation

## Project Overview

This is a comprehensive resume and cover letter builder application built with React, TypeScript, and modern web technologies. The application provides users with tools to create, edit, and manage professional resumes and cover letters, including AI-powered assistance for content generation.

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/UI component library
- **Routing**: React Router DOM v6
- **State Management**: React hooks and context
- **Icons**: Lucide React
- **Charts**: Recharts
- **Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form with Zod validation

## Project Structure

```
src/
├── components/
│   ├── ai/
│   │   ├── AIChatWizard.tsx           # AI-powered resume creation chat interface
│   │   └── ResumeAIWizard.tsx         # AI assistant for resume editing
│   ├── builder/
│   │   ├── ResumeBuilder.tsx          # Main resume editing interface
│   │   ├── ResumePreview.tsx          # Live preview of resume
│   │   ├── ResumeSection.tsx          # Individual resume sections
│   │   └── LanguageSelector.tsx       # Language selection component
│   ├── coverLetter/
│   │   ├── CoverLetterEditor.tsx      # Cover letter editing interface
│   │   └── CoverLetterPreview.tsx     # Cover letter preview
│   ├── dashboard/
│   │   └── Dashboard.tsx              # Main dashboard with document overview
│   ├── export/
│   │   └── ExportOptions.tsx          # PDF/export functionality
│   ├── inputs/
│   │   └── TagInput.tsx               # Tag input component for skills
│   ├── layout/
│   │   ├── AppLayout.tsx              # Main application layout
│   │   ├── Header.tsx                 # Application header
│   │   └── Sidebar.tsx                # Navigation sidebar
│   ├── onboarding/
│   │   └── OnboardingFlow.tsx         # User onboarding process
│   ├── settings/
│   │   ├── LocalizationSettings.tsx  # Language and region settings
│   │   └── ProfileSettings.tsx       # User profile management
│   ├── templates/
│   │   └── TemplateGallery.tsx        # Resume template selection
│   ├── theme/
│   │   └── ThemeToggle.tsx            # Dark/light theme toggle
│   ├── ui/                            # Shadcn/UI components
│   └── version/
│       └── VersionHistory.tsx         # Document version control
├── hooks/
│   ├── use-mobile.tsx                 # Mobile detection hook
│   └── use-toast.ts                   # Toast notification hook
├── pages/                             # Route pages
├── lib/
│   └── utils.ts                       # Utility functions
└── utils/
    └── validation.ts                  # Form validation schemas
```

## Page Structure and Functionality

### 1. Landing Page (`/`)
- **File**: `src/pages/Index.tsx`
- **Purpose**: Application landing page with marketing content
- **Features**: Hero section, feature highlights, call-to-action buttons

### 2. Dashboard (`/dashboard`)
- **File**: `src/pages/DashboardPage.tsx`
- **Component**: `src/components/dashboard/Dashboard.tsx`
- **Purpose**: Main user dashboard showing all documents
- **Features**:
  - Recent resumes and cover letters overview
  - Quick action buttons (Create New Resume/Cover Letter)
  - Document statistics and analytics
  - AI Assistant access button
  - Template gallery preview

### 3. Resumes Management (`/resumes`)
- **File**: `src/pages/ResumesPage.tsx`
- **Purpose**: Resume management and overview
- **Features**:
  - Grid view of all user resumes
  - Preview thumbnails
  - Quick actions: Edit, Copy, Download, Delete
  - Create new resume button
  - Search and filter functionality

### 4. Resume Builder (`/resume-builder/:id` | `/resume-builder/new`)
- **File**: `src/pages/ResumeBuilderPage.tsx`
- **Component**: `src/components/builder/ResumeBuilder.tsx`
- **Purpose**: Comprehensive resume editing interface
- **Features**:
  - Live preview alongside editing
  - Section-based editing (Personal Info, Experience, Education, Skills)
  - Drag-and-drop section reordering
  - Template switching
  - Auto-save functionality
  - Export options (PDF, DOCX)
  - Language selection
  - Real-time validation

### 5. Resume View (`/resume/:id`)
- **File**: `src/pages/ResumeViewPage.tsx`
- **Purpose**: Read-only resume display and management
- **Features**:
  - Full resume preview
  - Sharing options
  - Download functionality
  - Edit button redirect
  - Version history access

### 6. AI Resume Wizard (`/ai-resume`)
- **File**: `src/pages/AIResumeWizardPage.tsx`
- **Component**: `src/components/ai/AIChatWizard.tsx`
- **Purpose**: AI-powered resume creation from scratch
- **Features**:
  - Chat-based interface
  - Step-by-step questionnaire
  - File attachment support (existing resumes, job descriptions)
  - Progress tracking
  - Answer suggestions
  - Complete resume generation
  - Modern, minimalist design

### 7. Cover Letters Management (`/cover-letters`)
- **File**: `src/pages/CoverLettersPage.tsx`
- **Purpose**: Cover letter management
- **Features**:
  - Grid view of cover letters
  - Company and position tracking
  - Quick actions and management
  - Template-based creation

### 8. Cover Letter Editor (`/cover-letter/:id` | `/cover-letter/new`)
- **File**: `src/pages/CoverLetterEditorPage.tsx`
- **Component**: `src/components/coverLetter/CoverLetterEditor.tsx`
- **Purpose**: Cover letter creation and editing
- **Features**:
  - Rich text editor
  - Company and position details
  - Template selection
  - Live preview
  - Auto-save functionality

### 9. Cover Letter View (`/cover-letter/:id/view`)
- **File**: `src/pages/CoverLetterViewPage.tsx`
- **Purpose**: Cover letter display and management
- **Features**:
  - Formatted cover letter display
  - Application details sidebar
  - Export and sharing options

### 10. Template Gallery (`/templates`)
- **File**: `src/pages/TemplateGalleryPage.tsx`
- **Component**: `src/components/templates/TemplateGallery.tsx`
- **Purpose**: Browse and select resume templates
- **Features**:
  - Template categories
  - Preview functionality
  - Template application to existing resumes

### 11. Profile Management (`/profile`)
- **File**: `src/pages/ProfilePage.tsx`
- **Purpose**: User profile and personal information
- **Features**:
  - Personal information editing
  - Profile photo upload
  - Professional summary
  - Contact details management

### 12. Settings (`/settings`)
- **File**: `src/pages/SettingsPage.tsx`
- **Purpose**: Application settings and preferences
- **Features**:
  - Theme customization
  - Language and localization
  - Notification preferences
  - Account management

### 13. AI Chat Wizard (`/ai-wizard`)
- **File**: `src/pages/AIChatWizardPage.tsx`
- **Purpose**: General AI assistant for resume improvement
- **Features**:
  - Chat interface for resume advice
  - Content suggestions
  - ATS optimization tips

## Required API Endpoints

### Authentication & User Management

```typescript
// User registration and authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
PUT /api/auth/profile

// Example request/response
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt_token"
}
```

### Resume Management

```typescript
// Resume CRUD operations
GET /api/resumes
POST /api/resumes
GET /api/resumes/:id
PUT /api/resumes/:id
DELETE /api/resumes/:id
POST /api/resumes/:id/duplicate

// Example resume data structure
{
  "id": "uuid",
  "title": "Software Engineer Resume",
  "userId": "user_uuid",
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com",
    "phone": "+1 (555) 123-4567",
    "location": "San Francisco, CA",
    "website": "https://johndoe.dev"
  },
  "summary": "Experienced software engineer with 5+ years...",
  "experience": [
    {
      "id": "exp_1",
      "company": "Tech Corp",
      "position": "Senior Software Engineer",
      "startDate": "2021-01",
      "endDate": "present",
      "location": "San Francisco, CA",
      "description": "Led development of scalable web applications...",
      "achievements": [
        "Improved system performance by 40%",
        "Led team of 5 developers"
      ]
    }
  ],
  "education": [
    {
      "id": "edu_1",
      "institution": "University of Technology",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "startDate": "2015-09",
      "endDate": "2019-05",
      "gpa": "3.8"
    }
  ],
  "skills": [
    {
      "category": "Programming Languages",
      "items": ["JavaScript", "TypeScript", "Python", "Java"]
    },
    {
      "category": "Frameworks",
      "items": ["React", "Node.js", "Express", "Django"]
    }
  ],
  "languages": [
    {
      "language": "English",
      "proficiency": "Native"
    },
    {
      "language": "Spanish",
      "proficiency": "Intermediate"
    }
  ],
  "templateId": "modern_template",
  "createdAt": "2023-09-15T10:30:00Z",
  "updatedAt": "2023-09-20T14:45:00Z"
}
```

### Cover Letter Management

```typescript
// Cover letter operations
GET /api/cover-letters
POST /api/cover-letters
GET /api/cover-letters/:id
PUT /api/cover-letters/:id
DELETE /api/cover-letters/:id

// Example cover letter data
{
  "id": "uuid",
  "title": "Application for Software Engineer",
  "userId": "user_uuid",
  "company": "Google Inc.",
  "position": "Software Engineer",
  "recipientName": "Sarah Johnson",
  "content": {
    "introduction": "I am writing to express my strong interest...",
    "body": "Throughout my career, I have developed expertise...",
    "conclusion": "I would welcome the opportunity to discuss..."
  },
  "linkedResumeId": "resume_uuid",
  "status": "draft", // draft, sent, archived
  "createdAt": "2023-09-15T10:30:00Z",
  "updatedAt": "2023-09-20T14:45:00Z"
}
```

### AI Integration

```typescript
// AI resume generation
POST /api/ai/generate-resume
{
  "userResponses": [
    {
      "question": "Tell me about your work experience",
      "answer": "I have 5 years of experience as a software engineer..."
    }
  ],
  "attachments": [
    {
      "type": "file",
      "name": "old_resume.pdf",
      "content": "base64_encoded_content"
    }
  ]
}

Response:
{
  "generatedResume": {
    // Complete resume object
  },
  "suggestions": [
    "Consider adding more quantified achievements",
    "Your technical skills section could be expanded"
  ]
}

// AI content suggestions
POST /api/ai/suggest-content
{
  "section": "experience",
  "context": {
    "position": "Software Engineer",
    "company": "Tech Corp",
    "currentDescription": "Worked on web applications"
  }
}

Response:
{
  "suggestions": [
    "Developed and maintained scalable web applications using React and Node.js",
    "Collaborated with cross-functional teams to deliver high-quality software solutions"
  ]
}

// ATS optimization
POST /api/ai/optimize-ats
{
  "resumeContent": "resume_text",
  "jobDescription": "job_posting_text"
}

Response:
{
  "score": 85,
  "recommendations": [
    "Add 'machine learning' keyword to skills section",
    "Include more specific technical achievements"
  ],
  "optimizedContent": {
    // Suggested improvements
  }
}
```

### Template Management

```typescript
// Template operations
GET /api/templates
GET /api/templates/:id
POST /api/templates/:id/apply

// Example template data
{
  "id": "modern_template",
  "name": "Modern Professional",
  "category": "professional",
  "preview": "https://example.com/template-preview.jpg",
  "styles": {
    "colors": {
      "primary": "#2563eb",
      "secondary": "#64748b"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "layout": "single-column"
  },
  "isPremium": false
}
```

### File Management

```typescript
// File upload and management
POST /api/files/upload
GET /api/files/:id
DELETE /api/files/:id

// File upload response
{
  "fileId": "uuid",
  "filename": "resume.pdf",
  "url": "https://storage.example.com/files/uuid",
  "mimeType": "application/pdf",
  "size": 1024000
}
```

### Export and Sharing

```typescript
// Export operations
POST /api/export/pdf
{
  "resumeId": "uuid",
  "format": "pdf",
  "options": {
    "template": "modern_template",
    "includePhoto": true
  }
}

Response:
{
  "downloadUrl": "https://example.com/exports/resume.pdf",
  "expiresAt": "2023-09-21T10:30:00Z"
}

// Sharing
POST /api/share/create
{
  "documentId": "uuid",
  "type": "resume", // or "cover-letter"
  "permissions": "view", // view, edit
  "expiresAt": "2023-12-31T23:59:59Z"
}

Response:
{
  "shareId": "uuid",
  "shareUrl": "https://app.example.com/shared/uuid",
  "expiresAt": "2023-12-31T23:59:59Z"
}
```

### Analytics and Insights

```typescript
// User analytics
GET /api/analytics/dashboard

Response:
{
  "totalResumes": 5,
  "totalCoverLetters": 3,
  "totalViews": 150,
  "totalDownloads": 45,
  "recentActivity": [
    {
      "type": "resume_created",
      "documentTitle": "Software Engineer Resume",
      "timestamp": "2023-09-20T14:30:00Z"
    }
  ],
  "popularTemplates": [
    {
      "templateId": "modern_template",
      "name": "Modern Professional",
      "usageCount": 2
    }
  ]
}
```

## Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  subscription: 'free' | 'premium' | 'enterprise';
  preferences: {
    language: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Resume Model
```typescript
interface Resume {
  id: string;
  userId: string;
  title: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  templateId: string;
  metadata: {
    atsScore?: number;
    lastOptimized?: Date;
    version: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## Features and Capabilities

### Core Features
1. **Resume Builder**: Comprehensive resume creation and editing
2. **Cover Letter Builder**: Professional cover letter creation
3. **Template Gallery**: Multiple professional templates
4. **AI Assistant**: Content generation and optimization
5. **ATS Optimization**: Applicant Tracking System compatibility
6. **Export Options**: PDF, DOCX, and other formats
7. **Sharing**: Secure document sharing
8. **Version Control**: Document history and versioning

### Advanced Features
1. **Multi-language Support**: International resume formats
2. **Analytics**: Document performance tracking
3. **Collaboration**: Team and mentor feedback
4. **Integration**: Job board connections
5. **Mobile Optimization**: Responsive design
6. **Offline Support**: Progressive Web App capabilities

This documentation provides a comprehensive overview of the project structure, functionality, and required backend infrastructure to support all implemented features.
