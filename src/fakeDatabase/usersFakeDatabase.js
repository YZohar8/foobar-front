

const users = []; // This acts as our in-memory database

// Function to check if a user exists (for register)
const getUserByUsername = (username) => {
    return users.find((user) => user.username === username);
};


// Function to add a user to the database
export const addUser = (user) => {
    users.push(user);
};

// Function to check if a user exists (for register)
export const checkUserByUsername = (username) => {
    if (getUserByUsername(username)) {
        return true;
    }
    return false;
};

// Function to check if a user exists and passwors is ok (for login)
export const checkUserByUsernameAndPassword = (username, password) => {
    const user = getUserByUsername(username);
    console.log(user);
    if (user && user.password === password) {
        return true;
    }
    return false; 
};

  // Function the user id
export const getUserIdByUsername = (username) => {
    return (getUserByUsername(username)).Id;
};

// Function to get the next available ID
export const getNextUserId = () => {
    if (users.length === 0) {
      return 1; // If no users, start with ID 1
    }
    // Get the maximum user ID and return the next one
    const maxId = Math.max(...users.map(user => user.id));
    return maxId + 1;
  };

