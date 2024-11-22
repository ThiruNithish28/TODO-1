import { useState } from "react"

export default function Form(){

    const [formDetails, setFormDetails] = new useState({
        taskName: "",
        desc:"",
        category:"",
        date:""
    }) 

    const handleFormInput =({target: {name,value}})=>{
        setFormDetails((formDetails)=>({...formDetails,[name]: value}));
    }

    return(<>
        <form action="">
            <div>
                <label>task name</label>
                <input type="text" name="taskName" id="task-name" value={formDetails.taskName} onChange={handleFormInput} />
            </div>

            <div>
                <label>details</label>
                <input type="text" name="desc" id="desc" value={formDetails.desc} onChange={handleFormInput} />
            </div>

            <div>
                <label>category</label>
                <input type="text" name="category" id="task-category" value={formDetails.category} onChange={handleFormInput} />
            </div>
            
            <div>
                <label>Date</label>
                <input type="date" name="date" id="task-date" value={formDetails.date} onChange={handleFormInput} />
            </div>

        </form>

        <div>
           <li>{formDetails.taskName}</li>
           <li>{formDetails.desc}</li>
           <li>{formDetails.category}</li>
           <li>{formDetails.date}</li>
        </div>
    </>)
}