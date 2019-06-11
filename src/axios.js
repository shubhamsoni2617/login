import axios from 'axios';

const instance= axios.create({
    baseURL:'https://react-my-burger-app-b71c4.firebaseio.com/'
})

export default instance;