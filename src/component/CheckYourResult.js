import SockJsClient from "react-stomp";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {getPrediction} from "./../service/ConsumersService"




const SOCKET_URL = 'http://172.18.0.2:8082/ws-chat/';

function CheckYourResult() {
    const [index, setIndex] = useState(0)
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

    const simples =[
        {
            preg: "6",
            plas: "148",
            pres: "72",
            skin: "35",
            insu: "0",
            mass: "33.6",
            pedi: "0.627",
            age: "50",
        },
        {
            preg: "1",
            plas: "85",
            pres: "66",
            skin: "29",
            insu: "0",
            mass: "26.6",
            pedi: "0.351",
            age: "31",
        },
        {
            preg: "8",
            plas: "183",
            pres: "64",
            skin: "0",
            insu: "0",
            mass: "23.3",
            pedi: "0.672",
            age: "32",
        },
        {
            preg: "1",
            plas: "89",
            pres: "66",
            skin: "29",
            insu: "0",
            mass: "28.1",
            pedi: "0.167",
            age: "21",
        },
    ]
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
    let next = (eve) => {

        setIndex((index) => index+1)
        if(!(index>=0 && index<simples.length))
            setIndex(0)
        if(index>=0 && index<simples.length) {
            setState(simples[index])
        }

        eve.preventDefault();
    }
    let prev = (eve) => {

        setIndex((index) => index-1)
        if(!(index>=0 && index<simples.length))
            setIndex(simples.length-1)
        if(index>=0 && index<simples.length) {
        setState(simples[index])}


        eve.preventDefault();
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

                       <button style={{backgroundColor:"white",borderRadius:"20px",padding:"10px"}} onClick={prev}>prev</button>
                       <span>.........</span>
                       <button style={{backgroundColor:"white",borderRadius:"20px",padding:"10px"}} onClick={next}>next</button>
                   </div>
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
                           // onChange={handleChange}
                           value={state.preg}

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
                           // onChange={handleChange}
                           value={state.plas}
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
                           // onChange={handleChange}
                           value={state.pres}
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
                           // onChange={handleChange}
                           value={state.skin}
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
                           // onChange={handleChange}
                           value={state.insu}
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
                           // onChange={handleChange}
                           value={state.mass}
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
                           // onChange={handleChange}
                           value={state.pedi}
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
                           // onChange={handleChange}
                           value={state.age}
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
