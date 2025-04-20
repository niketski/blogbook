import { Document, Model, model, models, Schema } from "mongoose";

export interface IUser extends Document {
    name: string,
    username: string,
    email: string,
    address: string,
    password: string,
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserModel: Model<IUser> = models.User || model<typeof UserSchema>('User', UserSchema)

export default UserModel;