import axios from "axios"

const token = localStorage.getItem("token") || ""
const baseURL = "https://task-manager.codionslab.com/api"

const Api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})

export default Api
