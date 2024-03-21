import axios from "axios";
import { FETCH_VENDOR_DATA_ERROR } from "../constants/constants";

export const getAllVendors = async () => {
  try {
    const { data } = await axios.get("/vendors");
    return data;
  } catch (err) {
    console.error(err);
    const errMsg = FETCH_VENDOR_DATA_ERROR;
    return errMsg;
  }
};
