/*
Definition:
Load tetsing is used to accessing the current performance a system in terms of 
concurent users or request per second.

Purpose:
> To access the current performance of a system under peak load.
> To make sure SLA are continuously met in terms of performance std even if there are changes to the system
*/

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
    { duration: '5m', target: 100 }, // Ramp up of traffic from 1 to 100 over 5m
    { duration: '10m', target: 100 }, //Stay in 100 users for 10m
    { duration: '5m', target: 0 },  // Ramp down to 0 user
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 
        http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'], // i.e 99% of request must be commpleted below 400ms
    },
};

export default function () {
    let response = http.get('https://httpbin.org'); 

    check(response, { 'status was 200': (r) => r.status == 200 });

    sleep(1);

};