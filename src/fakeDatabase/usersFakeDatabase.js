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
    if (user && user.password === password) {
        return true;
    }
    return false;
};



export const getNameByUsername = (username) => {
    const user = getUserByUsername(username);
    if (user) {
        return user.name;
    }
    return null;
};

export const getProfilePicByUsername = (username) => {
    const user = getUserByUsername(username);
    if (user) {
        if (user.profilePic) {
            return URL.createObjectURL(user.profilePic);
        }
        return user.profilePicUrl;
    }
    return null;
    
};

