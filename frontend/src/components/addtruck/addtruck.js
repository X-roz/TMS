import { useState } from "react";
import React from "react";
import "./addtruck.css"
import Sidebar from "../../containers/sidebar/sidebar";
import DatePicker from 'react-datepicker';
import axios from "axios";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie'
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ErrorIcon from '@mui/icons-material/Error';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReactLoading from "react-loading";


const Add= () =>{

    const [truckButton, setTruckButton] = useState(true)
    const [driverButton, setdriverButton]=useState(false)
    const [officeButton, setofficeButton]=useState(false)

    const handleTruckButton = ()=>{
        setofficeButton(false)
        setdriverButton(false)
        setTruckButton(true)
    }

    const handleOfficeButton = ()=>{
        setdriverButton(false)
        setTruckButton(false)
        setofficeButton(true)
    }

    const handleDriverButton = ()=>{
        setTruckButton(false)
        setofficeButton(false)
        setdriverButton(true)
    }


    return(
        <div className="main-container">
        <Sidebar />
        <div className="showtruck">
        <>
        {truckButton === true?
        <>
            <div id="showtruck-top">
                    <h2>Add Truck Details
                        <button onClick={handleOfficeButton}>Add Office</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleDriverButton}>Add Driver</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                    </h2>
            </div>
            <AddTruck />
        </>:<></>}

        {driverButton === true?
        <>
            <div id="showtruck-top">
                    <h2>Add Driver Details
                        <button onClick={handleOfficeButton}>Add Office</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleTruckButton}>Add Truck</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                    </h2>
            </div>
            <AddDriver />
        </>:<></>}

        {officeButton === true?
        <>
            <div id="showtruck-top">
                    <h2>Add Office Details
                        <button onClick={handleDriverButton}>Add Driver</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                        <button onClick={handleTruckButton}>Add Truck</button> 
                        <p>&nbsp;&nbsp;&nbsp;</p> 
                    </h2>
            </div>
            <AddOffice/>
        </>:<></>}

        </>        
        </div>
        </div>
    );
}


function AddOffice(){

    const navigate =useNavigate();

    const [OfficeName,setOfficeName] =useState()
    const [officeDetails, setofficeDetails] = useState([])
    const [name, setName] = useState()
    const [phoneNo, setPhoneNo] = useState()

    const [show, setShow] = useState(false)
    const [loadingStatus,SetLoadingStatus] = useState(2)

    const handleAddtionalContact = (e)=>{
        setofficeDetails(()=>{
            return officeDetails.concat({"Name":name,"PhoneNo":phoneNo})           
        })
        setName("")
        setPhoneNo("")
    }

    const addOfficeButton = (e)=>{
        SetLoadingStatus(0)
        const lengthOD = officeDetails.length
        officeDetails.push({"Name":name,"PhoneNo":phoneNo})
        if (lengthOD + 1 === officeDetails.length){
            const ReqOffcieData = {
                "Name":OfficeName,
                "Details":officeDetails
            }
            console.log(ReqOffcieData)
            axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")
            axios.post("http://localhost:9000/tms/office/add-office",ReqOffcieData).then((res)=>{
                if(res.data.Success){
                    SetLoadingStatus(1)
                    setTimeout(()=>{
                        navigate("/show-truck")
                    },4000)
                }else{
                    SetLoadingStatus(1)
                    setShow(true)
                    setTimeout(()=>{
                        window.location.reload();
                    },4000)
                }
            })
        }
        
    }

    const handleReload=()=>{
        window.location.reload();
    }

    const handleDone =()=>{
        navigate("/show-truck")
    }

    return (
        <div className="office-content">
            <label>Office Name </label>
                <input 
                    type="text"
                    required        
                    value={OfficeName}
                    onChange = {(e)=>setOfficeName(e.target.value)}
                />
            <label>Person Name </label>
                <input 
                    type="text"
                    required        
                    value={name}
                    onChange = {(e)=>setName(e.target.value)}
                />
            <label>Contact Number </label>
                <input 
                    type="text"
                    maxLength={10}
                    required        
                    value={phoneNo}
                    onChange = {(e)=>setPhoneNo(e.target.value)}
                />
            <br/>
            <button onClick={handleAddtionalContact}> <AddIcCallIcon style={{fontSize: 16 }}/>  &nbsp;&nbsp; Add addtional Contact</button>
            <br/>
            <br/>
            <button onClick={addOfficeButton}>Submit</button>
            {loadingStatus === 0 ?
                <div class="overlay"> <p style={{position: "fixed", top: "5%", left: "50%"}}>
                    <ReactLoading type="spokes" color="#dd638c" height={100} width={50} />Loading
                </p> </div>
                :<>
                {loadingStatus === 1 ?
                    <>    
                    {show ? <div class="overlay"> <p><ErrorIcon style={{fontSize:"60px",color:"rgb(224, 65, 65)", textAlign:"center"}}/><br/>Something went wrong <br/> <br/> <button onClick={handleReload} style={{backgroundColor:"rgb(224, 65, 65)"}}>Reload</button></p> </div> : 
                    <div class="overlay"> <p><TaskAltIcon style={{fontSize:"60px",color:"rgb(44, 137, 44)", textAlign:"center"}}/><br/> Office Details Done Successfully <br/><br/> <button onClick={handleDone} style={{backgroundColor:"rgb(44, 137, 44)"}}>Done</button></p> </div>}
                    </>
                :null}
                </>
            }

            
        </div>
    )
}

function AddDriver(){

    const navigate =useNavigate();

    const [Name,setName] =useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Address, setAddress] = useState("")
    const [AccountNumber,setAccountNumber] = useState("")
    const [Ifsc, setIfsc] = useState("")
    const [License, setLicense] = useState(null)

    const [show, setShow] = useState(false)
    const [loadingStatus,SetLoadingStatus] = useState(2)
    
    const handleClick = ()=>{
        SetLoadingStatus(0)
        const ReqData = {
            "Name"          : Name,
            "PhoneNumber"   : PhoneNumber,
            "Address"       : Address,
            "AccountNumber" : AccountNumber,
            "IfscCode"      : Ifsc
        }
        console.log(ReqData)
        const json = JSON.stringify(ReqData);
        const blob = new Blob([json], {
          type: 'application/json'
        });
        const formData = new FormData();
        formData.append("License",License)
        formData.append("driverdetailsdoc",blob)

        axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")
        axios.post("http://localhost:9000/tms/driver/add-driver", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          }).then((res)=>{
            if(res.data.Success){
                SetLoadingStatus(1)
                    setTimeout(()=>{
                        navigate("/show-truck")
                    },4000)
            }else{
                SetLoadingStatus(1)
                setShow(true)
                setTimeout(()=>{
                    window.location.reload();
                },4000)
            }
        })
    }

    const handleReload=()=>{
        window.location.reload();
    }

    const handleDone =()=>{
        navigate("/show-truck")
    }

    return (
        <div className="driver-content">
            <div id="left-box">
                <label>Name</label>
                    <input
                        type="text"
                        required        
                        value={Name}
                        onChange = {(e)=>setName(e.target.value)}
                    />
                <label>PhoneNumber</label>
                    <input 
                        type="text"
                        maxLength={10}
                        required        
                        value={PhoneNumber}
                        onChange = {(e)=>setPhoneNumber(e.target.value)}
                    />
                <label>Address</label>
                    <input 
                        type="text"
                        required        
                        value={Address}
                        onChange = {(e)=>setAddress(e.target.value)}
                    />
            </div>
            <div id="center-box">
                <label>Account Number</label>
                    <input 
                        type="text"
                        required        
                        value={AccountNumber}
                        onChange = {(e)=>setAccountNumber(e.target.value)}
                    />
                <label>IFSC code</label>
                    <input 
                        type="text"
                        required        
                        value={Ifsc}
                        onChange = {(e)=>setIfsc(e.target.value)}
                    />
                <label>License</label>
                    <input 
                        required
                        type="file"
                        onChange={(e)=>setLicense(e.target.files[0])}
                    />
            </div>
            <button onClick={handleClick}>Submit</button>
            {loadingStatus === 0 ?
                <div class="overlay"> <p style={{position: "fixed", top: "5%", left: "50%"}}>
                    <ReactLoading type="spokes" color="#dd638c" height={100} width={50} />Loading
                </p> </div>
                :<>
                {loadingStatus === 1 ?
                    <>    
                    {show ? <div class="overlay"> <p><ErrorIcon style={{fontSize:"60px",color:"rgb(224, 65, 65)", textAlign:"center"}}/><br/>Something went wrong <br/> <br/> <button onClick={handleReload} style={{backgroundColor:"rgb(224, 65, 65)",marginRight:"25%"}}>Reload</button></p> </div> : 
                    <div class="overlay"> <p><TaskAltIcon style={{fontSize:"60px",color:"rgb(44, 137, 44)", textAlign:"center"}}/><br/> Driver Details Done Successfully <br/><br/> <button onClick={handleDone} style={{backgroundColor:"rgb(44, 137, 44)",marginRight:"25%"}}>Done</button></p> </div>}
                    </>
                :null}
                </>
            }
        </div>
    )
}

function AddTruck(){

    const navigate =useNavigate();

    const [TruckNo,setTruckNo]=useState("")
    const [EngineNo,setEngineNo]= useState("")
    const [TrDeliveryDate, setTrDeliveryDate] = useState("")
    const [FcDate,setFcDate] = useState("")
    const [InsuranceDate,setInsuranceDate] = useState("")
    const [EmiStatus, setEmiStatus] = useState(0)
    const [EmiDate,setEmiDate] =useState("")
    const [EmiAmount,setEmiAmount] =useState("")
    const [EmiDuration,setEmiduration] =useState("")
    const [Insurance, setInsurance] = useState(null);
    const [TruckRc, setTruckRc] =useState(null)
    const [NpPermit, setNpPermit] =useState(null)
    const [NpTax, setNpTax] =useState(null)
    const [QuaterTax, setQuaterTax] =useState(null)

    const [loadingStatus,SetLoadingStatus] = useState(2)
    const [show, setShow] = useState(false) 

    const emiHandler =(val) =>{
        setEmiStatus(val)
    }

    const handleSubmit =(e)=>{
        SetLoadingStatus(0)
        const TruckDetails = {"truck_no":TruckNo,
                            "engine_no": EngineNo,
                            "truck_delivery_date":TrDeliveryDate,
                            "fc_date":FcDate,
                            "insurance_date": InsuranceDate,
                            "emi_date": EmiDate,
                            "emi_amount": EmiAmount,
                            "emi_duration":EmiDuration}
        const json = JSON.stringify(TruckDetails);
        const blob = new Blob([json], {
          type: 'application/json'
        });
        const formData = new FormData();
        formData.append("TruckRc",TruckRc)
        formData.append("Insurance",Insurance)
        formData.append("NpPermit",NpPermit)
        formData.append("NpTax",NpTax)
        formData.append("QuaterTax",QuaterTax)
        formData.append("truckdetailsdoc",blob)

        axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")
        axios.post("http://localhost:9000/tms/truck/add-truck-details", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          }).then((res)=>{
            if(res.data.Success){
                SetLoadingStatus(1)
                setTimeout(()=>{
                    navigate("/show-truck")
                },4000)
            }else{
                SetLoadingStatus(1)
                setShow(true)
                setTimeout(()=>{
                    window.location.reload();
                },4000)
            }
        })
        
    }
    
    const handleDone =()=>{
        navigate("/show-truck")
    }

    const handleReload=()=>{
        window.location.reload();
    }

    return (
        <>
        <div className="driver-content">
            <div id="left-box">
                <label>Truck No </label>
                    <input 
                        type="text"
                        minLength={9}
                        maxLength={10} 
                        required        
                        value = { TruckNo }
                        onChange = { (e)=>setTruckNo(e.target.value.toUpperCase().replace(/\s/g, ''))}
                    />
                <label>Engine Number</label>
                    <input 
                        type="text" 
                        required        
                        value = { EngineNo }
                        onChange = { (e)=>setEngineNo(e.target.value)}
                    />
                <label>Truck's Delivery Date</label>
                    <DatePicker
                        selected={ TrDeliveryDate }
                        onChange={(date)=>{setTrDeliveryDate(date)}}
                        dateFormat="dd-MM-yyyy"
                    />
                <label>Truck's Fc Date</label>
                    <DatePicker
                        selected={ FcDate }
                        onChange={(date)=>{setFcDate(date)}}
                        dateFormat="dd-MM-yyyy"
                    />
                <label>Insurance Date ("DD-MM-YYYY")</label>
                    <DatePicker
                        selected={ InsuranceDate }
                            onChange={(date)=>{setInsuranceDate(date)}}
                            dateFormat="dd-MM-yyyy"
                    />
                <label>Insurance Paper</label>
                    <input  
                        type="file"
                            required 
                        onChange={(e)=>setInsurance(e.target.files[0])}
                    />
            </div>
            <div id="center-box">
                <label>Truck's RC</label>
                    <input 
                        required
                            type="file"
                        onChange={(e)=>setTruckRc(e.target.files[0])}
                    />
                <label>National Permit50</label>
                    <input 
                        required
                            type="file" 
                        onChange={(e)=>setNpPermit(e.target.files[0])}
                    />
                <label>National tax form</label>
                    <input 
                        required
                            type="file" 
                        onChange={(e)=>setNpTax(e.target.files[0])}
                    />
                <label>Quater tax form</label>
                    <input 
                        required
                            type="file" 
                        onChange={(e)=>setQuaterTax(e.target.files[0])}
                    />
                <label>Is Emi</label>
                <button  id="emibutton" onClick={(e) => emiHandler(1)}> yes </button>
                <button  id="emibutton" onClick={(e) => emiHandler(0)}> no  </button>
                <div>{
                    EmiStatus === 1?<div id="emi-details">
                            <label>Emi Date</label>
                            <DatePicker
                                selected={ EmiDate }
                                onChange={(date)=>{setEmiDate(date)}}
                                dateFormat="dd-MM-yyyy"
                            />
                            <label>Emi Amount</label>
                            <input 
                                type="text" 
                                required        
                                value = {EmiAmount }
                                onChange = { (e)=>setEmiAmount(e.target.value)}
                            />
                            <label>Emi Duration</label>
                            <input 
                                type="text" 
                                required        
                                value = {EmiDuration }
                                onChange = { (e)=>setEmiduration(e.target.value)}
                            />
                    </div>:<p></p>
                }</div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
            {loadingStatus === 0 ?
                <div class="overlay"> <p style={{position: "fixed", top: "5%", left: "50%"}}>
                    <ReactLoading type="spokes" color="#dd638c" height={100} width={50} />Loading
                </p> </div>
                :<>
                {loadingStatus === 1 ?
                    <>    
                    {show ? <div class="overlay"> <p><ErrorIcon style={{fontSize:"60px",color:"rgb(224, 65, 65)", textAlign:"center"}}/><br/>Something went wrong <br/> <br/> <button onClick={handleReload} style={{backgroundColor:"rgb(224, 65, 65)",marginRight:"25%"}}>Reload</button></p> </div> : 
                    <div class="overlay"> <p><TaskAltIcon style={{fontSize:"60px",color:"rgb(44, 137, 44)", textAlign:"center"}}/><br/> Driver Details Done Successfully <br/><br/> <button onClick={handleDone} style={{backgroundColor:"rgb(44, 137, 44)",marginRight:"25%"}}>Done</button></p> </div>}
                    </>
                :null}
                </>
            }
        </div>
        </>

    )


}

export default Add;