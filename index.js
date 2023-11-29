import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

//body-parser = middleware for express that analyzes
//the body of client's http request, it can handle json and urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
//express static = middleware that makes static files from specified directory
//available to clients
app.use(express.static("public"));

let tasks = [];

app.get("/", (req, res) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  res.render("index.ejs", { tasks, currentDate });
});

app.post("/addTask", (req, res) => {
  let newTask = req.body.task; //.task is name of input

  tasks.push(newTask);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
