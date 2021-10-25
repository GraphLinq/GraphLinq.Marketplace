import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import TemplateService from 'services/templateService'

interface TemplateDownloadButtonProps {
  templateId: number
  templateVersionId: number
  templateName: string
}

export const TemplateDownloadButton: React.FC<TemplateDownloadButtonProps> = (
  props
) => {
  const [fileData, setFileData] = useState<string>()

  useEffect(() => {
    const getData = async () => {
      const result = await TemplateService.downloadTemplate(
        props.templateId,
        props.templateVersionId
      )
      if (result.success) {
        console.log(result.results)
        setFileData(result.results)
        return result.results
      }
    }
    getData()
  }, [props.templateId, props.templateVersionId])

  return (
    <Button
      as="a"
      size="lg"
      rounded="lg"
      mr="0.5rem"
      href={`data:application/octet-stream,${encodeURIComponent(
        fileData || ''
      )}`}
      download={`${props.templateName}.glq`}
    >
      Download
    </Button>
  )
}
