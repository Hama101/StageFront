import axios from "axios";

const instance = axios.create({
    baseURL : "https://team101.pythonanywhere.com/api",
})
export default instance