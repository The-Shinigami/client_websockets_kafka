import axios from "axios"



    export const getDiabetesData = () => {
        return axios.post("http://172.18.0.2:8080/producer/readfile");
    };
export const getStatistics = () => {
    return axios.get("http://172.18.0.2:8081/model/statistics");
};
export const getPrediction = (data) => {
    return axios.post(" http://172.18.0.2:8081/model/predict",data);
};

