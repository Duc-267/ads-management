import { VStack, chakra } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import Head from 'next/head'
import React, { ReactNode, useEffect } from 'react'
import withSuperAdmin from 'HOCs/withSuperAdmin'
import { useStores } from 'hooks/useStores'
import TopBar from './components/TopBar'

interface IFleetManagerLayoutProps {
  title?: string
  children?: ReactNode
}

const SuperAdminLayout = (props: IFleetManagerLayoutProps) => {
  const { title, children } = props
  const { authStore } = useStores()
  useEffect(() => {
    if (authStore.getLocalStorageAccessToken()) {
      authStore.fetchCurrentUser()
    }
  }, [])
  return (
    <>
      <Head>
        <title>{title || 'Ono | Super Admin'}</title>
        <link rel="icon" href="/assets/icons/logo.svg" />
      </Head>
      <chakra.main>
        <VStack background="background.primary" minHeight="100vh" alignItems="flex-start" spacing={0}>
          <TopBar />
          {children}
        </VStack>
      </chakra.main>
    </>
  )
}

export default observer(withSuperAdmin(SuperAdminLayout))
