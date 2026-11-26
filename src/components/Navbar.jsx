import { Link } from 'wouter';

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="container navbar navbar-expand navbar-light py-3">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
          <span className="brand-mark">J</span>
          <span className="brand-name">JobTrack</span>
        </Link>
        <div className="navbar-nav ms-auto flex-row gap-2 gap-sm-3 align-items-center">
          <Link href="/" className="nav-link">Dashboard</Link>
          <Link href="/applications" className="nav-link">Applications</Link>
          <Link href="/applications/new" className="btn btn-primary btn-sm px-3">
            <span aria-hidden="true">+</span> <span className="d-none d-sm-inline">Add application</span>
            <span className="d-sm-none">Add</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
