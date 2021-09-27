import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { injected } from '../../connectors'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { SUPPORTED_WALLETS } from '../../constants/wallet'
import { Option } from './Option'

interface PendingViewProps {
  connector?: AbstractConnector
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}

export const PendingView: React.FC<PendingViewProps> = ({
  connector,
  error = false,
  setPendingError,
  tryActivation,
}) => {
  const isMetamask = window?.ethereum?.isMetaMask

  return (
    <>
      <Box>
        {error ? (
          <Box>
            <Box>
              <Text>Error connecting</Text>
            </Box>
            <Button
              onClick={() => {
                setPendingError(false)
                connector && tryActivation(connector)
              }}
            >
              Try Again
            </Button>
          </Box>
        ) : (
          <>
            <Text>Initializing...</Text>
          </>
        )}
      </Box>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key]
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={option.iconURL}
            />
          )
        }
        return null
      })}
    </>
  )
}
