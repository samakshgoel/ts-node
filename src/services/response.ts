
export const errorResponse = (res:any, status:any, message:any)=>{
    return res.status(status).send({ code: status, status: 'Failure', message: message })
}

 export const succesResponse = (res:any, status:any, data:any)=>{
    return res.status(status).send({ code: status, status: 'Success', data: data })
}
