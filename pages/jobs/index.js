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

  const limit = 12;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(rows);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(Math.ceil(count / limit) ?? count / limit);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState(["id", "DESC"]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?page=${page}&limit=${limit}&order=${sortBy[1]}&sortBy=${sortBy[0]}`
      )
      .then((res) => {
        setData(res?.data?.data?.rows);
      })
      .catch((err) => {
        setErrMsg(err?.response?.data?.message);
      })

      .finally(() => setIsLoading(false));
  }, []);

  const fetchPagination = (pagePosition) => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?page=${page}&limit=${limit}&sortBy=${sortBy[0]}&order=${sortBy[1]}`
      )
      .then((res) => {
        setData(res?.data?.data?.rows);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const searchFunc = () => {
    console.log(sortBy);
    console.log("searchFunc aman brok ");
    setIsLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?keyword=${keyword}&page=${page}&limit=${limit}&order=${sortBy[1]}&sortBy=${sortBy[0]}`
      )
      .then((res) => {
        console.log(res);
        setData(res?.data?.data?.rows);
        setTotal(Math.ceil(count / limit) ?? count / limit);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err?.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const sortFunc = (sortValue) => {
    console.log("sortFunc aman");
    if (sortValue === "1") {
      setSortBy(["id", "DESC"]);
    } else if (sortValue === "2") {
      setSortBy(["id", "ASC"]);
    } else if (sortValue === "3") {
      setSortBy(["skills", "ASC"]);
    } else if (sortValue === "4") {
      setSortBy(["skills", "DESC"]);
    }
  };

  useEffect(() => {
    searchFunc();
  }, [sortBy, page]);

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
                  searchFunc();
                }
              }}
            />
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                sortFunc(e.target.value);
                setPage(1);
              }}
            >
              <option selected disabled>
                Sort by
              </option>
              <option value="1">Sort by newest</option>
              <option value="2">Sort by oldest</option>
              <option value="3">Sort by Skill (most)</option>
              <option value="4">Sort by Skill (least)</option>
            </select>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "12%" }}
              onClick={searchFunc}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>
        <div className="container" style={{ marginTop: "3%" }}>
          <div
            className={`border-0 ${styles.cardStyle}`}
            style={{ background: "transparent" }}
          >
            <div className="row" style={{ gap: "24px", paddingLeft: "16px" }}>
              {data.length > 0 ? (
                data?.map((item, key) => (
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
                ))
              ) : (
                <h3 className="mt-4" style={{ marginBottom: "150px" }}>
                  Talent with keyword &apos;{keyword}&apos; doesn't exist
                </h3>
              )}
            </div>
          </div>
        </div>

        {data.length >= 1 && (
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
                <a
                  className={`page-link ${
                    page === 1 ? "disabled text-grey" : "text-black"
                  }`}
                  href="#"
                  onClick={() => {
                    if (page > 1) fetchPagination(page - 1);
                  }}
                >
                  &laquo;
                </a>
              </li>
              {[...new Array(total)].map((item, key) => {
                let currentPage = ++key;
                return (
                  <li
                    className={`page-item ${
                      page === currentPage ? "active text-white" : ""
                    }`}
                    key={currentPage}
                    onClick={() => {
                      // fetchPagination(currentPage);
                      setPage(currentPage);
                    }}
                  >
                    <a className="page-link text-black" href="#">
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
                <a
                  className={`page-link ${
                    page === total ? "disabled" : "text-black"
                  } text-black`}
                  href="#"
                  onClick={() => {
                    if (page < total) fetchPagination(page + 1);
                  }}
                >
                  &raquo;
                </a>
              </li>
            </ul>
          </nav>
        )}

        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const jobList = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?page=1&limit=12&order=DESC&sortBy=id`
  );

  const convert = jobList?.data;

  return {
    props: {
      jobLists: convert,
    },
  };
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
