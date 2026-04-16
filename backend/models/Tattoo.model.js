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
        }],
        isSelling: { 
            type: Boolean, 
            default: false 
        },
        price: { 
            type: Number, 
            required: function() {
                return this.isSelling === true;
            },
            min: [0.50, 'El precio mínimo debe ser 0.50']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = model("Tattoo", tattooSchema)