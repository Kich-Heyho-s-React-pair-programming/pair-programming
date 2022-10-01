import { Container, MantineProvider, Text, Box, Image } from '@mantine/core';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from 'apis/errorHandler';
import request from 'apis/request';

function MovieCard() {
  <Box>
    <Image />
    <Box>
      <Text>sfas</Text>
      <Text>af</Text>
    </Box>
  </Box>;
}

function MovieList() {
  return <Container />;
}

export default function App() {
  const catchTest = async () => {
    try {
      await request('get', 'https://jsonplaceholder.typicode.com/todos/1123123');
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        const specificError = axiosErrorHandler(error);
        if ((specificError.type = 'axios-error')) {
          console.log("It's axios error");
        } else {
          console.log("It's not axios error");
        }
      }
    }
  };

  useEffect(() => {
    catchTest();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome to Mantine!</Text>
    </MantineProvider>
  );
}
