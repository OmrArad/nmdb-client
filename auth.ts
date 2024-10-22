import NextAuth, { Account, Session } from "next-auth";
import { AdapterSession, AdapterUser } from "next-auth/adapters";
import { JWT, decode } from "next-auth/jwt";
import google from "next-auth/providers/google";

interface ExtendedJWT extends JWT {
  id?: string;
  access_token?: string; // Make `id` optional to ensure compatibility with original JWT type
}

type SessionType = {
  user: AdapterUser;
} & AdapterSession &
  Session;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google],
  session: { strategy: "jwt", maxAge: 60 * 60 },
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      console.log("access token", token)
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionType;
      token: ExtendedJWT;
    }) {
      session.user.id = token.id!;
      session.accessToken = token.access_token!;
      // console.log(session.accessToken);
      return session;
    },
  },
});
