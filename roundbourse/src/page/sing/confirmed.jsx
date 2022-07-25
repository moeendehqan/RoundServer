import axios from "axios";
import { useEffect ,useState} from "react";
import { useSearchParams } from "react-router-dom";
import { RunningOn } from "../../componet/Functions"
import { useLocation , useNavigate} from "react-router-dom";
import { setCookie } from "../../componet/cookie";

const Confirmed = ()=>{
    const [searchParams] = useSearchParams();
    const codeLink = searchParams.get('verificationcode')
    const location = useLocation()
    const navigate = useNavigate()
    const [returnConfirm, setReturnConfirm] = useState(null);
    const confirmed = (replay, name, email, pass)=>{
        if(replay){
            setCookie('name',name, 5)
            setCookie('email',email, 5)
            setCookie('pass',pass, 5)
            return(
                <div className="Confirmed">
                    <img src="img/ok.png"></img>
                    <h3>{name} عزیز</h3>
                    <p>حساب کاربری شما فعال شد</p>
                </div>
            )
        }else{
            return(
                <div className="Confirmed">
                    <img src="img/not.png"></img>
                    <h3>کاربر عزیز</h3> 
                    <p>یک مشکل پیش امده لطفا مجدد تلاش کنید</p> 
                    <button onClick={()=>navigate('../verification')}>دوباره</button>
                </div>
            )
        }

    }
    const handleVerificationCode = ()=>{
        if(codeLink!=null){
            axios({
                method:'POST',
                url:RunningOn+'/sing/verificationcode',
                data:{code:codeLink}
            }).then(Response=>{
                setReturnConfirm(confirmed(Response.data.replay, Response.data.data.fullname, Response.data.data.email, Response.data.data.password))
            })
        }else if(location.state!=null){
            axios({
                method:'POST',
                url:RunningOn+'/sing/verificationcode',
                data:{code:location.state.code}
            }).then(
                Response=>{setReturnConfirm(confirmed(Response.data.replay, Response.data.data.fullname, Response.data.data.email, Response.data.data.password))
            })
        }else{
            navigate('../register')
        }
    }
    useEffect(handleVerificationCode,[])

    return(
        <div>
            {returnConfirm}
        </div>
    )
}

export default Confirmed