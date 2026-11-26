import { Link } from 'wouter';
import StatusBadge from './StatusBadge.jsx';

export default function ApplicationCard({ application, onDelete }) {
  return (
    <article className="application-card card border-0 h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <p className="company-name mb-1">{application.company}</p>
            <h3 className="h5 mb-2">{application.jobTitle}</h3>
          </div>
          <StatusBadge status={application.status} />
        </div>
        <div className="application-meta mt-3">
          <p className="mb-1"><span className="meta-label">Location</span> {application.location || 'Not specified'}</p>
          <p className="mb-0"><span className="meta-label">Applied</span> {application.dateApplied}</p>
        </div>
        {application.notes && <p className="application-note mt-3 mb-0">{application.notes}</p>}
        <div className="d-flex gap-2 mt-4">
          <Link href={`/applications/${application.id}/edit`} className="btn btn-outline-primary btn-sm">
            Edit
          </Link>
          {onDelete && (
            <button className="btn btn-outline-secondary btn-sm" onClick={() => onDelete(application.id)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
