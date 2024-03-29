import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "../../../styles/pages/Register.module.scss";
import LeftColumn from "@/components/molecules/LeftColumnLogReg";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";

const TalentRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();
  const profile = useSelector((state) => state.auth);

  const isLogin = profile?.isLogin?.payload;

  useEffect(() => {
    if (isLogin && getCookie("profile") && getCookie("token")) {
      router.replace("/");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const connect = await axios.post("/api/talentRegister", {
        fullname: name,
        email,
        phone_number: phoneNumber,
        password,
      });

      setIsLoading(false);
      setSuccess("Register successful");

      setTimeout(() => {
        router.replace("/auth/login");
      }, 1400);
    } catch (error) {
      setIsLoading(false);
      setError(
        error?.response?.data?.message?.fullname?.message ??
          error?.response?.data?.message?.email?.message ??
          error?.response?.data?.message?.phone_number?.message ??
          error?.response?.data?.message?.password?.message ??
          error?.response?.data?.message ??
          "Something wrong in our server"
      );
    }
  };

  return (
    <>
      <Head>
        <title>Register | Proworld</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <div className="row">
          <div className={"col-lg-6"}>
            <LeftColumn />
          </div>
          <div className="col-lg-6">
            <div
              className={style.loginForm}
              style={{ height: "100vh", overflow: "auto" }}
            >
              <div className={style.rightCol} style={{ marginTop: "42%" }}>
                <h2>Hello, New Talent !</h2>
                <p className={error ? "mb-3" : "mb-5"}>
                  Fill out the form below to register
                </p>

                {success && (
                  <div className="alert alert-success mb-3" role="alert">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger mb-3" role="alert">
                    {error}
                  </div>
                )}

                <form style={{ marginBottom: "100px" }}>
                  <div className="mb-3">
                    <label htmlFor="name-input" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name-input"
                      aria-describedby="nameHelp"
                      placeholder="Type your long name..."
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Type your email..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone-number-input" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      id="phone-number-input"
                      placeholder="Type your phone number..."
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password-input" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password-input"
                      placeholder="Type your password..."
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
                      {isLoading ? "Loading..." : "Register"}
                    </button>
                  </div>

                  <p className="text-center mb-6">
                    You already have an account?{" "}
                    <Link href="/auth/login" style={{ color: "#5E50A1" }}>
                      Login here
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

export default TalentRegister;
