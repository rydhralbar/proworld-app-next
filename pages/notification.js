import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useSelector } from "react-redux";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Swal from "sweetalert2";
import moment from "moment";

const Notification = (props) => {
  const [selectedMark, setSelectedMark] = useState(false);
  const [markAllMsg, setMarkAllMsg] = useState(false);

  const { hireHistory } = props;

  console.log(hireHistory);

  let sendAt = hireHistory[0]?.createdAt.slice(0, 10);

  const profile = useSelector((state) => state.auth);
  const userId = profile?.profile?.payload?.user_id;
  const token = profile?.token?.payload;

  // const invitation = hireHistory?.filter((item) => item?.user_id === userId);
  const invitation = hireHistory?.[0]?.hire_histories;
  console.log(invitation);

  console.log(userId);

  return (
    <>
      <Head>
        <title>Notification | Proworld</title>
      </Head>
      <main style={{ background: "rgb(229, 229, 229)" }}>
        <Navbar />
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
                    Hire notification
                  </h3>
                </div>

                <div
                  className="card-body"
                  style={{ height: invitation?.length === 0 && "250px" }}
                >
                  {invitation?.length >= 1 ? (
                    invitation.slice(0, 5).map((item, key) => {
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
                                {item?.fullname}
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
                                  <h6>Created</h6>
                                  <p>{sentAt}</p>
                                </div>
                                <div
                                  className="col-2"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      const config = {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      };

                                      axios
                                        .get(
                                          `${process.env.NEXT_PUBLIC_API_URL}/v1/user/invitation/${item?.id}`,
                                          config
                                        )
                                        .then((res) => {
                                          window.location.reload();
                                        })
                                        .catch((err) => {
                                          Swal.fire({
                                            icon: "error",
                                            title: "Oops..",
                                            text:
                                              err?.response?.data?.messages ??
                                              "There was an error, please try again later",
                                            confirmButtonText: "OK",
                                            confirmButtonColor: "#5E50A1",
                                          });
                                        });
                                    }}
                                    disabled={item?.is_read}
                                  >
                                    {item?.is_read
                                      ? "Already read"
                                      : "Mark as read"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="mt-4 mb-4" />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: "100%" }}
                    >
                      <h5>No Hiring Invitation</h5>
                    </div>
                  )}
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

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const hireHistories = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
    config
  );

  const convertHistory = hireHistories?.data?.data;

  return {
    props: {
      hireHistory: convertHistory,
    },
  };
};

export default Notification;
