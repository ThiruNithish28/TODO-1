import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faCheck, faPen } from "@fortawesome/free-solid-svg-icons"

export default function TaskBox({task, onDelete, onCompleted, onEdit}){

    return(
        <div className="taskBox">
            <div>
            {task.isCompleted ? <h3 className="taskCompleted">{task.taskName}</h3> : <h3>{task.taskName}</h3>}
            <span>{task.desc}</span>
            <span>{task.date}</span>
            </div>
           
            <div className="taskBox-icons">
                
                <FontAwesomeIcon icon={faPen} className="icon-btn icon-btn__primary" onClick={()=>onEdit(task.id)}/>
               
                <FontAwesomeIcon icon={faCheck} className="icon-btn icon-btn__secondray" onClick={()=> onCompleted(task.id)}/>
                
                <FontAwesomeIcon icon={faTrash} className="icon-btn icon-btn__danger " onClick={()=> onDelete(task.id)}/>
            </div>
        </div>
    )
}