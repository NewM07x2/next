import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 外部ドメイン空の画像を表示させる。
  images: {
    domains: ['example.com'],
  },
  // rewrites: URLの書き換えルールを設定します。
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
  //　環境変数
  env: {
    DATABASE_URL: 'postgresql://postgres:postgres@db:5432/postgres',
  },
}

export default nextConfig