import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyOTP.css";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isExpired, setIsExpired] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();
  const email = sessionStorage.getItem("otpEmail");

  useEffect(() => {
    if (!email || isVerified || isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, isVerified, isExpired]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Your registration session has expired. Please register again.");
      setMessageType("error");
      return;
    }

    if (otp.length !== 6) {
      setMessage("Enter the complete 6-digit OTP sent to your email.");
      setMessageType("error");
      return;
    }

    if (isVerifying || isVerified || isExpired) return;

    try {
      setIsVerifying(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        setMessage(data.message || "OTP verification failed.");
        setMessageType("error");

        if (
          data.message &&
          data.message.toLowerCase().includes("expired")
        ) {
          setIsExpired(true);
          setTimeLeft(0);
        }

        return;
      }

      setIsVerified(true);
      setIsExpired(false);
      setTimeLeft(0);
      setMessage("Email verified successfully. Redirecting to login...");
      setMessageType("success");

      sessionStorage.removeItem("otpEmail");
      sessionStorage.removeItem("otpUserId");
      sessionStorage.removeItem("developmentOtp");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (error) {
      console.error("OTP verification error:", error);
      setMessage("Unable to connect to the server. Please try again.");
      setMessageType("error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setMessage("");

    if (!email) {
      setMessage("Your registration session has expired. Please register again.");
      setMessageType("error");
      return;
    }

    if (isResending || isVerified) return;

    try {
      setIsResending(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        setMessage(data.message || "Unable to resend OTP.");
        setMessageType("error");
        return;
      }

      setOtp("");
      setTimeLeft(300);
      setIsExpired(false);
      setMessage("A new verification code has been sent to your email.");
      setMessageType("success");
    } catch (error) {
      console.error("Resend OTP error:", error);
      setMessage("Unable to connect to the server. Please try again.");
      setMessageType("error");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="otp-container">
      <div className="otp-background-glow otp-glow-one" />
      <div className="otp-background-glow otp-glow-two" />

      <section className="otp-card">
        <div className="otp-brand">
          <div className="otp-brand-mark">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M11 23H29L25 28H15L11 23Z"
                fill="currentColor"
              />
              <path
                d="M20 10V21M20 14L13 18M20 14L27 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <div className="otp-brand-name">MARITIME<span>IQ</span></div>
            <div className="otp-brand-tagline">GLOBAL FREIGHT INTELLIGENCE</div>
          </div>
        </div>

        <div className="otp-icon-wrap">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="7"
              y="13"
              width="34"
              height="25"
              rx="5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M9 16L24 28L39 16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="36" cy="12" r="8" fill="#0D1B2A" />
            <path
              d="M32.5 12L35 14.5L39.5 9.5"
              stroke="#42D9E8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="otp-heading">
          <span className="otp-eyebrow">ACCOUNT SECURITY</span>
          <h1>Verify your email</h1>
          <p>
            Confirm your email address to activate your MaritimeIQ account.
          </p>
        </div>

        {email ? (
          <div className="otp-email-box">
            <span className="otp-email-label">VERIFICATION EMAIL</span>
            <span className="otp-email-address">{email}</span>
          </div>
        ) : (
          <div className="otp-message error" role="alert">
            Your registration session has expired. Please register again.
          </div>
        )}

        {!isVerified && email && (
          <div className={`otp-timer ${isExpired ? "expired" : ""}`}>
            <span className="otp-timer-dot" />
            <span>
              {isExpired ? (
                "Verification code expired"
              ) : (
                <>
                  Code expires in{" "}
                  <strong>{formatTime(timeLeft)}</strong>
                </>
              )}
            </span>
          </div>
        )}

        <form className="otp-form" onSubmit={handleVerifyOTP}>
          {!isVerified && (
            <>
              <label htmlFor="otp-code">6-digit verification code</label>
              <input
                id="otp-code"
                className="otp-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                value={otp}
                maxLength={6}
                disabled={isVerifying || isExpired || !email}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                }}
                aria-describedby="otp-help"
              />
              <p className="otp-help" id="otp-help">
                Enter the code sent to your registered email address.
              </p>
            </>
          )}

          {message && (
            <div
              className={`otp-message ${messageType}`}
              role={messageType === "error" ? "alert" : "status"}
            >
              <span className="otp-message-indicator">
                {messageType === "success" ? "✓" : "!"}
              </span>
              {message}
            </div>
          )}

          {!isExpired && !isVerified && (
            <button
              className="otp-primary-button"
              type="submit"
              disabled={otp.length !== 6 || isVerifying || !email}
            >
              {isVerifying ? (
                <>
                  <span className="otp-spinner" />
                  Verifying code...
                </>
              ) : (
                <>
                  Verify email
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          )}

          {isExpired && !isVerified && email && (
            <button
              className="otp-primary-button"
              type="button"
              onClick={handleResendOTP}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <span className="otp-spinner" />
                  Sending new code...
                </>
              ) : (
                <>
                  Send a new code
                  <span aria-hidden="true">↻</span>
                </>
              )}
            </button>
          )}
        </form>

        {!isVerified && (
          <div className="otp-footer">
            <span>Already verified?</span>{" "}
            <button
              type="button"
              className="otp-login-link"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>
        )}

        <div className="otp-security-note">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 2.5L16 5V9.5C16 13.2 13.5 16 10 17.5C6.5 16 4 13.2 4 9.5V5L10 2.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 10L9.2 11.7L12.7 8.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Your account security is our priority.
        </div>

        <div className="otp-bottom-brand">
          AI-POWERED MARITIME BROKERAGE
        </div>
      </section>
    </main>
  );
}

export default VerifyOTP;
