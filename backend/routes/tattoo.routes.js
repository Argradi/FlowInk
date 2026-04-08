const express = require("express")
const router = express.Router()

const Tattoo = require("../models/Tattoo.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { routes } = require("../app");

router.post("/tattoos", isAuthenticated, (req, res) => {
    const newTattoo = req.body

    Tattoo.create(newTattoo)
        .then((tattoo) => {
            res.status(201).json(tattoo)
        })
        .catch((err) => {
            console.log("Error creating the new tattoo:", err)
            res.status(500).json({ error: "Error creating the new tattoo"})
        })
})

router.get("/tattoos", (req, res) => {
    Tattoo.find({})
        .then((tattoo) => {
            res.json(tattoo)
        })
        .catch((err) => {
            next(err)
        })
})

router.get("/tattoos/:tattooId", (req, res) => {
    const { tattooId } = req.params

    Tattoo.findById(tattooId)
        .then((tattoo) => {
            res.json(tattoo)
        })
        .catch((err) => {
            next(err)
        })

})

router.put("/tattoos/:tattooId", isAuthenticated, (req, res) => {
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

router.delete("/tattoos/:tattooId", isAuthenticated, (req, res) => {
    const { tattooId } = req.params

    Tattoo.findByIdAndDelete(tattooId)
        .then((response) => {
            res.status(204).json(response)
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router