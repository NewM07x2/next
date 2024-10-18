import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: 'postgresql://postgres:postgres@db:5432/postgres',
  },
}

export default nextConfig