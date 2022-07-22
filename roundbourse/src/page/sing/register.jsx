import Alarm from "../../componet/msg/Alarm";
import { validateEmail ,RunningOn} from "../../componet/Functions";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheakLogin } from "../../componet/CheakLogin";

const Register = () =>{
    const [msg, setMsg] = useState(null);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        if(fullname.length<=3 && fullname===''){
            setMsg('نام را به صورت صحیح وارد کنید')
        }else if(!validateEmail(email)){
            setMsg('ایمیل را به صورت صحیح وارد کنید')
        }else if(password.length<4){
            setMsg('رمزعبور میبایست بیشتر از 4 رقم باشد')
        }else{
            axios({
                method:"POST",
                url:RunningOn+'/sing/register',
                data:{
                    fullname:fullname,
                    email:email,
                    password:password
                }
            }).then(Response=>{
                if(!Response.data.replay){
                    setMsg(Response.data.msg)
                }
            })
            navigate('../verification', {state:{email:email}})
        }

    }

    useEffect(handleAllow,[])

    return(
        <div className="Register">
            <div className="Description">
                <h6>به جامع ترین منبع تابلوخوانی بپیوند</h6>
                <div className="DescriptionContiner">
                    <div></div>
                    <span>ارائه شاخص ها استاندارد</span>
                </div>
                <div className="DescriptionContiner">
                    <div></div>
                    <span>نظارت لحظه ای بر نماد ها</span>
                </div>
                <div className="DescriptionContiner">
                    <div></div>
                    <span>دسترسی سریع و راحت تحولات بازار</span>
                </div>
            </div>
            <div className="Form">
                <img src="img/register.png" alr='register'></img>
                <h6>ثبت نام</h6>
                <input placeholder="نام کامل" value={fullname} onChange={(e)=>setFullname(e.target.value)}></input>
                <input placeholder="ایمیل" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type='password' placeholder="رمزعبور" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button onClick={handleRergister}>ثبت</button>
                <span onClick={()=>navigate('../login')}>قبلا ثبت نام کرده اید، ورود</span>
                <Alarm msg={msg} SetStaite={setMsg} type='ErrorAlarm'/>
            </div>
        </div>
    )
}


export default Register