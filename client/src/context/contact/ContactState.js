import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";

import {
	ADD_CONTACT,
	ERROR_CONTACT,
	CLEAR_CONTACT,
	UPDATE_CONTACT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	DELETE_CONTACT,
	SET_CURRENT,
	FILTER_CONTACTS,
	GET_CONTACT,
} from "../types";

const ContactState = (props) => {
	const initialState = {
		contacts: [],
		current: null,
		filtered: null,
		error: null,
	};
	const [state, dispatch] = useReducer(contactReducer, initialState);
	// GET COntact
	const getContacts = async () => {
		try {
			const res = await axios.get("/api/contacts");
			// console.log(res.data.contacts);
			dispatch({ type: GET_CONTACT, payload: res.data });
		} catch (err) {
			console.log(err);
			dispatch({ type: ERROR_CONTACT, payload: err.response.data });
		}
	};

	// Add Contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post("/api/contacts", contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			console.log(err);
			dispatch({ type: ERROR_CONTACT, payload: err.response.msg });
		}
	};
	//Update contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			console.log(err);
			dispatch({ type: ERROR_CONTACT, payload: err.response.msg });
		}
	};
	//Delete Contact
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (err) {
			dispatch({ type: ERROR_CONTACT, payload: err.response.msg });
		}
	};

	//Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	//Clear  Contacts
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACT });
	};

	//Clear current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
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
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts,
				clearContacts,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
