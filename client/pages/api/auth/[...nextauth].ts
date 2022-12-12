import { createSecretKey } from 'crypto';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'c@c.com' },
        id: { label: 'ID', type: 'id', placeholder: '1' },
      },
      async authorize(credentials) {
        // console.log('credentials', credentials);
        return {
          email: credentials?.email,
          id: credentials?.id as string,
        };
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      console.log('token', token);
      console.log(token.token);
      console.log('user!! ', user);
      console.log('account', account);
      console.log('profile', profile);
      console.log('isNewUser', isNewUser);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
