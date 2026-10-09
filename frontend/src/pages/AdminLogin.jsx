import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!email.trim() || !password) {
      setMessage("Please enter admin email and password.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/auth/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        setMessage(data.message || "Invalid admin credentials.");
        setMessageType("error");
        return;
      }

      setMessage("Admin login successful! Redirecting...");
      setMessageType("success");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);
    } catch (error) {
      console.error("Admin login error:", error);
      setMessage(
        "Unable to connect to the server. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-container">
      <div className="admin-login-background-glow" />

      <section className="admin-login-card">
        <div className="admin-login-brand">
          <div className="admin-login-brand-mark">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 28L24 8L41 28"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 30C15 26 20 26 25 30C30 34 35 34 40 30"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M10 37C15 33 20 33 25 37C30 41 35 41 40 37"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="admin-login-brand-copy">
            <span className="admin-login-brand-name">MARITIMEIQ</span>
            <span className="admin-login-brand-subtitle">
              GLOBAL FREIGHT INTELLIGENCE
            </span>
          </div>
        </div>

        <div className="admin-login-divider" />

        <div className="admin-login-heading">
          <span className="admin-login-eyebrow">
            <span className="admin-login-status-dot" />
            SECURE ADMIN ACCESS
          </span>

          <h1>Welcome back.</h1>

          <p>
            Sign in to manage your maritime operations,
            monitor activity, and oversee freight intelligence.
          </p>
        </div>

        <form
          onSubmit={handleAdminLogin}
          autoComplete="on"
          className="admin-login-form"
        >
          <div className="admin-login-field">
            <label htmlFor="admin-email">Admin email</label>

            <input
              id="admin-email"
              type="email"
              name="email"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              disabled={loading}
              required
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">Password</label>

            <input
              id="admin-password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
              required
            />
          </div>

          {message && (
            <div
              className={`admin-login-message ${messageType}`}
              role="alert"
              aria-live="polite"
            >
              <span className="admin-login-message-icon">
                {messageType === "success" ? "✓" : "!"}
              </span>
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            className="admin-login-submit"
            disabled={loading}
          >
            <span>{loading ? "Authenticating..." : "Access dashboard"}</span>

            {!loading && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19M12 5L19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {loading && <span className="admin-login-spinner" />}
          </button>
        </form>

        <div className="admin-login-security-note">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="5"
              y="10"
              width="14"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M8 10V7A4 4 0 0116 7V10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span>Protected access for authorised administrators</span>
        </div>

        <div className="admin-login-footer">
          <span>Not an administrator?</span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="admin-login-customer-link"
          >
            Customer login
            <span aria-hidden="true"> ↗</span>
          </button>
        </div>
      </section>

      <div className="admin-login-bottom-note">
        <span>MARITIMEIQ</span>
        <span className="admin-login-bottom-separator">/</span>
        <span>AI-POWERED MARITIME BROKERAGE</span>
      </div>
    </main>
  );
}

export default AdminLogin;