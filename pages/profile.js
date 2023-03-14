import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { getCookie } from "cookies-next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import editLogo from "@/public/images/edit-logo.svg";
import Image from "next/image";
import axios from "axios";
import { TfiLocationPin } from "react-icons/tfi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const EditProfile = (props) => {
  const { profile } = props;
  const detail = profile?.data?.[0];
  const isTalent = !detail?.user?.recruiter_id;

  const talentSkills = JSON.parse(detail?.skills);

  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [jobdesk, setJobdesk] = useState("");
  const [domicile, setDomicile] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [personalDataDesc, setPersonalDataDesc] = useState("");

  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [workLength, setWorkLength] = useState("");
  const [workExpDesc, setWorkExpDesc] = useState("");

  const [appName, setAppName] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [appType, setAppType] = useState("");
  const [photoProject, setPhotoProject] = useState("");

  const router = useRouter();
  const userProfile = useSelector((state) => state.auth);
  const token = userProfile?.token?.payload;

  const [skillsEntered, setSkillsEntered] = useState([]);
  const [skillsValue, setSkillsValue] = useState("");

  useEffect(() => {
    let isLogin = getCookie("profile") && getCookie("token");

    if (!isLogin) {
      router.replace("/auth");
    }
  }, [getCookie("profile")]);

  const editProfile = () => {
    setIsLoading(true);
    if (!isTalent) {
      setPersonalDataDesc("This is a recruiter account, no description");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
        {
          fullname: name && name !== "" ? name : detail?.user?.fullname,
          job: jobdesk && jobdesk !== "" ? jobdesk : detail?.job,
          domicile: domicile && domicile !== "" ? domicile : detail?.domicile,
          company: workplace && workplace !== "" ? workplace : detail?.company,
          description:
            personalDataDesc && personalDataDesc !== ""
              ? personalDataDesc
              : detail?.description,
        },
        config
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Nice",
          text: "Data edited successful",
          confirmButtonText: "OK",
          confirmButtonColor: "#5E50A1",
        }).then((_res) => {
          if (_res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text:
            err?.response?.data?.message || "There was an error from server",
          confirmButtonText: "OK",
          confirmButtonColor: "#5E50A1",
        })
      )
      .finally(() => setIsLoading(false));
  };

  const editSkills = () => {
    setIsLoading(true);
    if (talentSkills.length < 3) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "Can't update skills, too few skills",
        confirmButtonText: "OK",
        confirmButtonColor: "#5E50A1",
      });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/user/skills`,
          {
            skills: skillsEntered,
          },
          config
        )
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Nice",
            text: "Skills have been updated",
            confirmButtonText: "OK",
            confirmButtonColor: "#5E50A1",
          }).then((_res) => {
            if (_res.isConfirmed) {
              window.location.reload();
              window.scrollTo(0, 0);
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err?.response?.data?.message,
            confirmButtonText: "OK",
            confirmButtonColor: "#5E50A1",
          }).then((_res) => {
            if (_res.isConfirmed) {
              window.location.reload();
              window.scrollTo(0, 0);
            }
          });
        })
        .finally(() => setIsLoading(false));
    }
  };

  const addWorkExperience = () => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/work-experience`,
        {
          position,
          company,
          date: workLength,
          description: workExpDesc,
        },
        config
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Nice",
          text: "Data added successful",
          confirmButtonText: "OK",
          confirmButtonColor: "#5E50A1",
        }).then((_res) => {
          if (_res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text:
            err?.response?.data?.message || "There was an error from server",
          confirmButtonText: "OK",
          confirmButtonColor: "#5E50A1",
        })
      )
      .finally(() => setIsLoading(false));
  };

  const addPortfolio = () => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/portfolio`,
        {
          name: appName,
          photo: photoProject,
          link: repoLink,
          type: appType,
        },
        config
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Nice",
          text: "Data added successful",
          confirmButtonText: "OK",
          confirmButtonColor: "#5E50A1",
        }).then((_res) => {
          if (_res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text:
            err?.response?.data?.message || "There was an error from server",
          confirmButtonText: "OK",
          confirmButtonColor: "#5E50A1",
        })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Head>
        <title>
          {detail?.user?.fullname?.charAt(0).toUpperCase() +
            detail?.user?.fullname?.slice(1)}{" "}
          | Proworld
        </title>
      </Head>

      <main style={{ background: "#E5E5E5" }}>
        <Navbar />
        <div style={{ paddingTop: "120px", paddingBottom: "4.5%" }}>
          <div className="container" style={{ background: "transparent" }}>
            <div className="row py-4 ps-2">
              <div className="col-lg-3">
                <div>
                  <div className="card">
                    <img
                      src={detail?.user?.photo_profile}
                      className="card-img-top"
                      style={{
                        width: "130px",
                        borderRadius: "50%",
                        marginLeft: "25%",
                        marginTop: "10%",
                      }}
                      alt="Profile"
                    />
                    {!edit && (
                      <Image
                        unoptimized={true}
                        src={editLogo}
                        alt="Edit"
                        style={{ marginLeft: "35%" }}
                        onClick={() => setEdit(true)}
                      />
                    )}

                    <div className="card-body" style={{ paddingLeft: "25px" }}>
                      <h5
                        className="card-title"
                        style={{ marginBottom: "15px" }}
                      >
                        {detail?.user?.fullname?.charAt(0).toUpperCase() +
                          detail?.user?.fullname?.slice(1)}
                      </h5>
                      <h6 style={{ marginBottom: "15px", fontWeight: "400" }}>
                        {isTalent
                          ? detail?.job.charAt(0).toUpperCase() +
                            detail?.job?.slice(1)
                          : "Recruiter"}
                      </h6>
                      <div className="d-flex" style={{ marginBottom: "-3px " }}>
                        <TfiLocationPin />
                        <p
                          style={{
                            marginTop: "-4px",
                            paddingLeft: "5px",
                            color: "#9EA0A5",
                          }}
                        >
                          {detail?.domicile?.charAt(0).toUpperCase() +
                            detail?.domicile?.slice(1)}
                        </p>
                      </div>
                      <div className="d-flex">
                        <h6
                          className="me-2"
                          style={{
                            marginBottom: "15px",
                            fontWeight: "400",
                            color: "grey",
                          }}
                        >
                          {isTalent ? "Last worked at" : "Work at"}{" "}
                          <b>
                            {detail?.company?.charAt(0).toUpperCase() +
                              detail?.company?.slice(1)}
                          </b>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8" style={{ background: "white" }}>
                <div
                  style={{
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingBottom: "20px",
                  }}
                >
                  <div style={{ paddingTop: "20px" }}>
                    <h2>Personal data</h2>
                    <hr />
                  </div>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="name-input" className="form-label">
                        Fullname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name-input"
                        aria-describedby="nameHelp"
                        placeholder="Type your long name..."
                        onChange={(e) => setName(e.target.value)}
                        disabled={!edit}
                      />
                    </div>

                    {isTalent && (
                      <div className="mb-3">
                        <label htmlFor="jobdesk-input" className="form-label">
                          Jobdesk
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="jobdesk-input"
                          aria-describedby="nameHelp"
                          placeholder="Type your long jobdesk..."
                          onChange={(e) => setJobdesk(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="domicile-input" className="form-label">
                        Domicile
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="domicile-input"
                        aria-describedby="nameHelp"
                        placeholder="Type your long domicile..."
                        onChange={(e) => setDomicile(e.target.value)}
                        disabled={!edit}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="workplace-input" className="form-label">
                        Workplace
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="workplace-input"
                        aria-describedby="nameHelp"
                        placeholder="Type your workplace..."
                        onChange={(e) => setWorkplace(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                    {isTalent && (
                      <>
                        <div className="mb-3">
                          <label
                            htmlFor="description-input"
                            className="form-label"
                          >
                            Brief description
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            placeholder="Type your description..."
                            onChange={(e) =>
                              setPersonalDataDesc(e.target.value)
                            }
                            disabled={!edit}
                          />
                        </div>
                      </>
                    )}
                    {edit && (
                      <>
                        <button
                          className="btn btn-danger mt-4 ms-4"
                          style={{ width: "35%", marginRight: "20%" }}
                          onClick={() => setEdit(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary mt-4"
                          style={{ width: "35%" }}
                          disabled={isLoading}
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "The previous data will be replaced with the new data",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, edit it!",
                              cancelButtonText: "No, cancel!",
                              reverseButtons: true,
                            }).then((res) => {
                              if (res.isConfirmed) {
                                editProfile();
                              } else if (
                                res.dismiss === Swal.DismissReason.cancel
                              ) {
                                Swal.fire({
                                  title: "Cancelled",
                                  text: "Your profile will not be edited",
                                  icon: "error",
                                  confirmButtonText: "OK",
                                  confirmButtonColor: "#5E50A1",
                                });
                              }
                            });
                          }}
                        >
                          {isLoading ? "Loading..." : "Save"}
                        </button>
                      </>
                    )}

                    {isTalent && (
                      <div>
                        <div>
                          <div>
                            <div className="pt-5">
                              <h2>Skills</h2>

                              <hr />
                              <div>
                                {talentSkills.length < 3 && (
                                  <div className="mb-3 pt-3">
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="skill-input"
                                      aria-describedby="skillHelp"
                                      placeholder="Type your skills..."
                                      onChange={(e) =>
                                        setSkillsValue(e.target.value)
                                      }
                                      value={skillsValue}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          setSkillsEntered([
                                            ...skillsEntered,
                                            ...[skillsValue],
                                          ]);
                                          setSkillsValue("");
                                        }
                                      }}
                                    />
                                  </div>
                                )}
                                {talentSkills.length < 3 ? (
                                  <div className="align-items-center gap-2 my-2">
                                    {skillsEntered.map((_item) => (
                                      <button
                                        class="btn btn-primary me-2 mb-2"
                                        key={_item}
                                      >
                                        {_item}
                                        <span
                                          class={`badge bg-secondary`}
                                          style={{
                                            display: "inline-block",
                                            marginLeft: "10px",
                                          }}
                                          onClick={() => {
                                            let newSkills =
                                              skillsEntered.filter(
                                                (res) => res !== _item
                                              );
                                            setSkillsEntered(newSkills);
                                          }}
                                        >
                                          x
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                ) : (
                                  talentSkills.map((item, key) => (
                                    <button
                                      class="btn btn-primary me-2 mb-2"
                                      key={key}
                                    >
                                      {item}
                                    </button>
                                  ))
                                )}
                                {talentSkills.length < 3 && (
                                  <button
                                    className="btn btn-primary"
                                    style={{ width: "100%" }}
                                    onClick={() => {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        text: "You can only submit skills once",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, i am sure!",
                                        cancelButtonText: "No, cancel!",
                                        reverseButtons: true,
                                      }).then((res) => {
                                        if (res.isConfirmed) {
                                          editSkills();
                                        } else if (
                                          res.dismiss ===
                                          Swal.DismissReason.cancel
                                        ) {
                                          Swal.fire({
                                            title: "Cancelled",
                                            text: "Your skill will not be edited",
                                            icon: "error",
                                            confirmButtonText: "OK",
                                            confirmButtonColor: "#5E50A1",
                                          });
                                        }
                                      });
                                    }}
                                    disabled={isLoading}
                                  >
                                    {isLoading ? "Loading..." : "Save"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="pt-5">
                              <h2>Work experience</h2>
                              <hr />
                              <div className="mb-3 pt-3">
                                <label
                                  htmlFor="position-input"
                                  className="form-label"
                                >
                                  Position
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="position-input"
                                  aria-describedby="positionHelp"
                                  placeholder="Type your position..."
                                  onChange={(e) => setPosition(e.target.value)}
                                />
                              </div>
                              <div className="d-flex gap-4">
                                <div
                                  className="mb-3 pt-3"
                                  style={{ width: "50%" }}
                                >
                                  <label
                                    htmlFor="company-input"
                                    className="form-label"
                                  >
                                    Name of company
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="company-input"
                                    aria-describedby="companyHelp"
                                    placeholder="Type your company..."
                                    onChange={(e) => setCompany(e.target.value)}
                                  />
                                </div>
                                <div
                                  className="mb-3 pt-3"
                                  style={{ width: "50%" }}
                                >
                                  <label
                                    htmlFor="month-input"
                                    className="form-label"
                                  >
                                    Month / Year
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="month-input"
                                    aria-describedby="monthHelp"
                                    placeholder="Type how long you worked..."
                                    onChange={(e) =>
                                      setWorkLength(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="description-input"
                                  className="form-label"
                                >
                                  Brief description
                                </label>
                                <textarea
                                  class="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="5"
                                  placeholder="Type your description..."
                                  onChange={(e) =>
                                    setWorkExpDesc(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <hr style={{ marginTop: "50px" }} />
                          <div>
                            <button
                              href="#"
                              className="btn btn-primary mt-3"
                              style={{ width: "100%" }}
                              disabled={isLoading}
                              onClick={() => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "Work experience will be added to your account",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonText: "Yes, i am sure!",
                                  cancelButtonText: "No, cancel!",
                                  reverseButtons: true,
                                }).then((res) => {
                                  if (res.isConfirmed) {
                                    addWorkExperience();
                                  } else if (
                                    res.dismiss === Swal.DismissReason.cancel
                                  ) {
                                    Swal.fire({
                                      title: "Cancelled",
                                      text: "Your work experience will not be added",
                                      icon: "error",
                                      confirmButtonText: "OK",
                                      confirmButtonColor: "#5E50A1",
                                    });
                                  }
                                });
                              }}
                            >
                              {isLoading ? "Loading" : "Add work experience"}
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="pt-5">
                            <h2>Portfolio</h2>
                            <hr />
                            <div
                              className="mb-3 pt-3"
                              style={{ width: "100%" }}
                            >
                              <label htmlFor="app-input" className="form-label">
                                App name
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="app-input"
                                aria-describedby="appHelp"
                                placeholder="Type your app name..."
                                onChange={(e) => setAppName(e.target.value)}
                              />
                            </div>
                            <div
                              className="mb-3 pt-3"
                              style={{ width: "100%" }}
                            >
                              <label
                                htmlFor="repo-input"
                                className="form-label"
                              >
                                Repository link
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="repo-input"
                                aria-describedby="repoHelp"
                                placeholder="Type your repository link..."
                                onChange={(e) => setRepoLink(e.target.value)}
                              />
                            </div>
                            <label
                              htmlFor="repo-input mb-3"
                              className="form-label"
                            >
                              Type of portfolio
                            </label>
                            <div className="d-flex gap-5">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  onChange={() => setAppType("Mobile")}
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  Mobile app
                                </label>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  onChange={() => setAppType("Website")}
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault2"
                                >
                                  Website app
                                </label>
                              </div>
                            </div>
                            <div className="mb-3 pt-3">
                              <label for="formFile" class="form-label">
                                Upload photo
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="repo-input"
                                aria-describedby="repoHelp"
                                placeholder="Type your photo project link..."
                                onChange={(e) =>
                                  setPhotoProject(e.target.value)
                                }
                              />
                              {/* <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              /> */}
                            </div>
                            <button
                              href="#"
                              className="btn btn-primary mt-4"
                              style={{ width: "100%" }}
                              disabled={isLoading}
                              onClick={() => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "Portfolio will be added to your account",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonText: "Yes, i am sure!",
                                  cancelButtonText: "No, cancel!",
                                  reverseButtons: true,
                                }).then((res) => {
                                  if (res.isConfirmed) {
                                    addPortfolio();
                                  } else if (
                                    res.dismiss === Swal.DismissReason.cancel
                                  ) {
                                    Swal.fire({
                                      title: "Cancelled",
                                      text: "Your portfolio will not be added",
                                      icon: "error",
                                      confirmButtonText: "OK",
                                      confirmButtonColor: "#5E50A1",
                                    });
                                  }
                                });
                              }}
                            >
                              {isLoading ? "Loading..." : "Add portfolio"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
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

    const detailProfile = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
      config
    );
    const convertDetail = detailProfile?.data;

    return {
      props: {
        profile: convertDetail,
      },
    };
  }
};

export default EditProfile;
