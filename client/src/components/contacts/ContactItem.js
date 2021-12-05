import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";
const ContactItem = ({ contact }) => {
	const { _id, email, name, phone, type } = contact;
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;
	const onDelete = () => {
		// console.log("id", id)
		deleteContact(_id);
		clearCurrent();
	};
	return (
		<div className="bg-light card mr-auto">
			<h3 className="text-primary text-left">
				{name}{" "}
				<span
					className={
						"badge " +
						(type === "professional" ? "badge-success" : "badge-primary")
					}
					style={{ float: "right" }}
				>
					{type ? type.charAt(0).toUpperCase() + type.slice(1) : type}
				</span>
			</h3>
			<ul>
				{email && (
					<li>
						<i className="fas fa-envelope-open"></i> {email}
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-phone"></i>
						{phone}
					</li>
				)}
			</ul>
			<p>
				<button
					className="btn btn-dark btn-sm"
					onClick={() => setCurrent(contact)}
				>
					Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default ContactItem;
