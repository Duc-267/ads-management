import { ForgotPasswordSchema } from 'constants/validation'
import { Stack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPassword } from 'API/authenticate'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import routes from 'routes'
import { SubmitButton } from '../../authenticatePage.styles'

export interface IForgotPasswordFormData {
  email: string
}

const ForgotPasswordForm = () => {
  const method = useForm<IForgotPasswordFormData>({
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

  async function onSubmit(data: IForgotPasswordFormData): Promise<void> {
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
            Submit
          </SubmitButton>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default ForgotPasswordForm
