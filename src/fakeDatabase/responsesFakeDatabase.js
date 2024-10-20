const responses = [];


export const addResponse = (response) => {
    responses.push(response);
    return true;
}

export const getNextResponseId = () => {
    return responses.length + 1;
}


export const getResponsesById = (Id) => {
    let postResponses = responses.filter(response => response.postId === Id);
    if (postResponses) {
        postResponses = postResponses.filter(response => response.active === true);
        if (postResponses) {
            postResponses.sort((a, b) => b.time - a.time);
        }
    }
        return postResponses;

}

export const updateResponseById = (Id, text) => {
    const response = responses.find(response => response.Id === Id);
    if (response) {
        response.text = text;
        return true;
    }
    return false;
}

export const deleteResponseById = (Id) => {
    const response = responses.find(response => response.Id === Id);
    console.log(response);
    if (response) {
        response.active = false;
        return true;
    }
    return false;
}