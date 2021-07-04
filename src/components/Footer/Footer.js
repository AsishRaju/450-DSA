import React, { useContext } from "react";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import "./footer.css";
export default function Footer({ dark, setDark }) {
	return (
		<div>
			<footer className="footer" style={{ backgroundColor: dark ? "#393E46" : "" }}>
				<div className="d-flex bd-highlight">
					<div className="p-2 bd-highlight">
						<a href="https://github.com/AsishRaju/450-DSA">
							<h4>
								<Badge pill variant="light" className="hvr-grow">
									<span role="img" aria-label="star">
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
								<span role="img" aria-label="sun-and-moon-emoji">
									{dark ? <span>☀️</span> : <span>🌙</span>}
								</span>
							</Badge>{" "}
							<Link to="/about">
								<Badge pill variant="light" className="hvr-grow">
									About{" "}
									<span role="img" aria-label="face-with-monocole">
										🧐
									</span>
								</Badge>
							</Link>
						</h4>
					</div>
				</div>
			</footer>
		</div>
	);
}
