import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Replace [CLIENT_SUPABASE_REF] with the actual ref once Dagim provisions Supabase
        hostname: '[CLIENT_SUPABASE_REF].supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
