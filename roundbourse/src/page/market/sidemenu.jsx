import { useNavigate } from "react-router-dom"

const SideMenu = () =>{
    const navigate = useNavigate()

    return(
        <div className="MarketSideMenu">
            <button onClick={()=>navigate('buyper')}>سرانه خرید</button>
            <button>سرانه خروش</button>
            <button>قدرت خریداران به فروشندگان</button>
            <button>سفارشات باز خرید</button>
            <button>سفارشات باز فروش</button>
            <button>خالص سفارشات باز</button>
            <button>ورود پول حقیقی</button>
            <button>صف خرید</button>
            <button>صف فروش</button>
        </div>
    )
}

export default SideMenu