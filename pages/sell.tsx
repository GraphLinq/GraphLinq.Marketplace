import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Container, Heading, useBoolean } from '@chakra-ui/react'
import { TemplateUpload } from '@/components/TemplateUpload'
import { TemplateRoot, TemplateSettings } from '@/components/TemplateSettings'
import GraphService from 'services/graphService'
import { useWeb3React } from '@web3-react/core'
import { ErrorNotConnected } from '@/components/ErrorNotConnected'

const Sell: NextPage = () => {
  const { active, account } = useWeb3React()

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = useState<any[]>([])

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

  if (!active || !account) return <ErrorNotConnected />
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
          imageArray={images}
          setImageArray={setImages}
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
          images={images}
        />
      )}
    </Container>
  )
}

export default Sell
