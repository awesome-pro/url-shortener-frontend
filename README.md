# URL Shortener Frontend
## [🔗 ShortUrl - Live Demo](https://shortenurl.abhinandan.pro)
## [🔗 Backend Swagger UI Docs](https://shorturl.abhinandan.pro/docs)
## [🔗 Backend App](https://shorturl.abhinandan.pro/health)
<img width="320" height="180" alt="Screenshot 2025-09-11 at 8 04 51 AM" src="https://github.com/user-attachments/assets/f8515f0e-52bc-4e61-a776-bb7e165479b7" />
<img width="320" height="180" alt="Screenshot 2025-09-11 at 8 05 04 AM" src="https://github.com/user-attachments/assets/2504f0d2-1889-436a-9ad5-60bdbd39dfe7" />
<img width="320" height="180" alt="Screenshot 2025-09-11 at 8 05 22 AM" src="https://github.com/user-attachments/assets/91051f69-0339-4ccb-93bf-a301f2428a7d" />
<img width="320" height="180" alt="Screenshot 2025-09-11 at 8 05 58 AM" src="https://github.com/user-attachments/assets/1effcf7d-e041-4b34-be4e-37206f27180a" />
<img width="320" height="180" alt="Screenshot 2025-09-11 at 8 06 25 AM" src="https://github.com/user-attachments/assets/e0867153-ebad-42af-a2a5-938c5227b52d" />
<img width="320" height="180" alt="Screenshot 2025-09-11 at 8 06 04 AM" src="https://github.com/user-attachments/assets/72a2a7df-2797-443f-99f4-512ea7d21558" />


A modern, responsive frontend for the URL shortener application built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## Features

- 🔐 **JWT Authentication** - Secure login/register with automatic token management
- 🎨 **Modern UI** - Built with Tailwind CSS 4 and shadcn/ui components
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 📊 **Analytics Dashboard** - Comprehensive charts and metrics with Recharts
- 🔗 **URL Management** - Create, edit, delete, and organize short URLs
- 📈 **Real-time Analytics** - Track clicks, referrers, and geographic data
- 🚀 **Performance Optimized** - Built with Next.js 15 and React 19
- 🌙 **Dark Mode Ready** - Full dark mode support (when enabled)
- 🔄 **Auto-sync** - Real-time updates with the backend API

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: React 19 with latest features
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form with validation
- **HTTP Client**: Axios with interceptors
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Backend API running on `http://localhost:8000`

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Install shadcn/ui components** (if needed)
   ```bash
   # Install individual components as needed
   pnpm dlx shadcn@latest add button
   pnpm dlx shadcn@latest add card
   pnpm dlx shadcn@latest add input
   # ... etc
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# App Configuration  
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── urls/              # URL management pages
│   ├── profile/           # User profile page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── api.ts             # Axios client setup
│   ├── auth-api.ts        # Auth API functions
│   ├── url-api.ts         # URL API functions
│   └── utils.ts           # Utility functions
├── store/                 # Zustand stores
├── types/                 # TypeScript type definitions
└── middleware.ts          # Next.js middleware
```

## Key Features

### Authentication System
- **JWT Token Management**: Automatic token storage in cookies
- **Route Protection**: Middleware-based route protection
- **Auto-redirect**: Smart redirects based on auth state
- **Persistent Sessions**: Login state persisted across browser sessions

### URL Management
- **Create URLs**: Form-based URL creation with validation
- **Custom Codes**: Support for custom short codes
- **Bulk Operations**: Manage multiple URLs efficiently
- **Search & Filter**: Find URLs quickly with search functionality

### Analytics Dashboard
- **Real-time Stats**: Live click tracking and metrics
- **Visual Charts**: Interactive charts with Recharts
- **Geographic Data**: Track clicks by location
- **Referrer Analysis**: See where clicks are coming from
- **Time-based Analytics**: Daily, weekly, monthly breakdowns

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop Enhanced**: Rich desktop interface
- **Touch-friendly**: Optimized for touch interactions

## API Integration

The frontend integrates seamlessly with the FastAPI backend:

### Authentication Flow
1. User registers/logs in
2. JWT token stored in secure cookie
3. Token automatically sent with API requests
4. Auto-refresh and logout on token expiry

### URL Operations
- Create short URLs with optional customization
- Real-time analytics and click tracking
- Bulk URL management operations
- Export/import functionality (future)

### Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Automatic retry mechanisms
- Offline support (future)

## Development

### Code Style
```bash
# Format code (if using Prettier)
pnpm format

# Lint code (if using ESLint)
pnpm lint

# Type check
pnpm type-check
```

### Building for Production
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start application
CMD ["pnpm", "start"]
```

## Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized images
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: Aggressive caching strategies
- **Prefetching**: Smart prefetching of critical resources

## Security Features

- **CSRF Protection**: Built-in CSRF protection
- **XSS Prevention**: Sanitized inputs and outputs
- **Secure Cookies**: HttpOnly, Secure, SameSite cookies
- **Content Security Policy**: Configurable CSP headers
- **Route Protection**: Middleware-based route protection

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
pnpm dlx vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Other Platforms
- **Netlify**: Full support with build configuration
- **Railway**: One-click deployment
- **Docker**: Container-ready with provided Dockerfile

## Contributing

1. Follow the existing code style
2. Write TypeScript with proper types
3. Add proper error handling
4. Test on multiple devices/browsers
5. Update documentation as needed

## License

MIT License
