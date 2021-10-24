import React from 'react'
import TemplateCard from '../TemplateCard'
import { Templates } from 'pages'
import useSWR from 'swr'
import { Flex, Text } from '@chakra-ui/react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UserTemplatesProps {
  userId: number
}

const UserTemplates: React.FC<UserTemplatesProps> = ({ userId }) => {
  const { data, error } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_MANAGER_URL}/users/${userId}/templates/published`
      : null,
    userId ? fetcher : null
  )
  if (error) return <Text>Failure: Can&apos;t reach API</Text>
  return (
    <Flex
      flexDir="row"
      wrap="wrap"
      flex="0 1 auto"
      justifyContent="start"
      pt="2rem"
    >
      {!data
        ? 'loading...'
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.templates.publishedTemplates.map((t: Templates, i: number) => {
            return (
              <TemplateCard
                key={`${t.id}-${i}`}
                template={t}
                user={{
                  ...data.templates,
                }}
              />
            )
          })}
    </Flex>
  )
}

export default UserTemplates
