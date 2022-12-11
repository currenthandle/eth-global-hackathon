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
      },
      async authorize(credentials) {
        console.log('credentials', credentials);
        return {
          email: 'c@c.com',
          password: 'cc',
          id: '1',
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
