// Temporary file-based storage for testing
// This should be replaced with proper MongoDB connection once network issues are resolved

import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'temp-data');
const usersFile = path.join(dataDir, 'users.json');
const bookingsFile = path.join(dataDir, 'bookings.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Helper functions
function readUsers() {
  try {
    if (fs.existsSync(usersFile)) {
      const data = fs.readFileSync(usersFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading users file:', error);
  }
  return [];
}

function writeUsers(users) {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
  }
}

function readBookings() {
  try {
    if (fs.existsSync(bookingsFile)) {
      const data = fs.readFileSync(bookingsFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading bookings file:', error);
  }
  return [];
}

function writeBookings(bookings) {
  try {
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
  } catch (error) {
    console.error('Error writing bookings file:', error);
  }
}

export const tempStorage = {
  users: {
    findOne: (query) => {
      const users = readUsers();
      if (query.email) {
        return users.find(user => user.email === query.email) || null;
      }
      if (query._id) {
        return users.find(user => user._id === query._id) || null;
      }
      return null;
    },
    
    insertOne: (userData) => {
      const users = readUsers();
      const newUser = {
        _id: Date.now().toString(), // Simple ID generation
        ...userData,
        createdAt: new Date()
      };
      users.push(newUser);
      writeUsers(users);
      return { insertedId: newUser._id };
    },
    
    countDocuments: () => readUsers().length
  },
  
  bookings: {
    findOne: (query) => {
      const bookings = readBookings();
      return bookings.find(booking => {
        return Object.keys(query).every(key => booking[key] === query[key]);
      }) || null;
    },
    
    insertOne: (bookingData) => {
      const bookings = readBookings();
      const newBooking = {
        _id: Date.now().toString(),
        ...bookingData,
        createdAt: new Date()
      };
      bookings.push(newBooking);
      writeBookings(bookings);
      return { insertedId: newBooking._id };
    },
    
    countDocuments: () => readBookings().length
  }
};

export default tempStorage;
