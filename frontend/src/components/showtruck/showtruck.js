import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../../containers/sidebar/sidebar";
import "./showtruck.css"
import Cookies from 'js-cookie'
import PaginatedOffice from "../../containers/paginate/officepaginate"
import PaginatedDriver from "../../containers/paginate/driverpaginate";
import PaginatedTruck from "../../containers/paginate/truckpaginate";

const ShowTruck = ()=>{

    const navigate =useNavigate();

    // filterdata 
    const [filterData, setFilterData] = useState([])

    // truck data 
    const [truckData,settruckData]=useState([])
    // office data
    const [officeData,setofficeData]=useState([])
    // driver data
    const [driverData, setdriverData] = useState([])


    const [apiCallDone,setApiCallDone]=useState(false)
    const [truckButton, setTruckButton] = useState(true)
    const [driverButton, setdriverButton]=useState(false)
    const [officeButton, setofficeButton]=useState(false)

    const [searchInput, setSearchInput] = useState("");


    useEffect(()=>{
        if (!apiCallDone){
           axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")
           axios.get("http://localhost:9000/tms/user/user-details")
           .then((res)=>{
            if (res.data.Success){
                console.log(res.data.Data.TruckDetails)
                settruckData(res.data.Data.TruckDetails)
                setApiCallDone(true)
                setFilterData(truckData)
            }else{
                setApiCallDone(true)
            }
           })
        }
    })

    useEffect(()=>{
        if (driverButton === true){
            setFilterData(driverData)
            // console.log("use effect driver filter data", filterData)
        }else if (officeButton === true){
            setFilterData(officeData)
            // console.log("use effect office filter data", filterData)
        }else if (truckButton === true){
            setFilterData(truckData)
            // console.log("use effect truck filter data", filterData)
        }
    },[driverButton, officeButton, truckButton, driverData, officeData, truckData])

    const handleAddTruckButton = ()=>{
        navigate("/add-truck");
    }

    const handleOfficeButton = ()=>{
        axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")
           axios.get("http://localhost:9000/tms/office/")
           .then((res)=>{
            if (res.data.Success){
                console.log(res.data.Data)
                setofficeData(res.data.Data)
                setTruckButton(false)
                setdriverButton(false)
                setofficeButton(true)
                setFilterData(officeData)
            }else{
                console.log(res.data.Message)
            }
        })
    }

    const handleDriverButton = ()=>{
        axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")
            axios.get("http://localhost:9000/tms/driver/")
           .then((res)=>{
            if (res.data.Success){
                console.log(res.data.Data)
                setdriverData(res.data.Data)
                setTruckButton(false)
                setofficeButton(false)
                setdriverButton(true)
                setFilterData(driverData)
            }else{
                console.log(res.data.Message)
            }
        })
    }

    const handleTruckButton = ()=>{
        setofficeButton(false)
        setdriverButton(false)
        setTruckButton(true)
        setFilterData(truckData)
    } 

    const handleSearchButton = (data,e) =>{
        setSearchInput(e.target.value)
        if (e.target.value === ""){
            setFilterData(data)
        }else{
            setFilterData (data.filter((dd) => {
                return dd.Name.toLowerCase().includes(e.target.value.toLowerCase()) 
        }))  
        }
    }

    const handleTruckSearchButton = (data, e)=>{
        setSearchInput(e.target.value)
        if (e.target.value === ""){
            setFilterData(data)
        }else{
            setFilterData (data.filter((dd) => {
            return dd.truck_no.includes(e.target.value)
        }))   
        }
    }

    return(
        <div className="main-container">
            <Sidebar />
            <div className="showtruck">
            <>
            
            {officeButton === true?
            <div>
                <div id="showtruck-top">
                    <h2>Office Details
                        <button onClick={handleAddTruckButton}>Add Truck</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleDriverButton}>Show Driver</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleTruckButton}>Show Truck</button>  
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <input
                            placeholder="Search here"
                            onChange={(e)=>handleSearchButton(officeData, e)}
                            value={searchInput} 
                        />
                    </h2>
                </div>
                <div className="content">
                    {officeData.length === 0 ? 
                        <div id="nodata" >
                            <p>No office details to show</p>
                            <button>Add Office details</button>
                        </div>
                    :<PaginatedOffice itemsperpage={6} officeDetails={filterData}/>}             
                </div>
            </div>:<p></p>}


            {driverButton === true?
            <div>
                <div id="showtruck-top">
                    <h2>Driver Details 
                        <button onClick={handleAddTruckButton}>Add Truck</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleTruckButton}>Show Trucks</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleOfficeButton}>Show Office</button>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <input
                            placeholder="Search here"
                            onChange={(e)=>handleSearchButton(driverData, e)}
                            value={searchInput} 
                        />
                    </h2>
                </div>  
                <div className="content">
                    {driverData.length === 0 ? 
                        <div id="nodata" >
                            <p>No Driver details to show</p>
                            <button>Add Driver details</button>
                        </div>
                    :<PaginatedDriver itemsperpage={3} driverDetails={filterData}/>}             
                </div>
            </div>:<p></p>}

            
            {truckButton === true? 
            <div>
                <div id="showtruck-top">
                   <h2>Truck Details 
                        <button onClick={handleAddTruckButton}>Add Truck</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleDriverButton}>Show Driver</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleOfficeButton}>Show Office</button>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <input
                            placeholder="Search here"
                            onChange={(e)=>handleTruckSearchButton(truckData, e)}
                            value={searchInput} 
                        />
                    </h2>
                </div>  
                <div className="content">
                    {truckData.length === 0 ? 
                            <div id="nodata" >
                                <p>No Truck details to show</p>
                            </div>
                        :<PaginatedTruck itemsperpage={3} truckDetails={filterData}/>}             
                </div>
            </div>:<p></p>
            }
            
            </>      
            </div>
        </div>
    )
}

export default ShowTruck;

