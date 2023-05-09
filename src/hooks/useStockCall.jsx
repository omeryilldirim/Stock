import { useDispatch } from "react-redux";
import { fetchFail, getSuccess, fetchStart,getProCatBrandSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const {axiosWithToken} = useAxios()

  const getStockData = async (url) => {
    // const BASE_URL = "https://12253.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      // const { data } = await axios(`${BASE_URL}stock/${url}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      const {data} = await axiosWithToken(`stock/${url}/`)
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      toastErrorNotify(`Data can not be fetched!`)
      dispatch(fetchFail());
    }
  };

  const deleteStockData = async (url, id) => {
    // const BASE_URL = "https://12253.fullstack.clarusway.com/"
    dispatch(fetchStart())
    try {
      // await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // })
      await axiosWithToken.delete(`stock/${url}/${id}/`)
      toastSuccessNotify(`Item successfuly deleted from ${url}`)
      getStockData(url)
    } catch (error) {
      toastErrorNotify(`Item can not be deleted from ${url}`)
      dispatch(fetchFail())
    }
  }

  const postStockData = async (url, info) => {
    // const BASE_URL = "https://12253.fullstack.clarusway.com/"
    dispatch(fetchStart())
    try {
      // await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // })
      await axiosWithToken.post(`stock/${url}/`, info)
      toastSuccessNotify(`${url} succesfully posted`)
      getStockData(url)
    } catch (error) {
      toastErrorNotify(`${url} can not be posted`)
      dispatch(fetchFail())
    }
  }

  const putStockData = async (url, info) => {
    // const BASE_URL = "https://12253.fullstack.clarusway.com/"
    dispatch(fetchStart())
    try {
      // await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // })
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info)
      toastSuccessNotify(`${url} succesfully updated`)
      getStockData(url)
    } catch (error) {
      toastErrorNotify(`${url} can not be updated`)
      dispatch(fetchFail())
    }
  }

  const getProCatBrand = async () => {
    // const BASE_URL = "https://12253.fullstack.clarusway.com/"
    dispatch(fetchStart())
    try {
      const [products,categories, brands] = await Promise.all([
        axiosWithToken.get("stock/products/"),
        axiosWithToken.get("stock/categories/"),
        axiosWithToken.get("stock/brands/")
      ])
      dispatch(getProCatBrandSuccess([products?.data,categories?.data,brands?.data]))
    } catch (error) {
      toastErrorNotify(`Data can not be fetched!`)
      dispatch(fetchFail())
    }
  }

  return { getStockData,deleteStockData,postStockData,putStockData, getProCatBrand };
};

export default useStockCall;
