# Product Video Discovery Dashboard

A full-stack application that discovers relevant short-form videos (Instagram Reels, Meta Ad Library) for any product by analyzing product images and aggregating videos from multiple sources.

## 🎯 Project Overview

**Goal**: User inputs a product name or pastes a product link → System analyzes product image → Returns 40+ relevant short-form videos (20+ Instagram Reels + 20+ Meta Ad Library videos)

**Key Features**:
- Smart product input (text search or URL)
- AI-powered image analysis using Claude Vision API
- Multi-source video aggregation (Instagram, Meta Ad Library, YouTube fallback)
- Intelligent video ranking and deduplication
- Real-time job status tracking
- Responsive dashboard with video previews
- Reliable error handling and API fallbacks

## 📋 Tech Stack & Justification

### Backend: Node.js + Express
- **Why Express**: Lightweight, battle-tested, minimal overhead for API routing
- **Why Node.js**: Non-blocking I/O perfect for handling multiple concurrent API calls to Instagram, Meta, and YouTube
- **Alternatives considered**: NestJS (overkill for MVP), Fastify (marginal performance gain vs complexity)

### Frontend: React + Vite
- **Why React**: Component-reusability, large ecosystem, TanStack Query for async state
- **Why Vite**: Fast development, instant HMR, minimal build overhead
- **UI Library**: TailwindCSS for rapid styling without component bloat

### Database: PostgreSQL + Redis
- **PostgreSQL**: Relational schema for products, jobs, videos with ACID guarantees
- **Redis**: Caching for API responses, job queues with Bull, rate limit tracking
- **Why not MongoDB**: Structured data with relationships + need for transactions make relational DB better
- **Why Redis**: Bull job queue handles retries, parallel processing, and rate limiting elegantly

### Image Analysis: Claude Vision API (Anthropic)
- **Why Claude**: Superior image understanding, reliable API, good token cost
- **Why not GPT-4V**: Higher cost, rate limits, less reliable video-matching keywords
- **Why not local models**: Would add inference latency, GPU complexity, less accurate brand/product recognition

### Job Processing: Bull (Redis-backed queue)
- **Why Bull**: Reliable job retry with exponential backoff, built-in rate limiting, horizontal scaling
- **Why not simple async/await**: Need retry logic + rate limit handling + job persistence

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   React Dashboard (Vite)                    │
│  Input: Product Name / URL / Image Upload                  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP REST
┌──────────────────────▼──────────────────────────────────────┐
│            Express.js API + Job Queue (Bull)                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  POST /api/products           - Create product         │ │
│  │  POST /api/discovery/start    - Begin search           │ │
│  │  GET  /api/discovery/job/:id  - Poll job status       │ │
│  │  GET  /api/videos/:job_id     - Get results           │ │
│  └────────────────────────────────────────────────────────┘ │
│                       │                                      │
│  ┌────────────────────▼────────────────────────────────────┐ │
│  │  Discovery Service Orchestration                       │ │
│  │                                                         │ │
│  │  1. Analyze product image (Claude Vision API)         │ │
│  │  2. Fetch Instagram Reels (Meta Graph API)           │ │
│  │  3. Fetch Meta Ad Library (Meta Ad API)              │ │
│  │  4. Fetch YouTube Shorts (YouTube Data API)          │ │
│  │  5. Rank & deduplicate results                        │ │
│  │  6. Store in database                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                       │                                      │
│  ┌────────────────────▼────────────────────────────────────┐ │
│  │  External APIs (with retry + rate limit logic)        │ │
│  │  - Anthropic Claude Vision                            │ │
│  │  - Meta Graph API (Instagram)                         │ │
│  │  - Meta Ad Library API                                │ │
│  │  - YouTube Data API                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│       PostgreSQL + Redis                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Tables:                                                │ │
│  │ - users, products, discovery_jobs, videos            │ │
│  │ - video_dedup (source_id uniqueness)                 │ │
│  │                                                        │ │
│  │ Redis:                                                 │ │
│  │ - Bull queues for job processing                      │ │
│  │ - API response caching                                │ │
│  │ - Rate limit tracking                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## ⚙️ How It Works

### 1. User Submits Product
```javascript
POST /api/products
{
  "name": "Apple AirPods Pro",
  "url": "https://apple.com/airpods-pro",
  "imageUrl": "https://..."
}
```

### 2. Backend Creates Discovery Job
```javascript
POST /api/discovery/start
{
  "product_id": 123
}
// Response: { "job_id": 456, "status": "pending" }
```

### 3. Async Pipeline Executes
- **Step 1**: Download & analyze product image with Claude Vision
  - Extract: product type, brand, colors, key features
  - Generate search keywords

- **Step 2**: Fetch videos from sources (parallel with retries)
  - Instagram Reels (Meta Graph API)
  - Meta Ad Library (Meta Ad API)
  - YouTube Shorts (fallback)

- **Step 3**: Process results
  - Deduplicate by source_id + URL
  - Score relevance (keywords match)
  - Calculate engagement metrics
  - Store in PostgreSQL

### 4. Frontend Polls for Status
```javascript
GET /api/discovery/job/456
// Returns: { job, videos: [...] }
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Redis 6+
- API Keys:
  - **Anthropic**: Claude Vision API key
  - **Meta**: App ID, App Secret, User Access Token (Instagram Graph API)
  - **Meta Ad Library**: Ad Account ID + Access Token
  - **YouTube**: Data API key (optional fallback)

### Setup

```bash
# Clone repo
git clone https://github.com/gourav20000006/Product-Video-Discovery-Dashboard
cd Product-Video-Discovery-Dashboard

# Create .env from template
cp .env.example .env
# Fill in your API keys

# Install dependencies
npm install

# Setup database
npm run db:migrate
npm run db:seed

# Start backend (port 3000)
cd backend && npm run dev

# Start frontend (port 5173, new terminal)
cd frontend && npm run dev
```

Open http://localhost:5173

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── index.js                 # Express app setup
│   │   ├── routes/
│   │   │   ├── products.js          # Product endpoints
│   │   │   ├── discovery.js         # Discovery job endpoints
│   │   │   └── videos.js            # Video retrieval
│   │   ├── services/
│   │   │   ├── discovery.js         # Main orchestration
│   │   │   ├── vision.js            # Claude Vision API
│   │   │   ├── instagram.js         # Meta Graph API
│   │   │   ├── metaAds.js           # Meta Ad Library API
│   │   │   ├── youtube.js           # YouTube Data API
│   │   │   ├── videoRanker.js       # Relevance scoring
│   │   │   ├── videoDedupe.js       # Deduplication
│   │   │   └── queue.js             # Bull job queue setup
│   │   ├── db/
│   │   │   ├── index.js             # PostgreSQL connection
│   │   │   ├── migrate.js           # Schema creation
│   │   │   └── seed.js              # Sample data
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   └── utils/
│   │       ├── logger.js
│   │       └── retry.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── JobStatus.jsx
│   │   │   ├── VideoGrid.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   └── History.jsx
│   │   ├── hooks/
│   │   │   ├── useDiscovery.js
│   │   │   ├── useVideos.js
│   │   │   └── usePolling.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── docker-compose.yml
├── .env.example
├── .gitignore
└── docs/
    ├── ARCHITECTURE.md
    ├── API.md
    ├── API_INTEGRATION.md
    └── DEPLOYMENT.md
```

## 🔑 Environment Variables

```env
# Backend
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/product_videos
REDIS_URL=redis://localhost:6379

# Anthropic Claude Vision
ANTHROPIC_API_KEY=sk-ant-...

# Meta (Instagram + Ad Library)
META_APP_ID=...
META_APP_SECRET=...
META_USER_ACCESS_TOKEN=...
META_AD_ACCOUNT_ID=...
META_AD_ACCESS_TOKEN=...

# YouTube (fallback)
YOUTUBE_API_KEY=...

# Frontend
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Product Video Discovery
```

## 🛠️ API Endpoints

### Products
- `POST /api/products` - Create product
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details

### Discovery
- `POST /api/discovery/start` - Start video discovery for a product
- `GET /api/discovery/job/:id` - Get job status and progress
- `GET /api/discovery/jobs` - List discovery jobs

### Videos
- `GET /api/videos/:job_id` - Get videos from a discovery job
- `GET /api/videos/trending` - Get trending videos across all jobs

## 🧠 Image Analysis Details

**Claude Vision API** analyzes product images to extract:

1. **Product Type**: What is the product? (e.g., "wireless earbuds", "coffee maker")
2. **Brand**: Manufacturer or brand name
3. **Key Features**: Material, color, size, design elements
4. **Visual Characteristics**: Color palette, style (modern, vintage, minimalist)
5. **Search Keywords**: Generated list optimized for video discovery

Example analysis output:
```json
{
  "product_type": "wireless earbuds",
  "brand": "Apple",
  "color": "white",
  "material": "plastic with silicone tips",
  "key_features": ["noise cancellation", "spatial audio", "transparency mode"],
  "search_keywords": [
    "Apple AirPods Pro",
    "AirPods Pro review",
    "noise cancelling earbuds",
    "wireless earbuds unboxing",
    "AirPods Pro demo"
  ]
}
```

These keywords are used to search Instagram Reels and Meta Ad Library.

## 🎬 Video Sources & Reliability

### Instagram Reels (Primary)
- **API**: Meta Graph API `/me/videos`
- **Expected**: 20+ reels per search
- **Reliability**: High (Meta owns Instagram)
- **Retry Logic**: 3 attempts with exponential backoff

### Meta Ad Library (Primary)
- **API**: Meta Ads API (Ad Creative Search)
- **Expected**: 20+ video ads per product
- **Reliability**: High (Meta-owned infrastructure)
- **Retry Logic**: 3 attempts with exponential backoff

### YouTube Shorts (Fallback)
- **API**: YouTube Data API v3
- **Expected**: 10+ shorts as fallback
- **Reliability**: Medium (rate-limited)
- **Retry Logic**: 2 attempts, used only if primary sources fail

### Error Handling
- **Rate Limits**: Queue jobs, respect API quotas
- **Failed Requests**: Retry with exponential backoff (1s → 2s → 4s)
- **Partial Failures**: Return partial results with error logs
- **Complete Failure**: Graceful degradation, try fallback sources

## 💾 Database Schema

### products
```sql
id, user_id, name, url, image_url, image_analysis (JSONB), 
keywords (TEXT[]), created_at, updated_at
```

### discovery_jobs
```sql
id, product_id, status (pending|processing|completed|failed), 
progress (0-100), total_videos, error_message, started_at, 
completed_at, created_at
```

### videos
```sql
id, discovery_job_id, source (instagram|meta_ads|youtube), 
source_id (unique), url, title, description, thumbnail_url, 
duration_seconds, views, likes, comments, engagement_score, 
relevance_score, raw_data (JSONB), created_at
```

### users
```sql
id, email, password_hash, name, created_at, updated_at
```

## 🔄 Job Queue & Retry Logic

**Bull Queue** handles:
- Parallel video fetching from all sources
- Automatic retry with exponential backoff
- Rate limit tracking
- Job persistence (survives server restart)
- Concurrency control (max 5 parallel discovery jobs)

**Retry Behavior**:
```javascript
{
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000  // 1s, 2s, 4s
  },
  removeOnComplete: false,  // Keep job history
  removeOnFail: false
}
```

## 🎯 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Integration tests
npm run test:integration
```

## 📊 Monitoring & Logging

- **API Logs**: Every request logged with status, latency, errors
- **Job Logs**: Detailed logs for each discovery job
- **Error Tracking**: Failed API calls saved for analysis
- **Metrics**: Success rates, average response times, video counts

## 🚀 Deployment

### Docker Compose (Local)
```bash
docker-compose up
```

### Production Checklist
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS/TLS
- [ ] Setup PostgreSQL backups
- [ ] Configure Redis persistence
- [ ] Add API rate limiting
- [ ] Setup monitoring (Prometheus, DataDog)
- [ ] Add CDN for video thumbnails
- [ ] Setup horizontal scaling for backend

## 📝 License

MIT

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit PR

---

**Built with ❤️ for discovering products through video**
