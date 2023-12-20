import { VStack, chakra } from '@chakra-ui/react'

export const ModalWrapper = chakra(VStack, {
  baseStyle: () => ({
    width: '100%',
    paddingX: 4,
    paddingTop: 6,
    background: 'white',
    borderRadius: 12,
    height: 'calc(100vh - 171px)'
  })
})
