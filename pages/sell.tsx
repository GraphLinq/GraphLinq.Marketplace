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
  const [thumbnail, setThumbnail] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')

  const [fileUpload, setFileUpload] = useState<{
    loaded: boolean
    file: File | null
  }>({ loaded: false, file: null })

  const [fileImagesUpload, setFileImagesUpload] = useState<{
    loaded: boolean
    files: File[]
  }>({ loaded: false, files: [] })

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
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          youtubeLink={youtubeLink}
          setYoutubeLink={setYoutubeLink}
          fileUpload={fileUpload}
          setFileUpload={setFileUpload}
          fileImagesUpload={fileImagesUpload}
          setFileImagesUpload={setFileImagesUpload}
          setCompressedTemplate={setCompressedTemplate}
        />
      ) : (
        <TemplateSettings
          setStep={setStep}
          title={title}
          description={description}
          category={category}
          price={price}
          decompressedTemplate={decompressedTemplate}
          youtubeLink={youtubeLink}
          fileImagesUpload={fileImagesUpload}
        />
      )}
    </Container>
  )
}

export default Sell