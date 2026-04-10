const Tattoo = require("../models/Tattoo.model")

const isOwner = (req, res, next) => {
    const { tattooId } = req.params
    const userId = req.payload._id

    Tattoo.findById(tattooId)
        .then((tattoo) => {
            if(tattoo.userId.toString() !== userId){
                return res.status(403).json({ message: "No eres el autor de este tatuaje"})
            }

            next()
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error", err });
        })
}

module.exports = {
    isOwner
}