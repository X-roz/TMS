import axios from "axios";
import { useEffect,useState } from "react";
import Sidebar from "../../containers/sidebar/sidebar";
import "./showtruck.css"
import Cookies from 'js-cookie'
axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")

const ShowTruck = ()=>{
    
    const [data,setData]=useState([])
    const [apiCallDone,setApiCallDone]=useState(false)
    useEffect(()=>{
        if (!apiCallDone){
           axios.get("http://localhost:9000/tms/user/user-details?user_id="+Cookies.get("user_id"))
           .then((res)=>{
            if (res.data.Success){
                console.log(res.data.Data)
                setData(res.data.Data.TruckDetails)
                setApiCallDone(true)
            }else{
                console.log(res.data.Message)
                setApiCallDone(true)
            }
           })
        }

    })

    return(
        <div className="main-container">
            <Sidebar />
            <div className="showtruck">
            <div id="showtruck-top">
                <h2>Truck Details</h2>
            </div>  
            <div className="content">
            {data.map((truck,index) =>(
                <div className="truck-preview">
                    <div  key={truck.truck_no}>
                        <button>{ truck.truck_no }</button>
                    </div>
                </div>
            )
            )}
            </div>      
            </div>
        </div>
    )
}

export default ShowTruck;

