import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useSelector } from "react-redux";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import moment from "moment";

const HireHistory = (props) => {
  const { hireHistory } = props;

  // const profile = useSelector((state) => state.auth);

  // const user = profile?.profile?.payload;
  // const token = profile?.token?.payload;
  // const isLogin = profile?.isLogin?.payload;

  return (
    <>
      <Head>
        <title>Hire History | Proworld</title>
      </Head>
      <Navbar />
      <main style={{ background: "rgb(229, 229, 229)", overflowX: "hidden" }}>
        <div className="container">
          <div className="row pb-5">
            <div className="col">
              <div
                className="card shadow p-3"
                style={{ zIndex: 5, marginTop: "100px" }}
              >
                <div
                  className="card-header d-flex align-items-center mb-3"
                  style={{
                    background: "#5E50A1",
                    borderRadius: "7px",
                    height: "65px",
                  }}
                >
                  <h3
                    style={{
                      color: "white",
                      margin: "auto",
                      marginRight: 0,
                      marginLeft: 0,
                    }}
                  >
                    Hire history
                  </h3>
                </div>

                <div
                  className="card-body"
                  style={{ height: hireHistory?.length < 1 && "200px" }}
                >
                  {hireHistory?.length < 1 && (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: "100%" }}
                    >
                      <h5>No Hiring History</h5>
                    </div>
                  )}

                  {hireHistory?.slice(0, 5).map((item, key) => {
                    let sentAt = moment(item?.createdAt).format(
                      "MMMM DD, YYYY"
                    );
                    return (
                      <React.Fragment key={key}>
                        <div className="card mb-3">
                          <div
                            className="card-header d-flex align-items-center"
                            style={{ background: "#5E50A1", height: "55px" }}
                          >
                            <h5
                              style={{
                                color: "white",
                                margin: "auto",
                                marginRight: "5px",
                                marginLeft: 0,
                              }}
                            >
                              Sender :
                            </h5>
                            <h5
                              style={{
                                color: "white",
                                margin: "auto",
                                marginRight: 0,
                                marginLeft: 0,
                              }}
                            >
                              <b>{item?.fullname}</b>
                            </h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-8">
                                <div>
                                  <h6>Purpose :</h6>
                                  <h6>
                                    <b>{item?.purpose}</b>
                                  </h6>
                                </div>
                                <hr />
                                <div>
                                  <h6>Message :</h6>
                                  <h6>
                                    <b>{item?.description}</b>
                                  </h6>
                                </div>
                              </div>
                              <div
                                className="col-2"
                                style={{
                                  borderLeftStyle: "groove",
                                  borderLeftWidth: "1px",
                                  borderLeftColor: "grey",
                                }}
                              >
                                <h6>Sent At</h6>
                                <p>{sentAt}</p>
                              </div>
                              <div
                                className="col-2"
                                style={{
                                  borderLeftStyle: "groove",
                                  borderLeftWidth: "1px",
                                  borderLeftColor: "grey",
                                }}
                              >
                                <h6>Status</h6>
                                <p>{item?.is_read ? "Read" : "Sent"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="mt-4 mb-4" />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  } else {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const hireHistories = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
      config
    );
    const convertHistory = hireHistories?.data?.data?.[0]?.hire_histories;

    return {
      props: {
        hireHistory: convertHistory,
      },
    };
  }
};

export default HireHistory;
