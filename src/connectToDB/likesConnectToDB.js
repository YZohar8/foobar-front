const updateLike = async (postId) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/likes/${postId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'Error update Like' };
    }
};

const checkUserLike = async (postId) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/likes/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();


        if (response.ok) {
            return { success: true, message: data.message, result: data.result };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'Error Check User Like' };
    }
};



export default {
    updateLike,
    checkUserLike
}