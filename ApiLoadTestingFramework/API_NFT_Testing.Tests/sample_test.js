
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 10,
    duration: '20m',

}; 

export default function () {
    http.get('https://httpbin.org');

    sleep(1);
};