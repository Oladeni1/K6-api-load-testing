/*
Definition:
Soak testing is used to validate reliability of a systems over a long period of time.

Purpose:
> To verify that a system doesnot suffer from memory leaks/crashes/restart
> To verify that expected application restart do not lose requests
> To make sure that database does not exhaust the allotted storage space & eventaully stops
> To make sure logs do not exhaust the allotted disk storage
> To make sure the external services depended upon do not stop working after certain amount of requests

Running soak test:
> Determine the max users your system can handle
> Get the 75% to 80% of that value
> Set VUs to that value
> Run the test in 3 stages: Ramp up to VUs, Stay in VUs for 4-12 hours, Ramp down to zero (0)
*/

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
    { duration: '2m', target: 400 }, // Ramp up to 400 users
    { duration: '3h56m', target: 400 }, //Stay in 100 users for 4hours
    { duration: '2m', target: 0 },  // Ramp down to 0 user
    ],
};
const API_BASE_URL = 'https://httpbin.org';  //Resources: /login.php, /index.php, /register.php
 
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