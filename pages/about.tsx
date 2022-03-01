import React from 'react'
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';

const About: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <div>
          <h1>About</h1>
        </div>
      </Container>
    </div>
  )
}

export default About;