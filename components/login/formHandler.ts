interface formDetails {
    email: String,
    password: String
}

export const handleLogin = async (formDetails: formDetails) => {
    if (formDetails.email !== '' && formDetails.password !== '') {
        const output = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDetails)
        });
        const x = await output.json();
        return x;
    }
    return false;
}

export const handleRegister = async (formDetails: formDetails) => {
    if (formDetails.email !== '' && formDetails.password !== '') {
        const output = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDetails)
        });
        const x = await output.json();
        console.log(x);
        return console.log('Success.');

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