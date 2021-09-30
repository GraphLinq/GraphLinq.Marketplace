import type { NextPage } from 'next'
import { Container, Heading, useBoolean } from '@chakra-ui/react'
import { TemplateUpload } from '@/components/TemplateUpload'
import { TemplateSettings } from '@/components/TemplateSettings'
import { useState } from 'react'

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
        />
      ) : (
        <TemplateSettings setStep={setStep} />
      )}
    </Container>
  )
}

export default Sell
