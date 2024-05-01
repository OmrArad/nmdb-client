import NextAuth, { Session } from "next-auth";
import { AdapterSession, AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { TokenEndpointHandler } from "next-auth/providers";
import google from "next-auth/providers/google";

interface ExtendedJWT extends JWT {
  id?: string; // Make `id` optional to ensure compatibility with original JWT type
}

type SessionType = {
  user: AdapterUser;
} & AdapterSession &
  Session;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: SessionType; token: ExtendedJWT }) {
      session.user.id = token.id!;
      return session;
    },
  },
});
