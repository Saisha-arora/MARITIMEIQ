
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="welcome-page">
      <div className="welcome-background" aria-hidden="true">
        <div className="background-grid" />
        <div className="ocean-glow ocean-glow-one" />
        <div className="ocean-glow ocean-glow-two" />

        <div className="route-line route-one" />
        <div className="route-line route-two" />
        <div className="route-line route-three" />

        <div className="ocean-orb orb-one" />
        <div className="ocean-orb orb-two" />
      </div>

      <header className="welcome-header">
        <button
          className="brand"
          type="button"
          onClick={() => navigate("/")}
          aria-label="MARITIMEIQ home"
        >
          <span className="brand-mark" aria-hidden="true">
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

          <span className="brand-copy">
            <span className="brand-name">
              MARITIME<span>IQ</span>
            </span>
            <span className="brand-subtitle">
              GLOBAL FREIGHT INTELLIGENCE
            </span>
          </span>
        </button>

        <div className="header-status">
          <span className="status-dot" />
          AI-POWERED MARITIME BROKERAGE
        </div>
      </header>

      <section className="welcome-content">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            INTELLIGENCE ACROSS EVERY OCEAN
          </div>

          <h1>
            Navigate global trade.
            <br />
            <span>Price with precision.</span>
          </h1>

          <p className="hero-description">
            Smarter freight decisions start here. Discover optimized
            shipping routes, intelligent pricing, and a clearer view
            of your global logistics.
          </p>

          <div className="hero-highlights">
            <div className="highlight-item">
              <span className="highlight-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 17L9 11L13 15L21 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 6H21V12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <strong>Route intelligence</strong>
                <small>Make informed shipping decisions</small>
              </span>
            </div>

            <div className="highlight-divider" />

            <div className="highlight-item">
              <span className="highlight-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.8V21.2M17 7H9.5A3.5 3.5 0 0 0 9.5 14H14A3.5 3.5 0 0 1 14 21H6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>
                <strong>Pricing intelligence</strong>
                <small>Bring clarity to freight costs</small>
              </span>
            </div>
          </div>
        </div>

        <section className="access-section" aria-labelledby="access-title">
          <div className="access-heading">
            <span className="section-kicker">YOUR WORKSPACE</span>
            <h2 id="access-title">Welcome aboard.</h2>
            <p>Select your access portal to continue.</p>
          </div>

          <div className="login-options">
            <article className="login-card customer-card">
              <div className="card-topline">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="8"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M5 20V18.5A5.5 5.5 0 0 1 10.5 13H13.5A5.5 5.5 0 0 1 19 18.5V20"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <span className="card-label">CLIENT PORTAL</span>
              </div>

              <h3>Customer Login</h3>

              <p>
                Manage your shipments, explore freight quotations,
                and keep your cargo moving.
              </p>

              <button
                className="access-button"
                type="button"
                onClick={() => navigate("/login")}
              >
                <span>Access your account</span>
                <span className="button-arrow" aria-hidden="true">
                  →
                </span>
              </button>

              <div className="card-footer">
                <span className="mini-status" />
                For registered customers
              </div>
            </article>

            <article className="login-card admin-card">
              <div className="card-topline">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 3L20 6V11.5C20 16.2 16.8 19.5 12 21C7.2 19.5 4 16.2 4 11.5V6L12 3Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12L11 14L15.5 9.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span className="card-label">CONTROL CENTRE</span>
              </div>

              <h3>Admin Login</h3>

              <p>
                Access administrative tools and oversee platform
                operations through your authorized account.
              </p>

              <button
                className="access-button"
                type="button"
                onClick={() => navigate("/admin-login")}
              >
                <span>Access admin portal</span>
                <span className="button-arrow" aria-hidden="true">
                  →
                </span>
              </button>

              <div className="card-footer">
                <span className="mini-status" />
                Authorized personnel only
              </div>
            </article>
          </div>

          <div className="security-note">
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
              <circle cx="12" cy="15" r="1.2" fill="currentColor" />
            </svg>
            Secure access to your maritime workspace
          </div>
        </section>
      </section>

      <footer className="welcome-footer">
        <span>MARITIMEIQ <span className="footer-separator">/</span> GLOBAL FREIGHT INTELLIGENCE</span>
        <span className="footer-right">BUILT FOR A CONNECTED WORLD</span>
      </footer>
    </main>
  );
}

export default Welcome;
