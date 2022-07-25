 import { useNavigate } from "react-router-dom"

 const TopMenu = () =>{
    const navigate = useNavigate()
    return(
        <div className="TopMenu">
            <button onClick={()=>navigate('market')}>دیده بان</button>
            <button>خلاصه بازار</button>
            <button>فیلتر</button>
            <button>هشدار</button>
            <button>تعرفه ها</button>
            <button>مقالات</button>
        </div>
    )
 }

 export default TopMenu