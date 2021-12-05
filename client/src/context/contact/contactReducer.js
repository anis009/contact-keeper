import {
	ADD_CONTACT,
	UPDATE_CONTACT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	DELETE_CONTACT,
	SET_CURRENT,
	FILTER_CONTACTS,
	ERROR_CONTACT,
	GET_CONTACT,
	CLEAR_CONTACT,
} from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	console.log(state);
	switch (action.type) {
		case GET_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, ...action.payload],
				loading: false,
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
				loading: false,
			};
		case CLEAR_CONTACT:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null,
			};

		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact._id === action.payload._id ? action.payload : contact
				),
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact._id !== action.payload
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
		case ERROR_CONTACT:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
