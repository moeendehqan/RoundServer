import axios from "axios"
import { useState, useEffect } from "react";
import { RunningOn } from "../../componet/Functions";

const MarketBand = (props) =>{
    const [DateStr, setDateStr] = useState('امروز');
    const [dataIndex, setdataIndex] = useState({indexBourse:'0',indexBourseHam:"0",indexBourseHamPrc:"0",indexBoursePrc:"0",seke:"0",sekePrc:"0"});

    const handleDateStr = ()=>{axios({method:'GET',url:RunningOn+'/date/today'}).then(Response=>{setDateStr(Response.data)})}
    const handledataIndex = ()=>{axios({method:'GET',url:RunningOn+'/api/bfindex'}).then(Response=>{setdataIndex(Response.data)})}

    useEffect(handleDateStr,[])
    useEffect(handledataIndex,[60*1000])

    return(
        <div className="MarketBand">
            <img src="img/hmbmenu.png" alt="Menu" onClick={()=>props.SetShowMenu(!props.ShowMenu)}></img>
            <p>{DateStr}</p>
            <div>
                <p>شاخص کل</p>
                <p className={dataIndex.indexBoursePrc>0?"PrcPos":"PrcNeg"}>({dataIndex.indexBoursePrc>0?"+":""}{(dataIndex.indexBoursePrc).toLocaleString()})</p>
                <p>{(dataIndex.indexBourse).toLocaleString()}</p>
            </div>
            <div>
                <p>شاخص هموزن</p>
                <p className={dataIndex.indexBourseHamPrc>0?"PrcPos":"PrcNeg"}>({dataIndex.indexBourseHamPrc>0?"+":""}{(dataIndex.indexBourseHamPrc).toLocaleString()})</p>
                <p>{(dataIndex.indexBourseHam).toLocaleString()}</p>
            </div>
            <div>
                <p>سکه امامی</p>
                <p className={dataIndex.sekePrc>0?"PrcPos":"PrcNeg"}>({dataIndex.sekePrc>0?"+":""}{(dataIndex.sekePrc).toLocaleString()})</p>
                <p>{(dataIndex.seke).toLocaleString()}</p>
            </div>
        </div>
    )
}
export default MarketBand