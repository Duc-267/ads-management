import { HStack } from '@chakra-ui/react'
import React from 'react'
import Icon from 'components/Icon'
import { useStores } from 'hooks/useStores'

const TopBar = () => {
  const { authStore } = useStores()
  return (
    <HStack w="full" backgroundColor="#202A3B" minH="80px" p={4} justifyContent={'space-between'}>
      <Icon iconName="logo.svg" width={101.82} height={32.81} className="ono-logo" alt="ono-logo" />
      <Icon
        iconName="ic-logout.svg"
        width={32}
        height={32}
        className="ono-logo"
        alt="ono-logo"
        onClick={() => {
          authStore.logout()
        }}
      />
    </HStack>
  )
}

export default TopBar
