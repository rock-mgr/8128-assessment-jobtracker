import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Switch } from 'wouter';
import Navbar from './components/Navbar.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ApplicationsPage from './pages/ApplicationsPage.jsx';
import ApplicationFormPage from './pages/ApplicationFormPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get('/data/applications.json')
      .then((response) => {
        setApplications(response.data);
      })
      .catch(() => {
        setErrorMessage('The sample applications could not be loaded.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setApplications]);

  if (isLoading) {
    return <main className="container py-5">Loading applications…</main>;
  }

  if (errorMessage) {
    return <main className="container py-5 alert alert-danger">{errorMessage}</main>;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="container app-main py-4 py-lg-5">
        <Switch>
          <Route path="/">
            {() => <DashboardPage applications={applications} />}
          </Route>
          <Route path="/applications">
            {() => (
              <ApplicationsPage
                applications={applications}
                setApplications={setApplications}
              />
            )}
          </Route>
          <Route path="/applications/new">
            {() => (
              <ApplicationFormPage
                applications={applications}
                setApplications={setApplications}
              />
            )}
          </Route>
          <Route path="/applications/:id/edit">
            {(params) => (
              <ApplicationFormPage
                applicationId={params.id}
                applications={applications}
                setApplications={setApplications}
              />
            )}
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  );
}
