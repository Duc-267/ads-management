import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import Icon from 'components/Icon'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import ForgotPasswordConfirmForm from './components/ForgotPasswordConfirmForm'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import LoginForm from './components/LoginForm'
import ResendLinkForm from './components/ResendLinkForm'
import ResetPasswordForm from './components/ResetPasswordForm'
import SetPasswordForm from './components/SetPasswordForm'
import {
  EAuthenticatePageGuide,
  EAuthenticatePageName,
  EAuthenticatePageTitle,
  EAuthenticatePageType
} from './constant'

export interface ILoginProps {
  type?: EAuthenticatePageType
  setNamePage?: (name: EAuthenticatePageName) => void
}

const AuthenticatePage = (props: ILoginProps) => {
  const { type, setNamePage } = props
  const [pageType] = useState<EAuthenticatePageType | undefined>(type)
  const isOverflow: boolean = useMediaQuery({ maxHeight: 810 })

  function getTitle(): string {
    switch (pageType) {
      case EAuthenticatePageType.SET_PASSWORD:
        setNamePage?.(EAuthenticatePageName.SET_PASSWORD)
        return EAuthenticatePageTitle.SET_PASSWORD
      case EAuthenticatePageType.RESET_PASSWORD:
        setNamePage?.(EAuthenticatePageName.RESET_PASSWORD)
        return EAuthenticatePageTitle.RESET_PASSWORD
      case EAuthenticatePageType.LOGIN:
        setNamePage?.(EAuthenticatePageName.LOGIN)
        return EAuthenticatePageTitle.LOGIN
      case EAuthenticatePageType.FORGOT_PASSWORD:
        setNamePage?.(EAuthenticatePageName.FORGOT_PASSWORD)
        return EAuthenticatePageTitle.FORGOT_PASSWORD
      case EAuthenticatePageType.FORGOT_PASSWORD_CONFIRM:
        setNamePage?.(EAuthenticatePageName.FORGOT_PASSWORD_CONFIRM)
        return EAuthenticatePageTitle.FORGOT_PASSWORD_CONFIRM
      case EAuthenticatePageType.EXPIRED_LINK:
        setNamePage?.(EAuthenticatePageName.EXPIRED_LINK)
        return EAuthenticatePageTitle.EXPIRED_LINK
      case EAuthenticatePageType.SUPER_ADMIN_SET_PASSWORD:
        setNamePage?.(EAuthenticatePageName.SUPER_ADMIN_SET_PASSWORD)
        return EAuthenticatePageTitle.SUPER_ADMIN_SET_PASSWORD
      case EAuthenticatePageType.SUPER_ADMIN_RESET_PASSWORD:
        setNamePage?.(EAuthenticatePageName.SUPER_ADMIN_RESET_PASSWORD)
      default:
        setNamePage?.(EAuthenticatePageName.LOGIN)
        return EAuthenticatePageTitle.LOGIN
    }
  }

  function getDescription(): string {
    switch (pageType) {
      case EAuthenticatePageType.SET_PASSWORD:
        return EAuthenticatePageGuide.SET_PASSWORD
      case EAuthenticatePageType.RESET_PASSWORD:
        return EAuthenticatePageGuide.RESET_PASSWORD
      case EAuthenticatePageType.LOGIN:
        return EAuthenticatePageGuide.LOGIN
      case EAuthenticatePageType.FORGOT_PASSWORD:
        return EAuthenticatePageGuide.FORGOT_PASSWORD
      case EAuthenticatePageType.FORGOT_PASSWORD_CONFIRM:
        return EAuthenticatePageGuide.FORGOT_PASSWORD_CONFIRM
      case EAuthenticatePageType.EXPIRED_LINK:
        return EAuthenticatePageGuide.EXPIRED_LINK
      case EAuthenticatePageType.SUPER_ADMIN_SET_PASSWORD:
        return EAuthenticatePageGuide.SUPER_ADMIN_SET_PASSWORD
      case EAuthenticatePageType.SUPER_ADMIN_RESET_PASSWORD:
        return EAuthenticatePageGuide.SUPER_ADMIN_RESET_PASSWORD
      default:
        return EAuthenticatePageGuide.LOGIN
    }
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
          {pageType === EAuthenticatePageType.SET_PASSWORD && <SetPasswordForm />}
          {pageType === EAuthenticatePageType.RESET_PASSWORD && <ResetPasswordForm />}
          {pageType === EAuthenticatePageType.LOGIN && <LoginForm />}
          {pageType === EAuthenticatePageType.FORGOT_PASSWORD && <ForgotPasswordForm />}
          {pageType === EAuthenticatePageType.FORGOT_PASSWORD_CONFIRM && <ForgotPasswordConfirmForm />}
          {pageType === EAuthenticatePageType.EXPIRED_LINK && <ResendLinkForm />}
          {pageType === EAuthenticatePageType.SUPER_ADMIN_SET_PASSWORD && <SetPasswordForm />}
          {pageType === EAuthenticatePageType.SUPER_ADMIN_RESET_PASSWORD && <ResetPasswordForm />}
        </Box>
      </Box>
    </Box>
  )
}

export default AuthenticatePage
