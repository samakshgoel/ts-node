import express, {Router} from "express"
import { authorize } from '../services/authorization'
import roles from '../services/roles'
import { createGroup, addUserToGroup, saveChatToGroup } from '../controllers/group'
const route = Router();

route.post('/create-group', authorize(roles.User), createGroup)
route.put('/add-user-to-group/:GROUP_ID', authorize(roles.User), addUserToGroup)
route.put('/save-chat-to-group/:GROUP_ID', authorize(roles.User), saveChatToGroup)

export default route;

