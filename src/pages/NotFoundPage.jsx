import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="page">
      <h2>Page Not Found</h2>
      <p className="helper-text">The route does not exist.</p>
      <Link className="button link-style" to="/orders">
        Go to Orders
      </Link>
    </section>
  );
}

export default NotFoundPage;
