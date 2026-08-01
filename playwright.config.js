const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './e2e-tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:5000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // ИСПРАВЛЕНО: Явно передаем PORT=5000 для Node.js сервера (кроссплатформенный вариант)
    command: process.platform === 'win32' ? 'set PORT=5000&&npm run start-prod' : 'PORT=5000 npm run start-prod',
    url: 'http://127.0.0.1:5000',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000, // Сократим ожидание до 1 минуты для быстрой отладки
  },
})
