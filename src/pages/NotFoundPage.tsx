import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="grid gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5" aria-labelledby="not-found-title">
      <h1 id="not-found-title">Page not found</h1>
      <p className="text-[var(--text-muted)]">The page you requested does not exist.</p>
      <Link to="/" className="font-bold text-[var(--text)] no-underline transition hover:text-[var(--accent)]">
        Return to home
      </Link>
    </section>
  );
}
