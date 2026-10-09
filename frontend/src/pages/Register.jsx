
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: fullName.trim(),
            email: email.trim(),
            password,
            company_name: companyName.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        setMessage(data.message || "Registration failed.");
        setMessageType("error");
        return;
      }

      sessionStorage.setItem(
        "otpEmail",
        data.email || email.trim()
      );

      sessionStorage.removeItem("otpUserId");
      sessionStorage.removeItem("developmentOtp");

      setMessage(
        "Registration successful! OTP has been sent to your email."
      );
      setMessageType("success");

      setTimeout(() => {
        navigate("/verify-otp");
      }, 800);
    } catch (error) {
      console.error("Registration error:", error);

      setMessage("Unable to connect to the server. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-background" aria-hidden="true">
        <div className="register-grid" />
        <div className="register-glow register-glow-one" />
        <div className="register-glow register-glow-two" />
      </div>

      <div className="register-layout">
        <section className="register-intro">
          <button
            type="button"
            className="register-brand"
            onClick={() => navigate("/")}
            aria-label="Return to MARITIMEIQ home"
          >
            <span className="register-brand-icon" aria-hidden="true">
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

            <span className="register-brand-copy">
              <span className="register-brand-name">
                MARITIME<span>IQ</span>
              </span>
              <span className="register-brand-subtitle">
                GLOBAL FREIGHT INTELLIGENCE
              </span>
            </span>
          </button>

          <div className="register-intro-content">
            <span className="register-eyebrow">
              <span />
              YOUR NEXT MOVE STARTS HERE
            </span>

            <h1>
              A smarter way
              <br />
              to <span>ship globally.</span>
            </h1>

            <p>
              Create your customer account to explore intelligent
              freight quotations, compare shipping routes, and
              bring greater clarity to your logistics.
            </p>

            <div className="register-feature-list">
              <div className="register-feature">
                <span className="register-feature-icon">01</span>
                <span>
                  <strong>Intelligent routing</strong>
                  <small>Explore suitable shipping options.</small>
                </span>
              </div>

              <div className="register-feature">
                <span className="register-feature-icon">02</span>
                <span>
                  <strong>Freight insights</strong>
                  <small>Make more informed cost decisions.</small>
                </span>
              </div>

              <div className="register-feature">
                <span className="register-feature-icon">03</span>
                <span>
                  <strong>Connected operations</strong>
                  <small>Keep your freight workflow organized.</small>
                </span>
              </div>
            </div>
          </div>

          <div className="register-intro-footer">
            AI-POWERED MARITIME BROKERAGE
          </div>
        </section>

        <section className="register-form-section">
          <div className="register-card">
            <div className="register-heading">
              <span className="register-section-label">
                CUSTOMER REGISTRATION
              </span>
              <h2>Create your account</h2>
              <p>Enter your details to get started.</p>
            </div>

            <form onSubmit={handleRegister} autoComplete="on">
              <div className="register-field">
                <label htmlFor="register-name">Full name *</label>
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="register-email">Email address *</label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="register-company">
                  Company name <span>(Optional)</span>
                </label>
                <input
                  id="register-company"
                  type="text"
                  name="company_name"
                  placeholder="Your company or organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  autoComplete="organization"
                />
              </div>

              <div className="register-field">
                <label htmlFor="register-password">Password *</label>
                <div className="register-password-wrap">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-confirm-password">
                  Confirm password *
                </label>
                <div className="register-password-wrap">
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {message && (
                <div
                  className={`register-message ${messageType}`}
                  role="status"
                  aria-live="polite"
                >
                  <span className="register-message-dot" />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                className="register-submit"
                disabled={loading}
              >
                <span>
                  {loading ? "Creating account..." : "Create customer account"}
                </span>
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <div className="register-divider">
              <span />
              <span>ALREADY REGISTERED?</span>
              <span />
            </div>

            <button
              type="button"
              className="register-login-button"
              onClick={() => navigate("/login")}
            >
              Sign in to your account
            </button>

            <button
              type="button"
              className="register-back-button"
              onClick={() => navigate("/")}
            >
              <span aria-hidden="true">←</span> Back to home
            </button>

            <div className="register-security-note">
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
              Your account will require email verification.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
