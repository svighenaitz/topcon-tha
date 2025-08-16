#!/bin/bash

# Production deployment script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting production deployment...${NC}"

# Check if environment variables are set
if [ -z "$VITE_API_BASE_URL" ]; then
    echo -e "${RED}❌ VITE_API_BASE_URL environment variable is required${NC}"
    exit 1
fi

# Build the application
echo -e "${YELLOW}📦 Building application...${NC}"
bun run build:prod

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
bun run test

# Build Docker image
echo -e "${YELLOW}🐳 Building Docker image...${NC}"
docker build -t topcon-tha:latest .

# Tag with version if provided
if [ ! -z "$VERSION" ]; then
    docker tag topcon-tha:latest topcon-tha:$VERSION
    echo -e "${GREEN}✅ Tagged image with version: $VERSION${NC}"
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "   - Push Docker image to registry: docker push topcon-tha:latest"
echo -e "   - Deploy to your infrastructure"
echo -e "   - Run health checks"
