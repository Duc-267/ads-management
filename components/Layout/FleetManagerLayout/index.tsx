import { HStack, chakra } from '@chakra-ui/react'
import withAuth from 'HOCs/withAuth'
import { observer } from 'mobx-react'
import Head from 'next/head'
import React, { ReactNode, RefObject, useRef } from 'react'
import SideBar from './components/Sidebar'

interface IFleetManagerLayoutProps {
  title?: string
  children?: ReactNode
  isAuthLayout?: boolean
}

const FleetManagerLayout = (props: IFleetManagerLayoutProps) => {
  const { title, children, isAuthLayout = false } = props

  const sideBarRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  return (
    <>
      <Head>
        <title>{title || 'Ono'}</title>
        <link rel="icon" href="/assets/icons/logo.svg" />
      </Head>
      <chakra.main>
        {isAuthLayout ? (
          <>{children}</>
        ) : (
          <>
            <HStack background="background.primary" minHeight="100vh" alignItems="stretch" spacing={0}>
              <SideBar sideBarRef={sideBarRef} />
              {children}
            </HStack>
          </>
        )}
      </chakra.main>
    </>
  )
}

export default observer(withAuth(FleetManagerLayout))
