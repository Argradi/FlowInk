const { Schema, model } = require('mongoose')

const tattooSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String, required: true },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        comments: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text: { type: String },
        }]
    },
    {
        timestamps: true,
    }
)

module.exports = model("Tattoo", tattooSchema)