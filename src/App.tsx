import { SubscribeDevProvider, useSubscribeDev } from '@subscribe.dev/react';
import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';
import './App.css';

function AppContent() {
  const { isSignedIn } = useSubscribeDev();

  return isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function App() {
  // Using demo mode (no token required)
  // For production, use: projectToken={import.meta.env.VITE_SUBSCRIBE_DEV_PROJECT_TOKEN}
  return (
    <SubscribeDevProvider>
      <AppContent />
    </SubscribeDevProvider>
  );
}

export default App;