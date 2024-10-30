import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Return all classes
router.get("/", async (req, res) => {
  let collection = await db.collection("tasks");
  let result = await collection.find({}).toArray();

  if (!result) res.status(404).send("Error with getting all tasks");
  else res.send(result).status(200);

});

router.post("/", async(req, res) => {
  try {
    let newTask = {
      tasks: req.body.task,
      notes: req.body.notes,
      status: req.body.status
    }

    let collection = await db.collection("tasks");
    let result = await collection.insertOne(newTask);

    if (!result) res.status(404).send("Could not insert new documents");
    else res.send(result).status(204);
  } catch(err){
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

export default router;