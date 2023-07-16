const express = require("express")
const { noteModel } = require("../Models/noteModel")
const { auth } = require("../Middlewares/auth")


const noteRouter = express.Router()

noteRouter.use(auth)

noteRouter.post("/add", async (req, res) => {
    try {
        const note = new noteModel(req.body)
        await note.save()
        res.status(200).json({ msg: "New note has been added..", note: req.body })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

noteRouter.get("/", async (req, res) => {
    try {
        const notes = await noteModel.find({ userID: req.body.userID })
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

noteRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    const userIDinUsetDoc = req.body.userID

    try {
        const note = await noteModel.findOne({ _id: id })
        console.log(note)
        const userIDinNoteDoc = note.userID
        if (userIDinUsetDoc === userIDinNoteDoc) {
            await noteModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).json({ msg: `${note.title} has been updated` })
        }
        else {
            res.status(400).json({ msg: "Not Authorized" })
        }

    } catch (error) {
        res.json({ error: error.message })
    }
})


noteRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    const userIDinUsetDoc = req.body.userID

    try {
        const note = await noteModel.findOne({ _id: id })
        console.log(note)
        const userIDinNoteDoc = note.userID
        if (userIDinUsetDoc === userIDinNoteDoc) {
            await noteModel.findByIdAndDelete({ _id: id }, req.body)
            res.status(200).json({ msg: `${note.title} has been deleted` })
        }
        else {
            res.status(400).json({ msg: "Not Authorized" })
        }

    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = {
    noteRouter
}