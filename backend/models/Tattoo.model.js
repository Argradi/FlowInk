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
        style: { 
            type: String, 
            enum: ['Realismo', 'Tradicional', 'Fine Line', 'Blackwork', 'Minimalista', 'Japonés', 'Tribal', 'Ilustrativo', 'Otro'],
            default: 'Otro'
        },
        time: { type: String },
        tags: [{ type: String }],
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
            required: function () {
                return this.isSelling === true;
            },
            validate: {
                validator: function (v) {
                    if (this.isSelling) {
                        return v >= 0.50;
                    }
                    return true;
                },
                message: 'Si el diseño está a la venta, el precio mínimo debe ser 0.50€'
            }
        },
    },
    {
        timestamps: true,
    }
)

module.exports = model("Tattoo", tattooSchema)