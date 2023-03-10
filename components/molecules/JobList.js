/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "@/styles/components/TalentCard.module.scss";
import { TfiLocationPin } from "react-icons/tfi";

const JobList = ({ item }) => {
  return (
    <>
      <Link
        href={`/jobs/detail/${item?.id}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img
          src={item?.["user.photo_profile"]}
          alt="Profile"
          className={styles.profileImage}
        />
        <h2
          style={{
            fontSize: "20px",
            paddingTop: "12px",
            paddingLeft: "20px",
            color: "black",
          }}
        >
          {item?.["user.fullname"]?.charAt(0).toUpperCase() +
            item?.["user.fullname"]?.slice(1)}
        </h2>
      </Link>
      <p
        style={{
          fontSize: "15px",
          paddingTop: "2px",
          paddingLeft: "20px",
          color: "#9EA0A5",
        }}
      >
        {item?.job?.charAt(0).toUpperCase() + item?.job?.slice(1)}
      </p>
      <div
        className="d-flex"
        style={{ marginBottom: "-6px", paddingLeft: "17px", gap: "8px" }}
      >
        <TfiLocationPin />
        <p style={{ marginTop: "-5px" }}>
          {item?.domicile?.charAt(0).toUpperCase() + item?.domicile?.slice(1)}{" "}
        </p>
      </div>
      <div className="d-flex" style={{ paddingLeft: "17px" }}>
        {item?.skills?.slice(0, 2).map((_item) => (
          <span
            className={"badge bg-warning"}
            style={{ marginRight: "10px" }}
            key={_item}
          >
            {_item}
          </span>
        ))}
        {item?.skills?.slice(2, item?.skills?.length)?.length ? (
          <span className={"badge bg-warning"}>
            {item?.skills?.slice(2, item?.skills?.length)?.length}+
          </span>
        ) : null}
      </div>
    </>
  );
};

export default JobList;
