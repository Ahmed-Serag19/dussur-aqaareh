# دُسر العقارية (Dussur Alaqareeh) - Real Estate Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, high-performance real estate platform built for the Saudi Arabian market. This application provides comprehensive property listings, advanced filtering, and a seamless user experience for both Arabic and English speakers.

## 🏗️ Architecture Overview

```
dussur-alaqareeh/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # Reusable UI components
│   ├── features/               # Feature-based modules
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities and configurations
│   ├── types/                  # TypeScript type definitions
│   └── styles/                 # Global styles and themes
├── public/                     # Static assets
├── scripts/                    # Build and utility scripts
└── docs/                       # Documentation
```

## ✨ Features

### 🏠 Property Management

- **Advanced Property Listings**: Comprehensive property details with high-quality images
- **Smart Filtering**: Filter by region, property type, listing type, and price range
- **Search & Discovery**: Intuitive search with location-based results
- **Property Details**: Rich property information with interactive features

### 🌐 Internationalization

- **Bilingual Support**: Full Arabic and English language support
- **RTL Layout**: Proper right-to-left layout for Arabic content
- **Localized Content**: Region-specific property data and descriptions

### ⚡ Performance Optimizations

- **Lazy Loading**: Granular data loading for optimal performance
- **Caching Strategy**: Aggressive caching with React Query
- **Bundle Optimization**: Code splitting and tree shaking
- **Critical Data Preloading**: Essential data loads early in app lifecycle

### 🎨 User Experience

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Loading States**: Skeleton loaders and progressive loading

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: For version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/dussur-alaqareeh.git
   cd dussur-alaqareeh
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.dussur.sa
   NEXT_PUBLIC_SITE_URL=https://aqaar.dussur.sa
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Performance & Testing
npm run performance  # Run performance monitoring
npm run type-check   # Run TypeScript type checking
```

### Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   └── providers.tsx           # React Query and other providers
├── components/                 # Shared UI components
│   ├── ui/                     # Base UI components (buttons, cards, etc.)
│   ├── layout/                 # Layout components (header, footer, etc.)
│   └── performance/            # Performance optimization components
├── features/                   # Feature-based modules
│   └── properties/             # Property-related features
│       ├── components/         # Property-specific components
│       ├── hooks/              # Property-related hooks
│       └── types/              # Property type definitions
├── hooks/                      # Custom React hooks
│   ├── useLanguage.ts          # Internationalization hook
│   └── useLookupData.ts        # Data fetching hooks
├── lib/                        # Utilities and configurations
│   ├── api/                    # API client and endpoints
│   ├── utils/                  # Utility functions
│   └── constants/              # Application constants
└── types/                      # TypeScript type definitions
```

### Performance Optimizations

This project implements several performance optimizations:

#### 1. Lazy Loading Strategy

```typescript
// Instead of loading all data at once
const { regions, cities, propertyTypes, ... } = useLookupData();

// Load only what's needed
const { data: regions = [] } = useRegions();
const { data: cities = [] } = useCities();
```

#### 2. Critical Data Preloading

```typescript
// Preloads essential data early in app lifecycle
export function useCriticalLookupData() {
  // Only loads: regions, cities, propertyTypes, listingTypes
  // Excludes: features, conditions, finishingTypes, statusValues, neighborhoods
}
```

#### 3. Caching Strategy

```typescript
{
  staleTime: 60 * 60 * 1000, // 1 hour
  gcTime: 2 * 60 * 60 * 1000, // 2 hours
  retry: 3,
  retryDelay: 2000,
}
```

### Code Quality

#### TypeScript

- Strict type checking enabled
- Comprehensive type definitions
- Interface-first development approach

#### ESLint Configuration

- Next.js recommended rules
- TypeScript-specific rules
- Accessibility guidelines

#### Prettier

- Consistent code formatting
- Automatic formatting on save
- Project-specific configuration

## 📊 Performance Monitoring

### Lighthouse Metrics

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Total Blocking Time (TBT)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Performance Monitoring

```bash
# Run performance audit
npm run performance

# Monitor bundle size
npm run build
```

## 🌐 Internationalization

The application supports both Arabic and English with proper RTL layout:

```typescript
// Language switching
const { currentLanguage, setLanguage } = useLanguage();

// RTL support
<html lang="ar" dir="rtl">
```

### Translation Structure

```
locales/
├── ar/
│   ├── common.json
│   ├── property.json
│   └── navigation.json
└── en/
    ├── common.json
    ├── property.json
    └── navigation.json
```

## 🔧 Configuration

### Environment Variables

| Variable                       | Description           | Default                   |
| ------------------------------ | --------------------- | ------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`     | API base URL          | `https://api.dussur.sa`   |
| `NEXT_PUBLIC_SITE_URL`         | Site URL for metadata | `https://aqaar.dussur.sa` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID   | -                         |

### API Configuration

The application uses a RESTful API with the following endpoints:

```typescript
// Property endpoints
GET /properties          # List properties with pagination
GET /properties/{id}     # Get property details

// Lookup endpoints
GET /regions            # List regions
GET /cities             # List cities
GET /property-types     # List property types
GET /listing-types      # List listing types
```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Performance tests
npm run performance
```

### Test Structure

```
__tests__/
├── components/          # Component tests
├── hooks/              # Hook tests
├── utils/              # Utility tests
└── integration/        # Integration tests
```

## 📦 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: maintenance tasks
```

### Code Review Guidelines

- **TypeScript**: All new code must be properly typed
- **Performance**: Consider impact on bundle size and runtime
- **Accessibility**: Ensure WCAG compliance
- **Testing**: Include appropriate tests for new features
- **Documentation**: Update relevant documentation

## 📚 Documentation

- [Performance Optimization Guide](./PERFORMANCE_OPTIMIZATION.md)
- [API Documentation](./docs/API.md)
- [Component Library](./docs/COMPONENTS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🏢 About Dussur Alaqareeh

Dussur Alaqareeh is a leading real estate platform in Saudi Arabia, providing comprehensive property solutions for buyers, sellers, and renters. Our platform combines cutting-edge technology with local market expertise to deliver exceptional user experiences.

### Key Statistics

- **Properties Listed**: 10,000+
- **Active Users**: 50,000+
- **Regions Covered**: 13 provinces
- **Languages**: Arabic, English

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment solutions
- **Tailwind CSS**: For the utility-first CSS framework
- **React Query**: For efficient data fetching and caching

## 📞 Support

For support and questions:

- **Email**: support@dussur.sa
- **Phone**: +966 58 290 6777
- **Website**: [https://aqaar.dussur.sa](https://aqaar.dussur.sa)

---

**Built with ❤️ by the Dussur Alaqareeh Team**
