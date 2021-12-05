import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import { v4 as uuidv4 } from "uuid";

import {
	ADD_CONTACT,
	REMOVE_ALERT,
	SET_ALERT,
	UPDATE_CONTACT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	DELETE_CONTACT,
	SET_CURRENT,
	FILTER_CONTACTS,
} from "../types";

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: "1",
				name: "anis",
				email: "anis@gmail.com",
				phone: "012010422",
				type: "professional",
			},
			{
				id: "2",
				name: "anis",
				email: "anis@gmail.com",
				phone: "012010422",
				type: "personal",
			},
			{
				id: "3",
				name: "anis",
				email: "anis@gmail.com",
				phone: "012010422",
				type: "personal",
			},
		],
		current: null,
		filtered: null,
	};
	const [state, dispatch] = useReducer(contactReducer, initialState);
	// Add Contact
	const addContact = (contact) => {
		contact.id = uuidv4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};
	//Delete Contact
	const deleteContact = (id) => {
		console.log({ id });
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	//Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	//Clear Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//Update contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};
	//Filter Contacts
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};
	//Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
