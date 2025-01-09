import publicFun from "../../publicFun.js";
import { getUserByUsernameOrId } from "./usersConnectToDB.js";
import DB from "./fakeDB.js";

let posts = [];

const getNextId = () => {
    posts = DB.getPosts();
    let maxId = 0; 

    for (const post of posts) { 
        if (parseInt(post.id, 10) > maxId) {
            maxId = parseInt(post.id, 10);
        }
    }

    return maxId + 1; 
};

export const getNextCommentId = () => {
    posts = DB.getPosts();
    let maxId = 0;
    for (const post of posts) {
        if (post.comments.length > 0) {
            for(const comment of post.comments) {
                if (maxId < parseInt(comment.id, 10)) {
                    maxId = parseInt(comment.id, 10);
                }
            }
        }
    }
    return maxId + 1;
}

const formatPosts = async (postsList) => {
    const formattedPosts = [];
    for (const post of postsList) {

        const userResult = await getUserByUsernameOrId(parseInt(post.author, 10));
        
        const author = userResult?.user;
        if (!author) {
            continue;
        }
                
        formattedPosts.push({
            id: post.id,
            text: post.text,
            image: post.image,
            date: post.date,
            author: {
                name: author.name,
                image: author.image,
                id: author.id
            },
            likesCounter: post.likes?.length || 0,
            commentsCounter: post.comments?.length || 0
        });
    }
    return formattedPosts;
};

// Function to add a Post to the database
export const addPost = async (post, userId) => {
    posts = DB.getPosts();

    if (post.image) {
        post.image = await publicFun.compressBase64Image(post.image);
    }

    const user = await getUserByUsernameOrId(parseInt(userId, 10));
    if (!user) {
        return { success: false, message: "user not found" };
    }
    
    const newPost = {
        id: getNextId(),
        author: userId,
        text: post.text,
        image: post.image,
        date: Date.now(),
        comments: [],
        likes: []
    }

    posts.push(newPost);
    DB.setPosts(posts);
    return { success: true, message: "post create" };



};

export const getPosts = async (userId) => {
    posts = DB.getPosts();

    const filteredPosts = posts.filter(post => parseInt(post.author, 10) !== parseInt(userId, 10));

    const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const limitedPosts = sortedPosts.slice(0, 25);

    const postsToShow = await formatPosts(limitedPosts);

    
    return { success: true, posts: postsToShow };
    
};


export const getPostsForOneUser = async (userId) => {
    posts = DB.getPosts();

    const userPosts = posts.filter(post => parseInt(post.author, 10) === parseInt(userId, 10));

    const sortedPosts = userPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const postsToShow = await formatPosts(sortedPosts);
    
    return { success: true, posts: postsToShow };
};

export const getSearchPosts = async (text, userId) => {
    posts = DB.getPosts();

    const filteredPosts = posts.filter(post => 
        parseInt(post.author, 10) !== parseInt(userId, 10) && post.text.includes(text)
    );

    const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const limitedPosts = sortedPosts.slice(0, 25);
    const postsToShow = await formatPosts(limitedPosts);
    
    return { success: true, posts: postsToShow };
};

export const getSearchPostsForOneUser = async (text, userId) => {
    posts = DB.getPosts();

    const filteredPosts = posts.filter(post => 
        parseInt(post.author, 10) === parseInt(userId, 10) && post.text.includes(text)
    );

    const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const postsToShow = await formatPosts(sortedPosts);
    
    return { success: true, posts: postsToShow };
};

export const updatePost = async (postId, postText, postPic) => {
    posts = DB.getPosts();

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
        const post = posts.find(post => parseInt(post.id, 10) === parseInt(postId, 10));

        if (!post) {
            return { success: false, message: 'Post not found' };
        }

        post.text = postData.text;
        if (postData.image) {
            post.image = postData.image;
        }
        
        DB.setPosts(posts);
        return { success: true, message: 'Post updated successfully' };
    } catch (error) {
        return { success: false, message: 'An error occurred while updating the post.' };
    }
};

export const deletePost = async (postId) => {
    try {
        posts = DB.getPosts();

        const postIndex = posts.findIndex(post => parseInt(post.id, 10) === parseInt(postId, 10));

        if (postIndex === -1) {
            return { success: false, message: 'Post not found' };
        }

        posts.splice(postIndex, 1);
        DB.setPosts(posts);

        return { success: true, message: 'Post deleted successfully' };
    } catch (error) {
        return { success: false, message: 'An error occurred while deleting the post.' };
    }
};

export const deleteUserPosts = async (userId) => {
    try {
        posts = DB.getPosts();

        const initialPostsCount = posts.length;
        posts = posts.filter(post => parseInt(post.author, 10) !== parseInt(userId, 10)); 

        if (posts.length === initialPostsCount) {
            return false;
        }

        DB.setPosts(posts);
        return true;
    } catch (error) {
        return false;
    }
};

export const getOnePostById = async (postId) => {
    posts = DB.getPosts();

    const post = posts.filter(post => parseInt(post.id, 10) === parseInt(postId, 10));
    return post;

}

export const addComment = (comment, postId) => {
    posts = DB.getPosts();

    const post = posts.find(post => parseInt(post.id, 10) === parseInt(postId, 10));

    if (!post) {
        return false;
    }

    post.comments.push(comment);
    DB.setPosts(posts);
    return true;

}

export const delComment = (commentId, postId) => {
    posts = DB.getPosts();


    const post = posts.find(post => parseInt(post.id, 10) === parseInt(postId, 10));
        if (!post) {
            return false;
        }

    const commentIndex = post.comments.findIndex(comment => parseInt(comment.id, 10) === parseInt(commentId, 10));

        if (commentIndex === -1) {
            return false;
        }

    post.comments.splice(commentIndex, 1);
    DB.setPosts(posts);
    return true
}

export const updateCommentInPost = (postId, commentId, updatedText) => {
    try {
        posts = DB.getPosts();

        const post = posts.find(post => parseInt(post.id, 10) === parseInt(postId, 10));
        if (!post) {
            return false;
        }

        const comment = post.comments.find(comment => parseInt(comment.id, 10) === parseInt(commentId, 10));
        if (!comment) {
            return false;
        }

        comment.text = updatedText;
        DB.setPosts(posts);
        return true;
    } catch (error) {
        return false;
    }
};

export const updateLikeInPost = async (postId, userId) => {
    try {
        posts = DB.getPosts();
        const post = posts.find(post => parseInt(post.id, 10) === parseInt(postId, 10));

        if (!post) {
            return { success: false, message: "post don't found"};
        }

        let myUser = await getUserByUsernameOrId(parseInt(userId, 10));
        if (myUser.success) {
            myUser = myUser.user;
        } else {
            return { success: false, message: "user don't found"};
        }

        const index = post.likes.indexOf((parseInt(userId, 10)));

        if (index !== -1) {
            post.likes.splice(index, 1);
        } else {
            post.likes.push((parseInt(userId, 10)));
        }
        DB.setPosts(posts);
        return { success: true, message: 'update Like' };

    } catch (error) {
        return { success: false, message: 'Error update Like' };
    }
};


