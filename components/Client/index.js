import axios from "axios";

console.log("base url", process.env.NEXT_PUBLIC_BASE_URL);

const Client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json"
    },
})

export { Client };