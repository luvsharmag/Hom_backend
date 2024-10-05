import mongoose  from "mongoose";

const linkSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
})


export const NavLink = mongoose.model("NavLink",linkSchema);