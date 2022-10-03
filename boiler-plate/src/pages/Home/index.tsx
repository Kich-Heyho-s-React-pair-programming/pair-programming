import { Container, Text, Box, Image } from '@mantine/core';
import { useQuery } from 'react-query';
import { getTestRequestWithoutParams, getTestRequestWithParams } from 'apis';

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
  const { data } = useQuery(['test'], getTestRequestWithoutParams, { suspense: true });

  return <Container>test</Container>;
}
