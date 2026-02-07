import express from 'express'
import bodyParser from 'body-parser'
import ejs from 'ejs';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const posts = [
        {
            id: 1,
            title: `My first day posting a blog`,
            description: `i learned about Node js, and Express. This blog is my capstone project `
        },

        {
            id: 2,
            title: `Bootstrap is a one of styling frameworks`,
            description: `These components in this blog is built by Bootstrap and simple CSS native. `
        }, 

        {
            id: 3,
            title: `Can't wait to finish this project`,
            description: `Im always logging my progress using GitHub`
        }

    ]
    res.render("index.ejs", { posts })
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