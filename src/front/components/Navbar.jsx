import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	return (
		<nav style={styles.navbar}>
			<Link to="/" style={{ ...styles.logo, textDecoration: "none" }}>
				Beauty Center
			</Link>
			<ul style={styles.navLinks}>
				<li><Link to="/" style={styles.link}>Home</Link></li>
				<li><Link to="/services" style={styles.link}>Service</Link></li>
				<li><Link to="/gallery" style={styles.link}>Gallery</Link></li>
				<li><Link to="/appointment" style={styles.link}>Appointment</Link></li>
				<li><Link to="/contact" style={styles.link}>Contact Us</Link></li>
			</ul>

			<div style={styles.dropdownContainer}>
				<button onClick={toggleDropdown} style={styles.button}>
					Sign in <span style={styles.arrow}>▼</span>
				</button>
				{dropdownOpen && (
					<ul style={styles.dropdownMenu}>
						<li style={styles.dropdownItem}>Name Usuario</li>
						<li><Link to="/profile" style={styles.dropdownLink}>Profile</Link></li>
						<li><Link to="/appointment" style={styles.dropdownLink}>Appointment</Link></li>
						<li><Link to="/contact" style={styles.dropdownLink}>Contact Us</Link></li>
						<li style={{ ...styles.dropdownLink, color: "red", cursor: "pointer" }}>Salir</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

const styles = {
	navbar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "15px 40px",
		background: "linear-gradient(135deg, #a7706c, #f6c3b3)",
		fontFamily: "'Georgia', serif",
		color: "#f8e9e6",
		position: "relative",
	},
	logo: {
		color: "#f8e9e6",
		fontWeight: "bold",
		fontSize: "24px",
	},
	navLinks: {
		listStyle: "none",
		display: "flex",
		gap: "25px",
		margin: 0,
		padding: 0,
	},
	link: {
		textDecoration: "none",
		color: "#f8e9e6",
		fontSize: "18px",
	},
	dropdownContainer: {
		position: "relative",
	},
	button: {
		backgroundColor: "rgba(255,255,255,0.1)",
		border: "1px solid #f8e9e6",
		color: "#f8e9e6",
		padding: "8px 20px",
		borderRadius: "10px",
		cursor: "pointer",
		fontSize: "16px",
	},
	arrow: {
		marginLeft: "8px",
	},
	dropdownMenu: {
		position: "absolute",
		right: 0,
		marginTop: "10px",
		backgroundColor: "#f5e8e4",
		borderRadius: "10px",
		padding: "10px 0",
		boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
		listStyle: "none",
		width: "180px",
		zIndex: 1000,
	},
	dropdownItem: {
		padding: "10px 20px",
		color: "#333",
		fontWeight: "bold",
	},
	dropdownLink: {
		display: "block",
		padding: "10px 20px",
		color: "#333",
		textDecoration: "none",
	}
};

export default Navbar;
