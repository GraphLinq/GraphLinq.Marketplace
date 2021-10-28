import { TemplateRoot } from '@/components/TemplateSettings'
import { TemplateEditUpload } from '@/components/TemplateEditUpload'
import {
  Heading,
  Box,
  Link,
  Container,
  Center,
  Spinner,
  useBoolean,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import GraphService from 'services/graphService'
import useSWR from 'swr'
import { TemplateEditSettings } from '@/components/TemplateEditSettings'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const TemplateEdit: React.FC = ({}) => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_MANAGER_URL}/templates/${id}` : null,
    id ? fetcher : null
  )
  const [step, setStep] = useBoolean()
  const [price, setPrice] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')

  const [showFileUpload, setShowFileUpload] = useBoolean()

  const [fileUpload, setFileUpload] = useState<{
    loaded: boolean
    file: File | null
  }>({ loaded: false, file: null })

  const [fileImagesUpload, setFileImagesUpload] = useState<{
    loaded: boolean
    files: File[]
  }>({ loaded: false, files: [] })

  const [compressedTemplate, setCompressedTemplate] = useState<string>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [decompressedTemplate, setDecompressedTemplate] =
    useState<TemplateRoot>({ name: '', nodes: [], comments: [] })

  useEffect(() => {
    if (data) {
      setPrice(data.results.template_cost.toString())
      setTitle(data.results.name)
      setCategory(data.results.category?.id || 1)
      setDescription(data.results.description)
      setYoutubeLink(data.results.youtubeLink)
      //setCompressedTemplate(data.results.raw_bytes)
    }
  }, [data])

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

  if (error)
    return (
      <Box textAlign="center" mt="8">
        <Heading>Error</Heading>
        <Link href="/">Go back to home page</Link>
      </Box>
    )
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
  //console.log(data)
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
        <TemplateEditUpload
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
          compressedTemplate={compressedTemplate}
          setCompressedTemplate={setCompressedTemplate}
          templateId={Number(id)}
          templateVersion={data.results.versions.at(-1).id}
          showFileUpload={showFileUpload}
          setShowFileUpload={setShowFileUpload}
        />
      ) : compressedTemplate != null ? (
        <TemplateEditSettings
          setStep={setStep}
          title={title}
          description={description}
          category={category}
          price={price}
          decompressedTemplate={decompressedTemplate}
          youtubeLink={youtubeLink}
          fileImagesUpload={fileImagesUpload}
          templateId={Number(id)}
          templateVersion={data.results.versions.at(-1).id}
        />
      ) : (
        <>no template</>
      )}
    </Container>
  )
}

export default TemplateEdit
