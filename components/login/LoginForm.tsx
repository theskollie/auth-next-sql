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
    Alert,
} from '@mantine/core';

import { handleLogin } from './formHandler';
import { useRouter } from 'next/router';

export default function LoginForm() {
    const [formDetails, setFormDetails] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();
    const [invalidLogin, setInvalidLogin] = useState(false);

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900, color: theme.colors.red[6] })}
            >
                Welcome 👋🏻
            </Title>
            <Text size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor<'a'> href="/register" size="sm" >
                    Create account
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
                <Group position="apart" mt="md">
                    <Checkbox label="Remember me" />
                    <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl" color="red" onClick={async () => {
                    const response = await handleLogin(formDetails);
                    if (response.success !== false) {
                        router.push('/');
                    } else {
                        setInvalidLogin(true);
                    }
                }}>
                    Sign in
                </Button>
            </Paper>

            {
                invalidLogin &&
                <Alert mt={20} title="Invalid Login!" color="red">
                    You have entered an invalid login. Please try again.
                </Alert>
            }
        </Container>


    );
}