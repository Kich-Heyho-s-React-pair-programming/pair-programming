import { Container, Text, Box, Image } from '@mantine/core';
import { useQuery } from 'react-query';
// import { useEffect } from 'react';
import { getTestRequestWithoutParams, getTestRequestWithParams } from 'apis';
// import defualtErrorhandler from 'utils/error/defualtErrorhandler';

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
  return <Container>test</Container>;
}

export default function Home() {
  const todoId = '12451345';
  const { data } = useQuery(['test'], () => getTestRequestWithParams(todoId), { suspense: true });
  // useEffect(() => {
  //   const todoId = '12451345';
  //   getTestRequestWithParams(todoId)
  //     .then(data => console.log(data))
  //     .catch(defualtErrorhandler);
  // }, []);

  return <Container>test</Container>;
}
