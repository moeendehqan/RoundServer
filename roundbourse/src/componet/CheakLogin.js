import { getCookie ,setCookie} from "./cookie"
import { RunningOn } from "./Functions"
import { useState } from "react"
import axios from "axios"
export const CheakLogin = async () =>{
    const name = getCookie('name')
    const email = getCookie('email')
    const pass = getCookie('pass')
    var retrnLoin = {replay:false};

    if(name!='' && email!='' && pass!=''){
        await axios({
            method:'POST',
            url:RunningOn+'/sing/loing',
            data:{email:email,pass:pass}
        }).then(Response=>{
            if(Response.data.replay){
                retrnLoin = {replay:true, name:name}
            }else{
                setCookie('name','', -1)
                setCookie('email','', -1)
                setCookie('pass','', -1)
                retrnLoin = {replay:false, name:name}
            }
        })

    }else{
        setCookie('name','', -1)
        setCookie('email','', -1)
        setCookie('pass','', -1)
        retrnLoin = {replay:false, name:name}
    }
    return retrnLoin
}

