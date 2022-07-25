import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const ToolBox  = () =>{
    const [Section, setSection] = useState({value:false,PerBuy:false});
    const location = useLocation();

    const handleSection = () => {
        setSection({...Section, value: location.pathname.search('market/buyper')>0})
    }

    useEffect(handleSection,[location])

    return(
        <div className="ToolBox">
            {!Section?null:
                <div>

                </div>}
        </div>
    )
}

export default ToolBox