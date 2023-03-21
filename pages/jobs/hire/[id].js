import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Hire = (props) => {
  const { profile } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [nameRecruiter, setNameRecruiter] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const profileStalker = useSelector((state) => state.auth);

  const isRecruiter = profileStalker?.profile?.payload?.recruiter_id;
  const userId = profileStalker?.profile?.payload?.user_id;
  const token = profileStalker?.token?.payload;

  console.log(router);

  useEffect(() => {
    if (!isRecruiter) {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "You are not allowed on this page",
        confirmButtonText: "OK",
        confirmButtonColor: "#5E50A1",
      }).then((res) => {
        if (res.isConfirmed) {
          router.replace("/jobs");
        }
      });
    }
  }, []);

  const addInvitation = () => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/invitation`,
        {
          user_id: router?.query?.id,
          purpose,
          fullname: nameRecruiter,
          email,
          phone_number: phoneNumber,
          description,
        },
        config
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Nice",
          text: "Invitation added successful",
          confirmButtonText: "OK",
          confirmButtonColor: "#5E50A1",
        }).then((_res) => {
          if (_res.isConfirmed) {
            router.replace("/jobs");
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text:
            err?.response?.data?.message?.fullname?.message ??
            err?.response?.data?.message?.email?.message ??
            err?.response?.data?.message?.user_id?.message ??
            err?.response?.data?.message?.purpose?.message ??
            err?.response?.data?.message?.phone_number?.message ??
            err?.response?.data?.message?.description?.message ??
            "There was an error from server",
          confirmButtonText: "OK",
          confirmButtonColor: "#5E50A1",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const user = profile?.data?.[0]?.user;

  return (
    <>
      <Head>
        <title>
          {user?.fullname.charAt(0).toUpperCase() + user?.fullname.slice(1)} |
          Proworld
        </title>
      </Head>
      <main style={{ background: "#E5E5E5" }}>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <div className="container">
            <div className="row py-4">
              <div className="col-lg-8" style={{ background: "white" }}>
                <div className="pt-3 ps-3">
                  <h2>
                    Contact{" "}
                    {user?.fullname.charAt(0).toUpperCase() +
                      user?.fullname.slice(1)}
                  </h2>
                  <p>
                    Contact Talent using the hire message below, a notification
                    will come to Talent&apos;s inbox.
                  </p>
                  <div className="mt-5 mb-3">
                    <label htmlFor="name-input" className="form-label">
                      The purpose of this message
                    </label>
                    <div className="d-flex gap-5 mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          onChange={() => setPurpose("Project")}
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          Project
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          onChange={() => setPurpose("Cooperation")}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Cooperation
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 pt-3" style={{ width: "70%" }}>
                    <label htmlFor="name-input" className="form-label">
                      Fullname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name-input"
                      aria-describedby="nameHelp"
                      placeholder="Type your name..."
                      onChange={(e) => setNameRecruiter(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 pt-2" style={{ width: "70%" }}>
                    <label htmlFor="email-input" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email-input"
                      aria-describedby="emailHelp"
                      placeholder="Type your email..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 pt-2" style={{ width: "70%" }}>
                    <label htmlFor="number-input" className="form-label">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="number-input"
                      aria-describedby="numberHelp"
                      placeholder="Type your phone number..."
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-5 pt-2" style={{ width: "70%" }}>
                    <label htmlFor="description-input" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      placeholder="Type your description..."
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <button
                    href="#"
                    className="btn btn-primary mt-3 "
                    style={{ width: "70%", marginBottom: "35px" }}
                    disabled={isLoading}
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "The talent will accept an invitation, and you will be contacted if he agrees",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, i am sure!",
                        cancelButtonText: "No, cancel!",
                        reverseButtons: true,
                      }).then((res) => {
                        if (res.isConfirmed) {
                          addInvitation();
                        } else if (res.dismiss === Swal.DismissReason.cancel) {
                          Swal.fire({
                            title: "Cancelled",
                            text: "Your invitation was not sent",
                            icon: "error",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#5E50A1",
                          });
                        }
                      });
                    }}
                  >
                    {isLoading ? "Loading..." : "Hire"}
                  </button>
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

export const getServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;

  const jobList = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/detail/${id}`
  );

  let convert = jobList?.data;

  return {
    props: {
      profile: convert,
    },
  };
};

export default Hire;
