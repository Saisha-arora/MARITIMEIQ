
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter email and password.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/auth/login",
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
        setMessage(data.message || "Invalid email or password.");
        setMessageType("error");
        return;
      }

      const meResponse = await fetch(
        "http://localhost:8000/api/auth/me",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const meData = await meResponse.json();

      if (!meResponse.ok || !meData.success) {
        setMessage(
          "Login succeeded, but the authentication session could not be established."
        );
        setMessageType("error");
        return;
      }

      setMessage("Login successful! Redirecting...");
      setMessageType("success");

      setTimeout(() => {
        navigate("/user-dashboard", { replace: true });
      }, 700);
    } catch (error) {
      console.error("Login error:", error);

      setMessage("Unable to connect to the server. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-background" aria-hidden="true">
        <div className="login-grid" />
        <div className="login-glow login-glow-one" />
        <div className="login-glow login-glow-two" />
      </div>

      <div className="login-layout">
        <section className="login-intro">
          <button
            type="button"
            className="login-brand"
            onClick={() => navigate("/")}
            aria-label="Return to MARITIMEIQ home"
          >
            <span className="login-brand-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M7 29L12 37H36L41 29"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 27H37L32 34H16L11 27Z"
                  fill="currentColor"
                  fillOpacity=".2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 23V14H25V23M27 23V10H34V23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 41C10 38 14 44 18 41C22 38 26 44 30 41C34 38 38 44 42 41"
                  stroke="#43D5E8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span className="login-brand-copy">
              <span className="login-brand-name">
                MARITIME<span>IQ</span>
              </span>
              <span className="login-brand-subtitle">
                GLOBAL FREIGHT INTELLIGENCE
              </span>
            </span>
          </button>

          <div className="login-intro-content">
            <span className="login-eyebrow">
              <span />
              YOUR GLOBAL TRADE WORKSPACE
            </span>

            <h1>
              Welcome
              <br />
              <span>back aboard.</span>
            </h1>

            <p>
              Your maritime operations, freight insights, and
              shipping decisions — all in one place.
            </p>

            <div className="login-trust-list">
              <div className="login-trust-item">
                <span className="trust-check">✓</span>
                Intelligent freight quotations
              </div>
              <div className="login-trust-item">
                <span className="trust-check">✓</span>
                Optimized shipping routes
              </div>
              <div className="login-trust-item">
                <span className="trust-check">✓</span>
                One connected workspace
              </div>
            </div>
          </div>

          <div className="login-intro-footer">
            AI-POWERED MARITIME BROKERAGE
          </div>
        </section>

        <section className="login-form-section">
          <div className="login-card">
            <div className="login-card-heading">
              <span className="login-section-label">CUSTOMER PORTAL</span>
              <h2>Sign in to your account</h2>
              <p>Enter your credentials to continue.</p>
            </div>

            <form onSubmit={handleLogin} autoComplete="on">
              <div className="login-field">
                <label htmlFor="customer-email">Email address</label>
                <input
                  id="customer-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                  autoFocus
                />
              </div>

              <div className="login-field">
                <div className="login-label-row">
                  <label htmlFor="customer-password">Password</label>
                </div>

                <div className="password-input-wrap">
                  <input
                    id="customer-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {message && (
                <div
                  className={`login-message ${messageType}`}
                  role="status"
                  aria-live="polite"
                >
                  <span className="message-indicator" />
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                <span>{loading ? "Signing in..." : "Sign in to MARITIMEIQ"}</span>
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <div className="login-divider">
              <span />
              <span>NEW TO MARITIMEIQ?</span>
              <span />
            </div>

            <p className="login-register-prompt">
              Create an account to get started.
            </p>

            <button
              type="button"
              className="login-register-button"
              onClick={() => navigate("/register")}
            >
              Create customer account
            </button>

            <button
              type="button"
              className="login-back-button"
              onClick={() => navigate("/")}
            >
              <span aria-hidden="true">←</span> Back to home
            </button>

            <div className="login-security-note">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                  d="M8 10V7A4 4 0 0 1 16 7V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Secure authentication
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
