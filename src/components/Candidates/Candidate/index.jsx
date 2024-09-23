import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./index.module.css";

const Candidate = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-item-1"]}>
        <div className={styles.name}>
          {item.name
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())}
          {item.linkedin.length > 0 ? (
            <a
              href={`https://${item.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          ) : (
            <i className={`bi bi-linkedin ${styles.disabled}`}></i>
          )}
        </div>

        <div className={styles.phone}>
          <span>
            <i className="bi bi-telephone-fill"></i>
          </span>
          {item.phone_numbers || "Mobile Number"}
        </div>

        <div className={styles.email}>
          <span>
            <i className="bi bi-envelope-fill"></i>
          </span>
          {item.email || "Email"}
        </div>
      </div>

      <div className={styles["card-item-2"]}>
        <div className={styles.location}>
          <span>
            <i className="bi bi-geo-alt-fill"></i>
          </span>
          {item.location || "Location"}
        </div>
        <div className={styles.region}>
          <span>
            <i className="bi bi-map-fill"></i>
          </span>
          {item.region || "Region"}
        </div>
        <div className={styles.experience}>{item.total_experience} Years</div>
      </div>

      <div className={styles["card-item-3"]}>
        <div className={styles.skills}>
          {item.skills.split(",").map((skill, index) => (
            <span key={index} className={styles["skill-bubble"]}>
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Hidden Buttons */}
      <div className={styles["hidden-actions"]}>
        <div className={styles["card-item-4"]}>
          <div className={styles.actions}>
            <button title="Edit">
              <i className="bi bi-pencil-square"></i>
            </button>
            <button title="Download">
              <i className="bi bi-download"></i>
            </button>
            <button title="View">
              <i className="bi bi-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Candidate.displayName = "Candidate";
export default Candidate;
