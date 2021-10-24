import React from 'react'
import { Button, createStandaloneToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { parseEther } from 'ethers/lib/utils'
import useContract from 'hooks/useContract'
import TemplateService from 'services/templateService'
import MARKETPLACEABI from 'abis/marketplace.json'
import ERC20ABI from 'abis/erc20.json'

interface TemplateBuyButtonProps {
  templateId: number
  templatePrice: string
}

export const TemplateBuyButton: React.FC<TemplateBuyButtonProps> = (props) => {
  const toast = createStandaloneToast()

  const { account } = useWeb3React()

  const contractToken = useContract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_TOKEN_CONTRACT || '',
    ERC20ABI
  )
  const contractMarketplace = useContract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT || '',
    MARKETPLACEABI
  )

  const buyTemplate = async () => {
    if (contractToken != null && contractMarketplace != null) {
      try {
        await contractToken.allowance(
          account,
          process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT
        )
        const wei = parseEther(props.templatePrice.toString())
        toast({
          title: 'Allowance pending',
          description:
            'Please allow the use of your token balance for the contract...',
          position: 'bottom-right',
          status: 'info',
          duration: null,
          isClosable: true,
        })
        const approveTx = await contractToken.approve(
          process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT,
          wei.toString()
        )
        toast({
          title: 'Pending',
          description: 'Waiting for confirmations ...',
          position: 'bottom-right',
          status: 'info',
          duration: null,
          isClosable: true,
        })
        await approveTx.wait(1)
        toast.closeAll()
        toast({
          title: 'Success',
          description: 'Contract Approved',
          position: 'bottom-right',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        const buyTx = await contractMarketplace.buyTemplate(props.templateId)
        toast({
          title: 'Pending',
          description: 'Waiting for confirmations ...',
          position: 'bottom-right',
          status: 'info',
          duration: null,
          isClosable: true,
        })
        const buyTxReceipt = await buyTx.wait(1)
        await TemplateService.purchaseTemplate(props.templateId)
        toast.closeAll()
        toast({
          title: 'Template Purchased',
          description: (
            <a
              href={`https://etherscan.io/tx/${buyTxReceipt.transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on etherscan
            </a>
          ),
          position: 'bottom-right',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        toast({
          title: 'Error',
          description: e && e.message ? `\n\n${e.message}` : '',
          position: 'bottom-right',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <Button size="lg" rounded="lg" mr="0.5rem" onClick={buyTemplate}>
      Buy Template
    </Button>
  )
}
