const express = require("express")
const router = express.Router()

const Tattoo = require("../models/Tattoo.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isOwner } = require("../middleware/owner.middleware");
const { routes } = require("../app");

router.post("/tattoos", isAuthenticated, (req, res) => {
    const newTattoo = req.body
    const userId = req.payload._id;

    Tattoo.create({ ...newTattoo, userId: userId })
        .then((tattoo) => {
            res.status(201).json(tattoo)
        })
        .catch((err) => {
            console.log("Error creating the new tattoo:", err)
            res.status(500).json({ error: "Error creating the new tattoo"})
        })
})

router.get("/tattoos", (req, res, next) => {
    Tattoo.find({})
        .populate("userId")
        .populate("comments.userId")
        .then((tattoo) => {
            res.json(tattoo)
        })
        .catch((err) => {
            next(err)
        })
})

router.get("/tattoos/:tattooId", (req, res, next) => {
    const { tattooId } = req.params

    Tattoo.findById(tattooId)
        .populate("userId")
        .populate("comments.userId")
        .then((tattoo) => {
            res.json(tattoo)
        })
        .catch((err) => {
            next(err)
        })

})

router.put("/tattoos/:tattooId", isAuthenticated, isOwner, (req, res, next) => {
    const newDetails = req.body
    const { tattooId } = req.params

    Tattoo.findByIdAndUpdate(tattooId, newDetails, { new: true })
        .then((tattoo) => {
            res.json(tattoo)
        })
        .catch((err) => {
            console.log("Error updating the tattoo:", err)
            next(err)
        })
})

router.delete("/tattoos/:tattooId", isAuthenticated, isOwner, (req, res, next) => {
    const { tattooId } = req.params

    Tattoo.findByIdAndDelete(tattooId)
        .then((response) => {
            res.status(204).json(response)
        })
        .catch((err) => {
            next(err)
        })
})

router.post("/tattoos/:tattooId/comments", isAuthenticated, (req, res, next) => {
    const { tattooId } = req.params
    const { text } = req.body
    const userId = req.payload._id

    Tattoo.findById(tattooId)
        .then((tattoo) => {
            const newComment = {
                userId: userId,
                text: text
            }

            tattoo.comments.push(newComment)

            return tattoo.save()
        })
        .then((savedTattoo) => {
            return savedTattoo.populate("comments.userId")
        })
        .then((response) => {
            res.status(201).json(response)
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router