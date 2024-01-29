import { config } from 'dotenv'
config()
import app from './app.js'
import connectToDB from './db/index.js'

app.use('/', (req, res) => {
    res.send("Hello World")
})

connectToDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MongoDb connection failed!", err);
    })
