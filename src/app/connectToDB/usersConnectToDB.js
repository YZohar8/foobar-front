import publicFun from "../../publicFun.js";
import { deleteUserPosts } from "./postsConnectToDB.js"
import commentsConnectToDB from "./commentsConnectToDB.js";
import friendsConnectToDB from "./friendsConnectToDB.js";
import DB from "./fakeDB.js";

let users = [];

// Generate the next ID for a new user
const getNextId = () => {
    users = DB.getUsers();
    let maxId = 0; 
    for (const user of users) { 
        if (parseInt(user.id, 10) > maxId) {
            maxId = parseInt(user.id, 10);
        }
    }
    return maxId + 1; 
};


const validateUserData = async (userData, isUpdate = false) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const base64ImagePattern = /^data:image\/(jpeg|jpg|png);base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    if (userData.email && !emailPattern.test(userData.email)) {
        throw new Error('Invalid email format.');
    }

    if (userData.password && !passwordPattern.test(userData.password)) {
        throw new Error('Password must be at least 8 characters long and contain both numbers and letters.');
    }

    if (!isUpdate || userData.email) {
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('Email in use.');
        }
    }

    if (userData.image && !base64ImagePattern.test(userData.image)) {
        throw new Error('Unsupported or invalid base64 image. Allowed types are .jpg, .jpeg, .png.');
    }
};


// Check if a user exists by email or ID
export const getUserByUsernameOrId = async (usernameOrId) => {
    users = DB.getUsers();

    const user = users.find(user => user.email === usernameOrId || parseInt(user.id) === parseInt(usernameOrId)) || null;
    return { success: true, user: user };
};

// Add a new user to the database
export const addUser = async (e, user) => {
    users = DB.getUsers();

    e.preventDefault();
    try {
        user.image = await publicFun.compressBase64Image(user.image);

        await validateUserData(user);

        const newUser = {
            id: getNextId(),
            name: user.name, 
            email: user.email,
            password: user.password,
            image: user.image,
            friends: user.friendsList || []
        };

        users.push(newUser);
        DB.setUsers(users);
        return { success: true, message: 'User created successfully!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};


// Login a user
export const login = async (e, email, password) => {
    users = DB.getUsers();

    e.preventDefault();
    const user = users.find(user => user.email === email) || null;

    if (!user) {
        return { success: false, message: "Email doesn't exist" };
    }

    if (user.password === password) {
        sessionStorage.setItem('connectUsername', email);
        sessionStorage.setItem('myUserId', user.id);
        return { success: true, message: 'Login successful' };
    } else {
        return { success: false, message: "Wrong password!" };
    }
};

// Check if the user is still logged in
export const stillLogin = async () => {
    users = DB.getUsers();

    const userId = sessionStorage.getItem('myUserId');

    if (users.length === 0) {
        return { success: false, message: 'Logged out' };
    }
    if (userId) {
        return { success: true, message: 'Still logged in' };
    } else {
        return { success: false, message: 'Logged out' };
    }
};

// Delete a user by ID
export const deleteUser = async (id) => {
    users = DB.getUsers();

    if (!commentsConnectToDB.deleteCommentsWhenUserDelete(id)) {
        return { success: false, message: 'problem with delete comments' };
    }

    if (!deleteUserPosts(parseInt(id, 10))) {
        return { success: false, message: 'problem with delete post' };
    }


    const index = users.findIndex(user => parseInt(user.id, 10) === parseInt(id));
    if (index === -1) {
        return { success: false, message: 'User not found' };
    }

    const myUser = users.find(user => parseInt(user.id) === parseInt(id));
    for (const friend of myUser.friends) {
        friendsConnectToDB.updateFriendStatus(id, friend.friendId, "not")
    }

    users.splice(index, 1);
    sessionStorage.removeItem('myUserId');
    sessionStorage.removeItem('connectUsername');

    DB.setUsers(users);
    return { success: true, message: 'User deleted successfully' };
};

// Update a user's name and image
export const updateUser = async (id, name, image) => {
    users = DB.getUsers();

    try {
        const user = users.find(user => parseInt(user.id, 10) === parseInt(id));
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const compressedImage = await publicFun.compressBase64Image(image);
        user.name = name || user.name;
        user.image = compressedImage || user.image;

        DB.setUsers(users);
        return { success: true, updateUser: user };
    } catch (error) {
        return { success: false, message: 'Error updating user', error };
    }
};














