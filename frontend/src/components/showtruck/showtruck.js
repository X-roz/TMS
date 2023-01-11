import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../../containers/sidebar/sidebar";
import "./showtruck.css"
import Cookies from 'js-cookie'


const ShowTruck = ()=>{

    const navigate =useNavigate();

    const [data,setData]=useState([])
    const [apiCallDone,setApiCallDone]=useState(false)
    // const [dataCheck, setDataCheck]=useState(false)
    useEffect(()=>{
        if (!apiCallDone){
           axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")
           axios.get("http://localhost:9000/tms/user/user-details")
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

    const handleTruckDetailsbutton=(truck_no, e)=>{
        e.preventDefault()
        console.log(truck_no)
    }

    const handleAddTruckButton = ()=>{
        navigate("/add-truck");
    }
    
    return(
        <div className="main-container">
            <Sidebar />
            <div className="showtruck">
            <div id="showtruck-top">
                <h2>Truck Details <button onClick={handleAddTruckButton}>Add Truck</button></h2>
            </div>  
            <div className="content">
            {data.map((truck,index) =>(
                <div className="truck-preview">
                    <div  key={truck.truck_no}>
                        <button onClick={(e) => handleTruckDetailsbutton(truck.truck_no, e)}>{ truck.truck_no }</button>
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

