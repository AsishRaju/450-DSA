import React from "react";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import "./footer.css";
export default function Footer({ dark, setDark }) {
	return (
		<div>
			<footer className="footer" style={{ backgroundColor: dark ? "#393E46" : "" }}>
				{/* Footer code goes here */}
			</footer>
		</div>
	);
}
