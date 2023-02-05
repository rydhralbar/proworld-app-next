/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/pages/JobList.module.scss";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import JobList from "@/components/molecules/JobList";
import {getCookie} from "cookies-next"
 
const Index = (props) => {
  const { jobLists } = props;

  // const emptyArray = [1, 2, 3, 4];

  return (
    <>
      <Head>
        <title>Job List | Proworld</title>
      </Head>

      <main className={styles.jobsBody}>
        <Navbar />
        <div style={{ height: "65px" }} />
        <div style={{ backgroundColor: "#5E50A1", height: "75px" }}>
          <h2 style={{ paddingTop: "1.3%", marginLeft: "7%", color: "white" }}>
            Top Jobs
          </h2>
        </div>

        <div className="container" style={{ marginTop: "3%" }}>
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search for any skill"
              style={{
                width: "55%",
                height: "55px",
                borderTopRightRadius: "0 !important",
                borderBottomRightRadius: "0 !important",
              }}
            />
            <select
              className="form-select"
              aria-label="Default select example"
            >
              <option selected disabled>
                Categories
              </option>
              <option value="1">Sort by name</option>
              <option value="2">Sort by Skill</option>
              <option value="3">Sort by Location</option>
              <option value="4">Sort by freelance</option>
              <option value="5">Sort by fulltime</option>
            </select>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "12%" }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container" style={{ marginTop: "3%" }}>
          <div
            className={`border-0 ${styles.cardStyle}`}
            style={{ background: "transparent" }}
          >
            <div className="row" style={{ gap: "24px", paddingLeft: "16px" }}>
              {jobLists?.map((item, key) => (
                <React.Fragment key={key}>
                  <div
                    className="col-lg-2"
                    style={{
                      background: "white",
                      width: "260px",
                      height: "260px",
                      borderRadius: "4px"
                    }}
                  >
                    <JobList item={item} />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "60px",
          }}
        >
          <ul className={`pagination gap-3 ${styles.paginationLayout}`}>
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link active">1</a>
            </li>
            <li className="page-item">
              <a className="page-link">2</a>
            </li>
            <li className="page-item">
              <a className="page-link">3</a>
            </li>
            <li className="page-item">
              <a className="page-link">4</a>
            </li>
            <li className="page-item">
              <a className="page-link">5</a>
            </li>
            <li className="page-item">
              <a className="page-link">6</a>
            </li>
            <li className="page-item">
              <a className="page-link">7</a>
            </li>
            <li className="page-item ">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>

        <Footer />
      </main>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const jobList = await axios.get(
    `${process.env.NEXT_PUBLIC_WEB}/api/talentData`
  );
  const convert = jobList?.data;

  const token = getCookie("token", {req, res})

  return {
    props: {
      jobLists: convert,
    },
  };
}

export default Index;
