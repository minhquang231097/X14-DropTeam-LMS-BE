import { Document, Schema, model } from "mongoose";

const tokenSchema = new Schema({
    username: { type: Schema.Types.ObjectId, ref: "users" },
    refreshToken: String,
    create_at: { type: Date, default: Date.now() }
})

export interface IToken extends Document {
    username: string,
    refreshToken: string,
    create_at?: string
}

export const Token = model<IToken>("tokens", tokenSchema)