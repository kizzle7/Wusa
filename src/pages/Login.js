import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { AdminContext } from "../context/AdminContext";
import Error from "../components/form/Error";
import Cookies from "js-cookie";
import LabelArea from "../components/form/LabelArea";
import InputArea from "../components/form/InputArea";
import ImageLight from "../assets/img/wusa.png";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import useLoginSubmit from "../hooks/useLoginSubmit";
import { Modal } from "antd";
import PinInput from "react-pin-input";
import AdminServices from "../services/AdminServices";

import { notifyError, notifySuccess } from "../utils/toast";

const Login = () => {
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

  const [loadingOtp, setLoadingOtp] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const { state } = useContext(AdminContext);
  const { userOtp, phone } = state;
  const [otpValue, setOtpValue] = useState("");

  console.log(userOtp,phone);

  const submitOtp = (e) => {
    e.preventDefault();
    console.log(register)
    if (otpValue) {
      AdminServices.confirmOtp({ otp:otpValue, phoneNumber: phone})
        .then((res) => {
          if (res.status) {
            console.log(res);
            setLoadingOtp(false);
            notifySuccess(res.message);
            dispatch({ type: "USER_LOGIN", payload: res.result });
            Cookies.set("adminInfo", JSON.stringify(res.result));
            history.replace("/");
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoadingOtp(false);
        });
    }
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">

          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelArea label="Phone Number" />
                  <InputArea
                    register={register}
                    defaultValue="08165153658"
                    label="phoneNumber"
                    name="phoneNumber"
                    type="number"
                    placeholder=""
                  />
                  <Error errorName={errors.email} />
                  <div className="mt-6"></div>
                  <LabelArea label="Password" />
                  <InputArea
                    register={register}
                    defaultValue="123456"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="***************"
                  />
                  <Error errorName={errors.password} />

                  <Button
                    disabled={loading}
                    type="submit"
                    className="mt-4 h-12 w-full"
                    to="/dashboard"
                  >
                    Log in
                  </Button>
                </form>

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-green-500 dark:text-green-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      <Modal
        title={"Input OTP"}
        visible={userOtp === "get_otp" ? true : false}
        footer={false}
        maskClosable={false}
      >
        <form>
          <div>
            <div className="mb-3 text-center">
              <label for="floatingInput">Otp Code</label>

              <PinInput
                length={5}
                initialValue={otpValue}
                secret
                onChange={(value, index) => setOtpValue(value)}
                type="numeric"
                inputMode="number"
                style={{ padding: "10px" }}
                inputStyle={{ borderColor: "green" }}
                inputFocusStyle={{ borderColor: "blue" }}
                onComplete={(value, index) => {}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </div>
          </div>

          <div className="text-right">
            <Button
              disabled={loadingOtp}
              type="submit"
              className="mt-4 h-12 "
              onClick={submitOtp}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Login;
