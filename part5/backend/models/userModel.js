import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    minlength: 3,
    default: "Anonymous",
  },

  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    const copy = { ...returnedObject };
    copy.id = copy._id.toString();
    delete copy._id;
    delete copy.__v;
    delete copy.passwordHash;
    return copy;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
