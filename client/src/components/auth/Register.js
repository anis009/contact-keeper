import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
const Register = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	// const useNavigate = Navigate();
	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			// navigate("/");
			window.location.href = "/";
		}
		if (error === "User already exists") {
			setAlert(error, "danger");
		}
		clearErrors();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const { name, email, password, password2 } = user;
	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		console.log("register");
		if (name === "" || email === "" || password === "") {
			setAlert("Please enter all fields", "danger", 3000);
		} else if (password !== password2) {
			setAlert("Password dont match", "danger");
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};
	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Rgister</span>
			</h1>
			<form action="" onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" onChange={onChange} value={name} />
				</div>

				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input type="email" name="email" onChange={onChange} value={email} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						onChange={onChange}
						value={password}
						minLength={6}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
					<input
						type="password"
						name="password2"
						onChange={onChange}
						value={password2}
						minLength={6}
					/>
				</div>
				<input
					type="submit"
					value="Register"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Register;
