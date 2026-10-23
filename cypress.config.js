import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // The address Vite serves this project on (npm run dev).
    // With baseUrl set, tests can call cy.visit('/') instead of the full URL.
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
  },
})
