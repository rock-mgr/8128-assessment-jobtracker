# JobTrack React Assessment

A frontend-only job application tracker prepared for the Modern Frameworks for Software Development assessment.

## What the app does

- Loads sample applications from `public/data/applications.json` with Axios and `useEffect`.
- Shows a dashboard with application counts.
- Lists applications with search and status filtering.
- Adds, edits, and deletes applications by updating an array in React state.
- Shares the applications array from `App` to page components through props.
- Uses Wouter for the dashboard, application list, add form, and edit form routes.

## Technology

- React and React hooks
- Axios
- Wouter
- Bootstrap CSS
- Vite for local development and building

This project has no backend or database. Changes are held in memory while the app is open. Reloading the page loads the original sample JSON again.

## Run locally

1. Install Node.js if it is not already installed.
2. Open this project folder in VS Code or a terminal.
3. Run `npm install` once to install the dependencies.
4. Run `npm run dev` to start the app.
5. Open the local address printed by Vite.

## Assessment concept map

| Assessment requirement | Project location |
| --- | --- |
| Two or more `useState` hooks | `src/App.jsx`, `src/pages/ApplicationsPage.jsx`, `src/pages/ApplicationFormPage.jsx` |
| `useEffect` hook | `ApplicationDataLoader` in `src/App.jsx` |
| Process form controls | `src/pages/ApplicationFormPage.jsx` |
| Component with props | `ApplicationCard`, `SummaryCard`, and `StatusBadge` |
| Consume JSON/API data | Axios loads `public/data/applications.json` |
| Share state across components | `applications` and `setApplications` props passed from `src/App.jsx` |
| Update an array in state | Add, edit, and delete handlers |
| At least three routes | Wouter routes in `src/App.jsx` |

## Important

The sample job application information is fictional. Replace it with your own sample data before presenting if you prefer.
