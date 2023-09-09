/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    const ret = [
      {
        source: "/api/proxy/:path*",
        destination: "https://api.openai.com/:path*",
      },
      {
        source: "/google-fonts/:path*",
        destination: "https://fonts.googleapis.com/:path*",
      },
    ];

    const apiUrl = process.env.API_URL;
    if (apiUrl) {
      console.log("[Next] using api url ", apiUrl);
      ret.push({
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      });
    }

    return {
      beforeFiles: ret,
    };
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(js|mjs)$/,
        exclude: /node_modules\/(?!@pezzo\/client)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
          ['@babel/preset-env', {
            "modules": "commonjs",
            "targets": {
              "esmodules": true
            }
          }]
        ],
        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
    
          },
        },
      }
    );
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  output: "standalone",
};

export default nextConfig;
