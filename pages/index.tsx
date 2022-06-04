import React, { useEffect, useState } from 'react'
import Unauthorized from '../components/protected/Unauthorized';
import Authorized from '../components/protected/Authorized';

const ProtectedPage = () => {

    const [verified, setVerified] = useState(false);
    useEffect(() => {
        const verifyJWT = async () => {
            const request = await fetch('http://localhost:3000/api/protected');
            const response = await request.json();
            if (response.success === true) setVerified(true);
            return;
        }
        verifyJWT();
    }, [])

    return (
        <div>
            {
                verified === true ?
                    <Authorized /> :
                    <Unauthorized />
            }
        </div>
    )
}

export default ProtectedPage

