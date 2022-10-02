import { Container, MantineProvider, Text, Box, Image } from '@mantine/core';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import invariant from 'tiny-invariant';
import { axiosErrorHandler } from 'apis/errorHandler';
import { getWithoutParamsTestRequest } from 'apis';

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
      // throw 8; <-- invariant error 유무를 필터링
      // const data = await request('get', 'https://jsonplaceholder.typicode.com/todos/1');
      const data = await getWithoutParamsTestRequest();
      console.log(data);
    } catch (error) {
      invariant(error instanceof AxiosError || error instanceof Error, `${error} is not an error or an unexpected error that the type guard could not detect.`);
      const specificError = axiosErrorHandler(error);
      if (specificError.type === 'axios-error') {
        console.log("It's axios error");
      } else {
        console.log("It's not axios error");
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
