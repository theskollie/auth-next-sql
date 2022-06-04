# User Authentication

Custom User Authentication Template for future projects built with Next.js, React, TypeScript, Mantine UI, SQLite3, JSON Web Token, BCrypt and Cookies.

Frontend + Backend both running in one NextJS Application. No need for CORS.

Users will need a JWT Token assigned by the server stored in their cookies to access protected pages.  
When users register, their email and password are stored in an SQLite DB (can be swapped out for PostgreSQL or MongoDB), after the password is encrypted with BCrypt, with several Salt Rounds.
BCrypt is very secure and cannot be reversed. When users login, their input is hashed and compared to the hashed result in the DB. If successful, server will serve a JWT token to the user which will be apended to all future requests in the client header.

If users select Remember Me, a JWT will be assigned with an expiration of 30 days - If not, the JWT will expire at the end of the session.

## Setup

Clone files, Install Node Modules
Run Dev.  
DB will be initialized if it doesn't exist on every startup.