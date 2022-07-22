import { useEffect, useState } from "react"
import { useLocation , useNavigate} from "react-router-dom"
import Alarm from "../../componet/msg/Alarm";
const VerificationCode = ()=>{
    const location = useLocation()
    const navigate = useNavigate()
    const [code , setCode ] = useState('')
    const [msg , setMsg ] = useState(null)
    const cheackAllow = ()=>{if (location.state==null){navigate('../register')}}
    const handleVerificationCode = ()=>{
        if(code==''){
            setMsg('کد تایید را وارد کنید')
        }
        navigate('../confirmed', {state:{code:code}})
    }
    useEffect(cheackAllow,[])
    return(
        <div className="VerificationCode">
            <img src="img/verifiemail.png" alt="VerificationCode"></img>
            <h6>کد تایید ایمیل را وارد کنید</h6>
            <input onChange={(e)=>setCode(e.target.value)}></input>
            <button onClick={handleVerificationCode}>تایید</button>
            <p>شما همچنین میتوانید از طریق لینک ضمیمه ایمیل خود نیز اقدام فرمایید</p>
            <Alarm msg={msg} SetStaite={setMsg} type='ErrorAlarm'/>

        </div>
    )
}

export default VerificationCode