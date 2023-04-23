import React from 'react'

import {
    Container,
} from './styles';

export const TextArea = ({ children, ...rest}) => {
  return (
    <Container {...rest}>
        {children}
    </Container>
  )
}
