import React, { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';

import { handleRegister } from './formHandler';
import { useRouter } from 'next/router';

export default function RegisterForm() {
    const [formDetails, setFormDetails] = useState({
        email: '',
        password: ''
    })
    const router = useRouter();

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Register
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Already have an account?{' '}
                <Anchor<'a'> href="/login" size="sm" >
                    Log In
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="obama@gmail.com" required value={formDetails.email} onChange={(event) => setFormDetails({
                    ...formDetails,
                    email: event.currentTarget.value
                })} />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" value={formDetails.password} onChange={(event) => setFormDetails({
                    ...formDetails,
                    password: event.currentTarget.value
                })} />
                <Button fullWidth mt="xl" onClick={async () => {
                    await handleRegister(formDetails);
                    router.push('/login');
                }}>
                    Register
                </Button>
            </Paper>
        </Container>
    );
}