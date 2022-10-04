import { Box, Title, Text, Button, Container, Group } from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import errorStyles from './styles/errorStyles';

export default function ErrorHandler({ error }: { error: AxiosResponse }) {
  const { data, status, statusText } = error;
  const { pathname } = useLocation();
  const { classes } = errorStyles(pathname);
  const { root, label, title, description, button } = classes;
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate('.', { replace: true });
  };

  const linkTo = useMemo(() => {
    const isTodoRoute = pathname.includes('/todos');
    if (isTodoRoute) return '/todos';
    return '/';
  }, [pathname]);

  const errorDescription = useMemo(() => {
    if (data?.message) {
      return data?.message;
    }
    if (statusText) {
      return '';
    }
    return 'Our servers could not handle your request. Try refreshing the page.';
  }, [data?.message, statusText]);

  const ErrorButton = () => {
    if (status === 404) {
      return (
        <Button component={Link} to={linkTo} variant="white" size="md" className={button} mb={36}>
          {pathname.includes('/todos') ? 'Back to list' : 'Back to main'}
        </Button>
      );
    }
    return (
      <Button type="button" variant="white" size="md" className={button} onClick={handleRefresh} mb={36}>
        Refresh the page
      </Button>
    );
  };

  return (
    <Box className={root}>
      <Container>
        <Text align="center" weight={900} className={label}>
          {status || 500}
        </Text>
        <Title align="center" color="white" weight={900} className={title} mt={36}>
          {statusText || 'Something bad just happened...'}
        </Title>
        <Text size="lg" align="center" color="white" weight={700} mt={24} className={description}>
          {errorDescription}
        </Text>
        <Group position="center" mt={36}>
          <ErrorButton />
        </Group>
      </Container>
    </Box>
  );
}
