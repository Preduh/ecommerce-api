import express from 'express'
import morgan from 'morgan'
import { router } from './routes'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(router)

const port = Number(process.env.PORT ?? 8080)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
