import { Text } from '@chakra-ui/react'
import React from 'react'

const NoDataText = () => {
  return (
    <Text fontSize="md" fontWeight={600} lineHeight={6} color="gray.500" fontStyle="italic">
      N/A
    </Text>
  )
}

export default NoDataText
