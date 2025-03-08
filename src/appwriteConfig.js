import { Client, Account } from "appwrite";

const client = new Client();
client.setProject("671bc8e4003b8992fe59");

export const account = new Account(client);

export default client;
