import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema/schema.js'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config()

// Connect to database
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
)
const PORT = process.env.port || 5000

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on ${PORT} successfully`
      .yellow.bold
  )
})
