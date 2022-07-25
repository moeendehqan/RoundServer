import { useState } from "react";
import {Outlet} from 'react-router-dom'
import MarketBand from "./marketband"
import SideMenu from "./sidemenu"
import ToolBox from "./ToolBox";
const Market = () =>{
    const [SideMenuShow, setSideMenuShow] = useState(true);
    const [Section, setSection] = useState('TradeValue');



    return(
        <div className="Market">
            <MarketBand ShowMenu ={SideMenuShow} SetShowMenu={setSideMenuShow}/>
            <div className="MarketDesk">
               {SideMenuShow?<SideMenu />:null}
               <Outlet />
            </div>
            <ToolBox />
        </div>
    )
}

export default Market