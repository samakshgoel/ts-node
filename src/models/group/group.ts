import mongoose from 'mongoose';
let Schema: any = mongoose.Schema;

// message schema in conversation
let USER = new Schema({
    USER_ID : { type : String},
    createdAt: { type: Date, default: Date.now },
})

// message schema in conversation
let ADMIN = new Schema({
    ADMIN_ID : { type : String },
    createdAt: { type: Date, default: Date.now },
})

let GROUP_SCHEMA = new Schema({
    GROUP_NAME : { type : String },
    USERS : [USER],
    ADMINS : [ADMIN],
    createdAt : { type: Date, default: Date.now },
})

export default mongoose.model('group', GROUP_SCHEMA);