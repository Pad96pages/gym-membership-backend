# Temporary Storage Solution

## Issue Fixed
The original MongoDB Atlas connection was failing due to DNS resolution issues:
`querySrv ENOTFOUND _mongodb._tcp.demo.enavnv2.mongodb.net`

## Temporary Solution
Implemented a file-based storage system that:
- Stores user data in `temp-data/users.json`
- Stores booking data in `temp-data/bookings.json`
- Provides the same API interface as MongoDB
- Maintains data persistence between API calls

## Files Modified
- `src/lib/tempStorage.js` - New temporary storage implementation
- `src/pages/api/register.js` - Updated to use tempStorage
- `src/pages/api/login.js` - Updated to use tempStorage  
- `src/pages/api/book.js` - Updated to use tempStorage

## Features Working
✅ User registration
✅ User login with JWT authentication
✅ Session booking
✅ Data persistence between server restarts

## Next Steps
To switch back to MongoDB when the connection issue is resolved:
1. Fix the MongoDB connection string in `.env.local`
2. Update the API files to import from `@/lib/mongodb` instead of `@/lib/tempStorage`
3. Replace `tempStorage.users` and `tempStorage.bookings` calls with MongoDB collection calls
4. Remove the `temp-data` directory and `tempStorage.js` file

## Data Location
Temporary data is stored in: `temp-data/` directory in the project root
- `users.json` - User accounts and credentials
- `bookings.json` - Gym session bookings
