const host = 'http://localhost:5300';

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const createUserRoute = `${host}/api/contacts/createContact`;
export const getAllUserRoute = `${host}/api/contacts/allContacts`;
export const updateContactRoute = `${host}/api/contacts/updateContact`;
export const deleteContactRoute = `${host}/api/contacts/deleteContact`;
export const setMessageRoute = `${host}/api/messages/addMessage`;
export const getAllMessagesRoute = `${host}/api/messages/getMessages`;
export const filterContactsRoute = `${host}/api/contacts/filterContacts`;