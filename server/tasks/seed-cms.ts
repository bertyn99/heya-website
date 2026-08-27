import { seedCmsContent } from '../utils/seed-cms'

export default defineTask({
  meta: {
    name: 'seed-cms',
    description: 'Insert published pages and sample posts from the live site copy'
  },
  async run() {
    return await seedCmsContent()
  }
})
