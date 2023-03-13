import React from "react";
import styles from "@/styles/components/Footer.module.scss";
import Image from "next/image";
import proworldLogo from "@/public/images/proworld-logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Image
          src={proworldLogo}
          unoptimized={true}
          className={styles.appLogo}
          alt="Logo"
        />
        <p>
          Proworld is a website for companies looking for employees with the
          required skills. If you are a Recruiter, you can look for Talent that
          your company needs. If you are a Talent, you can upload your profile
          so recruiters can see it.
        </p>
      </div>
      <hr />
      <div>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li style={{ marginLeft: "3.8%", marginRight: "54.6%" }}>
            2023 Proworld. All right reserved
          </li>
          <li style={{ marginRight: "6%" }}>Phone</li>
          <li>Email</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
