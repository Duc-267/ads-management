import { Modal, ModalOverlay, ModalHeader, ModalCloseButton } from '@chakra-ui/react'
import React from 'react'
import { LoremIpsum } from 'react-lorem-ipsum'
import * as S from './styles'

export interface ITCProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content?: string
}
function PopupInformation(props: ITCProps) {
  const { isOpen, onClose, title } = props

  return (
    <Modal isOpen={!!isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <S.ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <S.ModalBody>
          <LoremIpsum p={10} />
        </S.ModalBody>
      </S.ModalContent>
    </Modal>
  )
}

export default PopupInformation
