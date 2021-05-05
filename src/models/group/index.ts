import group from './group';


let groupModule: any = {}
groupModule.userType = group.modelName;

groupModule.saveGroup = async function(data: any) {
    return await new group(data).save();
}

groupModule.getGroup = async function(data: any) {
    console.log("data: ",data)
    return await group.findOne(data);
}

groupModule.updateGroup = async function(id: any, data: any) {
    return await group.updateOne({_id:id},{ $set : data });
}

export default groupModule;