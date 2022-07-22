import { useState, useEffect} from "react";
import { validateEmail ,RunningOn} from "../../componet/Functions";
import axios from "axios";
import { setCookie } from "../../componet/cookie";
import Alarm from "../../componet/msg/Alarm";
import { CheakLogin } from "../../componet/CheakLogin";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate()
    
    const handleAllow = ()=>{
        CheakLogin().then(r=>{
            if (r.replay){
                navigate('../')
            }
        })
    }


    const handleRergister = ()=>{
        setMsg(null)
        if(!validateEmail(email)){
            setMsg('ایمیل را به صورت صحیح وارد کنید')
        }else if(password.length<4){
            setMsg('رمزعبور میبایست بیشتر از 4 رقم باشد')
        }else{
            axios({
                method:"POST",
                url:RunningOn+'/sing/loing',
                data:{
                    email:email,
                    pass:password
                }
            }).then(Response=>{
                if(!Response.data.replay){
                    setMsg('ایمیل یا نام کاربری صحیح نیست')
                }else if(!Response.data.data.confirmed){
                    setMsg('حساب کاربری شما هنوز تایید نشده لطفا ایمیل خود را تایی کنید')
                }else{
                    setCookie('name',Response.data.data.fullname, 5)
                    setCookie('email',email, 5)
                    setCookie('pass',password, 5)
                }
            })
        }

    }

    useEffect(handleAllow,[])
    return(
        <div className="Login">
            <img src="img/login.png" alt="login"></img>
            <h3>ورود</h3>
            <input placeholder="ایمیل" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type='password' placeholder="رمزعبور" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={handleRergister}>ورود</button>
            <p onClick={()=>navigate('../forget')}>بازیابی رمزعبور</p>
            <Alarm msg={msg} SetStaite={setMsg} type='ErrorAlarm'/>
        </div>
    )
}

export default Login