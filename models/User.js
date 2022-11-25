const { schema, model, SchemaType, Schema } = require("mongoose");

const UserSchema = new schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// userschema friend count
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;