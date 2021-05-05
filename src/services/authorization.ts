import expressJwt from "express-jwt"
import userModule from "../models/users/index"
import { errorResponse } from "./response"
const adminModule={}
export const authorize = (role:any)=>{

	if (typeof role == 'string') {
		role = [role]
	}
	return [
		expressJwt({ secret:'hgsdyugsugdcuysfyt', algorithms: ['HS256'] }),
		(req:any, res:any, next:any) => {
			if (role.length && !role.includes(req.user.role)) {
				return res.status(401).json({ message: 'Unauthorized' })
			}
			switch (req.user.role) {
			case 'User':
                userModule.findUser({email:req.user.email})
					.then((user:any) => {
						if (user) {
							if (!user) return errorResponse(res, 404, 'User Not Found')
							delete user.password
							req.user = user
							req.userType = 'User'
							next()
						} else {
							return res.status(404).json({ message: 'User Not Found' })
						}
					})
				break
			default:
				return res.status(404).json({ message: 'User Not Found' })
			}
		},
	]
}
