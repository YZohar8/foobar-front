

const getComments = async (postId) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, comments: data.comments};
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'Error recieve comments' };
    }
};

const createComment = async (postId, commentText) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({commentText}),
          });
          
          const data = await response.json();
          if (response.ok) {
            return { success: true, result: data.result};
        } else {
            return { success: false, message: data.message };
        }
    } catch (error){
        return { success: false, message: `Error create new comments` };
    }
};

const deleteComment = async (postId, commentId) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
          
          const data = await response.json();
          if (response.ok) {
            return { success: true, result: data.result};
        } else {
            return { success: false, message: data.message };
        }
    } catch (error){
        return { success: false, message: `Error delete comments` };
    }
};

const updateComment = async (postId, commentId, commentText) => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({commentText}),
          });
          
          const data = await response.json();
          if (response.ok) {
            return { success: true, result: data.result};
        } else {
            return { success: false, message: data.message };
        }
    } catch (error){
        return { success: false, message: `Error in update comments` };
    }
};

export default {
    getComments,
    createComment,
    deleteComment,
    updateComment
}