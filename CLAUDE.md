# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Create React App-based frontend for a resume analysis service called "Pertineo". The application allows users to submit resumes for AI-powered analysis, receive detailed feedback, and view analysis reports. The system uses streaming responses for real-time analysis updates.

## Development Commands

```bash
# Navigate to client directory first
cd client

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Run tests in watch mode
npm test

# Build production bundle
npm run build
```

## Architecture

### Three-Layer Component Structure

The codebase follows a strict three-layer component architecture:

1. **Pages** (`src/pages/*/ui/*.jsx`) - Top-level route components that compose layouts
2. **Layouts** (`src/layouts/*/ui/*.jsx`) - Page section containers that compose smaller components
3. **Components** (`src/components/*/ui/*.jsx`) - Reusable UI components

Each layer uses barrel exports via `index.js` files. Components are co-located with their SCSS modules (e.g., `Component.jsx` + `Component.module.scss`).

### Key Directories

- `src/api/` - API client functions using React Query hooks
- `src/pages/` - Top-level page components (exported via `ui/` subdirectory)
- `src/layouts/` - Section-level layout components
- `src/components/` - Reusable UI components
- `src/shared/` - Global shared components (header, footer, modal, popup)
- `src/lib/` - Library configuration (React Query client)

### Routing Structure

Main routes defined in `App.js`:
- `/` - Landing page
- `/intro` - Service introduction
- `/evaluation` - 3D evaluation explanation
- `/team` - Team information
- `/analyze` - Resume submission form
- `/analysis` - Real-time analysis results with streaming
- `/notice` - Notice board
- `/notice/:id` - Notice detail
- `/privacy-policy` - Privacy policy

### API Layer

All API calls use Axios with a configured instance (`api/axiosInstance.js`):
- Base URL from `REACT_APP_BASE_URL` environment variable
- Credentials enabled (`withCredentials: true`)
- React Query hooks for data fetching and mutations

API modules:
- `analysisApi.js` - Analysis report CRUD operations
- `resumeApi.js` - Resume data management
- `emailApi.js` - Email verification
- `noticeApi.js` - Notice board operations

### Real-time Analysis Streaming

The analysis page (`pages/analysis`) uses Server-Sent Events (SSE) via `useAnalysisStream` hook:
- Connects to `/analysis` endpoint with `Accept: text/event-stream`
- Handles multiple event types: `phase_change`, `created_report`, `final_report`, `agent_web_search`, `current_stats`, `past_stats`, `error_detection`
- Updates UI in real-time as analysis progresses through phases

### State Management

- **React Query** (`@tanstack/react-query`) - Server state, caching, and data synchronization
- **React Hook Form** - Form state management
- **Local State** - Component-specific state with hooks

### Import Path Resolution

The project uses absolute imports via `jsconfig.json`:
```javascript
// Use this:
import api from "api/axiosInstance";
import Header from "shared/header";

// Instead of:
import api from "../../api/axiosInstance";
```

Base path is `src/`, so all imports resolve from the source directory.

### Styling

- **SCSS Modules** - Component-specific styles using CSS Modules pattern
- **Global styles** - `index.css` and `App.css` for base styles
- **Pretendard font** - Custom Korean font loaded from `/public/font/`

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers on push to `deploy` branch:
1. Build with `CI=false npm run build` (ignores warnings)
2. Deploy to AWS S3
3. Invalidate CloudFront cache

Requires environment variable `REACT_APP_BASE_URL` for API endpoint.

## Component Development Patterns

When creating new components:

1. Place component in appropriate layer (`components/`, `layouts/`, or `pages/`)
2. Create `ui/` subdirectory with component file and SCSS module
3. Export via `index.js` barrel file in parent directory
4. Use absolute imports from `src/` base

Example structure:
```
src/components/example/
├── index.js              // export { default } from "./ui/Example";
└── ui/
    ├── Example.jsx
    └── Example.module.scss
```
