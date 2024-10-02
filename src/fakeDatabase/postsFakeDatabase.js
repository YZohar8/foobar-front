const posts = [];

// Function to add a Post to the database
export const addPost = (post) => {
    posts.push(post);
    return true;
};

export const nextIdPost = () => {
    return (posts.length + 1);
};

export const getPosts = () => {
    let postList = posts.filter((post) => post.active === true);
    
    if (postList.length > 0) {
        postList = postList.map(post => {
            if (!post.postPic) {
                post.postPic = URL.createObjectURL(post.postPicFile);
            }
            return post; 
        });
        return postList.sort((a, b) => b.time - a.time);
    } else {
        return []; 
    }
};

export const getSearchPosts = (text) => {
    let postList = posts.filter((post) => post.active === true);
    postList = postList.filter((post) => post.postText?.includes(text));
    return postList.sort((a, b) => b.time - a.time);
};

export const updatePost = (Id, postText, postPic) => {
    const post = posts.find((post) => post.Id === Id);
    if (post) {
        post.postText = postText;
        post.postPic = postPic;
        return true;
    }
    return false;
}

export const deletePost = (postId) => {
    const post = posts.find((post) => post.Id === postId);
    if (post) {
        post.active = false;
        return true;
    } else {
        return false
    }
}

export const setNumOfLikes = (postId, num) => {
    const post = posts.find((post) => post.Id === postId);
    if (post) {
        post.Likes += num;
        return true;
    } else {
        return false
    }
}

export const getLikes = (postId) => {
    const post = posts.find((post) => post.Id === postId);
    if (post) {
        return post.Likes;
    } else {
        return 0;
    }
}