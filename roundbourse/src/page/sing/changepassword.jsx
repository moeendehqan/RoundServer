import { RunningOn } from "../../componet/Functions";
import axios from "axios";
import { useEffect , useState} from "react";
import { useSearchParams , useNavigate} from "react-router-dom";
import { CheakLogin } from "../../componet/CheakLogin";
import Alarm from "../../componet/msg/Alarm";
import { setCookie } from "../../componet/cookie";

const ChangePassword = () =>{
    const [searchParams] = useSearchParams();
    const codeLink = searchParams.get('verificationcode')
    const navigate = useNavigate()
    const [msg, setMsg] = useState(null);
    const [typemsg, settypemsg] = useState(null);
    const [password, setPassword] = useState('');

    console.log(password)
    const handleAllow = ()=>{
        CheakLogin().then(r=>{
            if (r.replay){
                navigate('../')
            }
        })
    }

    const applyChangePassword = ()=>{
        if(password.length<4){
            settypemsg('ErrorAlarm')
            setMsg('رمزعبور میبایست بیش از 4 کارکتر باشد')
        }else{
            axios({
                method:'POST',
                url:RunningOn+'/sing/applychangepassword',
                data:{code:codeLink,password:password}
            }).then(Response=>{
                if(Response.data.replay){
                    setCookie('name',Response.data.data.fullname, 5)
                    setCookie('email',Response.data.data.email, 5)
                    setCookie('pass',password, 5)
                    navigate('../')
                    window.location.reload(); 
                }else{
                    settypemsg('ErrorAlarm')
                    setMsg('مشکلی پیش آمده است لطفا مجدد تلاش کنید')
                }
            })
        }
    }


    const handleChangePassword=()=>{
        if(codeLink!=null){
            axios({
                method:'POST',
                url:RunningOn+'/sing/changepassword',
                data:{code:codeLink}
            }).then(Response=>{
                if(!Response.data.replay){
                    settypemsg('ErrorAlarm')
                    setMsg('مشکلی پیش آمده است لطفا مجدد تلاش کنید')
                }
            })
        }else{
            navigate('../register')
        }
    }

    useEffect(handleAllow,[])

    useEffect(handleChangePassword,[])
    return(
        <div className="ChangePasswordContiner">
            <input type='password' placeholder="رمزعبور" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={applyChangePassword}>تایید</button>
            <Alarm msg={msg} SetStaite={setMsg} type={typemsg}/>
        </div>
    )
}

export default ChangePassword