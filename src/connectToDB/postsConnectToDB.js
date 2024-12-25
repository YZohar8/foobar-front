import publicFun from "../publicFun";


// Function to add a Post to the database
export const addPost = async (post, userId) => {
    const token = sessionStorage.getItem('jwt');

    if (post.image) {
        post.image = await publicFun.compressBase64Image(post.image);
    }

    try {

        const response = await fetch(`http://localhost:8080/api/posts/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(post),
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, user: data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while fetching the post.' };
    }


};


export const getPosts = async (userId) => {
    const token = sessionStorage.getItem('jwt');
    try {

        const response = await fetch(`http://localhost:8080/api/posts/all/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, posts: data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while recieve the posts.' };
    }
};

export const getPostsForOneUser = async(userId) => {
    const token = sessionStorage.getItem('jwt');
    try {

        const response = await fetch(`http://localhost:8080/api/posts/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, posts: data.posts };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while recieve the posts.' };
    }
};

export const getSearchPosts = async (text) => {


    const token = sessionStorage.getItem('jwt');
    try {

        const response = await fetch(`http://localhost:8080/api/posts/search/all`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({text}),

        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, posts: data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while recieve the search posts.' };
    }
};

export const getSearchPostsForOneUser = async (text, userId) => {
    const token = sessionStorage.getItem('jwt');
    try {

        const response = await fetch(`http://localhost:8080/api/posts/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({text, userId}),
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, posts: data.posts };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while recieve the search posts.' };
    }
};

export const updatePost = async (postId, postText, postPic) => {
    const token = sessionStorage.getItem('jwt');

    let postData;
    if (postPic) {
        postPic = await publicFun.compressBase64Image(postPic);
        postData =  {
            text: postText,
            image: postPic
        };
    } else {
        postData =  {
            text: postText,
        };
    }
    
    try {

        const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(postData),
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, message: 'post update' };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while update the post.' };
    }
}

export const deletePost = async (postId) => {
    const token = sessionStorage.getItem('jwt');

    try {

        const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, message: 'post deleted' };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while delete the post.' };
    }
}



