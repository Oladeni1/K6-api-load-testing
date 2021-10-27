/* 
Definition:
Stress Testing is used to determine the limit of the system.
It is used to verify the stability/reliability of a system under an extreme conditions.

Purposes:
> To determine how system will behave under extreme conditions
> To  determine the max capacity of a system in relation to user or throughput
> To determine the breaking point/failure mode of a system
> To determine if a system will recover without manual intervention after subjecting it to stress test
*/

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
    { duration: '3m', target: 100 }, //Below normal load
    { duration: '5m', target: 100 },
    { duration: '3m', target: 200 }, //normal
    { duration: '5m', target: 200 },
    { duration: '3m', target: 300 }, //Around breaking point  
    { duration: '5m', target: 300 },
    { duration: '3m', target: 400 }, //Beyond breaking point  
    { duration: '10m', target: 0 },  //Scale down, Recovery stage.
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