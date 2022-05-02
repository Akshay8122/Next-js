import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

  //@ts-ignore
async function  refreshAccessToken(token:any)  {
   try {
     spotifyApi.setAccessToken(token.accessToken);
     spotifyApi.setRefreshToken(token.refreshAccessToken);

     const {body:refreshToken} = await spotifyApi.refreshAccessToken();
     console.log("RFRESH TOKEN IS",refreshToken);
    
     return {
       ...token,
       accessToken:refreshToken.access_token,
       //@ts-ignore
       accessTokenExpires: Date.now = refreshAccessToken.expires_in  * 1000,
       refreshToken:refreshToken.refresh_token ?? token.refreshToken,
     }
      
   }catch(error) {
     console.error(error);
     
     return {
       ...token,
       error:"RefreshAccessTokenError"
     } 
   }
  }


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
       
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization:LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({token,account,user }){
      //initial sign in
      if(account && user) {
        return {
          ...token as any,
          accessToken:account.access_token,
          refreshToken:account.refresh_token,
          username:account.providerAccountId,
        accessTokenExpires:account.expires_at as number * 1000,

        };
      }

      //retuen previous token if the acces token has not expire yet
       //@ts-ignore   
      if(Date.now() <  token.accessTokenExpire) {
           console.log("EXISTING ACCESS TOKEN IS VALID")
         }
         console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
         return await refreshAccessToken(token)
        },
    },
});

