import { useState } from "react";
import { loginUser, registerUser } from "../../services/authApi";
import "./AuthPanel.css";

function AuthPanel({ onClose, onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      let response;

      if (mode === "register") {
        await registerUser({ fullName, email, password });
        response = await loginUser({ email, password });
      } else {
        response = await loginUser({ email, password });
      }

      onAuthenticated(response.data, response.token);
      onClose();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setMessage("");
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <section
        className="auth-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="auth-header">
          <div>
            <p className="auth-eyebrow">SmartShop AI</p>
            <h2 id="auth-title">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h2>
          </div>

          <button
            type="button"
            className="auth-close-button"
            onClick={onClose}
            aria-label="Close authentication panel"
          >
            ×
          </button>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={
              mode === "login" ? "auth-tab auth-tab--active" : "auth-tab"
            }
            onClick={() => changeMode("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={
              mode === "register" ? "auth-tab auth-tab--active" : "auth-tab"
            }
            onClick={() => changeMode("register")}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              minLength={8}
              required
            />
          </label>

          {message && (
            <p className="auth-message" role="alert">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit-button"
            disabled={submitting}
          >
            {submitting
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default AuthPanel;