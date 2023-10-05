import { app } from './app.js'

const server = app()

try {
  await server.listen({ port: 3000 })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
