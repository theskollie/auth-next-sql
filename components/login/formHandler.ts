interface formDetails {
    email: String,
    password: String
}

export const handleLogin = async (formDetails: formDetails) => {
    if (formDetails.email !== '' && formDetails.password !== '') {
        const input = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDetails)
        });
        const output = await input.json();
        return output;
    }
    return false;
}

export const handleRegister = async (formDetails: formDetails) => {
    if (formDetails.email !== '' && formDetails.password !== '') {
        const input = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDetails)
        });
        const output = await input.json();
        return output;

    }
    return console.log("Fill Both Fields");
}

export const handleLogout = async () => {
    const output = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}