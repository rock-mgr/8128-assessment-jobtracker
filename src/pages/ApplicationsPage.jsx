import { useState } from 'react';
import { Link } from 'wouter';
import ApplicationCard from '../components/ApplicationCard.jsx';

export default function ApplicationsPage({ applications, setApplications }) {
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredApplications = applications.filter((application) => {
    const searchMatch = `${application.company} ${application.jobTitle}`
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const statusMatch = selectedStatus === 'All' || application.status === selectedStatus;
    return searchMatch && statusMatch;
  });

  function handleDelete(applicationId) {
    const confirmed = window.confirm('Delete this job application?');
    if (confirmed) {
      setApplications(applications.filter((application) => application.id !== applicationId));
    }
  }

  return (
    <>
      <section className="page-intro d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <p className="eyebrow mb-2">APPLICATIONS</p>
          <h1 className="display-title mb-2">Your applications</h1>
          <p className="text-secondary mb-0">Search and update the roles you’re pursuing.</p>
        </div>
        <Link href="/applications/new" className="btn btn-primary px-4 py-2">Add an application</Link>
      </section>

      <section className="filter-panel card border-0 p-3 p-md-4 mb-4" aria-label="Application filters">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-8">
            <label className="form-label" htmlFor="searchText">Search by company or role</label>
            <input
              id="searchText"
              className="form-control"
              type="search"
              placeholder="e.g. Northstar or QA Engineer"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label" htmlFor="statusFilter">Filter by status</label>
            <select
              id="statusFilter"
              className="form-select"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              <option>All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      </section>

      {filteredApplications.length === 0 ? (
        <div className="empty-state card border-0 p-5 text-center">
          <h2 className="h5">No matching applications</h2>
          <p className="text-secondary mb-0">Try another search or status filter.</p>
        </div>
      ) : (
        <div className="row g-3">
          {filteredApplications.map((application) => (
            <div className="col-12 col-md-6 col-xl-4" key={application.id}>
              <ApplicationCard application={application} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
