import { useWeb3React } from '@web3-react/core'
import React from 'react'

interface TemplatePriceProps {
  dbPrice: number
  contractPrice: string
}

export const TemplatePrice: React.FC<TemplatePriceProps> = (props) => {
  const { active, account } = useWeb3React()

  const dbPrice = () => {
    if (props.dbPrice == 0) {
      return 'FREE'
    } else {
      return props.dbPrice + ' GLQ'
    }
  }

  const smcPrice = () => {
    if (props.contractPrice == '0.0') {
      return 'FREE'
    } else {
      return props.contractPrice + ' GLQ'
    }
  }

  return <>{!active || !account ? dbPrice() : smcPrice()}</>
}
