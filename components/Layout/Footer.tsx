import React, { FC } from 'react';
import styled from 'styled-components';

const Footer: FC = () => {
  return (
    <Wrapper> <br/>
      <div>Films Duration SSR © 2022</div>
      <div>Created by Schekhovtsov</div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled('div')({
  height: '100px',
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
