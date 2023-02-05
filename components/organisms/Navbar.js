/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import proworldLogo from "@/public/images/proworld-logo-2.png";
import styles from "@/styles/components/Navbar.module.scss";
import mailLogo from "@/public/images/mail-logo.png";
import bellLogo from "@/public/images/bell-logo.png";
import { getCookie } from "cookies-next";

const NavbarLogged = () => {
  const [profile, setProfile] = useState(null);

 useEffect(() => {  
  if( getCookie("profile")){
    setProfile(JSON.parse( getCookie("profile")))
  }
 }, [getCookie("profile")])

  return (
    <nav
    style={{
      backgroundColor: "white",
    }}
    className="navbar navbar-expand-lg fixed-top"
  >
    <div className="container">
      <Link href="/">
        <Image src={proworldLogo} className={styles.appLogo} />
      </Link>
      <div className="d-flex">
        <div>
          <Image
            src={bellLogo}
            alt="Profile"
            style={{
              width: "29px",
              height: "27px",
              marginTop: "18px",
              marginRight: "36px",
            }}
          />
          <Image
            src={mailLogo}
            alt="Profile"
            style={{
              width: "35px",
              height: "30px",
              marginTop: "17px",
              marginRight: "29px",
            }}
          />
        </div>

        <div className="d-flex align-items-end">
          <img
            className="rounded-circle mt-2"
            src={profile?.photo_profile}
            alt="Profile"
            style={{
              width: "45px",
              marginBottom: "1px",
              marginRight: "9px",
            }}
          />
        </div>
        {/* <div class="btn-group" style={{ marginRight: "-35px" }}>
          <button
            class={`btn btn-sm dropdown-toggle ${styles.dropdownButton}`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {profile?.fullname}
          </button>
          <ul class="dropdown-menu" style={{ width: "130px" }}>
            <li>
              <a class="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Setting
              </a>
            </li>
            <li>
              <Link class="dropdown-item" href="/auth/logout">
                Logout
              </Link>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Separated link
              </a>
            </li>
          </ul>
        </div> */}

<div class="btn-group">
  <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" style={{height: "35px", marginTop: "12px"}}>
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
  <Link class="dropdown-item" href="/auth/logout"><li>Logout</li></Link>
  </ul>
</div>
      </div>
    </div>
  </nav>
  )
};

const NavbarGuest = () => (
      <nav
        style={{
          backgroundColor: "white",
        }}
        className="navbar navbar-expand-lg fixed-top"
      >
        <div className="container">
          <Link href="/">
            <Image src={proworldLogo} className={styles.appLogo} />
          </Link>
            <div>
              <Link href="/auth">
                <button
                  type="button"
                  className="btn btn-primary shadow-sm me-3"
                >
                  Join us
                </button>
              </Link>
            </div>
        </div>
      </nav>
)

const Navbar = () => {
  console.log({
    islogin: getCookie("isLogin"),
    profile: getCookie("profile"),
  });
  const [isLogin, setIsLogin] = useState(false);
  

  useEffect(() => {
    if(getCookie("isLogin")){
      setIsLogin(true)
    }
  }, [getCookie("isLogin")])

  return (
    <div>
      {isLogin ? <NavbarLogged /> : <NavbarGuest />}
    </div>
  );
};

export default Navbar;
