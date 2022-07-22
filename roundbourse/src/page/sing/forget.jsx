import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import { CheakLogin } from "../../componet/CheakLogin";
import axios from "axios";
import { RunningOn, validateEmail } from "../../componet/Functions";
import Alarm from "../../componet/msg/Alarm";
const Forget = ()=>{
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(null);
    const [typemsg, settypemsg] = useState(null);
    const navigate = useNavigate()

    const handleAllow = ()=>{
        CheakLogin().then(r=>{
            if (r.replay){
                navigate('../')
            }
        })
    }

    const handleChangePassword = ()=>{
        setMsg(null)
        if(email!=''){
            if(validateEmail(email)){
            axios({
                method:'POST',url:RunningOn+'/sing/forget', data:{email:email}
            }).then(Response=>{
                if(Response.data.replay){
                    settypemsg('InfoAlarm')
                    setMsg('لینک بازیابی رمز عبور به ایمیل شما ارسال شد')
                }else{
                    settypemsg('ErrorAlarm')
                    setMsg('کاربری با این ایمیل یافت نشد')
                }
        })}else{
            settypemsg('ErrorAlarm')
            setMsg('لطفا ایمیل به صورت صحیح وارد کنید')
        }
        }else{
            settypemsg('ErrorAlarm')
            setMsg('لطفا ایمیل خود را وارد کنید')
        }
    }
    useEffect(handleAllow,[])
    return(
        <div className="Forget">
            <img src="img/forget.png" alt="forget"></img>
            <h3>باز یابی رمز عبور</h3>
            <input placeholder="ایمیل" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <button onClick={handleChangePassword}>تایید</button>
            <Alarm msg={msg} SetStaite={setMsg} type={typemsg}/>
        </div>
    )
}

export default Forget