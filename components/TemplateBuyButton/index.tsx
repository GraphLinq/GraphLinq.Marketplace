import React from 'react'
import { Button, createStandaloneToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { parseEther } from 'ethers/lib/utils'
import useContract from 'hooks/useContract'
import TemplateService from 'services/templateService'
import MARKETPLACEABI from 'abis/marketplace.json'
import ERC20ABI from 'abis/erc20.json'
import { useRouter } from 'next/router'
import { CHAIN_INFO } from '@/constants/chains'

interface TemplateBuyButtonProps {
  templateId: number
  templatePrice: string
}

export const TemplateBuyButton: React.FC<TemplateBuyButtonProps> = (props) => {
  const toast = createStandaloneToast()

  const { account, library, chainId } = useWeb3React()
  const router = useRouter()

  const contractToken = useContract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_TOKEN_CONTRACT || '',
    ERC20ABI
  )
  const contractMarketplace = useContract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT || '',
    MARKETPLACEABI
  )

  let explorer: string
  if (chainId) explorer = CHAIN_INFO[chainId].explorer

  const buyTemplate = async () => {
    if (contractToken != null && contractMarketplace != null) {
      try {
        const allowance = await contractToken.allowance(
          account,
          process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT
        )
        if (
          parseFloat(allowance) < parseFloat(props.templatePrice.toString())
        ) {
          const wei = parseEther('10000000000000000000000000')
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
            title: 'Approving contract',
            description: 'Waiting for confirmations ...',
            position: 'bottom-right',
            status: 'info',
            duration: null,
            isClosable: true,
          })
          await library.waitForTransaction(approveTx.hash, 2)
          toast.closeAll()
          toast({
            title: 'Success',
            description: 'Contract Approved',
            position: 'bottom-right',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
        const buyTx = await contractMarketplace.buyTemplate(props.templateId)
        toast({
          title: 'Buying Template',
          description: 'Waiting for confirmations ...',
          position: 'bottom-right',
          status: 'info',
          duration: null,
          isClosable: true,
        })
        const buyTxReceipt = await library.waitForTransaction(buyTx.hash, 2)
        await TemplateService.purchaseTemplate(props.templateId)
        toast.closeAll()
        toast({
          title: 'Template Purchased',
          description: (
            <a
              href={`${explorer}tx/${buyTxReceipt.transactionHash}`}
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
        //return Router.replace(`/templates/${props.templateId}`)
        if (router.pathname == '/templates/[id]') {
          router.reload()
        } else {
          router.push(`/templates/${props.templateId}`)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        toast({
          title: 'Error',
          description: e && e.message ? `\n\n${e.message}` : '',
          position: 'bottom-right',
          status: 'error',
          duration: null,
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
