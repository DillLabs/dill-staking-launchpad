import React from 'react';
import styled from 'styled-components';
import { Button as GrommetButton, ButtonProps } from 'grommet';

interface CustomButtonProps {
  className?: string;
  width?: number;
  fullWidth?: boolean;
  rainbow?: boolean;
  onClick?: () => any;
}

const calculateWidth = (p: { width?: number; fullWidth?: boolean }) => {
  if (p.width) {
    return `${p.width}px`;
  }
  if (p.fullWidth) {
    return '100%';
  }
};

const StyledButton = styled(GrommetButton)`
  display: block;
  text-transform: uppercase;
  width: ${calculateWidth};
  font-size: 18px;
  letter-spacing: 1.5px;

  &:hover {
    background-color: #f2eeff;
    transition: transform 0.1s;
    transform: scale(1.02);
    border-color: #6541ef !important;
    border-width: 1px !important;
    border-style: solid !important;
    box-shadow: none !important;
  }

  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  color: #6541ef;
  border: #6541ef solid 1px;

  font-weight: 600;
  line-height: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;

  border-radius: 0.375rem;
  background-color: #fff;
  border: none !important;

  // rainbow styles
  ${p =>
    // @ts-ignore
    p.rainbow &&
    `
     color: #fff;
     background-color: rgb(101, 65, 239);
      box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px inset,
    rgba(59, 130, 246, 0.5) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
     &:hover {
        background-color: #7d5bff;
     }
   `}
`;

export const Button = (props: CustomButtonProps & ButtonProps) => {
  const { className } = props;
  return <StyledButton className={className} {...props} />;
};
