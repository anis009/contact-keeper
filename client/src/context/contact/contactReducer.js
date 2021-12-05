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

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	console.log(state);
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
			};

		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact.id === action.payload.id ? action.payload : contact
				),
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact.id !== action.payload
				),
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, "gi");
					return contact.name.match(regex) || contact.email.match(regex);
				}),
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};

		default:
			return state;
	}
};
