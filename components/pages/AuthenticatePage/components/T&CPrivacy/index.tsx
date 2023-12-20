import { Link, Text, useDisclosure } from '@chakra-ui/react'
import PopupInformation from 'components/PopupInfomation'
import React, { useState } from 'react'

const TnCPrivacy = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [popupInformation, setPopupInfomation] = useState({ title: 'Terms and Conditions' })
  return (
    <>
      <Text width="full" align="center" fontSize="sm">
        <Link
          href="#"
          color="blue.600"
          onClick={() => {
            setPopupInfomation({ ...popupInformation, title: 'Terms and Conditions' })
            onOpen()
          }}
        >
          Terms and Conditions
        </Link>
        &nbsp;&&nbsp;
        <Link
          href="#"
          color="blue.600"
          onClick={() => {
            setPopupInfomation({ ...popupInformation, title: 'Privacy Policies' })
            onOpen()
          }}
        >
          Privacy Policies
        </Link>
      </Text>

      <PopupInformation isOpen={isOpen} onClose={onClose} title={popupInformation.title} />
    </>
  )
}

export default TnCPrivacy
