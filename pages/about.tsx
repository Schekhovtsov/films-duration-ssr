import React from 'react'
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

const About: NextPage = () => {
  return (

        <div>
          <h1>About</h1>
          Service that allows you can find out the duration of the films <br />
          
          The service is based on the themoviedb.org API. <br /><br />
          <em>Attention:</em>The site is slow due to API specificities<br /><br />
          <strong>Project stack:</strong> TS + Next JS + Axios + Material UI
          
        </div>
  )
}

export default About;