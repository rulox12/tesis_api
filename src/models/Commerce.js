const { Schema, model } = require('mongoose')

const CommerceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
    active: { type: Boolean, required: true },
    nit: { type: String, required: true },
    color: { type: String, required: true },

    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true,
    versionKey: false
  })

module.exports = model('Commerce', CommerceSchema)
