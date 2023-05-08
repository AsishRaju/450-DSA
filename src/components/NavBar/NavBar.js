import React from "react";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar({ dark, setDark }) {
  return (
    <div>
      <nav
        className="nav-bar"
      >
        <div className="d-flex bd-highlight">
          <div className="ml-auto p-2 bd-highlight navbar-toggle">
            <h4>
              <a href="https://github.com/AsishRaju/450-DSA" target="_blank">
                <Badge pill variant="light" className="hvr-grow">
                  <span role="img" aria-label="star" className="emojiFix">
                    ⭐
                  </span>{" "}
                  This project
                </Badge>
              </a>{" "}
              {/* toggle dark mode */}
              <Badge
                pill
                variant="light"
                className="hvr-grow"
                onClick={() => {
                  setDark(!dark);
                  window.localStorage["isDark"] = !dark;
                }}
                style={{ cursor: "pointer" }}
              >
                {dark ? (
                  <span role="img" aria-label="sun-emoji" className="emojiFix">
                    ☀️
                  </span>
                ) : (
                  <span role="img" aria-label="moon-emoji" className="emojiFix">
                    🌙
                  </span>
                )}
              </Badge>{" "}
              <Link to="/about">
                <Badge pill variant="light" className="hvr-grow">
                  About{" "}
                  <span
                    role="img"
                    aria-label="face-with-monocole"
                    className="emojiFix"
                  >
                    🧐
                  </span>
                </Badge>
              </Link>
            </h4>
          </div>
        </div>
      </nav>
    </div>
  );
}
