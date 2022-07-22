import { getCookie } from "../cookie"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../cookie"
import axios from "axios"
import { RunningOn } from "../Functions"
import { useEffect, useState } from "react"

const SingUpButtom = () =>{
    const navigate = useNavigate()
    const name = getCookie('name')
    const email = getCookie('email')
    const pass = getCookie('pass')
    const [Content, setContent] = useState(
        <div className="SingUpButtom" onClick={()=>navigate('register')}>
            <span>ورود / عضویت</span>
        </div>);

    const handleLogin = ()=>{
        if(name!='' && email!='' && pass!=''){
            axios({
                method:'POST',
                url:RunningOn+'/sing/loing',
                data:{email:email,pass:pass}
            }).then(Response=>{
                if(Response.data.replay){
                    setContent(
                        <div className="SingUpButtom">
                            <span>{name}</span>
                        </div>
                    )
                }else{
                    setCookie('name','', 0)
                    setCookie('email','', 0)
                    setCookie('pass','', 0)
                    setContent(
                        <div className="SingUpButtom" onClick={()=>navigate('register')}>
                            <span>ورود / عضویت</span>
                        </div>
                    )
                }
            })

        }else{
            setCookie('name','', 0)
            setCookie('email','', 0)
            setCookie('pass','', 0)
            setContent(
                <div className="SingUpButtom" onClick={()=>navigate('register')}>
                    <span>ورود / عضویت</span>
                </div>
            )
        }
    }


    useEffect(handleLogin,[])
    return(
        <div>
            {Content}
        </div>
    )

}

export default SingUpButtom