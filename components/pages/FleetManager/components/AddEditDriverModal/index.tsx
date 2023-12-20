import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

export interface IModalCustom {
  isOpen: boolean
  onClose: () => void
  children: JSX.Element
  title: string
  onSecondaryClick?: () => void
  secondaryText?: string
  isFleetDetail?: boolean
  isLoading?: boolean
}

export const DriverModal = (props: IModalCustom) => {
  const {
    isOpen = false,
    onClose,
    children,
    title = '',
    onSecondaryClick,
    secondaryText = '',
    isFleetDetail = false,
    isLoading = false
  } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minW={'fit-content'} pb="16px" borderRadius={'12px'}>
        <ModalHeader
          borderBottom={'1px'}
          borderColor={'gray.300'}
          display={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {title}
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody maxHeight="80vh" overflow="scroll" w={'768px'}>
          {children}
        </ModalBody>
        <ModalFooter justifyContent={'flex-end'}>
          <Box>
            {!isFleetDetail && (
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
            )}
            {onSecondaryClick && (
              <Button isLoading={isLoading} variant="ghost" onClick={onSecondaryClick} backgroundColor="#FFCD1C">
                {secondaryText}
              </Button>
            )}
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
