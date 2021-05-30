import React from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Fade from "react-reveal/Fade";

export default function About() {
	return (
		<>
			<div className="container-custom">
				<Fade duration={500}>
					<div className="container my-5">
						<Alert variant="success">
							<Alert.Heading className="text-center">About</Alert.Heading>
							<hr />
							<h4 className="text-center">
								450 DSA Cracker helps you build your confidence in solving any coding <br /> related question and helps you prepare for
								your placements{" "}
								<span role="img" aria-label="student">
									👨🏻‍🎓
								</span>
							</h4>
						</Alert>
					</div>
					<div className="container my-5">
						<h2 className="text-center">
							<a href="https://www.450dsa.com">450dsa</a> is your personal web-based progress tracker based on <br></br>
							<i>
								<a
									href="https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view"
									target="_blank"
									rel="noopener noreferrer"
								>
									DSA Cracker Sheet
								</a>
							</i>{" "}
							by{" "}
							<b>
								<a href="https://www.linkedin.com/in/love-babbar-38ab2887/" target="_blank" rel="noopener noreferrer">
									Love Babbar
								</a>
							</b>{" "}
							<span role="img" aria-label="join-hands">
								🙏🏻
							</span>
						</h2>
						<h4 className="text-center my-5">
							Project by{" "}
							<a href="https://www.linkedin.com/in/asishraju/" target="_blank" rel="noopener noreferrer">
								Asish
							</a>{" "}
							<span role="img" aria-label="code-men">
								👨🏻‍💻
							</span>
						</h4>
						<h3 className="text-center my-5">
							<Badge>
								For the{" "}
								<span role="img" aria-label="orange-hearth">
									🧡
								</span>{" "}
								to code{" "}
								<span role="img" aria-label="victory">
									✌🏻
								</span>
							</Badge>{" "}
						</h3>
					</div>
				</Fade>
			</div>
		</>
	);
}
