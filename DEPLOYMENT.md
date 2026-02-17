# Deployment & Hosting Guide

## 🚀 Quick Deployment Overview

This guide covers deploying your Warehouse Marketplace website to production.

---

## 🥇 Option 1: Vercel (Recommended)

**Best for:** Fastest setup, automatic scaling, best Next.js integration

### Step 1: Prepare Repository
```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: Warehouse Marketplace"

# Push to GitHub
# 1. Create repo on GitHub
# 2. Run: git remote add origin https://github.com/username/warehouse-marketplace
# 3. Run: git branch -M main
# 4. Run: git push -u origin main
```

### Step 2: Deploy to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your repository
5. Click "Deploy"
6. Done! Your site is live 🎉

### Step 3: Configure Custom Domain
1. In Vercel Dashboard, go to project Settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration
5. Wait for SSL certificate (usually instant)

### Benefits
- ✅ Free tier available
- ✅ Automatic deployments on git push
- ✅ Built-in SSL/TLS
- ✅ CDN included
- ✅ Performance analytics
- ✅ Edge functions support

---

## 🐳 Option 2: Docker (Self-Hosted)

### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy application
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Step 2: Create .dockerignore
```
node_modules
npm-debug.log
.git
.gitignore
README.md
SETUP.md
ARCHITECTURE.md
PROJECT_SUMMARY.md
.next
.env.example
```

### Step 3: Build Docker Image
```bash
docker build -t warehouse-marketplace:latest .
```

### Step 4: Run Container
```bash
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --name warehouse-app \
  warehouse-marketplace:latest
```

### Step 5: Deploy to Hosting
Choose one:

#### AWS ECS
```bash
# Configure AWS CLI
aws configure

# Push to ECR
aws ecr get-login-password | docker login -u AWS --password-stdin [account-id].dkr.ecr.[region].amazonaws.com
docker tag warehouse-marketplace:latest [account-id].dkr.ecr.[region].amazonaws.com/warehouse-marketplace:latest
docker push [account-id].dkr.ecr.[region].amazonaws.com/warehouse-marketplace:latest

# Deploy via ECS
# (Use AWS Console or CLI)
```

#### DigitalOcean App Platform
1. Push Docker image to Docker Hub
2. Connect DigitalOcean to GitHub
3. Create new App
4. Select Docker container
5. Deploy

#### Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create warehouse-marketplace

# Deploy
git push heroku main
```

---

## 🌐 Option 3: Traditional Hosting (Ubuntu/Linux Server)

### Prerequisites
- Ubuntu 20.04 LTS server
- Root or sudo access
- Domain name with DNS control

### Step 1: SSH into Server
```bash
ssh root@your-server-ip
```

### Step 2: Update System
```bash
apt-get update
apt-get upgrade -y
```

### Step 3: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

### Step 4: Install Git
```bash
apt-get install -y git
```

### Step 5: Clone Repository
```bash
cd /var/www
git clone https://github.com/username/warehouse-marketplace.git
cd warehouse-marketplace
```

### Step 6: Install Dependencies
```bash
npm install
npm run build
```

### Step 7: Install PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start npm --name "warehouse-app" -- start
pm2 startup
pm2 save
```

### Step 8: Install Nginx (Reverse Proxy)
```bash
apt-get install -y nginx
```

### Step 9: Configure Nginx
Create `/etc/nginx/sites-available/warehouse-marketplace`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL certificates (from Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/warehouse-marketplace /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 10: Install SSL Certificate (Let's Encrypt)
```bash
apt-get install -y certbot python3-certbot-nginx
certbot certonly --nginx -d your-domain.com
```

### Step 11: Setup Auto-renewal
```bash
certbot renew --dry-run
systemctl enable certbot.timer
systemctl start certbot.timer
```

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run type-check

      - name: Build
        run: npm run build

      - name: Deploy to Server
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          mkdir -p ~/.ssh
          echo "$DEPLOY_KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh -i ~/.ssh/deploy_key user@your-server.com 'cd /var/www/warehouse-marketplace && git pull && npm install && npm run build && pm2 restart warehouse-app'
```

---

## 📊 Performance Optimization for Production

### 1. Enable Caching
```bash
# In next.config.ts
export default {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=60' },
      ],
    },
    {
      source: '/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=3600' },
      ],
    },
  ],
};
```

### 2. Enable Compression
Nginx automatically compresses responses. Verify:
```nginx
gzip on;
gzip_types text/plain text/css text/js text/xml text/javascript application/javascript application/json;
```

### 3. CDN Setup

#### Cloudflare (Free)
1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Add your domain
3. Update nameservers
4. Enable caching
5. Enable Firewall rules

#### CloudFront (AWS)
```bash
# Create distribution via AWS Console
# Point CNAME to your domain
# Enable OAI for S3 bucket
```

---

## 🔐 Security Checklist

Before going live:

- [ ] Update `tsconfig.json` to strict mode
- [ ] Remove `.env.example` from production
- [ ] Set secure environment variables:
  ```bash
  export NEXT_PUBLIC_SITE_URL=https://your-domain.com
  export NODE_ENV=production
  ```

- [ ] Enable HTTPS/SSL certificate
- [ ] Configure security headers:
  ```
  Strict-Transport-Security: max-age=31536000
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  ```

- [ ] Set up firewall rules
- [ ] Enable DDoS protection
- [ ] Regular backups of data/enquiries.json
- [ ] Monitor for errors (Sentry)
- [ ] Log access and errors

---

## 📈 Monitoring & Analytics

### Setup Google Analytics
```typescript
// In app/layout.tsx
import Script from 'next/script';

export default function RootLayout() {
  return (
    <html>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_ID');
            `,
          }}
        />
      </body>
    </html>
  );
}
```

### Setup Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

---

## 🆘 Troubleshooting

### Issue: 502 Bad Gateway
```bash
# Check if Node app is running
pm2 status

# Restart if needed
pm2 restart warehouse-app

# Check logs
pm2 logs warehouse-app
```

### Issue: Database Connection Error
```bash
# Verify connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

### Issue: High Memory Usage
```bash
# Restart Node process
pm2 restart warehouse-app

# Monitor memory
pm2 monit
```

### Issue: SSL Certificate Issue
```bash
# Renew certificate
sudo certbot renew --force-renewal

# Check expiry
sudo openssl x509 -enddate -noout -in /etc/letsencrypt/live/your-domain.com/cert.pem
```

---

## 📋 Deployment Checklist

### Before Deployment
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Backup existing data
- [ ] Review all changes

### During Deployment
- [ ] Monitor deployment logs
- [ ] Check error tracking
- [ ] Verify all endpoints work
- [ ] Test all forms
- [ ] Check homepage loads

### After Deployment
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify SSL/HTTPS
- [ ] Test on mobile
- [ ] Check analytics
- [ ] Monitor user submissions

---

## 🎯 Recommended Setup (Production)

### Architecture
```
Domain (your-domain.com)
    ↓
Cloudflare CDN (Caching + DDoS)
    ↓
Nginx (Reverse Proxy + SSL)
    ↓
PM2 (Process Manager)
    ↓
Next.js App (Node.js)
    ↓
PostgreSQL (Database)
```

### Hosting Providers
1. **Vercel** - Easiest, recommended
2. **DigitalOcean** - Good balance of price/performance
3. **AWS** - Most features, steeper learning curve
4. **Heroku** - Quick deploy, higher cost

---

**Choose deployment method and launch your website! 🚀**
