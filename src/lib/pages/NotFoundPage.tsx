import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5" aria-labelledby="not-found-title">
      <h1 id="not-found-title">Page not found</h1>
      <p className="text-(--text-muted)">The page you requested does not exist.</p>
      <Link to="/" className="font-bold text-(--text) no-underline transition hover:text-(--accent)">
        Return to home
      </Link>
    </section>
  );
};

export default NotFoundPage;
