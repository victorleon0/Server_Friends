const mongose = require('mongose');

const userSchema = mongoose.Schema (
    {
        email: { type: String, required: true, },
        password: { type: String, required: true, },
        name: { type: String, required: true, },
        phone: { type: String},
        city: { type: String},
    },
    {
        timestamps: true,

    }
);

    const User = mongoose.model("User", userSchema);

    module.exports = User;