import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/pages/JobList.module.scss";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import JobList from "@/components/molecules/JobList";
import { getCookie } from "cookies-next";

const Index = (props) => {
  const {
    jobLists: {
      data: { rows, count },
    },
  } = props;

  const [data, setData] = useState(rows);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(Math.ceil(count / 12));
  const [keyword, setKeyword] = useState("");

  const fetchPagination = async (_page) => {
    const jobList = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?page=${_page}&limit=12`
    );
    const convert = jobList?.data;
    setData(convert?.data?.rows);
  };

  const fetchByKeyword = async () => {
    if (keyword && keyword === "") {
      const jobList = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?page=1&limit=12`
      );
      const convert = jobList?.data;
      setData(convert?.data?.rows);
    } else {
      const jobList = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?keyword=${keyword}`
      );
      const convert = jobList?.data;
      setData(convert?.data?.rows);
    }
  };

  return (
    <>
      <Head>
        <title>Job List | Proworld</title>
      </Head>

      <main className={styles.jobsBody}>
        <Navbar />
        <div style={{ height: "64px" }} />
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
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchByKeyword();
                }
              }}
            />
            <select className="form-select" aria-label="Default select example">
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
              onClick={fetchByKeyword}
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
              {rows?.map((item, key) => (
                <React.Fragment key={key}>
                  <div
                    className="col-lg-2"
                    style={{
                      background: "white",
                      width: "260px",
                      height: "260px",
                      borderRadius: "4px",
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
            <li
              className="page-item"
              onClick={() => {
                if (page > 1) {
                  fetchPagination(page - 1);
                  setPage(page - 1);
                }
              }}
            >
              <a className="page-link" href="#">
                &laquo;
              </a>
            </li>
            {[...new Array(total)].map((item, key) => {
              let currentPage = ++key;
              return (
                <li
                  className={`page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                  key={currentPage}
                  onClick={() => {
                    fetchPagination(currentPage);
                    setPage(currentPage);
                  }}
                >
                  <a className="page-link" href="#">
                    {currentPage}
                  </a>
                </li>
              );
            })}
            <li
              className="page-item"
              onClick={() => {
                if (page < total) {
                  fetchPagination(page + 1);
                  setPage(page + 1);
                }
              }}
            >
              <a className="page-link" href="#">
                &raquo;
              </a>
            </li>
          </ul>
        </nav>

        <Footer />
      </main>
    </>
  );
};

export const getStaticProps = async (context) => {
  const jobList = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?page=1&limit=12`
  );

  const convert = jobList?.data;

  return {
    props: {
      jobLists: convert,
    },
  };
  revalidate: 3600;
};

// export const getServerSideProps = async ({ req, res }) => {
//   const jobList = await axios.get(
//     `${process.env.NEXT_PUBLIC_WEB}/api/talentData`
//   );

//   console.log(jobList?.data)

//   const convert = jobList?.data;

//   const token = getCookie("token", { req, res });

//   return {
//     props: {
//       jobLists: JSON.parse(JSON.stringify(convert)),
//     },
//   };
// };

export default Index;
