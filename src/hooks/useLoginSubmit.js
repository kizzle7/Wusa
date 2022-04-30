import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import AdminServices from "../services/AdminServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useLoginSubmit = (otpValue) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, phoneNumber, verifyEmail, password, role }) => {
    setLoading(true);

    if (verifyEmail) {
      AdminServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    } else if (name) {
      AdminServices.registerAdmin({ name, phoneNumber, password, role })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess("Register Success!");
            dispatch({ type: "USER_LOGIN", payload: res });
            Cookies.set("adminInfo", JSON.stringify(res));
            history.replace("/");
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    } else {
      AdminServices.loginAdmin({ phoneNumber, password })
        .then((res) => {
          if (res.status) {
            notifySuccess(res.message);
            setLoading(false);
            if (!res.result.authenticated) {
              console.log('Authenticated');
              Cookies.set("adminInfo", JSON.stringify(res.result));
              dispatch({
                type: "REQUEST_OTP",
                payload: {
                  otp: "get_otp",
                  phone: phoneNumber,
                },
              });
            } else {
              dispatch({ type: "USER_LOGIN", payload: res.result });
              Cookies.set("adminInfo", JSON.stringify(res.result));
              history.replace("/");
            }
          } else {
            notifyError(res.message);
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
