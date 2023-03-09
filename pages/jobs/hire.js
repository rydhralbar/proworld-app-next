import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import Head from "next/head";
import React from "react";

const Hire = () => {
  return (
    <>
      <Head>
        <title>Nama | Proworld</title>
      </Head>
      <main style={{ background: "#E5E5E5" }}>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <div className="container">
            <div className="row py-4">
              <div className="col-lg-8" style={{ background: "white" }}>
                <div className="pt-3 ps-3">
                  <h2>Contact Rizky Pilar</h2>
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
                        />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Project
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
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
                      onChange={(e) => setName(e.target.value)}
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
                  <a
                      href="#"
                      className="btn btn-primary mt-3"
                      style={{ width: "70%", marginBottom: "35px" }}
                    >
                      Hire
                    </a>
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

export default Hire;
