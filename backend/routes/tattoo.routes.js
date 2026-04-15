const express = require("express")
const router = express.Router()

const fileUploader = require("../config/cloudinary.js").default;

const Tattoo = require("../models/Tattoo.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isOwner } = require("../middleware/owner.middleware");
const { routes } = require("../app");

router.post("/upload", isAuthenticated, fileUploader.single("image"), (req, res, next) => {

    if (!req.file) {
        res.status(400).json({ message: "No se ha seleccionado ningún archivo" });
        return;
    }

    res.json({ fileUrl: req.file.path });
});

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
        .populate("userId", "_id name")
        .populate("comments.userId", "_id name")
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
        .populate("userId", "_id name")
        .populate("comments.userId", "_id name")
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

    Tattoo.findByIdAndUpdate(tattooId, { $push: { comments: { userId, text } } }, { new: true })
    .populate("comments.userId", "_id name")
    .then((tattoo) => {
        res.status(201).json(tattoo)
    })
    .catch((err) => next(err))
})

router.post("/tattoos/:tattooId/likes", isAuthenticated, (req, res, next) => {
    const { tattooId } = req.params
    const userId = req.payload._id

    Tattoo.findById(tattooId)
        .then((tattoo) => {
            const hasLiked = tattoo.likes.includes(userId);

            const update = hasLiked 
                ? { $pull: { likes: userId } } 
                : { $addToSet: { likes: userId } };

            return Tattoo.findByIdAndUpdate(tattooId, update, { new: true });
        })
        .then((updatedTattoo) => res.json(updatedTattoo))
        .catch((err) => next(err));
})


module.exports = router