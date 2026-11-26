import { useAtomValue } from 'jotai';
import { Link } from 'wouter';
import ApplicationCard from '../components/ApplicationCard.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import { applicationsAtom } from '../state/applicationsAtom.js';

export default function DashboardPage() {
  const applications = useAtomValue(applicationsAtom);
  const activeCount = applications.filter((application) =>
    ['Applied', 'Interview'].includes(application.status),
  ).length;
  const interviewCount = applications.filter((application) => application.status === 'Interview').length;
  const offerCount = applications.filter((application) => application.status === 'Offer').length;
  const latestApplications = [...applications]
    .sort((first, second) => second.dateApplied.localeCompare(first.dateApplied))
    .slice(0, 3);

  return (
    <>
      <section className="page-intro d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <p className="eyebrow mb-2">YOUR JOB SEARCH</p>
          <h1 className="display-title mb-2">Keep your next move in view.</h1>
          <p className="text-secondary mb-0">A simple place to organise your applications and follow-ups.</p>
        </div>
        <Link href="/applications/new" className="btn btn-primary px-4 py-2">Add an application</Link>
      </section>

      <section className="row g-3 mb-5" aria-label="Application summary">
        <div className="col-12 col-sm-6 col-xl-4">
          <SummaryCard label="Active applications" value={activeCount} note="Applied or in interview" tone="blue" />
        </div>
        <div className="col-12 col-sm-6 col-xl-4">
          <SummaryCard label="Interviews" value={interviewCount} note="Conversations in progress" tone="violet" />
        </div>
        <div className="col-12 col-sm-6 col-xl-4">
          <SummaryCard label="Offers" value={offerCount} note="Offers received" tone="green" />
        </div>
      </section>

      <section>
        <div className="section-heading d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="eyebrow mb-1">RECENT ACTIVITY</p>
            <h2 className="h4 mb-0">Recent applications</h2>
          </div>
          <Link href="/applications" className="text-decoration-none">View all <span aria-hidden="true">→</span></Link>
        </div>
        {latestApplications.length === 0 ? (
          <div className="empty-state card border-0 p-4 text-center">No applications yet. Add your first one to get started.</div>
        ) : (
          <div className="row g-3">
            {latestApplications.map((application) => (
              <div className="col-12 col-lg-4" key={application.id}>
                <ApplicationCard application={application} onDelete={() => {}} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
