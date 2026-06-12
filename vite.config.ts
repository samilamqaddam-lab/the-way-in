import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const entry = (rel: string) => fileURLToPath(new URL(rel, import.meta.url))

// base './' keeps the built site portable: it works from any static host,
// any sub-path, even opened straight from a folder.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: entry('index.html'),
        prompts: entry('prompts/index.html'),
        missions: entry('missions/index.html'),
        firstDay: entry('first-day/index.html'),
        help: entry('help/index.html'),
        quest: entry('quest/index.html'),
        tools: entry('tools/index.html'),
        fr: entry('fr/index.html'),
        frPrompts: entry('fr/prompts/index.html'),
        frMissions: entry('fr/missions/index.html'),
        frFirstDay: entry('fr/first-day/index.html'),
        frHelp: entry('fr/help/index.html'),
        frQuest: entry('fr/quest/index.html'),
        frTools: entry('fr/tools/index.html'),
      },
    },
  },
})
