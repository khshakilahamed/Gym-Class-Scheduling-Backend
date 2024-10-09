/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Server } from 'http'
import app from './app'
import config from './config/index'
import mongoose from 'mongoose'

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('🛢️ Database successfully connected')

    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    console.error('Failed to connect database', err)
  }
}

bootstrap()
