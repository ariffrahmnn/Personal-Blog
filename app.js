import express from 'express'
import bodyParser, { urlencoded } from 'body-parser'
import ejs from 'ejs';

const app = express();
const port = 3000;

app.use(bodyParser, urlencoded({ extended:true }))

app.set("view engine", "ejs");

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/news", (req, res) => {
    res.render("news.ejs")
})

app.get("/post", (req, res) => {
    res.render("post.ejs")
})

app.listen(port, (req, res) => {
    console.log(`App is running on port ${port}`)
})