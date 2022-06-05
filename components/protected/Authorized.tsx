import React from 'react';
import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { useRouter } from 'next/router';

import { handleLogout } from '../login/formHandler';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === 'dark' ? theme.colors.red[6] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export default function ProtectedPage() {
    const { classes } = useStyles();
    const router = useRouter();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>🎉</div>
            <Title className={classes.title}>Success!</Title>
            <Text size="lg" align="center" className={classes.description}>
                You are logged in successully, <br /> and can access this protected page.
            </Text>
            <Group position="center">
                <Button color="red" size="md" onClick={async () => {
                    await handleLogout();
                    router.reload();
                }}>
                    Logout
                </Button>
            </Group>
        </Container>
    );
}