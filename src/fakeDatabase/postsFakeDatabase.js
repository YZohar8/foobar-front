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
    return posts.sort((a, b) => b.time - a.time);
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