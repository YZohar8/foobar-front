import DB from "./fakeDB.js";

const getApprovedFriends = async (userId) => {
    try {
        let users = DB.getUsers();
        let myUser = users.filter(user => parseInt(user.id, 10) === parseInt(userId, 10));
        myUser = myUser[0];
        if (!myUser) {
            return { success: false, message: "user dont found" };
        }
        const approvedFriends = myUser.friends.filter(friend => friend.status === "approved");
        const approvedFriendsToSend = [];
        let friendsUser = null;

        for (const friend of approvedFriends) {
            friendsUser = users.filter(user => parseInt(user.id, 10) === parseInt(friend.friendId, 10));
            friendsUser = friendsUser[0];
            if (!friendsUser) {
                continue;
            }
            const friendToSend = {
                id: friend.friendId,
                name: friendsUser.name,
                image: friendsUser.image
            }
            approvedFriendsToSend.push(friendToSend);
        }
        return { success: true, approvedFriends: approvedFriendsToSend };

    } catch (error) {
        return { success: false, message: 'Error fetching friends' };
    }
};

const getPendingFriends = async (userId) => {
    try {
        let users = DB.getUsers();
        let myUser = users.filter(user => parseInt(user.id, 10) === parseInt(userId, 10));
        myUser = myUser[0];
        if (!myUser) {
            return { success: false, message: "user dont found" };
        }
        const approvedFriends = myUser.friends.filter(friend => friend.status === "pending");
        
        const approvedFriendsToSend = [];
        let friendsUser = null;

        for (const friend of approvedFriends) {
            friendsUser = users.find(user => parseInt(user.id, 10) === parseInt(friend.friendId, 10));
            if (!friendsUser) {
                continue;
            }
            const friendToSend = {
                id: friend.friendId,
                name: friendsUser.name,
                image: friendsUser.image
            }
            approvedFriendsToSend.push(friendToSend);
        }
        return { success: true, pendingFriends: approvedFriendsToSend };

    } catch (error) {
        return { success: false, message: 'Error fetching friends' };
    }
};

const getFriendshipStatus = async (userId, friendId) => {
    try {
        let users = DB.getUsers();
        let myUser = users.filter(user => parseInt(user.id, 10) === parseInt(userId, 10));
        myUser = myUser[0];
        if (!myUser) {
            return { success: false, message: "user dont found" };
        }

        for (const friend of myUser.friends) {
            if (parseInt(friend.friendId, 10) === parseInt(friendId, 10)) {
                return { success: true, friendshipStatus: {status: friend.status}};
            }
        }
        return { success: true, friendshipStatus: {status: "not_friends"}};
        

    } catch (error) {
        return { success: false, message: 'Error fetching friendship status' };
    }
};

const updateFriendStatus = async (userId, friendId, status) => {
    try {
        let users = DB.getUsers();

        let myUser = users.find(user => parseInt(user.id, 10) === parseInt(userId, 10));
        if (!myUser) {
            return { success: false, message: "User not found" };
        }

        let friendUser = users.find(user => parseInt(user.id, 10) === parseInt(friendId, 10));
        if (!friendUser) {
            return { success: false, message: "Friend user not found" };
        }

        let newStatusUser = "";
        let newStatusFriend = "";

        if (status === "approved") {
            newStatusUser = "approved";
            newStatusFriend = "approved";
        } else if (status === "pending") {
            newStatusUser = "s-pending";
            newStatusFriend = "pending";
        } else if (status === "not") {
            newStatusUser = "not_friends";
            newStatusFriend = "not_friends";
        } else {
            return { success: false, message: "Status not valid" };
        }

        const existingFriend = myUser.friends.find(friend => parseInt(friend.friendId, 10) === parseInt(friendId, 10));
        if (existingFriend) {
            existingFriend.status = newStatusUser; 
        } else {
            myUser.friends.push({ friendId: friendId, status: newStatusUser });
        }

        const existingFriendInFriend = friendUser.friends.find(friend => parseInt(friend.friendId, 10) === parseInt(userId, 10));
        if (existingFriendInFriend) {
            existingFriendInFriend.status = newStatusFriend; 
        } else {
            friendUser.friends.push({ friendId: userId, status: newStatusFriend });
        }

        DB.setUsers(users);
        return { success: true, message: "Friendship status updated successfully" };

    } catch (error) {
        return { success: false, message: "Error updating friendship status" };
    }
};

export default {
    getApprovedFriends,
    getPendingFriends,
    getFriendshipStatus,
    updateFriendStatus
}