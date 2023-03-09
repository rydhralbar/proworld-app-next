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

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [jobdesk, setJobdesk] = useState("");
  const [domicile, setDomicile] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [personalDataDesc, setPersonalDataDesc] = useState("");

  const router = useRouter;
  const [skill, setSkill] = useState("");
  const [skillsEntered, setSkillsEntered] = useState([]);
  const [skillsValue, setSkillsValue] = useState("");

  // const handlePersonal = async () => {
  //   try {

  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    let isLogin = getCookie("profile") && getCookie("token");

    if (!isLogin) {
      router.replace("/auth");
    }

    setProfile(JSON.parse(getCookie("profile")));
  }, [getCookie("profile")]);

  return (
    <div>
      <Head>
        <title>{profile?.fullname} | Proworld</title>
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
                      src={profile?.photo_profile}
                      className="card-img-top"
                      style={{
                        width: "130px",
                        borderRadius: "50%",
                        marginLeft: "25%",
                        marginTop: "10%",
                      }}
                      alt="Profile"
                    />
                    <Image
                      src={editLogo}
                      alt="Edit"
                      style={{ marginLeft: "35%" }}
                    />
                    <div className="card-body" style={{ paddingLeft: "25px" }}>
                      <h5
                        className="card-title"
                        style={{ marginBottom: "15px" }}
                      >
                        {profile?.fullname}
                      </h5>
                      <h6 style={{ marginBottom: "15px", fontWeight: "300" }}>
                        Hack Developer
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
                          Jakarta Barat{" "}
                        </p>
                      </div>
                      <p className="card-text" style={{ color: "#9EA0A5" }}>
                        Freelancer
                      </p>
                      <a
                        href="#"
                        className="btn btn-primary"
                        style={{ width: "100%", marginBottom: "15px" }}
                      >
                        Save
                      </a>
                      <a
                        href="#"
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                      >
                        Cancel
                      </a>
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
                      />
                    </div>

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
                      />
                    </div>
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
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description-input" className="form-label">
                        Brief description
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        placeholder="Type your description..."
                        onChange={(e) => setPersonalDataDesc(e.target.value)}
                      />
                    </div>
                    <div className="pt-5">
                      <h2>Skills</h2>

                      <hr />
                      <div>
                        <div className="mb-3 pt-3">
                          <input
                            type="text"
                            class="form-control"
                            id="skill-input"
                            aria-describedby="skillHelp"
                            placeholder="Type your skills..."
                            onChange={(e) => setSkillsValue(e.target.value)}
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
                        <div className="d-flex align-items-center gap-2 my-2">
                          {skillsEntered.map((_item) => (
                            <button class="btn btn-primary" key={_item}>
                              {_item}
                              <span
                                class={`badge bg-secondary`}
                                style={{
                                  display: "inline-block",
                                  marginLeft: "10px",
                                }}
                                onClick={() => {
                                  let newSkills = skillsEntered.filter(
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
                        <a
                          href="#"
                          className="btn btn-primary"
                          style={{ width: "100%" }}
                        >
                          Save
                        </a>
                      </div>
                    </div>
                    <div className="pt-5">
                      <h2>Work experience</h2>
                      <hr />
                      <div className="mb-3 pt-3">
                        <label htmlFor="position-input" className="form-label">
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
                        <div className="mb-3 pt-3" style={{ width: "50%" }}>
                          <label htmlFor="company-input" className="form-label">
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
                        <div className="mb-3 pt-3" style={{ width: "50%" }}>
                          <label htmlFor="month-input" className="form-label">
                            Month / Year
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="month-input"
                            aria-describedby="monthHelp"
                            placeholder="Type how long you worked..."
                            onChange={(e) => setMonth(e.target.value)}
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
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr style={{ marginTop: "50px" }} />
                    <a
                      href="#"
                      className="btn btn-primary mt-3"
                      style={{ width: "100%" }}
                    >
                      Add work experience
                    </a>
                  </div>
                  <div className="pt-5">
                    <h2>Portfolio</h2>
                    <hr />
                    <div className="mb-3 pt-3" style={{ width: "100%" }}>
                      <label htmlFor="app-input" className="form-label">
                        App name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="app-input"
                        aria-describedby="appHelp"
                        placeholder="Type your app name..."
                        onChange={(e) => setMonth(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-3" style={{ width: "100%" }}>
                      <label htmlFor="repo-input" className="form-label">
                        Repository link
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="repo-input"
                        aria-describedby="repoHelp"
                        placeholder="Type your repository link..."
                        onChange={(e) => setRepo(e.target.value)}
                      />
                    </div>
                    <label htmlFor="repo-input mb-3" className="form-label">
                      Type of portfolio
                    </label>
                    <div className="d-flex gap-5">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Mobile app
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Website app
                        </label>
                      </div>
                    </div>
                    <div className="mb-3 pt-3">
                      <label for="formFile" class="form-label">
                        Upload photo
                      </label>
                      <input class="form-control" type="file" id="formFile" />
                    </div>
                    <a
                      href="#"
                      className="btn btn-primary mt-4"
                      style={{ width: "100%" }}
                    >
                      Add portfolio
                    </a>
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

export default EditProfile;
