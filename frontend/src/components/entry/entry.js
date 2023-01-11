import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import "./entry.css"
import axios from "axios";
import Cookies from 'js-cookie'


const EntryPage = ()=>{

    const navigate =useNavigate(); 
    
    const [email, setEmail] = useState("");
    const [name,setName] =useState("");
    const [ph_number,setPhNumber] =useState("");
    const [password, setPassword] = useState("");
    const [register,setRegister] = useState(0);
    const [loginCheck, setLoginCheck] =useState(0);
    const [loginErrMsg,setLoginErrMsg]=useState("")

    function validateForm() {  
      return email.length > 0 && password.length > 0;
    }
  
    function handleLoginSubmit(event) {
      event.preventDefault();
      let logindata= {
        "email":email,"password":password
      }
      axios.post("http://localhost:9000/tms/user/login", logindata , {
            headers: {"Content-Type":"application/json"}
      }).then((res)=>{
        if(res.data.Success){
          Cookies.remove("access_token")
          Cookies.set("access_token",res.data.Data["access_token"])
          navigate("/show-truck");
        }else{
          setLoginErrMsg(res.data.ErrData)
          setLoginCheck(1)
          setTimeout(() => {
            setLoginCheck(0)
          }, 3000);
        }
      })
      
    }

    function handleSignupSubmit(event) {
      event.preventDefault();
      
      let SignupData = {
        "Name":name,
        "Email":email,
        "PhoneNumber":ph_number,
        "Password":password
      }

      axios.post("http://localhost:9000/tms/user/add-user", SignupData , {
            headers: {"Content-Type":"application/json"}
      }).then((res)=>{
        if(res.data.Success){
          Cookies.remove("access_token")
          Cookies.set("access_token",res.data.Data["access_token"])
          navigate("/show-truck");
        }else{
          setLoginErrMsg(res.data.ErrData)
          setLoginCheck(1)
          setTimeout(() => {
            setLoginCheck(0)
          }, 3000);
        }
      })
    }

    const handleRegister=() =>{
      setEmail("")
      setPassword("")
      setRegister(1)
    }

    const handleLogin=()=>{
      setEmail("")
      setPassword("")
      setRegister(0)
    }


    return (
      <div>
        {loginCheck === 0 ?<p></p>:<p className="errCheck">{loginErrMsg} <br/>enter vaild email or password.</p>}
        {register === 0?
        <div>
        <Form className="contentLogin" onSubmit={handleLoginSubmit}>
          
        <h2>Welcome to TMS!</h2>
        
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        </Form>
        <p className="register-button">Don't have an account? <button onClick={handleRegister}>Register Here</button></p>
        </div>
        :
        <div>
        <Form className="contentLogin" onSubmit={handleSignupSubmit}>

          <h2>Register to TMS!</h2>
          
          <Form.Group  size="lg" controlId="name">
            
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="phNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              maxLength={10}
              value={ph_number}
              onChange={(e) => setPhNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br/>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Register
          </Button>
        </Form>
        <p className="register-button">Already have an account. <button onClick={handleLogin}>Login Here</button></p>
        </div>}
      </div>
    );
  
  }

export default EntryPage;
 