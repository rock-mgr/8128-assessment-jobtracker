import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Switch } from 'wouter';
import { useAtom } from 'jotai';
import { applicationsAtom } from './state/applicationsAtom.js';
import Navbar from './components/Navbar.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ApplicationsPage from './pages/ApplicationsPage.jsx';
import ApplicationFormPage from './pages/ApplicationFormPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function ApplicationDataLoader({ children }) {
  const [, setApplications] = useAtom(applicationsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get('/data/applications.json')
      .then((response) => {
        setApplications(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage('The sample applications could not be loaded.');
        setIsLoading(false);
      });
  }, [setApplications]);

  if (isLoading) {
    return <main className="container py-5">Loading applications…</main>;
  }

  if (errorMessage) {
    return <main className="container py-5 alert alert-danger">{errorMessage}</main>;
  }

  return children;
}

export default function App() {
  return (
    <ApplicationDataLoader>
      <div className="app-shell">
        <Navbar />
        <main className="container app-main py-4 py-lg-5">
          <Switch>
            <Route path="/" component={DashboardPage} />
            <Route path="/applications" component={ApplicationsPage} />
            <Route path="/applications/new" component={ApplicationFormPage} />
            <Route path="/applications/:id/edit">
              {(params) => <ApplicationFormPage applicationId={params.id} />}
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </ApplicationDataLoader>
  );
}
