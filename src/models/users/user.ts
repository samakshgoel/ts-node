import mongoose from 'mongoose';
let Schema: any = mongoose.Schema;

// message schema in conversation
let friendSchema = new Schema({
    friendId : { type : String},
    isFriend : { type : Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

// message schema in conversation
let groupSchema = new Schema({
    groupId : { type : String},
    createdAt: { type: Date, default: Date.now },
})

let userSchema = new Schema({
    name : { type : String },
    email : { type : String },
    password : { type : String },
    Friends : [friendSchema],
    Groups : [groupSchema],
    createdAt : { type: Date, default: Date.now },
})

export default mongoose.model('user', userSchema);