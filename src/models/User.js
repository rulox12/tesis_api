const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    documentType: { type: String, required: true },
    document: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true },
    isAdmin: { type: Boolean, required: true },
    createdOnWeb: { type: Boolean },

    commerces: [{ type: Schema.Types.ObjectId, ref: 'Commerce' }]
  },
  {
    timestamps: true,
    versionKey: false,
  })

module.exports = model('User', UserSchema)
