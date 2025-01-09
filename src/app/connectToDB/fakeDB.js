let posts = [];
let users = [];

const getPosts = () => {
    return posts;
}

const getUsers = () => {
    return users;
}

const setPosts = (newPosts) => {
    posts = newPosts;
}

const setUsers = (newUsers) => {
    users = newUsers;
}

const DB = {
    getPosts,
    getUsers,
    setPosts,
    setUsers
}

export default DB;

