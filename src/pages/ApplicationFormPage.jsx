import { useState } from 'react';
import { useAtom } from 'jotai';
import { Link, useLocation } from 'wouter';
import { applicationsAtom } from '../state/applicationsAtom.js';

const blankApplication = {
  company: '',
  jobTitle: '',
  status: 'Applied',
  dateApplied: new Date().toISOString().slice(0, 10),
  location: '',
  notes: '',
};

export default function ApplicationFormPage({ applicationId }) {
  const [applications, setApplications] = useAtom(applicationsAtom);
  const [, setLocation] = useLocation();
  const existingApplication = applications.find((application) => application.id === applicationId);
  const isEditing = Boolean(applicationId);
  const [formValues, setFormValues] = useState(existingApplication || blankApplication);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isEditing) {
      const updatedApplications = applications.map((application) =>
        application.id === applicationId ? { ...formValues, id: applicationId } : application,
      );
      setApplications(updatedApplications);
    } else {
      const newApplication = { ...formValues, id: `app-${Date.now()}` };
      setApplications([...applications, newApplication]);
    }

    setLocation('/applications');
  }

  if (isEditing && !existingApplication) {
    return (
      <div className="empty-state card border-0 p-5 text-center">
        <h1 className="h4">Application not found</h1>
        <Link href="/applications">Return to applications</Link>
      </div>
    );
  }

  return (
    <section className="form-page mx-auto">
      <p className="eyebrow mb-2">{isEditing ? 'UPDATE DETAILS' : 'NEW APPLICATION'}</p>
      <h1 className="display-title mb-2">{isEditing ? 'Edit application' : 'Add an application'}</h1>
      <p className="text-secondary mb-4">Keep the key details together so you can follow up with confidence.</p>

      <form className="form-panel card border-0 p-3 p-md-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="company">Company name <span className="text-danger">*</span></label>
            <input id="company" name="company" className="form-control" value={formValues.company} onChange={handleChange} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="jobTitle">Job title <span className="text-danger">*</span></label>
            <input id="jobTitle" name="jobTitle" className="form-control" value={formValues.jobTitle} onChange={handleChange} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="status">Status</label>
            <select id="status" name="status" className="form-select" value={formValues.status} onChange={handleChange}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="dateApplied">Date applied</label>
            <input id="dateApplied" name="dateApplied" className="form-control" type="date" value={formValues.dateApplied} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="location">Location</label>
            <input id="location" name="location" className="form-control" value={formValues.location} onChange={handleChange} placeholder="e.g. Singapore or Remote" />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" className="form-control" rows="4" value={formValues.notes} onChange={handleChange} placeholder="Interview date, contact person, or follow-up reminder" />
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link href="/applications" className="btn btn-light px-4">Cancel</Link>
          <button className="btn btn-primary px-4" type="submit">{isEditing ? 'Save changes' : 'Add application'}</button>
        </div>
      </form>
    </section>
  );
}
