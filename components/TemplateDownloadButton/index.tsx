import { Button } from '@chakra-ui/react'
import React from 'react'
import TemplateService from 'services/templateService'

interface TemplateDownloadButtonProps {
  templateId: number
  templateVersionId: number
}

export const TemplateDownloadButton: React.FC<TemplateDownloadButtonProps> = (
  props
) => {
  async function downloadTemplate() {
    await TemplateService.downloadTemplate(
      props.templateId,
      props.templateVersionId
    )
  }

  return (
    <Button size="lg" rounded="lg" mr="0.5rem" onClick={downloadTemplate}>
      Download
    </Button>
  )
}
