import NextAuth from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const LOGIN_MUTATION = gql `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;
const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
});
export const authOptions = {
    // Include user.id on session
    // callbacks: {
    //   session({ session, user }) {
    //     if (session.user) {
    //       session.user.id = user.id;
    //     }
    //     return session;
    //   },
    // },
    // Configure one or more authentication providers
    // providers: [
    //   DiscordProvider({
    //     clientId: env.DISCORD_CLIENT_ID,
    //     clientSecret: env.DISCORD_CLIENT_SECRET,
    //   }),
    //   // ...add more providers here
    // ],
    pages: {
        signIn: "/login",
        newUser: "/signUp",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "",
                },
            },
            async authorize(credentials) {
                console.log("authorize", credentials);
                const resp = await client.mutate({
                    mutation: LOGIN_MUTATION,
                    variables: {
                        email: credentials?.email,
                        password: credentials?.password,
                    },
                });
                console.log("resp", resp);
                const user = resp?.data?.login;
                console.log("user", user);
                if (user) {
                    return user;
                }
                throw new Error("Invalid email or password");
            },
        }),
    ],
};
export default NextAuth(authOptions);
