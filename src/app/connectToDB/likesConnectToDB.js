import { getOnePostById, updateLikeInPost } from "./postsConnectToDB";
import { getUserByUsernameOrId } from "./usersConnectToDB";

const updateLike = async (postId, userId) => {
    return updateLikeInPost(postId, userId);
};



const checkUserLike = async (postId, userId) => {
    try {
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

        const index = myPost.likes.indexOf((parseInt(userId, 10)));

        let isFriend = false;
        if (index !== -1) {
            isFriend = true;
        } 

        return { success: true, message: 'check Like', result: isFriend };

    } catch (error) {
        return { success: false, message: 'Error check Like' };
    }
};



export default {
    updateLike,
    checkUserLike
}