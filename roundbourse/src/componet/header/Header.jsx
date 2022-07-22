import SingUpButtom from "./singupbuttom"
import SercheHeader from "./serche"
import TopMenu from "./topmenu"
import { useNavigate } from "react-router-dom"

const Header = () =>{
  const navigate = useNavigate()
    return(
        <div className="Header">
            <div className="HeaderContiner">
              <SingUpButtom />
              <SercheHeader />
              <TopMenu />
              <div className="logo">
                <h5>رند بورس</h5>
                <img  src='img/logo.png' alt="roundbourse"></img>
              </div>

            </div>
        </div>
    )
}

export default Header