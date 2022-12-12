import NextAuth from 'next-auth';
// import { CredentialsProvider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'c@c.com' },
        password: { label: 'Password', type: 'password', placeholder: 'cc' },
        id: { label: 'ID', type: 'string', placeholder: '1' },
      },
      async authorize(credentials) {
        console.log('credentials', credentials);
        return {
          email: credentials?.email,
          id: credentials?.id as string,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
