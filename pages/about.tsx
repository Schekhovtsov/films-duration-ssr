import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>About</h1>
      Service that allows you can find out the duration of the films <br />
      The service is based on the themoviedb.org API. <br />
      <br />
      <strong>Project stack:</strong> TS + Next JS + Axios + Material UI
    </div>
  );
};

export default About;
