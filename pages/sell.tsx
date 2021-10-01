import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Container, Heading, useBoolean } from '@chakra-ui/react'
import { TemplateUpload } from '@/components/TemplateUpload'
import { TemplateRoot, TemplateSettings } from '@/components/TemplateSettings'
import GraphService from 'services/graphService'

const Sell: NextPage = () => {
  const [step, setStep] = useBoolean()
  const [price, setPrice] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [fileUpload, setFileUpload] = useState<{
    loaded: boolean
    file: File | null
  }>({ loaded: false, file: null })
  const [compressedTemplate, setCompressedTemplate] = useState<string>()
  const [decompressedTemplate, setDecompressedTemplate] =
    useState<TemplateRoot>({ name: '', nodes: [], comments: [] })

  useEffect(() => {
    const fetchGraphData = async (template: string) => {
      const result = await GraphService.decompressGraph(template)
      setDecompressedTemplate(JSON.parse(result))
    }
    if (compressedTemplate != undefined) {
      fetchGraphData(compressedTemplate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compressedTemplate])

  return (
    <Container
      mt="3.5rem"
      maxW={['container.sm', 'container.md', 'container.xl']}
      display="flex"
      flexDirection="column"
    >
      <Heading size="xl" color="white">
        Sell Template
      </Heading>
      {!step ? (
        <TemplateUpload
          setStep={setStep}
          price={price}
          setPrice={setPrice}
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          description={description}
          setDescription={setDescription}
          fileUpload={fileUpload}
          setFileUpload={setFileUpload}
          setCompressedTemplate={setCompressedTemplate}
        />
      ) : (
        <TemplateSettings
          setStep={setStep}
          decompressedTemplate={decompressedTemplate}
        />
      )}
    </Container>
  )
}

export default Sell
