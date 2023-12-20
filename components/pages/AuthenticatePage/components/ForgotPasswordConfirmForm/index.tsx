import { HStack, Spinner, Text, VStack, useToast } from '@chakra-ui/react'
import { forgotPassword } from 'API/authenticate'
import { useStores } from 'hooks/useStores'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import routes from 'routes'
import { SubmitButton } from '../../authenticatePage.styles'

export interface IForgotPasswordFormData {
  email: string
}

const ForgotPasswordConfirmForm = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { authStore } = useStores()
  const { forgotPasswordEmail } = authStore
  const router = useRouter()

  async function onSubmit(): Promise<void> {
    try {
      setIsLoading(true)
      if (forgotPasswordEmail) {
        const response = await forgotPassword({ email: forgotPasswordEmail })
        if (response) {
          toast({
            status: 'success',
            description: 'Please check your email to reset your password.'
          })
        }
      }
    } catch (error) {
      toast({
        status: 'error',
        description: 'There was an error. Please try again.'
      })
    }
    setIsLoading(false)
  }

  const goToForgotPassword = () => {
    router.replace(routes.auth.forgotPassword.value)
  }

  useEffect(() => {
    if (!forgotPasswordEmail) {
      toast({
        status: 'warning',
        description: 'Please enter your email address to reset your password.'
      })
      router.push(routes.auth.forgotPassword.value)
    }
  }, [forgotPasswordEmail])

  return (
    <VStack spacing="6">
      <HStack w="full" justifyContent={'space-between'}>
        <Text fontSize="md" textAlign="center">
          {`Don’t receive email?`}
        </Text>
        {isLoading ? (
          <Spinner size="sm" color="blue.600" />
        ) : (
          <Text fontSize="md" textAlign="center" color={'blue.600'} cursor={'pointer'} onClick={onSubmit}>
            Resend link
          </Text>
        )}
      </HStack>
      <SubmitButton w="full">
        <Text fontSize="md" textAlign="left" w={'fit-content'} cursor={'pointer'} onClick={goToForgotPassword}>
          Try another email address
        </Text>
      </SubmitButton>
    </VStack>
  )
}

export default ForgotPasswordConfirmForm
