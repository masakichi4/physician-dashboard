import React from 'react';
import axios from 'axios';

export default class ApiCalls extends React.Component {
    static getPhysicians = async () =>{
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        };

        let response;
        await axios.get(
            'http://localhost:8080/physicians',
            {},
            {headers}
            ).then(v => {
                // console.log(v)
                response = v.data
            })
            .catch(error => {
                console.log("@Error@", error);
            }
        )

        return response;
    }

    static getAppointments = async (id) =>{
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        };

        let response;
        await axios.get(
            'http://localhost:8080/appointments',
            {params: {id}, headers},
            ).then(v => {
                // console.log(v)
                response = v.data
            })
            .catch(error => {
                console.log("@Error@", error);
            }
        )

        return response;
    }
}