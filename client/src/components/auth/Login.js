import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
const Login = () => {
	const navigate = useNavigate();
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;
	const { isAuthenticated, error, clearErrors, login } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			window.location.href = "/";
		}
		if (error === "Invalid Credentials") {
			setAlert(error, "danger");
			clearErrors();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, isAuthenticated]);

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const { email, password } = user;

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			setAlert("Please fill in all fields", "danger");
		} else {
			login({ email, password });
		}
	};
	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form action="" onSubmit={onSubmit}>
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
					/>
				</div>
				<input
					type="submit"
					value="Login"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Login;
