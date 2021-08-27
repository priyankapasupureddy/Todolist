import React,{useState} from 'react';
import Task from './Task';
import Sidebar from './Sidebar';


const Content = () => {
    const [selectedtab, setselectedtab] = useState("INBOX")
    return (
        <section className="content">
            <Sidebar selectedtab={selectedtab} setselectedtab={setselectedtab} />
            <Task selectedtab={selectedtab}/>
        </section>
    )
}

export default Content
