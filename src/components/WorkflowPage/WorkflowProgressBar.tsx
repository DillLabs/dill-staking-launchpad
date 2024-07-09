/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import styled from 'styled-components';
import { FormNext, Menu, Language, FormDown } from 'grommet-icons';
import { useIntl, FormattedMessage } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Box, DropButton } from 'grommet';
import { rainbowColors } from '../../styles/styledComponentsTheme';
import { WorkflowStep } from '../../store/actions/workflowActions';
import { web3ReactInterface } from '../../pages/ConnectWallet';

import {
  AllowedELNetworks,
  NetworkChainId,
} from '../../pages/ConnectWallet/web3Utils';
import { Dot } from '../Dot';
import { Text } from '../Text';
import { Link } from '../Link';
import { trimString } from '../../utils/trimString';
import useIntlNetworkName from '../../hooks/useIntlNetworkName';
import {
  IS_MAINNET,
  NETWORK_NAME,
  MAINNET_LAUNCHPAD_URL,
  TESTNET_LAUNCHPAD_NAME,
  TESTNET_LAUNCHPAD_URL,
} from '../../utils/envVars';

const Container = styled.div`
  background-color: white;
  display: flex;
`;

const StepContainer = styled.div`
  padding: 20px;
  width: fit-content;
  margin: auto;
`;

const Step = styled.div`
  margin: 0 10px;
  text-align: center;
  color: ${(p: {
    disabled: boolean;
    active: boolean;
    index: number;
    theme: any;
  }) => {
    if (p.active) return rainbowColors[p.index];
    return p.theme.gray.medium;
  }};
  font-weight: ${p => (p.active ? 600 : undefined)};
`;

const DotDropdownBox = styled(Box)`
  display: flex;
  margin-inline-end: 20px;
  gap: 10px;
`;

const DotDropdown = styled(DropButton)`
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
  :hover {
    transition: transform 0.2s;
    transform: scale(1.1);
  }
`;

const ValidatorDropdown = styled(DropButton)`
  padding: 12px 8px;
  font-weight: 300;
  display: flex;
  align-items: center;
  border: none;
  :hover {
    border: none;
    box-shadow: none;
  }
`;

const NetworkText = styled.div`
  padding: 5px 8px;

  font-weight: 400;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

const DropdownLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

const Card = styled.div``;

interface Props {
  workflow: WorkflowStep;
}

export const WorkflowProgressBar = ({ workflow }: Props): JSX.Element => {
  const { locale, formatMessage } = useIntl();
  interface step {
    step: WorkflowStep;
    text: string;
  }

  const Arrow = styled(FormNext)`
    stroke: ${p => p.color || p.theme.gray.medium};
    rotate: ${locale === 'ar' ? '180' : '0'}deg;
  `;

  const steps: step[] = [
    // {
    //   step: WorkflowStep.OVERVIEW,
    //   text: formatMessage({ defaultMessage: 'Advisories' }),
    // },
    // {
    //   step: WorkflowStep.SELECT_CLIENT,
    //   text: formatMessage({ defaultMessage: 'Choose client' }),
    // },
    // {
    //   step: WorkflowStep.GENERATE_KEY_PAIRS,
    //   text: formatMessage({ defaultMessage: 'Generate keys' }),
    // },
    {
      step: WorkflowStep.UPLOAD_VALIDATOR_FILE,
      text: formatMessage({ defaultMessage: 'Upload deposit data' }),
    },
    {
      step: WorkflowStep.CONNECT_WALLET,
      text: formatMessage({ defaultMessage: 'Connect wallet' }),
    },
    // {
    //   step: WorkflowStep.SUMMARY,
    //   text: formatMessage({ defaultMessage: 'Summary' }),
    // },
    {
      step: WorkflowStep.TRANSACTION_SIGNING,
      text: formatMessage({ defaultMessage: 'Transactions' }),
    },
  ];

  const { executionLayerName, consensusLayerName } = useIntlNetworkName();

  const {
    active: walletConnected,
    account,
    chainId,
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  let network;
  let networkAllowed = false;

  if (chainId) {
    network = NetworkChainId[chainId];
    networkAllowed = AllowedELNetworks.includes(network);
  }

  return (
    <Container>
      <StepContainer>
        {steps.map(({ step, text }, i) => (
          <div className="flex-inline" key={text}>
            <Step
              index={i}
              disabled={workflow < step}
              active={workflow === step}
            >
              {text}
            </Step>
            {i !== steps.length - 1 && (
              // @ts-ignore
              <Arrow color={workflow === step ? rainbowColors[i] : undefined} />
            )}
          </div>
        ))}
      </StepContainer>

      <ValidatorDropdown
        label={<NetworkText>{NETWORK_NAME}</NetworkText>}
        dropAlign={{ top: 'bottom', right: 'right' }}
        dropContent={
          IS_MAINNET ? (
            <div />
          ) : (
            <Card>
              <Box pad="small" className="mt0">
                {!IS_MAINNET && (
                  <Text>
                    <FormattedMessage defaultMessage="This is a test network ⚠️" />
                  </Text>
                )}
              </Box>
            </Card>
          )
        }
      />
    </Container>
  );
};
