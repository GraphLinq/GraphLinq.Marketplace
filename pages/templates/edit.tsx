import React, { useEffect, useState } from 'react'
import {
  Heading,
  Container,
  Center,
  Spinner,
  useBoolean,
} from '@chakra-ui/react'
//import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TemplateUpload } from '@/components/TemplateUpload'
import { TemplateRoot, TemplateSettings } from '@/components/TemplateSettings'
import GraphService from 'services/graphService'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const TemplatePage: React.FC = ({}) => {
  //@todo get template data to edit
  //const router = useRouter()
  //const { templateId } = router.query
  /* const { data, error } = useSWR(
    `http://127.0.0.1.4561/templates/${templateId}`,
    fetcher
  ) */
  const { data, error } = useSWR(`/api/template`, fetcher)

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

  useEffect(() => {
    setPrice(data[0].price.price)
    setTitle(data[0].title)
    setCategory(data[0].category.id)
    setDescription(data[0].description)
    setYoutubeLink(data[0].youtubeLink)
  }, [data])

  if (error) return <>An error has occurred.</>
  if (!data)
    return (
      <Center w="full" h={96} alignContent="center">
        <Spinner
          thickness="4px"
          size="lg"
          color="gray.300"
          emptyColor="gray.500"
        />
      </Center>
    )
  return (
    <Container
      mt="3.5rem"
      maxW={['container.sm', 'container.md', 'container.xl']}
      display="flex"
      flexDirection="column"
    >
      <Heading size="xl" color="white">
        Edit Template
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

export default TemplatePage
