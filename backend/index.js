import { config } from 'dotenv'
config()
import app from './app'
import connectToDB from './db'

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
