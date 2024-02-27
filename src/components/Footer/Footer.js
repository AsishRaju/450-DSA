import React, { useContext } from "react";
import Badge from "react-bootstrap/Badge";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import "./footer.css";
import { localStorageKeyForAuthentication } from "../../services/constants";

export default function Footer({ dark, setDark }) {
  const { user, setUser } = useContext(GlobalContext);

  const history = useHistory();

  const onLogOutButtonClicked = () => {
    // remove token from localStorage
    localStorage.removeItem(localStorageKeyForAuthentication);
    // set state as null
    setUser({
      name: "",
      email: "",
      isLoggedIn: false,
    });
    // go to login page
    history.push("/login");
  };

  return (
    <div>
      <footer
        className="footer"
        style={{ backgroundColor: dark ? "#393E46" : "" }}
      >
        <div className="d-flex bd-highlight">
          <div className="p-2 bd-highlight">
            <a href="https://github.com/AsishRaju/450-DSA">
              <h4>
                <Badge pill variant="light" className="hvr-grow">
                  <span role="img" aria-label="star" className="emojiFix">
                    ⭐
                  </span>{" "}
                  This project
                </Badge>
              </h4>
            </a>
          </div>
          <div className="ml-auto p-2 bd-highlight footer-toggle">
            <h4>
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
              <Badge
                onClick={onLogOutButtonClicked}
                pill
                variant="light"
                className="hvr-grow ml-3"
              >
                Log Out{" "}
                <span role="img" aria-label="star" className="emojiFix">
                  👋
                </span>{" "}
              </Badge>
            </h4>
          </div>
        </div>
      </footer>
    </div>
  );
}
