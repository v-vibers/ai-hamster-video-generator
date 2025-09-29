# 🐹 AI Hamster Video Generator

An AI-powered web application for generating custom hamster videos using text prompts. Built with React 18, TypeScript, Vite, and powered by Subscribe.dev's AI platform.

## Features

- 🎬 **AI Video Generation**: Create custom hamster videos from text descriptions
- 🔐 **Authentication**: Built-in sign-in flow with Subscribe.dev
- 💾 **Cloud Storage**: Automatically saves your video history across devices
- 📊 **Usage Tracking**: Monitor your AI credits and subscription status
- 📱 **Responsive Design**: Works beautifully on desktop and mobile
- ⚡ **Fast Performance**: Optimized with Vite and modern React patterns

## Tech Stack

- **React 18** - UI framework (required for Subscribe.dev compatibility)
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Subscribe.dev** - AI platform for video generation
- **CSS3** - Modern styling with CSS variables

## Prerequisites

- Node.js 16+ and npm (or Bun for faster builds)
- Modern web browser

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/v-vibers/ai-hamster-video-generator.git
   cd ai-hamster-video-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or with Bun (faster)
   bun install
   ```

3. **Environment setup**

   The app works in **demo mode** by default (no configuration needed).

   For production, create a `.env` file:
   ```bash
   VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=pub_your_actual_token_here
   ```

   Get your token from [Subscribe.dev Platform](https://platform.subscribe.dev)

## Getting Started

### Development Mode

```bash
npm install
npm run dev
# or
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
# or
bun run build
```

### Preview Production Build

```bash
npm run preview
# or
bun run preview
```

## How to Use

1. **Sign In**: Click "Sign In to Get Started" on the landing page
2. **Enter Prompt**: Describe the hamster video you want to generate
   - Example: "A cute hamster running on a wheel in slow motion"
3. **Generate**: Click "Generate Video" or press Enter
4. **Watch & Download**: View your generated video and download it
5. **Track Usage**: Monitor credits and subscription status in the header

## Project Structure

```
src/
├── components/
│   ├── AuthenticatedApp.tsx    # Main app UI (signed in)
│   └── UnauthenticatedApp.tsx  # Landing page (signed out)
├── App.tsx                      # Root component with provider
├── App.css                      # Main styles
├── index.css                    # Global styles
└── main.tsx                     # Entry point
```

## Architecture

The app follows Subscribe.dev's **component separation pattern** for React Hooks:

- `App.tsx` - Wraps app with `SubscribeDevProvider`
- `AuthenticatedApp.tsx` - Renders when user is signed in (uses `useStorage` hook)
- `UnauthenticatedApp.tsx` - Renders when user is signed out

This pattern ensures React Hooks rules are followed correctly and avoids conditional hook calls.

## Features Explained

### Video Generation
- Uses `wan-video/wan-2.2-5b-fast` AI model
- 16:9 aspect ratio for optimal viewing
- Generates videos from text prompts

### State Management
- Cloud-synced storage via `useStorage` hook
- Persists video URLs and prompts
- Tracks generation timestamps

### Error Handling
- Insufficient credits → upgrade prompt
- Rate limiting → retry timer
- Network errors → user-friendly messages

### UI/UX
- Loading states with spinners
- Empty states with helpful guidance
- Responsive design for all screen sizes
- Dark theme optimized for viewing videos

## Subscribe.dev Integration

This app uses Subscribe.dev's React SDK for:
- Authentication (sign in/out)
- AI model access (video generation)
- Usage tracking (credits monitoring)
- Cloud storage (video history)
- Subscription management (billing)

See [CLAUDE.md](./CLAUDE.md) for complete SDK documentation.

## Development Notes

### React Version
⚠️ **Must use React 18** - React 19+ is not compatible with Subscribe.dev

### Environment Variables
- Use `VITE_` prefix for Vite projects
- Access via `import.meta.env.VITE_*`
- Demo mode works without any token

### Component Patterns
- Separate components for auth states
- Never call hooks conditionally
- Use cloud storage for user data

## Troubleshooting

**App won't start?**
- Run `npm install` to ensure dependencies are installed
- Check that React 18 is installed: `npm list react`
- Clear node_modules and reinstall if needed

**Can't generate videos?**
- Sign in first (required for AI access)
- Check your credit balance
- Ensure prompt is not empty

**React Hook errors?**
- This usually means React 19 was installed
- Run: `npm uninstall react react-dom && npm install react@^18.2.0 react-dom@^18.2.0`

## Deployment

This project includes automated deployment via VGit workflows. Push to any branch to trigger a preview deployment.

## VGit Workflows

This repository includes the following VGit workflows:

- **Create Feature**: Implement new features using AI assistance
- **Ask Codebase**: Get AI-powered answers about your code
- **Merge Branch**: Safely merge branches with validation
- **Deploy Preview**: Automated preview deployments

## License

MIT

## Credits

- Built with [Subscribe.dev](https://subscribe.dev)
- Video generation powered by Wan Video AI
- Created for AI-powered content generation

---

*Generated with [VGit](https://vgit.app) 🤖*

**Happy generating!** 🐹🎬