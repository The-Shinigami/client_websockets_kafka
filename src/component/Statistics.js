import SockJsClient from "react-stomp";
import React, {useEffect, useState} from "react";
import {getStatistics} from "./../service/ConsumersService"
import {LinearProgress} from "@mui/material";


const SOCKET_URL = 'http://172.18.0.2:8082/ws-chat/';

function Statistics() {
    const [messages, setMessages] = useState([])
    const [loader, setLoader] = useState(true)
    let onConnected = () => {
        console.log("Connected!!")
    }
    let onMessageReceived = (msg) => {
        setLoader(false);
        console.log('New Message Received!!', msg);
        var tmpM = msg.payload;
        tmpM = tmpM.replace('[','');
        tmpM = tmpM.replace(']','');
        tmpM = tmpM.replace('"','');
        tmpM = tmpM.replace('\"','');
        tmpM = tmpM.replace('ColumnDefinition:','');
        tmpM = tmpM.replace('\_','');
        tmpM = tmpM.replace('_',' ');
        setMessages(messages.concat(tmpM));
    }
    useEffect(() => {
        getStatistics();
    },[])
    return(
        <div>
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/group/diabetes-statistics']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            {loader?<LinearProgress color="inherit" />:null}
            <header style={{marginTop:"200px"}}>

                Statistics : {messages.map( m =>
                {
                    return <div>{m}</div>
                }
            )}

            </header>
        </div>
    )
}
export default Statistics;
