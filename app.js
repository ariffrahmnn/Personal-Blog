import express from 'express'
import bodyParser from 'body-parser'
import ejs from 'ejs';
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { isMainThread } from 'worker_threads';

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

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

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

app.post("/create", upload.single("image"), (req, res) => { 

    const { title, description } = req.body;

    const image = req.file ? req.file.filename : null;

    const newPost =
        {
        id: posts.length + 1,
        title,
        description,
        image
     };

    posts.push(newPost);
    res.redirect("/");
});

app.get("/success", (req, res) => {
    res.render("success.ejs");
});

app.listen(port, (req, res) => {
    console.log(`App is running on port ${port}`)
})
