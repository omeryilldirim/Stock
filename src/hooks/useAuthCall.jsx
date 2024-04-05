import {useDispatch} from "react-redux"
import { loginSuccess, fetchStart, fetchFail, registerSuccess, logoutSuccess } from '../features/authSlice'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"

const useAuthCall = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const BASE_URL = "https://12253.fullstack.clarusway.com/"

  const login = async (userInfo) => {

    dispatch(fetchStart())
    try {
        // const {data} = await axios.post(`${BASE_URL}account/auth/login/`, userInfo)
        const data = { user: { username: "admin", is_superuser: true}, key: "asdaksjalfjh12h213h" }
        dispatch(loginSuccess(data))
        toastSuccessNotify("Login performed")
        navigate("/stock")
    } catch (error) {
        dispatch(fetchFail())
        toastErrorNotify("Login can not be performed")
    }
  }


  const register = async (userInfo) => {

    dispatch(fetchStart())
    try {
      const {data} = await axios.post(`${BASE_URL}account/register/`, userInfo)
      dispatch(registerSuccess(data))
      toastSuccessNotify("Register performed")
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Register can not be performed")
    }
  }


  const logout = async () => {

    dispatch(fetchStart())
    try {
      await axios.post(`${BASE_URL}account/auth/logout/`)
      dispatch(logoutSuccess())
      toastSuccessNotify("Logout performed")
      navigate("/")
    } catch (err) {
      dispatch(fetchFail())
      toastErrorNotify("Logout can not be performed")
    }
  }



  return {login, register, logout}
}

export default useAuthCall