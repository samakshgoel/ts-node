import mongoose from 'mongoose';
let Schema: any = mongoose.Schema;

// message schema in conversation
let messageSchema = new Schema({
    from : { type : String },
    to : { type : String },
    text : { type : String },
    isSeen : { type : Boolean, default : false },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('message', messageSchema);