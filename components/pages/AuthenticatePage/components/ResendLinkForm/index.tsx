import { Stack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { forgotPassword } from 'API/authenticate'
import FormInput from 'components/FormInput'
import { ForgotPasswordSchema } from 'constants/validation'
import { useStores } from 'hooks/useStores'
import routes from 'routes'
import { SubmitButton } from '../../authenticatePage.styles'

export interface IResendLinkFormData {
  email: string
}

const ResendLinkForm = () => {
  const method = useForm<IResendLinkFormData>({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(ForgotPasswordSchema)
  })
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = method
  const router = useRouter()
  const toast = useToast()
  const { authStore } = useStores()

  async function onSubmit(data: IResendLinkFormData): Promise<void> {
    try {
      const { email } = data
      authStore.setForgotPasswordEmail(email)
      if (email) {
        const response = await forgotPassword({ email })
        if (response) {
          router.push(routes.auth.forgotPassword.confirm.value)
        }
      }
    } catch (error) {
      toast({
        status: 'error',
        description: 'Email address is not registered. Please try again.'
      })
      authStore.setForgotPasswordEmail('')
    }
  }

  useEffect(() => {
    authStore.setForgotPasswordEmail('')
  }, [])

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <FormInput name="email" label="Email address" placeholder="Your email" type="email" />
          <SubmitButton type="submit" isLoading={isSubmitting}>
            Resend link
          </SubmitButton>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default ResendLinkForm
