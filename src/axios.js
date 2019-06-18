import axios from 'axios'
//creating an instance for axios; the idea is that we can create multiple instances of axios, 
//each for some part of our application
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com' //this overrites default property for baseURL, if that 
    //was set, when we call it on some component; so here we can use another direction and it will overwrite
    //the default set on index.js
})

//setting other headers for mi instace
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE'

export default instance