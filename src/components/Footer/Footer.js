import React from "react";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import "./footer.css";
import {ToogleButton} from '../../toogleButton';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';

export default function Footer({theme , setTheme}) {

	const toggleTheme = () => {
		if (theme === 'light') {
		  setTheme('dark');
		} else {
		  setTheme('light');
		}
	  }
  
	return (
		<div>
			<footer className="footer">
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
					<ToogleButton onClick={e => toggleTheme(theme)} className="toogler">                
				{
					<img src={theme === "dark" ?sun:moon} alt="toggle theme" className="sun-moon"/>
				}     
				</ToogleButton>
					<div className="p-2 bd-highlight">
						<h4>
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
