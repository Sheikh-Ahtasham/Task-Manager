import axios from "axios"

const BASE_URL = "https://task-manager.codionslab.com/api"

export const signIn = async (payload: object) => {
  const response = await axios.post(`${BASE_URL}/v1/login`, payload)
  return response.data
}

export const signUp = async (payload: object) => {
  const response = await axios.post(`${BASE_URL}/v1/register`, payload)
  return response.data
}
