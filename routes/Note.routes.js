const express = require("express");
const { NoteModel } = require("../model/Note.model");

const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  try {

    const note = new NoteModel(req.body) 
    await note.save()
    res.status(200).send({"msg":"New note added"})

  } catch (error) {
res.status(400).send({"err":error.message})
  }

});

noteRouter.get("/", async (req, res) => {
  try {
   const notes = await NoteModel.find({authorID:req.body.authorID})
    res.status(200).send(notes)
  } catch (error) {
    res.status(400).send({"err":error.message})
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params; 
const note = await NoteModel.findOne({_id:noteID})
  try { 
    if(req.body.authorID != note.authorID) {

      res.status(200).send({"msg":"You are not authorized to do this operation"})
    } else {
      await NoteModel.findByIdAndUpdate({_id:noteID}, req.body)
     res.status(200).send({"msg":"Note Updated"})

    }

  } catch (error) {
    res.status(400).send({"err":error.message})
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({_id:noteID})
  try {
    if(req.body.authorID != note.authorID) {

      res.status(200).send({"msg":"You are not authorized to do this operation"})
    } else {
      await NoteModel.findByIdAndRemove({_id:noteID})
      res.status(200).send({"msg":"Note Deleted"})

    }
  } catch (error) {
    res.status(400).send({"err":error.message})
  }
});

module.exports = {
  noteRouter,
};
