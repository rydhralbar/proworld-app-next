// eslint-disable-next-line react-hooks/exhaustive-deps
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../../../styles/pages/Login.module.scss";
import LeftColumn from "@/components/molecules/LeftColumnLogReg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as profileReducer from "@/stores/reducer/auth";
import { getCookie, setCookie } from "cookies-next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth);

  const isLogin = profile?.isLogin?.payload;

  useEffect(() => {
    if (isLogin && getCookie("profile") && getCookie("token")) {
      router.replace("/");
    }
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        setIsLoading(false);
        setError(null);

        dispatch(profileReducer.setProfile(res?.data?.data));
        dispatch(profileReducer.setToken(res?.data?.token));
        dispatch(profileReducer.setIsLogin(true));

        setCookie("profile", JSON.stringify(res?.data?.data));
        setCookie("token", res?.data?.token);

        setSuccess("Login successful");

        setTimeout(() => {
          router.replace("/");
        }, 1400);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(
          err?.response?.data?.messages ?? "Something wrong in our server"
        );
      });
  };

  return (
    <>
      <Head>
        <title>Login | Proworld</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <div className="row">
          <div className={"col-lg-6 col-xs-12"}>
            <LeftColumn />
          </div>
          <div className="col-lg-6">
            <div className={style.loginForm}>
              <div className={style.rightCol}>
                <h2>Hello, Propeople !</h2>
                <p className={error || success ? "mb-3" : "mb-5"}>
                  Login to start your session
                </p>

                {error ? (
                  <div className="alert alert-danger mb-3" role="alert">
                    {error}
                  </div>
                ) : null}

                {success ? (
                  <div className="alert alert-success mb-3" role="alert">
                    {success}
                  </div>
                ) : null}

                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Type your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Type your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </div>

                  <p className="text-center">
                    You don&apos;t have an account yet?{" "}
                    <Link href="/auth" style={{ color: "#5E50A1" }}>
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
