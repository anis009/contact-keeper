import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment, useContext } from "react";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/authState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/alertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import AuthContext from "./context/auth/authContext";
const App = () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar />
							<div className="container">
								<Alerts />
								<Routes>
									<Route exact path="/" element={<Home />} />
									<Route exact path="/about" element={<About />} />
									<Route exact path="/register" element={<Register />} />
									<Route exact path="/login" element={<Login />} />
								</Routes>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
