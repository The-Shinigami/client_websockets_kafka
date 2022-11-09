import SockJsClient from "react-stomp";
import React, {useState,useEffect} from "react";
import {getDiabetesData} from "./../service/ConsumersService"


const SOCKET_URL = 'http://172.18.0.2:8082/ws-chat/';

function Diabetesdata() {

    const [messages, setMessages] = useState([])
    const [counter, setCounter] = useState(0)

    let onConnected = () => {
        console.log("Connected!!")
    }
    let onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        setCounter((counter)=> counter+1)
        setMessages(messages.concat(msg));
    }
    useEffect(() => {
    getDiabetesData().then(r => alert(r.data));
},[])
    return(
        <div>
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/group/diabetes']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            <div style={{fontSize:"xxx-large"}}>
                {counter}
            </div>
            <header style={{marginTop:"200px"}}>

                Diabetes Data : {messages.map( m =>
                {
                    return <div>{m.payload}</div>
                }
            )}

            </header>
        </div>
    )
}
export default Diabetesdata;
