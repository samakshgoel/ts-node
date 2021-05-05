import { errorResponse, succesResponse } from '../services/response'
import userModule from '../models/users/index';
import messageModule from '../models/messages/index';
import jwt from 'jsonwebtoken'
import groupModule from '../models/group';

export const userSignup = async (req:any, res:any)=>{
    let {
        body: { data : { name, email, password} },
    } = req
    const data = req.body.data;
    if (!name) return errorResponse(res, 422, 'Data is required!')
    if (!password) return errorResponse(res, 422, 'Password is required!')
    if(!email) return errorResponse(res, 422, 'email is required!')		
    try {
        const userData = await userModule.findUser({email:email})
        if(userData) return errorResponse(res, 422, 'Email already exist!')
        const saveUserData = await userModule.saveUser(data)
        return succesResponse(res, 200, saveUserData)
    } catch (error) {
        return errorResponse(res, 422, error.message)
    }
}

export const userLogin = async (req:any, res:any)=>{
    let {
        body: { data },
    } = req
    if (!data.email) return errorResponse(res, 422, 'Email is required!')
    if (!data.password) return errorResponse(res, 422, 'Password is required!')	
    console.log()		
    try {
        let userData:any = await userModule.findUser({email:data.email})
        if(!userData) return errorResponse(res, 422, 'user not exist!')
        if(userData.password !== data.password) return errorResponse(res, 422, 'password not match');
        const payload={
            email: userData.email,
            id: userData._id,
            role: "User"
        }
        const friendList = await getFriendList(userData.Friends )
        const groopList = await getGroupList( userData.Groups )
        let token = await jwt.sign(payload, 'hgsdyugsugdcuysfyt', { expiresIn: '24hr' })
        return succesResponse(res, 200, {token:token, Friends:friendList, Groups:groopList});
    } catch (error) {
        return errorResponse(res, 422, error.message)
    }
}

export const addFriend = async (req:any, res:any)=>{
    const email = req.body.email;
    if(!email) return errorResponse(res, 422, 'email is required!');
    try {
        const friendData:any = await userModule.findUser({email:email});
        if(!friendData) return errorResponse(res, 422, "user not exist!");
        const userData:any = await userModule.findUser({email:req.user.email});
        const isExist = await isFriendExist(friendData._id,userData.Friends);
        if(!isExist){
            userData.Friends.push({ friendId:friendData._id, isFriend:true });
            friendData.Friends.push({friendId:req.user._id});
            await userModule.updateUser(userData._id, userData);
            await userModule.updateUser(friendData._id, friendData);
            return succesResponse(res, 200, 'add friend successfully!');
        }else{
            return errorResponse(res, 422, 'already exist this person in your friend list!');
        }
    } catch (error) {
        return errorResponse(res, 422, error.message);
    }
}

export const saveChatOneToOne = async (req:any, res:any)=>{
    const id = req.params.id
    try {
        if(!req.body.message) return errorResponse(res, 422, 'message is require!')
        if(!id) return errorResponse(res, 422, 'id message is require!')
        const data ={
            from: req.user._id,
            to: id,
            text: req.body.message 
        }
        await messageModule.saveChat(data)
        return succesResponse(res, 200, 'message sand successfully!')        
    } catch (error) {
        return errorResponse(res, 422, error.message)
    }
}

export const getChat = async (req:any, res:any)=>{
    const toId = req.params.toId
    const fromId = req.user._id
    if(!toId) errorResponse(res, 422, 'to id is required!')
    if(!fromId) errorResponse(res, 422, 'to id is required!')
    try {
        const chatData = await messageModule.fetchChat(toId,fromId)
        return succesResponse(res, 200, chatData)        
    } catch (error) {
        return errorResponse(res, 422, error.message)
    }
}

// export const aproveRequest = async (req:any, res:any)=>{
//     try {
//         return succesResponse(res, 200, '')        
//     } catch (error) {
//         return errorResponse(res, 422, error.message)
//     }
// }


/* function for get friends list */
async function getFriendList(friends:any){
    if(friends.length > 0){
        const list = []
        for(let i = 0 ;i< friends.length; i++){
            let friendData = await userModule.findUser({ _id: friends[i].friendId });
            list.push({id:friendData._id, name: friendData.name, email:friendData.email, isFriend: friends[i].isFriend})
            if(i === friends.length -1){
                return list
            }
        }
    }else{
        return [];
    }
}

/* function for get groups list */
async function getGroupList(groups:any){
    if(groups.length > 0){
        const list = []
        for(let i = 0 ;i< groups.length; i++){
            let groupData = await groupModule.getGroup({ _id: groups[i].groupId});
            list.push({id:groupData._id, name: groupData.GROUP_NAME})
            if(i === groups.length -1){
                return list
            }
        }
    }else{
        return [];
    }
}

async function isFriendExist(id:any, friends:any){
    for(let i=0; i < friends.length; i++){
        if(id == friends[i].friendId){
            return true;
        }
        if(i == friends.length-1) return false;
    }
}