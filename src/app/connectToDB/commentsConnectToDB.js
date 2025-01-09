import { getOnePostById , getNextCommentId, addComment, delComment, updateCommentInPost} from "./postsConnectToDB.js";
import { getUserByUsernameOrId } from "./usersConnectToDB.js";
import DB from "./fakeDB.js";

const getComments = async (postId) => {
    try {
        let myPost = await getOnePostById(parseInt(postId, 10));
        myPost = myPost[0];
        if (!myPost) {
            return { success: false, message: "Post not found" };
        }
        const comments = myPost.comments;

        if (!Array.isArray(comments) || comments.length === 0) {
            return { success: true, comments: [] }; 
        }

        const sortedComments= comments.sort((a, b) => new Date(b.date) - new Date(a.date));

        const commentsWithDetails = await Promise.all(
            sortedComments.map(async (comment) => {
                const authorDetails = await getUserByUsernameOrId(parseInt(comment.author, 10));

                if (!authorDetails.user) {
                    throw new Error(`Author with ID ${comment.author} not found`);
                }

                return {
                    id: comment.id,
                    text: comment.text,
                    date: comment.date,
                    postId: postId,
                    author: {
                        id: authorDetails.user.id,
                        name: authorDetails.user.name,
                        image: authorDetails.user.image,
                    },
                };
            })
        );

        return { success: true, comments: commentsWithDetails };
    } catch (error) {
        console.error("Error in getComments:", error);
        return { success: false, message: error.message };
    }
};


const createComment = async (postId, commentText, userId) => {
    let myPost = await getOnePostById(parseInt(postId, 10));
    myPost = myPost[0];
    if(!myPost) {
        return { success: false, message: "post don't found"};
    }

    let myUser = await getUserByUsernameOrId(parseInt(userId, 10));
    if (myUser.success) {
        myUser = myUser.user;
    } else {
        return { success: false, message: "user don't found"};
    }

    if (!commentText || commentText === "") {
        return { success: false, message: "text is empty"};
    }

    const newComment = {
        id: getNextCommentId(), 
        text: commentText,
        postId: postId,
        date: Date.now(),
        author: userId
    }

    if (addComment(newComment, parseInt(postId, 10))) {
        return { success: true, result: "create comment"};
    } else {
        return { success: false, message: "problem with save in database"};
    }

};


const deleteComment = async (postId, commentId, userId) => {
    let myPost = await getOnePostById(parseInt(postId, 10));
    myPost = myPost[0];

    if (!myPost) {
        return { success: false, message: "post not found"};
    }

    const myComment = myPost.comments.find(comment => parseInt(comment.author, 10) === parseInt(userId, 10));
    if (!myComment) {
        return { success: false, message: "comment not found or you dont author"};
    }

    if (delComment(parseInt(commentId, 10), parseInt(postId, 10))) {
        return { success: true, result: "delete comment"};
    } else {
        return { success: false, message: "problem with delete comment"};
    }
};

const updateComment = async (postId, commentId, commentText, userId) => {
    let myPost = await getOnePostById(parseInt(postId, 10));
    myPost = myPost[0];
    
    if (!myPost) {
        return { success: false, message: "post not found"};
    }

    const myComment = myPost.comments.find(comment => parseInt(comment.author, 10) === parseInt(userId, 10));
    if (!myComment) {
        return { success: false, message: "comment not found or you dont author"};
    }

    const result = updateCommentInPost(parseInt(postId, 10), parseInt(commentId, 10), commentText);

    if(result) {
        return { success: true, message: "success to edit comment"};
    } else {
        return { success: false, message: "failed to edit comment"};
    }
};

const deleteCommentsWhenUserDelete = async (userId) => {
    try {
        let posts = DB.getPosts();

        for (let post of posts) {
            let comments = post.comments;
            for (let comment of comments) {

                if (parseInt(userId, 10) === parseInt(comment.author, 10)) {
                    if (!delComment(parseInt(comment.id, 10), parseInt(comment.postId, 10))) {
                        return false;
                    } 
                }
            }
        }

        DB.setPosts(posts);
        return true;
    } catch (error) {
        return false;
    }
    
}

export default {
    getComments,
    createComment,
    deleteComment,
    updateComment,
    deleteCommentsWhenUserDelete
}