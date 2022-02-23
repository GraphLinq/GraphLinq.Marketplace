import { useEffect, useState } from 'react'
import TemplateService from 'services/templateService'
import { useWeb3React } from '@web3-react/core'

export function useCheckAccess(templateId: number): boolean {
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const { account, active } = useWeb3React()

  const fetchAccess = async () => {
    try {
      // eslint-disable-next-line
      const access = await TemplateService.purchaseTemplate(templateId)
      setHasAccess(true)
    } catch (e) {
      console.log('⚠ Could not get template access', e)
    }
  }

  useEffect(() => {
    fetchAccess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!account || !active) return false
  return hasAccess
}
