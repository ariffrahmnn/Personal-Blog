import express from 'express'
import bodyParser from 'body-parser'
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "public/uploads"));
    },

        filename: (req, file, cb) => {
            console.log(file)
            cb(null, Date.now()  + path.extname(file.originalname))
    }
})

const upload = multer({storage});

app.use(methodOverride("_method"))

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.urlencoded({ extended:true }))

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    
    res.render("index.ejs", { posts })
});

app.get("/news", (req, res) => {
    res.render("news.ejs")
});

app.get("/post", (req, res) => {
    res.render("post.ejs")
});

let posts = []; // Array stored here!
app.post("/create", upload.single("image"), (req, res) => { //post method is working on here!

    const image = req.file ? req.file.filename : null;

    const newPost =
        {
        id: posts.length + 1,
        title: req.body.title,
        description: req.body.description,
        image
     };

    posts.push(newPost);
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);

    posts = posts.filter(post => post.id !== id);

    res.redirect("/")
})

app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.send("Post not found");
    }

    res.render("edit.ejs", { post });
});

app.post("/edit/:id", upload.single("image"), (req, res) => {
    const id = parseInt(req.params.id);

    const { title, description } = req.body;

    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
        return res.send("Post not found");
    }

    posts[postIndex].title = title;
    posts[postIndex].description = description;

    if (req.file) {
        posts[postIndex].image = req.file.filename;
    }

    res.redirect("/");
});


app.get("/success", (req, res) => {
    res.render("success.ejs");
});

app.listen(port, (req, res) => {
    console.log(`App is running on port ${port}`)
})

