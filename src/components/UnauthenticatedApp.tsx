import { useSubscribeDev } from '@subscribe.dev/react';

export function UnauthenticatedApp() {
  const { signIn } = useSubscribeDev();

  return (
    <div className="app-container">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-icon">🐹</div>
          <h1 className="auth-title">AI Hamster Video Generator</h1>
          <p className="auth-description">
            Create amazing AI-generated hamster videos with just a text prompt.
            Powered by state-of-the-art video generation models.
          </p>

          <div className="auth-features">
            <div className="feature">
              <span className="feature-icon">🎬</span>
              <span className="feature-text">Generate custom hamster videos</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Fast AI-powered generation</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💾</span>
              <span className="feature-text">Cloud-synced video history</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📱</span>
              <span className="feature-text">Download and share videos</span>
            </div>
          </div>

          <button onClick={signIn} className="btn btn-primary btn-large auth-button">
            Sign In to Get Started
          </button>

          <p className="auth-footer">
            New user? Sign in will create your account automatically
          </p>
        </div>
      </div>
    </div>
  );
}