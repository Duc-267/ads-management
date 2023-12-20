import { Box, HStack, VStack } from '@chakra-ui/react'
import SvgIcon from 'components/SvgIcon'
import { IUser } from 'interfaces/user'
import React from 'react'
import Highlighter from 'react-highlight-words'
import { getValidArray } from 'utils/common'

type Props = {
  drivers?: IUser[]
  searchText: string
}

const DriversListSearch = ({ drivers, searchText }: Props) => {
  return (
    <Box>
      {getValidArray(drivers)?.map(item => (
        <Box
          key={item.id}
          padding="8px 16px"
          borderBottom={'1px solid #E2E8F0'}
          _hover={{ background: '#E2E8F0', cursor: 'pointer' }}
          onClick={() => {
            alert('clicked')
          }}
        >
          <HStack gap={3}>
            <SvgIcon iconName="ic-drivers.svg" width={20} height={16} color="black" strokeWidth={1.5} />
            <VStack spacing={4} flex={1} alignItems={'start'}>
              <Highlighter searchWords={[searchText]} textToHighlight={item?.name || ''} />
              <Highlighter searchWords={[searchText]} textToHighlight={item?.email || ''} />
              <Highlighter searchWords={[searchText]} textToHighlight={item?.phone || ''} />
            </VStack>
          </HStack>
        </Box>
      ))}
    </Box>
  )
}

export default DriversListSearch
