import { Flex, Stack, VStack, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { RefObject } from 'react'
import { FleetManagerPageName } from 'components/pages/FleetManager/constant'
import { EZIndexLayer } from 'enums/theme'
import { useStores } from 'hooks/useStores'
import routes from 'routes'
import NavLink, { INavLinkProps } from '../NavLink'

interface ISidebarProps {
  sideBarRef: RefObject<HTMLDivElement>
}
const SideBar = (props: ISidebarProps) => {
  const { sideBarRef } = props
  const router = useRouter()
  const { authStore } = useStores()

  function getLinkProps(href: string, iconName?: string): Omit<INavLinkProps, 'label'> {
    const isActive = router.asPath.includes(href)
    return {
      isActive,
      href,
      icon: `${iconName}.svg`
    }
  }

  return (
    <Flex
      height="100vh"
      minWidth="240px"
      width={'fit-content'}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      ref={sideBarRef}
      background="brand.darkBlue.500"
      color="white"
      zIndex={EZIndexLayer.NAV}
    >
      <VStack width="full" padding={4} spacing="10px" marginTop={10} alignItems="flex-start">
        <Image alt="ono_logo.svg" src={`/assets/icons/logo.svg`} width="100px" height={10} />
        <Text fontSize="2xl" fontWeight={500}>
          Dashboard
        </Text>
      </VStack>
      <Image alt="" src={`/assets/icons/ic-divider.svg`} width="188px" marginTop={5} />
      <VStack
        display="flex"
        height="full"
        overflowX="hidden"
        overflowY="auto"
        paddingX={2}
        mt={10}
        mb={5}
        justifyContent={'space-between'}
      >
        <Stack spacing={2} marginX={3} marginY={3} width="full">
          <NavLink label={'Danh sách quận, phường'} {...getLinkProps(routes.departmentOfCulture.accounts.value)} />
          <NavLink label={'Danh sách bảng quảng cáo'} {...getLinkProps(routes.departmentOfCulture.spaces.value)} />
        </Stack>
        <Stack w="full" alignSelf={'end'}>
          <NavLink
            label={FleetManagerPageName.LOGOUT}
            onClick={() => {
              authStore.logout()
            }}
            icon={'ic-logout.svg'}
          />
        </Stack>
      </VStack>
    </Flex>
  )
}

export default SideBar
