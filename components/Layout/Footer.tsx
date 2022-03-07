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

const Wrapper = styled.div`
  height: 100px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;