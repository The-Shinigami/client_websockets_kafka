import SockJsClient from "react-stomp";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {getPrediction} from "./../service/ConsumersService"




const SOCKET_URL = 'http://172.18.0.2:8082/ws-chat/';

function CheckYourResult() {
    const [messages, setMessages] = useState([])
    const [state, setState] = React.useState({
        preg: "",
        plas: "",
        pres: "",
        skin: "",
        insu: "",
        mass: "",
        pedi: "",
        age: "",
    })
    let onConnected = () => {
        console.log("Connected!!")
    }

    let  onMessageReceived = async (msg) => {
        console.log('New Message Received!!', msg);
        var tmpM = msg.payload;
         tmpM = tmpM.replace('[','');
         tmpM = tmpM.replace(']','');
        tmpM = tmpM.replace('"','');
         tmpM = tmpM.replace('\"','');
        tmpM = tmpM.replace(')','');
        tmpM = tmpM.replace('(','');
        tmpM = tmpM.replace('\_',' ');
        tmpM = tmpM.replace('_',' ');
        tmpM = tmpM.replace('Correct : null','');
        tmpM = tmpM.substr(-16, );
        setMessages([tmpM]);

    }
    let handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }
    let onSubmit = () =>{
        getPrediction(state);
    }
   return(
       <div >
           <SockJsClient
               url={SOCKET_URL}
               topics={['/topic/group/diabetes-result']}
               onConnect={onConnected}
               onDisconnect={console.log("Disconnected!")}
               onMessage={msg => onMessageReceived(msg)}
               debug={false}
           />
           <header  style={{marginTop:"100px"}}>
               <Box
                   component="form"
                   sx={{
                       '& .MuiTextField-root': { m: 5, width: '20ch' },
                   }}
                   noValidate
                   autoComplete="off"
               >
                   <div>

                       <TextField
                           required
                           id="outlined-number"
                           label="Pregnancies"
                           type="number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           name="preg"
                           onChange={handleChange}

                       />
                       <TextField
                           required
                           id="outlined-number"
                           label="Glucose"
                           type="number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           name="plas"
                           onChange={handleChange}
                       />
                       <TextField
                           required
                           id="BloodPressure"
                           label="Pregnancies"
                           type="number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           name="pres"
                           onChange={handleChange}
                       />
                       <TextField
                           required
                           id="outlined-number"
                           label="SkinThickness"
                           type="number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           name="skin"
                           onChange={handleChange}
                       />


                   </div>
                   <div>

                       <TextField
                           required
                           id="outlined-number"
                           label="Insulin"
                           type="number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           name="insu"
                           onChange={handleChange}
                       />
                       <TextField
                           required
                           id="outlined-number"
                           label="BMI"
                           type="number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           name="mass"
                           onChange={handleChange}
                       />
                       <TextField
                           required
                           id="outlined-number"
                           label="DiabetesPedigreeFunction"
                           type="number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           name="pedi"
                           onChange={handleChange}
                       />
                       <TextField
                           required
                           id="outlined-number"
                           label="Age"
                           type="number"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           name="age"
                           onChange={handleChange}
                       />
                   </div>
                   <div style={{marginBottom:"20px"}}>
                       <Button variant="outlined" onClick={onSubmit}>SUBMIT</Button>
                   </div>

               </Box>
               Results : {messages.map( m =>
               {
                   return <div key={m}>{m}</div>
               }
           )}

           </header>
       </div>
   )
}
export default CheckYourResult;
