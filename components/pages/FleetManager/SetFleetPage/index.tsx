import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Icon from 'components/Icon'
import {
  EAuthenticatePageGuide,
  EAuthenticatePageName,
  EAuthenticatePageTitle
} from 'components/pages/AuthenticatePage/constant'
import SelectFleetForm from '../components/SelectFleetForm'

export interface ILoginProps {
  setNamePage?: (name: EAuthenticatePageName) => void
}

const SetFleetPage = (props: ILoginProps) => {
  const { setNamePage } = props
  const isOverflow: boolean = useMediaQuery({ maxHeight: 810 })

  function getTitle(): string {
    setNamePage?.(EAuthenticatePageName.SELECT_FLEET)
    return EAuthenticatePageTitle.SELECT_FLEET
  }

  function getDescription(): string {
    return EAuthenticatePageGuide.SELECT_FLEET
  }

  return (
    <Box minHeight={isOverflow ? '810px' : '100vh'}>
      <Box width="full" maxWidth="xl" marginX="auto" paddingY="188px">
        <Box maxWidth="416px" marginX={{ base: 8, md: 'auto' }}>
          <Icon iconName="logo.svg" width={140} height={55} className="ono-logo" alt="ono-logo" />
          <VStack marginBottom={12} width="full" alignItems="flex-start">
            <Heading
              fontSize="24px"
              marginBottom={2}
              marginTop={14}
              fontWeight="bold"
              color="gray.900"
              lineHeight="26px"
            >
              {getTitle()}
            </Heading>
            <Text fontSize="md" color="gray.700">
              {getDescription()}
            </Text>
          </VStack>
          <SelectFleetForm />
        </Box>
      </Box>
    </Box>
  )
}

export default SetFleetPage
