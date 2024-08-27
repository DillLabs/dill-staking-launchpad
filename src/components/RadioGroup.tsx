import React from 'react';
import styled from 'styled-components';
import {
  RadioButtonGroup as GrommetRadioButtonGroup,
  RadioButtonGroupProps,
} from 'grommet';

const StyledRadioButtonGroup = styled(GrommetRadioButtonGroup)`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background: #f1f2f4 100%;
  width: fit-content;
  border-radius: 10px;
  label {
    margin: 0 10px;
  }
`;

export const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  return <StyledRadioButtonGroup {...props} />;
};
