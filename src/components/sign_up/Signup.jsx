import React, {  useRef, useState } from 'react';
import { Typography, Box, Button, Grid, RadioGroup, FormControlLabel, Radio, Link, InputAdornment, Fade } from '@mui/material';
import { Validaddress, Validemail,Validpassword,Validphone,Validtext } from './Regexp';
import Field from '../field/Field'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import Img from './Econ.jpg'
import {REGISTER_URL} from './config';
import axios from 'axios';
import Authcontext from '../../context/Authcontext';
import Authenticate from '../Authenticate/Authenticate';
import { useContext } from 'react';

export default function Signup(){
    const password=React.createRef()
    const email=React.createRef()
    const address=React.createRef()
    const phone=React.createRef()
    const copassword=React.createRef()
    const name=React.createRef()
    const agent=useRef(null)
    const customer=useRef(null)
    const driver=useRef(null)

    const[color,setcolor]=useState("warning")
    const [Errormessage,setErrormessage]=useState({
        email:"",
        name:"",
        address:"",
        phone:"",
        password:"",
        copassword:"",
        emailorpassword:""})
    
    const Error=(type,value)=>{
        setErrormessage(Errormessage=>{
            return{...Errormessage,
            [type]:value}})
        setcolor("error")
    }

const Register = async () => {
  try {
    const add=address.current.value
    const phone_number=phone.current.value
    const role_value=agent.current.checked ? agent.current.value : 
    customer.current.checked ? customer.current.value : driver.current.value
    const role_name=agent.current.checked ? agent.current.name : 
    customer.current.checked ? customer.current.name : driver.current.name
    const response = await axios.post(REGISTER_URL, {
      "username": name.current.value,
      "email": email.current.value,
      "password": password.current.value,
    })
    
    if(response.status===200)
    {
      try{
      const user_id = response.data.user.id;
      const secondResponse = await axios.post(`http://localhost:1337/api/${role_name}?populate=*`,{
      "data":{
      "address":add,
      "phone_number":"+261"+phone_number,
      "users_permissions_user":user_id
    }
    });

      if(secondResponse.status===200){ 
        try{
          const thirdresponse= await axios.put(`http://localhost:1337/api/users/${user_id}`,{
            "role":role_value})
          if(thirdresponse.status==200){
            const jwt=thirdresponse.data.jwt
  
          }
          }
        catch(error){
          alert(error)
        }
      }
    }
    catch(error){
      alert(error)
    }
    }
    
  } catch (error) {
    if (error.response && error.response.status === 400) {
      Error("emailorpassword", "Email or username are already taken");
    }
    return null; // Gérer les erreurs ici si nécessaire.
  }
}
    
    const Verify=(a,b,c)=>{
        if(!c.test(a)){
           Error(b,"invalid "+b)
           return true
        }
        return false
    }

    const keyup=()=>{
        if(!new RegExp("^[0-9]").test(phone.current.value))phone.current.value=""
    }

    const submit=(e)=>{
        var bool=false
        setErrormessage(Errormessage=>{
            return{...Errormessage, email:"",
            name:"",
            address:"",
            phone:"",
            password:"",
            copassword:"",
            emailorpassword:""
            }})
        e.preventDefault()
        setcolor("warning")
        bool=Verify(name.current.value,name.current.name,Validtext)
        bool=Verify(email.current.value,email.current.name,Validemail)
        bool=Verify(phone.current.value,phone.current.name,Validphone)
        bool=Verify(address.current.value,address.current.name,Validaddress)
        //Verify(password.current.value,password.current.name,Validpassword)
        if(password.current.value!=copassword.current.value){setErrormessage(Errormessage=>{
            return{...Errormessage,copassword:"password incorrect"}}) 
            setcolor("error")
        }
        else if(!bool){
          //Register()
          const role=agent.current.checked ? agent.current.value : 
          customer.current.checked ? customer.current.value : driver.current.value
          alert(role)
        }
        
        
    }

    return(
        <Box component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        padding:2,
        borderRadius:1,
        boxShadow:1,
        backgroundColor:"white",
      }}
        onSubmit={submit}
        >
            <Grid container justifyContent="center" >
            <Image1/>
            </Grid>
            <Typography  variant="h5"
            justifyContent="center"
            align='center'
            sx={{
            fontFamily: "Helvetica",
            fontWeight:'bold',
            padding:1,
            color:"#d42d2d",
            transform:"scale(1.1,1.1)",
            textShadow:"0px 2px 1px black"
            }}>
            CREATE ACCOUNT
            </Typography>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
              <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="5"
              sx={{marginBottom:2}}
              >
                <Radios ref={agent} name="agents" value={5} label="agent"/>
                <Radios  ref={driver} name="drivers" value={3}  label="Driver"/>
                <Radios  ref={customer} name="customers" value={4} label="Customer" />
              </RadioGroup>
                <Grid container direction="row" justifyContent="center"
                alignItems="center">
                    <Grid minHeight="93px">
                        <Field type="text" label="Name" name="name" ref={name} color={color} style={{width:"200px"}}
                        InputP={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircleRoundedIcon/>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography variant="body2"  
                        align='center'
                        sx={{
                        margin:"auto",
                        color:"red"
                        }}
                        >
                            {Errormessage.name}
                        </Typography>
                    </Grid>
                    <Grid minHeight="93px">
                        <Field type="email" label="Email" name="email" ref={email} color={color} style={{width:"200px"}}
                          InputP={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocalPostOfficeRoundedIcon/>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography variant="body2" 
                        align='center'
                        sx={{
                        margin:"auto",
                        color:"red"
                        }}
                        >
                            {Errormessage.email}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center"
                alignItems="center">
                    <Grid minHeight="93px">
                        <Field type="text" label="Address" name="address" ref={address} style={{width:"200px"}}
                        color={color}
                        InputP={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <HomeRoundedIcon/>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography variant="body2" 
                        align='center'
                        sx={{
                        margin:"auto",
                        color:"red"
                        }}
                        >
                            {Errormessage.address}
                        </Typography>
                    </Grid>
                    <Grid minHeight="93px">
                        <Field type="number" label="Phone number" name="phone" style={{width:"200px"}}
                        ref={phone} color={color} onKeyUp={keyup} 
                        InputP={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneAndroidRoundedIcon/>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography variant="body2" 
                        align='center'
                        sx={{
                        margin:"auto",
                        color:"red"
                        }}
                        >
                            {Errormessage.phone}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center"
                alignItems="center">
                    <Grid minHeight="93px">
                        <Field type="password" label="Password" name="password" ref={password} color={color} style={{width:"200px"}}
                        InputP={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyRoundedIcon/>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography variant="body2" 
                        align='center'
                        sx={{
                        margin:"auto",
                        color:"red"
                        }}
                        >
                        {Errormessage.password}
                        </Typography>
                    </Grid>
                    <Grid minHeight="93px">
                        <Field type="password" label="Confirm password" name="copassword" ref={copassword} color={color} style={{width:"200px"}}
                        InputP={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyRoundedIcon/>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography variant="body2" 
                        align='center'
                        sx={{
                        margin:"auto",
                        color:"red"
                        }}
                        >
                            {Errormessage.copassword}
                        </Typography>
                    </Grid>
                </Grid>
                  <Typography variant="body2" 
                        align='center'
                        sx={{
                        margin:"auto",
                        color:"red"
                        }}
                        minHeight="12px"
                        >
                            {Errormessage.emailorpassword}
                        </Typography>
                <Grid>
                    <Button type="submit" variant='contained' color="error" sx={{margin:1.5}} >Sign Up</Button>            
                    <Link href="/login" variant="body2" underline='none' textAlign='center' >
                    Already have an account? Log in
                    </Link>
                </Grid>
            </Grid>              
        </Box>
    )
}

function Image1(){

  return<img src={Img} width="100px" height="100px" style={{alignItems:"center"}}/>
  }

const Radios=React.forwardRef((props,ref)=>(
  <FormControlLabel inputRef={ref} name={props.name} value={props.value} control={<Radio />} label={props.label} />
))