import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
//midllewares
//body-parser = middleware for express that analyzes
//the body of client's http request, it can handle json and urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
//express static = middleware that makes static files from specified directory
//available to clients
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB"); //connects and creates database if doesn't exist

const ItemsSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", ItemsSchema); //model will be called "items", program always adds s at the end

//date code
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

app.get("/", (req, res) => {
  Item.find().then((foundItems) => {
    res.render("index.ejs", { currentDate, foundItems });
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.item;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const checkedItem = req.body.item;
  console.log(checkedItem);
  Item.findByIdAndDelete(checkedItem)
    .then(() => console.log("succesfully deleted"))
    .catch((err) => console.log(err));
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
