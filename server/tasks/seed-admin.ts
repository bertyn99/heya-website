import { seedAdminUser } from '../utils/seed-admin'

export default defineTask({
  meta: {
    name: 'seed-admin',
    description: 'Create the initial admin user if missing'
  },
  async run() {
    return await seedAdminUser()
  }
})
