
const getApprovedFriends = async (userId) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/friends/approved/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, approvedFriends: data.friends };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'Error fetching friends' };
    }
};

const getPendingFriends = async () => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch('http://localhost:8080/api/friends/pending', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        
        if (response.ok) {
            return { success: true, pendingFriends: data.friends };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'Error fetching pending friends' };
    }
};

const getFriendshipStatus = async (friendId) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/friends/status/${friendId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, friendshipStatus: data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'Error fetching friendship status' };
    }
};

const updateFriendStatus = async (friendId, status) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/friends/${friendId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({status}),
          });
          
          const data = await response.json();
          if (response.ok) {
            return { success: true, message: "update status"};
        } else {
            return { success: false, message: data.message };
        }
    } catch (error){
        return { success: false, message: `Error update friendship status` };
    }


};

export default {
    getApprovedFriends,
    getPendingFriends,
    getFriendshipStatus,
    updateFriendStatus
}