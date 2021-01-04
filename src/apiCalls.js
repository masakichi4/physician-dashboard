import React from 'react';
import axios from 'axios';

export default class ApiCalls extends React.Component {
    static getPhysicians = async () =>{

        let response;
        try { 
            response = await axios.get('http://localhost:8080/physicians',{})

            return response;
        } catch (error) {
            if (error.response) {
                return  error.response;
            }
        }
    }

    static getAppointments = async (id) =>{

        let response;
        try { 
            response = await axios.get('http://localhost:8080/appointments',{params: {id}})
            
            return response
        } catch (error) {

            if (error.response) {
                return error.response
            }
        }
        
    }

    static addAppointment = async(physicianId, patientName, time, kind) => {
        let response;

        try { 
            response = await axios.post('http://localhost:8080/appointments',
                {data: {physicianId, patientName, time, kind}});
            
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }

    }

    static deleteAppointment = async(physicianId, time) => {
        let response;

        try { 
            response = await axios.delete('http://localhost:8080/appointments',
                {params: {physicianId, time}});
            
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }
    }
}