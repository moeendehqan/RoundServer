import { getCookie } from "../cookie"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { CheakLogin } from "../../componet/CheakLogin";

const SingUpButtom = () =>{
    const navigate = useNavigate()
    const name = getCookie('name')
    const [Content, setContent] = useState(
        <div className="SingUpButtom" onClick={()=>navigate('register')}>
            <span>ورود / عضویت</span>
        </div>);

    const handleButton=()=>{
        CheakLogin().then(r=>{
            if(r.replay){
                console.log('ok')
                setContent(
                    <div className="SingUpButtom">
                        <span>{name}</span>
                    </div>
                )
        navigate('../')

                
            }else{
                setContent(
                    <div className="SingUpButtom" onClick={()=>navigate('register')}>
                        <span>ورود / عضویت</span>
                    </div>
                )
            }
        })
    }


    useEffect(handleButton,[name])

    return(
        <div>
            {Content}
        </div>
    )

}

export default SingUpButtom