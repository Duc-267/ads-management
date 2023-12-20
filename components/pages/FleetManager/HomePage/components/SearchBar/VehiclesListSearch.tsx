import { Box, HStack, VStack } from '@chakra-ui/react'
import SvgIcon from 'components/SvgIcon'
import { IVehicle } from 'interfaces/vehicle'
import React from 'react'
import Highlighter from 'react-highlight-words'
import { getValidArray } from 'utils/common'

type Props = {
  vehicles?: IVehicle[]
  searchText: string
}

const VehiclesListSearch = ({ vehicles, searchText }: Props) => {
  return (
    <Box>
      {getValidArray(vehicles)?.map(item => (
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
            <SvgIcon iconName="ic-vehicles.svg" width={16.47} height={14.17} color="black" stroke-width={1.5} />
            <VStack spacing={4} flex={1} alignItems={'start'}>
              <Highlighter searchWords={[searchText]} textToHighlight={item.vinNumber || ''} />
              <Highlighter searchWords={[searchText]} textToHighlight={item.registrationNumber || ''} />
            </VStack>
          </HStack>
        </Box>
      ))}
    </Box>
  )
}

export default VehiclesListSearch
