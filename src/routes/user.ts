import express, {Router} from "express"
import { userSignup, userLogin, addFriend, saveChatOneToOne, getChat } from "../controllers/user"
import { authorize } from '../services/authorization'
import roles from '../services/roles'
const route = Router();

route.post('/signup', userSignup)
route.post('/login', userLogin)
route.post('/add-friend',authorize(roles.User), addFriend)
route.post('/save-chat/:id',authorize(roles.User), saveChatOneToOne)
route.get('/get-chat/:toId',authorize(roles.User), getChat)


// route.post('/forgot-password', forgotPassword)
// route.post('/update-Password', updatePassword)
// route.get('/user-post', authorize([roles.User,roles.Viewer]), userPost)

export default route;

