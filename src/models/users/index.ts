import user from './user';


let userModule: any = {}
userModule.userType = user.modelName;

userModule.findUser = async function(data: any) {
    return await user.findOne(data)
}

userModule.saveUser = async function(data: any) {
    return await new user(data).save();
}

userModule.updateUser = async function(id: any, data: any) {
    return await user.updateOne({_id:id},{ $set : data });
}

export default userModule;