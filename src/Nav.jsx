import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faCalendarAlt, faComments, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Nav(){
    
    return(
        <nav className="navbar navbar-dark  navbar-expand-lg bg-primary justify-content-between">
            <div className="container-fluid">
           
                <div className="nav-item">
                    <FontAwesomeIcon icon={faHome}/>
                </div>

                <div className="nav-item">
                    <FontAwesomeIcon icon={faCalendarAlt}/>
                </div>

                <div className="nav-item">
                    <FontAwesomeIcon icon={faUser}/>
                </div>

                <div className="nav-item">
                    <FontAwesomeIcon icon={faPlus}/>
                </div>

            </div>
            
        </nav>
    )
}