import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//this handles ALL OUTPUT REQUESTS
axios.interceptors.request.use(request=>{//this will be available on all requests done by axios.
    console.log(request)

    //the main idea is to edit the request before sendinf it
    //{add some modification to request}

    //return the request otherwise you are blocking th request
    return request
}, error => { //this error handler applies when you do not have connecivity or things like that.
    //handling error
    console.log(error)
    return Promise.reject(error)
})
//so every REQUEST will be handled by this interceptor

//this handles ALL INCOMING RESPONSES
axios.interceptors.response.use(response=>{
    console.log(response)

    return response
}, error => {
    console.log(error)

    return Promise.reject(error)
})

//getting rid of interceptors is also very easy
//in this example we are deleting an intterceptor for the output requests
//Simply store the reference to the interceptor in a variable and call eject
//with that reference as an argument, to remove it 
//const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
/*axios.interceptors.request.eject(myInterceptor); */


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
