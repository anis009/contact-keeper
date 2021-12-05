import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered, loading, getContacts } = contactContext;

	useEffect(() => {
		getContacts();
		console.log(contacts);
	}, []);

	if (contacts?.length === 0) {
		return <h4>please add a contact</h4>;
	}
	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((contact) => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames="item"
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition key={contact._id} timeout={500}>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<h1>Loading...</h1>
			)}
		</Fragment>
	);
};

export default Contacts;
