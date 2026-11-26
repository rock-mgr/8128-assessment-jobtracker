import { Link } from 'wouter';

export default function NotFoundPage() {
  return (
    <div className="empty-state card border-0 p-5 text-center">
      <p className="eyebrow mb-2">PAGE NOT FOUND</p>
      <h1 className="h3">We can’t find that page.</h1>
      <Link href="/">Go to dashboard</Link>
    </div>
  );
}
