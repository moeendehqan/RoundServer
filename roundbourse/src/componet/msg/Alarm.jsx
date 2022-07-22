

const Alarm = (props) =>{

    if(props.msg!=null){
    return(
        <div className={props.type}>
            {props.msg}
        </div>
        
    )}
}

export default Alarm