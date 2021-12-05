import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactFilter from "../contacts/ContactFilter";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";

const Home = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, loading } = authContext;
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			authContext.loadUser();
		} else if (!isAuthenticated && !loading) {
			// navigate("/login");
			console.log("logout me");
			window.location.href = "/login";
		}
	}, [isAuthenticated, loading]);
	return (
		<div className="grid-2">
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter />
				<Contacts />
			</div>
		</div>
	);
};

export default Home;
