import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './loader.ts',
    },
    env: {
        apiHost: 'http://localhost:1337',
    },
};

export default nextConfig;
