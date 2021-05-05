import message from './message';


let messageModule: any = {}
messageModule.userType = message.modelName;

messageModule.saveChat = async function(data: any) {
    return await new message(data).save();
}

messageModule.fetchChat = async function(to:any, from:any) {
    return await message.find( 
        { 
            $or: [ 
                    { 
                        $and: [ 
                            { 
                                to: to 
                            },
                            {
                                from: from
                            } 
                        ] 
                    },
                    { 
                        $and: [ 
                            { 
                                to: from 
                            },
                            {
                                from: to
                            } 
                        ] 
                    }  
            ] 
        }
    )       
}

export default messageModule;