/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useCallback, useState } from 'react'
import ERC20ABI from 'abis/erc20.json'
import { useOnRepetition } from './useOnRepetition'
import { ethers } from 'ethers'

/**
 * Get the balance of an ERC20 token in an address
 * 
 * ~ Features ~
  - Provide address and get balance corresponding to given address
  - Change provider to access balance on different chains (ex. mainnetProvider)
  - If no pollTime is passed, the balance will update on every new block
 * @param contract (ethers->Contract) contract object for the ERC20 token
 * @param address (string)
 * @param pollTime (number) :: if >0 use polling, else use instead of onBlock event
 * @returns (BigNumber) :: balance
 */
export const useTokenBalance = (
  contract: Contract,
  address: string,
  pollTime = 0
): BigNumber => {
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))

  const pollBalance = useCallback(async (): Promise<void> => {
    if (contract != null) {
      try {
        // eslint-disable-next-line
        const newBalance = await contract.balanceOf(address)
        if (newBalance !== balance) {
          setBalance(newBalance)
        }
      } catch (e) {
        console.log('⚠ Could not get token balance', e)
      }
    }
  }, [address, balance, contract])

  useOnRepetition(pollBalance, {
    pollTime,
    leadingTrigger: contract?.provider != null,
  })

  return balance
}

// get the balance for a single token/account combo
export function useGlqBalance(account: string, provider: any): BigNumber {
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_TOKEN_CONTRACT || '',
    ERC20ABI,
    provider
  )
  const glqBalance = useTokenBalance(contract, account)
  return glqBalance
}
