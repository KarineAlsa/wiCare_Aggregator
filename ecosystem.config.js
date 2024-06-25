module.exports = {
    apps: [
      {
        name: 'api-agreggate',
        script: './dist/app.js',
        watch: true,
        ignore_watch: ["node_modules", "dist"],
        watch_options: {
          "followSymlinks": false
        },
        env: {
          NODE_ENV: 'development',
          PORT: 9000
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 9000
        }
      }
    ]
  };
  