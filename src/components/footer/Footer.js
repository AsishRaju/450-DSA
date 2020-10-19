import React from "react";
import "./footer.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
export default function Footer() {
	return (
		<div>
			<footer className="footer">
				<div className="d-flex bd-highlight">
					<div className="p-2 bd-highlight">
						<a href="https://github.com/AsishRaju/450-DSA">
							<h4>
								<Badge pill variant="light" as="a">
									<span role="img" aria-label="star">
										⭐
									</span>{" "}
									this project
								</Badge>
							</h4>
						</a>
					</div>
					<div className="ml-auto p-2 bd-highlight">
						<h4>
							<Link to="/about">
								<Badge pill variant="light">
									About
								</Badge>
							</Link>
						</h4>
					</div>
				</div>
			</footer>
		</div>
	);
}
