import { useState } from "react";
import React from "react";
import "./addtruck.css"
import Sidebar from "../../containers/sidebar/sidebar";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie'
axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")

const AddTruck= () =>{

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
    const [TruckImg, setTruckImg] =useState(null)
    const [NpTax, setNpTax] =useState(null)
    const [QuaterTax, setQuaterTax] =useState(null)

    const [loadingStatus,SetLoadingStatus] = useState(2)
   const [apiStatus,setApiStatus] = useState()
   const [errMsg,setErrMsg] = useState("")

    const emiHandler =(val) =>{
        setEmiStatus(val)
    }
    let user_id = Cookies.get("user_id")
    const handleSubmit =(e)=>{
        e.preventDefault();
        SetLoadingStatus(0)
        const TruckDetails = {"User_id":user_id,"truck_no":TruckNo,
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
        formData.append("TruckImg",TruckImg)
        formData.append("NpTax",NpTax)
        formData.append("QuaterTax",QuaterTax)
        formData.append("truckdetailsdoc",blob)

        axios.post("http://localhost:9000/tms/truck/add-truck-details", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          }).then((res)=>{
            if(res.data.Success){
                SetLoadingStatus(1)
                setApiStatus(true)
                setTimeout(()=>{
                    navigate("/show-truck")
                },3000)
            }else{
                SetLoadingStatus(1)
                setErrMsg(res.data.Message)
                setApiStatus(false)
                setTimeout(()=>{
                    window.location.reload();
                },4000)
            }
        })
        
    }
    
    const handleDone =()=>{
        navigate("/show-truck")
    }

    const handleErr=()=>{
        window.location.reload();
    }
    return(
        <div className="main-container">
        <Sidebar />
        <div className="addtruck">
            <div id="addtruck-top">
                <h2>Add Truck Details</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div id="addTruck-box">
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
                    <br/>
                    <br/>
                    <label>Is Emi</label>&nbsp;&nbsp;&nbsp;
                    <button  id="emibutton" onClick={(e) => emiHandler(1)}> yes </button> &nbsp;&nbsp;&nbsp;
                    <button  id="emibutton" onClick={(e) => emiHandler(0)}> no  </button> <br /> <br />
                    <div>{
                        EmiStatus === 1?<div id="emi-details">
                                <label>Emi Date</label>
                                <input 
                                    type="text" 
                                    required        
                                    value = {EmiDate }
                                    onChange = { (e)=>setEmiDate(e.target.value)}
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
                <div id="addTruck-box">
                <label>Insurance Paper</label>
                    <input  
                        type="file"
                        required 
                        onChange={(e)=>setInsurance(e.target.files[0])}
                    />
                <label>Insurance Date ("DD-MM-YYYY")</label>
                    <DatePicker
                        selected={ InsuranceDate }
                        onChange={(date)=>{setInsuranceDate(date)}}
                        dateFormat="dd-MM-yyyy"
                    />
                <label>Truck's RC</label>
                    <input 
                        required
                        type="file"
                        onChange={(e)=>setTruckRc(e.target.files[0])}
                    />
                <label>Truck's Img with Number</label>
                    <input 
                        required
                        type="file" 
                        onChange={(e)=>setTruckImg(e.target.files[0])}
                    />
                <label>NP tax form</label>
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
                <br />
                <br />
              
                <Popup
                    trigger={<button id="submitbutton">AddTruck</button>}
                    modal
                >
                    <div className="modal">
                        <div className="modal_content">
                            {loadingStatus === 0 ? <p id="loading">... Loading </p> : <p>
                            {loadingStatus === 1 ? <p>
                            {apiStatus ? <div><p>Truck Details Added Successfully!</p><br></br><button id="statusbutton" onClick={handleDone}> Done!!</button></div> 
                            : <div id="errormsg">Oops Something went wrong<br></br><p>{errMsg}</p><br></br><button id="statusbutton"  onClick={handleErr}>Edit</button></div>}</p>:
                            <p></p>}
                            </p> }
                        </div>
                    </div>
                </Popup>
              
                </div> 
            </form>
            
        </div>
        </div>
    );
}

export default AddTruck;