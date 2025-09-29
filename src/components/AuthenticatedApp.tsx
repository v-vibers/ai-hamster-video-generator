import { useState } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';

interface VideoGenerationState {
  videoUrl: string | null;
  prompt: string;
  lastGeneratedAt?: number;
}

export function AuthenticatedApp() {
  const {
    client,
    usage,
    subscribe,
    subscriptionStatus,
    useStorage,
    signOut,
    user,
  } = useSubscribeDev();

  const [state, setState, syncStatus] = useStorage!<VideoGenerationState>(
    'hamster-videos',
    {
      videoUrl: null,
      prompt: '',
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState(state.prompt);

  const handleGenerateVideo = async () => {
    if (!client || !currentPrompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Generate AI video using the wan-video model
      const response = await client.run('wan-video/wan-2.2-5b-fast', {
        input: {
          prompt: currentPrompt,
          aspect_ratio: '16:9',
        },
      });

      const [videoUrl] = response.output;

      setState({
        videoUrl: videoUrl as string,
        prompt: currentPrompt,
        lastGeneratedAt: Date.now(),
      });
    } catch (err: any) {
      console.error('Video generation failed:', err);

      if (err.type === 'insufficient_credits') {
        setError('Insufficient credits. Please upgrade your subscription to continue.');
      } else if (err.type === 'rate_limit_exceeded') {
        const retryMinutes = Math.ceil((err.retryAfter || 60000) / 60000);
        setError(`Rate limit exceeded. Please try again in ${retryMinutes} minute(s).`);
      } else {
        setError('Failed to generate video. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateVideo();
    }
  };

  const lastGeneratedDate = state.lastGeneratedAt
    ? new Date(state.lastGeneratedAt)
    : null;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🐹 AI Hamster Video Generator</h1>
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
            <button onClick={signOut} className="btn btn-secondary">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          <div className="status-bar">
            <div className="status-item">
              <span className="status-label">Plan:</span>
              <span className="status-value">
                {subscriptionStatus?.plan?.name ?? 'Free'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Credits:</span>
              <span className="status-value credits">
                {usage?.remainingCredits ?? 0}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Sync:</span>
              <span className={`status-value sync-${syncStatus}`}>
                {syncStatus}
              </span>
            </div>
            <button onClick={subscribe!} className="btn btn-primary btn-sm">
              Manage Subscription
            </button>
          </div>

          <div className="generator-section">
            <div className="input-section">
              <label htmlFor="prompt" className="input-label">
                Describe your hamster video:
              </label>
              <textarea
                id="prompt"
                className="prompt-input"
                placeholder="e.g., A cute hamster running on a wheel in slow motion, with sunlight streaming through a window"
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={4}
                disabled={loading}
              />
              <div className="input-actions">
                <button
                  onClick={handleGenerateVideo}
                  disabled={loading || !currentPrompt.trim()}
                  className="btn btn-primary btn-large"
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Generating...
                    </>
                  ) : (
                    'Generate Video'
                  )}
                </button>
                <p className="input-hint">
                  Press Enter to generate, Shift+Enter for new line
                </p>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
                {error.includes('Insufficient credits') && (
                  <button onClick={subscribe!} className="btn btn-link">
                    Upgrade Now
                  </button>
                )}
              </div>
            )}

            {state.videoUrl && (
              <div className="video-section">
                <div className="video-header">
                  <h2>Generated Video</h2>
                  {lastGeneratedDate && (
                    <span className="video-meta">
                      Generated: {lastGeneratedDate.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="video-container">
                  <video
                    key={state.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="video-player"
                  >
                    <source src={state.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="video-actions">
                  <a
                    href={state.videoUrl}
                    download="hamster-video.mp4"
                    className="btn btn-secondary"
                  >
                    Download Video
                  </a>
                </div>
                {state.prompt && (
                  <div className="video-prompt">
                    <strong>Prompt:</strong> {state.prompt}
                  </div>
                )}
              </div>
            )}

            {!state.videoUrl && !loading && (
              <div className="empty-state">
                <div className="empty-icon">🎬</div>
                <h3>No videos yet</h3>
                <p>Enter a prompt above to generate your first AI hamster video!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}