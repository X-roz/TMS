import "./sidebar.css"
import SidebarData from "./sidebarData";
import { useNavigate } from "react-router";
import SpaSharpIcon from '@mui/icons-material/SpaSharp';

const Sidebar = ()=>{

    const navigate=useNavigate();

    return(
        <div className='sidebar'>
           <SpaSharpIcon id="head-icon" /> 
           <p>Truck Management</p>
           <ul className="sidebarlist">
               {SidebarData.map((val,key)=>{

                   return <li key={key} 
                              className="row"
                              id={window.location.pathname === val.link ? "active" : "" }
                              onClick = {()=>{console.log(val.link);navigate(val.link);}}>
                             {" "}
                             <div id="icon">{val.icon}</div>
                             <div id="title">{val.title}</div>
                          </li>
               })}
           </ul>
        </div>
    );
}


export default Sidebar;

