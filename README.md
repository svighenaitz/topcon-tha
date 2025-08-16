# Topcon THA - Production Ready

A React-based profile matching application with a Node.js backend API.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Start backend server (in another terminal)
cd server && bun start
```

### Production Deployment

#### Option 1: Docker Compose (Recommended)
```bash
# Production deployment
bun run docker:compose:up

# Development with Docker
bun run docker:compose:dev
```

#### Option 2: Manual Deployment
```bash
# Build for production
bun run build:prod

# Start production server
bun run start:prod
```

#### Option 3: Docker Only
```bash
# Build Docker image
bun run docker:build

# Run container
bun run docker:run
```

## 🌍 Environment Configuration

Copy the example environment file and configure for your environment:

```bash
cp env.example .env
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3001` |
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Backend server port | `3001` |

### Environment-Specific Builds

```bash
# Development build
bun run build

# Staging build
bun run build:staging

# Production build
bun run build:prod
```

## 🐳 Docker Deployment

### Production
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build individual images
docker build -t topcon-tha .
docker build -t topcon-tha-api ./server
```

### Development
```bash
# Run with development profile
docker-compose --profile dev up -d
```

## 📋 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for development
- `bun run build:prod` - Build for production
- `bun run build:staging` - Build for staging
- `bun run preview` - Preview production build
- `bun run test` - Run tests
- `bun run test:e2e` - Run end-to-end tests
- `bun run docker:compose:up` - Start production with Docker Compose
- `bun run docker:compose:dev` - Start development with Docker Compose

## 🔧 Production Checklist

- [x] Environment-specific configurations
- [x] Docker containerization
- [x] Health checks
- [x] Production build optimizations
- [x] Security considerations (non-root user)
- [x] Environment variable validation
- [x] Deployment scripts
- [x] Source maps for debugging (staging)

## 🏗️ Architecture

- **Frontend**: React + Vite + TypeScript + Material-UI
- **Backend**: Node.js + Express
- **Containerization**: Docker + Docker Compose
- **Testing**: Vitest + Playwright
- **Package Manager**: Bun

## 📦 Deployment to Different Environments

### Staging
```bash
NODE_ENV=staging VITE_API_BASE_URL=https://staging-api.example.com bun run build:staging
```

### Production
```bash
NODE_ENV=production VITE_API_BASE_URL=https://api.example.com bun run build:prod
```

### Using Deployment Script
```bash
VITE_API_BASE_URL=https://api.example.com VERSION=1.0.0 ./scripts/deploy.sh
```
