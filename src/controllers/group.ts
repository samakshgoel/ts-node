import { errorResponse, succesResponse } from '../services/response'
import userModule from '../models/users/index';
import messageModule from '../models/messages/index';
import groupModule from '../models/group/index'
import jwt from 'jsonwebtoken'

export const createGroup = async (req:any, res:any)=>{
    const GROUP_NAME = req.body.GROUP_NAME
    if(!GROUP_NAME) return errorResponse(res, 422, 'GROUP_NAME is required!')
    try{
        const data={
            GROUP_NAME: GROUP_NAME,
            ADMINS:[{ADMIN_ID:req.user._id}]
        }
        const SAVE_GROUP = await groupModule.saveGroup(data);
        const USER_DATA = await userModule.findUser({_id:req.user._id});
        USER_DATA.Groups.push({ groupId: SAVE_GROUP._id });
        await userModule.updateUser(USER_DATA._id, USER_DATA)
        return succesResponse(res, 200, 'create gropu successfully!');
    }catch(error){
        return errorResponse(res, 422, error)
    }
}

export const addUserToGroup = async (req:any, res:any)=>{
    const GROUP_ID = req.params.GROUP_ID;
    const USER_ID = req.body.USER_ID
    if(!GROUP_ID) return errorResponse(res, 422, 'GROUP_NAME is required!')
    if(!USER_ID) return errorResponse(res, 422, 'USER_ID is required!')
    try{
        const GROUP_DATA = await groupModule.getGroup({_id:GROUP_ID});
        if(!GROUP_DATA) return errorResponse(res, 422, 'group id is invalid!')
        const USER_DATA = await userModule.findUser({_id:USER_ID});
        if(!USER_DATA) return errorResponse(res, 422, 'Invalid given USER_ID!')
        const isEXIST = await isAdminExist(req.user._id, GROUP_DATA.ADMINS);
        if(!isEXIST){
            return errorResponse(res, 422, 'only group admin can add users in group!')
        }else{
            GROUP_DATA.USERS.push({USER_ID:USER_ID})
            await groupModule.updateGroup(GROUP_ID, GROUP_DATA)
            USER_DATA.Groups.push({ groupId: GROUP_ID })
            await userModule.updateUser(USER_ID, USER_DATA)
            return succesResponse(res, 200, 'add user to group successfully!')
        }
    }catch(error){
        return errorResponse(res, 422, error)
    }
}

export const saveChatToGroup = async (req:any, res:any)=>{
    const GROUP_ID = req.params.GROUP_ID;
    const MESSAGE = req.body.MESSAGE
    if(!GROUP_ID) return errorResponse(res, 422, 'GROUP_NAME is required!')
    if(!MESSAGE) return errorResponse(res, 422, ' MESSAGE is required!')
    try{
        const GROUP_DATA = await groupModule.getGroup({ _id: GROUP_ID });
        if(!GROUP_DATA) return errorResponse(res, 422, 'group id is invalid!')
        const USER_DATA = await userModule.findUser({_id:req.user._id});
        const isEXIST = await isUserExistInGroup(GROUP_ID, USER_DATA.Groups);
        if(!isEXIST){
            return errorResponse(res, 422, 'you are not member of this group');
        }else{
            const data ={
                from: req.user._id,
                to: GROUP_ID,
                text: MESSAGE 
            }
            await messageModule.saveChat(data)
            return succesResponse(res, 200, 'message sand to group successfully!')
        }
    }catch(error){
        return errorResponse(res, 422, error)
    }
}

async function isAdminExist(ID:any, ADMINS:any){
    for(let i=0; i < ADMINS.length; i++){
        if(ID == ADMINS[i].ADMIN_ID){
            return true;
        }
        if(i == ADMINS.length-1) return false;
    }
}

async function isUserExistInGroup(ID:any, GROUPS:any) {
    for(let i=0; i < GROUPS.length; i++){
        if(ID == GROUPS[i].groupId){
            return true;
        }
        if(i == GROUPS.length-1) return false;
    }
}