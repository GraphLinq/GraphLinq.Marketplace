import React from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Wallets } from '../Wallets'
import { Text } from '@chakra-ui/react'
import { NetworkContextName } from 'constants/misc'

function Web3StatusInner() {
  const { account, error } = useWeb3React()

  //const { ENSName } = useENSName(account ?? undefined)

  if (account) {
    return <Text fontSize="md"> Logged-in as {account}</Text>
  } else if (error) {
    return (
      <Text color="red">
        {error instanceof UnsupportedChainIdError ? 'Wrong Network' : Error}
      </Text>
    )
  } else {
    return (
      <Text fontSize="xl">Sign in with one of available wallet providers</Text>
    )
  }
}

const Web3Status: React.FC = ({}) => {
  const { active } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  //const { ENSName } = useENSName(account ?? undefined)

  return (
    <>
      <Web3StatusInner />
      {(contextNetwork.active || active) && <Wallets />}
    </>
  )
}

export default Web3Status
