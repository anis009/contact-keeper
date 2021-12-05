import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);
	const { clearContacts } = contactContext;
	const { isAuthenticated, logout, user } = authContext;
	const onLogout = () => {
		logout();
		clearContacts();
	};
	const authLinks = (
		<Fragment>
			<li>Hello {user && user.user.name}</li>
			<li>
				<a href="#!" onClick={onLogout}>
					<i className="fas fa-sign-out-alt"></i>
					<span className="hide-sm">logout</span>
				</a>
			</li>
		</Fragment>
	);

	const gusetLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);
	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon}></i>
				{title}
			</h1>
			<ul>{isAuthenticated ? authLinks : gusetLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};
Navbar.defaultProps = {
	title: "Contact Keeper",
	icon: "fas fa-id-card-alt",
};

export default Navbar;
