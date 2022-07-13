import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,  //give created and updated timestamps
  }
);
 
//For hashing the password
userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
//If password is not modified it will return next
  if (!user.isModified("password")) {
    return next();
  }
//the event loop sees it as a sequence of functions, invoked over time. Salt provides a simple pattern to describe those sequences, along with an API to control timing.
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
//By using UserDocument we have passed our own interface, giving type definitions like the custom properties on the Schema

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
