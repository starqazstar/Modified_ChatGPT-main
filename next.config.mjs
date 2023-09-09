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
                modules: 'commonjs', // 转换 ES6 模块到 CommonJS
                targets: '> 0.25%, not dead', // 根据需要选择目标浏览器
              }],
              '@babel/preset-react', // 如果你使用 React，可以添加此预设
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties', // 为类属性添加支持
              '@babel/plugin-proposal-private-methods', // 为私有方法添加支持
              // 你可以根据需要添加更多的 Babel 插件
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      }
    );

    return config;
  },
  output: "standalone",
};

export default nextConfig;
