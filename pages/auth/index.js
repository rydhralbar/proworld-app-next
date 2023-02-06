import Head from "next/head";
import axios from "axios";
import React, { useEffect } from "react";
import styles from "../../styles/pages/Auth.module.scss";
import { useRouter } from "next/router";
import LeftColumn from "@/components/molecules/LeftColumnLogReg";
import Link from "next/link";

const Recruiter = () => {
  return (
    <>
      <Head>
        <title>Home | Proworld</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="row">
          <div className="col-lg-6 col-xs-12">
            <LeftColumn />
          </div>
          <div className="col-lg-6">
            <div className={styles.welcome}>
              <h1 style={{marginBottom: "60px"}}>
              Welcome to Proworld !
              </h1>
              <p style={{fontSize:"22px"}}>
              Please choose your role
              </p>
            </div>
            <div className={styles.content}>
              <div
                class="modal fade"
                id="exampleModalToggle"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabindex="-1"
              >
                <div class="modal-dialog modal-dialog-centered modal-sm">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
                      Select an option below
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body" style={{display: "flex", justifyContent: "center"}}>
                    <a href='/auth/register'>
                      <button
                          class="btn btn-primary"
                          style={{marginRight: "50px"}}
                        >
                          Register
                        </button>
                    </a>
                    <a href='/auth/login'>
                      <button
                        class="btn btn-primary"
                      >
                        Login
                      </button>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                class="btn btn-primary"
                data-bs-toggle="modal"
                href="#exampleModalToggle"
                role="button"
              >
                As Talent
              </a>
              <h4>or</h4>
              <div
                class="modal fade"
                id="exampleModalToggle2"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabindex="-1"
              >
                <div class="modal-dialog modal-dialog-centered modal-sm">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
                      Select an option below
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center">
                    <a href='/auth/register/recruiter'>
                      <button
                          class="btn btn-primary"
                          style={{marginRight: "50px"}}
                        >
                          Register
                        </button>
                    </a>
                    <a href='/auth/login'>
                      <button
                        class="btn btn-primary"
                      >
                        Login
                      </button>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                class="btn btn-primary"
                data-bs-toggle="modal"
                href="#exampleModalToggle2"
                role="button"
              >
                As Recruiter
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Recruiter;