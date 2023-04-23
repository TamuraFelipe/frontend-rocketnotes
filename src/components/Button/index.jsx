import React from 'react'

import { Container } from './styles';

import './styles';

export const Button = ({ title, loading, ...rest }) => {
  return (
    <Container
    type='button'
    disabled={loading}
    {...rest}
    >
        {loading ? 'Carregando...' : title}
    </Container>
  );
}

