import express from 'express'
import bodyParser from 'body-parser'
import ejs from 'ejs';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.urlencoded({ extended:true }))

app.set("view engine", "ejs");
app.use(express.static("public"));


const posts = [];
app.get("/", (req, res) => {

    res.render("index.ejs", { posts })
});

app.get("/news", (req, res) => {
    res.render("news.ejs")
});

app.get("/post", (req, res) => {
    res.render("post.ejs")
});

app.post("/create", (req, res) => {
    const { title, description } = req.body;
    console.log({ title, description });
    const newPost = [
        {
        id: posts.length + 1,
        title,
        description
     }

    ];

    posts.push(newPost);
    res.redirect("/");
});

app.get("/success", (req, res) => {
    res.render("success.ejs");
});

app.listen(port, (req, res) => {
    console.log(`App is running on port ${port}`)
})
