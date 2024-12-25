import publicFun from "../publicFun";

// Function to check if a user exists (for register)
export const getUserByUsernameOrId = async (username) => {

    const token = sessionStorage.getItem('jwt');

    if (!token) {
        return { success: false, message: "token invalid" };
    }

    try {
        const response = await fetch(`http://localhost:8080/api/users/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, user: data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while fetching the user.' };
    }
};


// Function to add a user to the database
export const addUser = async (e, user) => {
    user.image = await publicFun.compressBase64Image(user.image);

    try {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        const data = await response.json();
        if (response.ok) {
            return 'User created successfully!';
        } else {
            return data.message || 'Something went wrong!';
        }
    } catch (error) {
        return 'Error: ' + error.message;
    }
};



// Function to check if a user exists and passwors is ok (for login)
export const login = async (e, email, password) => {
    try {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })

        })

        const data = await response.json();

        if (response.ok) {

            sessionStorage.setItem('connectUsername', email);
            sessionStorage.setItem('jwt', data.token.token);

            return { success: true, message: 'Login successful' };

        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred during login.' };
    }
};

export const stillLogin = async () => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch('http://localhost:8080/api/tokens/check', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        
        if (response.ok) {

            return { success: true, message: 'still Login' };

        } else {
            return { success: false, message: 'Logout' };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred during login.' };
    }
}

export const deleteUser = async () => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await fetch(`http://localhost:8080/api/users/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, result: data.result };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while fetching the user.' };
    }

}

export const updateUser = async (name, image) => {
    const token = sessionStorage.getItem('jwt');
    const comprassimage = await publicFun.compressBase64Image(image);

    const userData = {
        image: comprassimage,
        name: name
    }
    try {
        const response = await fetch(`http://localhost:8080/api/users/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, updateUser: data.updateUser };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while update the user.' };
    }

}















