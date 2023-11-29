import mongoose from "mongoose";

// Connect to the database
mongoose
  .connect("mongodb://localhost:27017/todoDB")
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const FruitSchema = new mongoose.Schema({
  name: String,
  rotten: Boolean,
});
const Fruit = mongoose.model("Fruit", FruitSchema);

const fruit = new Fruit({
  name: "Banana",
  rotten: true,
});

// Define schema
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must have a name"],
  },
  age: {
    type: Number,
    min: 0,
    max: 100,
  },
  breed: String,
  fruit: FruitSchema,
});

// Create model/collection
const Task = mongoose.model("Task", todoSchema);

// Create a Task instance using the correct schema and the new keyword
const task1 = new Task({
  name: "Eldar1",
  age: 100,
  breed: "Human",
  fruit: fruit,
});

task1
  .save()
  .then(() => {
    console.log("Task saved successfully");
  })
  .catch((err) => {
    console.error("Error saving task:", err);
  });

// Find and log all tasks
Task.find()
  .then((tasks) => {
    console.log(tasks);
  })
  .catch((err) => {
    console.log(err);
  });
