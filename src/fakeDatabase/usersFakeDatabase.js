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

export const getfriendsList = (username) => {
    const user = getUserByUsername(username);
    if (user) {
        return user.friendsList;
    }
    return [];
}

export const getfriendsRequests = (username) => {
    const user = getUserByUsername(username);
    if (user) {
        return user.friendsRequests;
    }
    return [];
}

export const addFriendTofriendsList = (myUser, myNewFriend) => {
    const user = getUserByUsername(myUser);
    const newFriend = getUserByUsername(myNewFriend);
    if (user && newFriend) {
        if (user.friendsRequests.includes(newFriend.username)) {
            // Remove the friend request using splice or filter
            user.friendsRequests = user.friendsRequests.filter(request => request !== newFriend.username);
            user.friendsList.push(newFriend.username);
            newFriend.friendsList.push(user.username);
            
            // If newFriend has myUser in their friendsRequests, remove it
            newFriend.friendsRequests = newFriend.friendsRequests.filter(request => request !== user.username);

            return true;
        }
    }
    return false;
};

export const deleteFriendFromfriendsList = (myUser, myNewFriend) => {
    const user = getUserByUsername(myUser);
    const deleteFriend = getUserByUsername(myNewFriend);
    if (user && deleteFriend) {
        // Remove from friends list using filter
        user.friendsList = user.friendsList.filter(friend => friend !== deleteFriend.username);
        deleteFriend.friendsList = deleteFriend.friendsList.filter(friend => friend !== user.username);
        return true;
    }
    return false;
};

export const addRequestsTofriendsRequests = (myUser, myNewFriend) => {
    const user = getUserByUsername(myUser);
    const newFriend = getUserByUsername(myNewFriend);
    if (user && newFriend) {
        // Check if the request doesn't already exist to avoid duplicates
        if (!newFriend.friendsRequests.includes(user.username)) {
            newFriend.friendsRequests.push(user.username);
            return true;
        }
    }
    return false;
};

export const deleteRequestsFromfriendsRequests = (myUser, myNewFriend) => {
    const user = getUserByUsername(myUser);
    const deleteFriend = getUserByUsername(myNewFriend);
    if (user && deleteFriend) {
        // Remove from friend requests list using filter
        deleteFriend.friendsRequests = deleteFriend.friendsRequests.filter(request => request !== user.username);
        return true;
    }
    return false;
};

export const isAlreadyFriend = (myUser, userToCheck) => {
    const user = getUserByUsername(myUser);
    if (user) {
        return user.friendsList.includes(userToCheck);
    }
    return false;
};

export const isAlreadyinRequestsList = (myUser, userToCheck) => {
    const user = getUserByUsername(userToCheck);
    if (user) {
        return user.friendsRequests.includes(myUser);
    }
    return false;
};

