module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      instances: '4',
      exec_mode: 'cluster',
      max_memory_restart: '300M',
      node_args: '-r dotenv/config',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
