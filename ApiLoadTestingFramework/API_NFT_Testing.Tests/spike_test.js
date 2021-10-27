/*
Definition:
Spike Testing is a variation in strees test, not neccessarily increase load rather, 
it spikes extreme load over a short time.

Purposes:
> To determine how a system will perform under an unexpected surge in traffic.
> To determine whether a system will recover once the traffic has subsided.

The success of the system is categorised as thus:
> Excellent: No degradation in performance despite spike/surge in traffic (No effect on response time).
> Good: Response time is slower but system does not crash nor produces errors.
> Poor: System produces errors during the surge in traffic but, recovers quickly after the traffic subsided.
> Bad: System crashes and unable to recover after the surge in traffic has subsided.
*/ 

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
    { duration: '10s', target: 100 }, //Below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, //Spike of 1400 users
    { duration: '3m', target: 1400 }, // Spike of 1400 user for 3m
    { duration: '10s', target: 100 }, //Scale down & recovery stage  
    { duration: '3m', target: 100 }, 
    { duration: '10s', target: 0 },  
    ],
};
const API_BASE_URL = 'https://httpbin.org';  

export default function () {
    http.batch([
    ['GET', `${API_BASE_URL}/#/HTTP_Methods`],  
    ['GET', `${API_BASE_URL}/#/Auth`],   
    ['GET', `${API_BASE_URL}/#/Status_codes`],
    ['GET', `${API_BASE_URL}/#/Request_inspection`],
    ['GET', `${API_BASE_URL}/#/Response_inspection`],
    ['GET', `${API_BASE_URL}/#/Response_formats`],
    ['GET', `${API_BASE_URL}/#/Dynamic_data`],
    ['GET', `${API_BASE_URL}/#/Cookies`],
    ['GET', `${API_BASE_URL}/#/Images`],
    ['GET', `${API_BASE_URL}/#/Redirects`],
    ]);

    sleep(1);

};