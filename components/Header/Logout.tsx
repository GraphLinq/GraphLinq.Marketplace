import React from 'react'
import { MenuItem, Icon } from '@chakra-ui/react'
import { HiOutlineLogout } from 'react-icons/hi'
import { useWeb3React } from '@web3-react/core'

export const Logout: React.FC = ({}) => {
  const { deactivate } = useWeb3React()

  function disconnect() {
    /* if (connector) {
      connector.close()
    } */
    deactivate()
  }

  return (
    <MenuItem
      onClick={() => disconnect()}
      icon={<Icon as={HiOutlineLogout} boxSize={4} />}
    >
      Disconnect
    </MenuItem>
  )
}
