import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import Highlighter from 'react-highlight-words'
import SvgIcon from 'components/SvgIcon'
import { ICaseDetail } from 'interfaces/case'
import { getValidArray } from 'utils/common'

type Props = {
  cases?: ICaseDetail[]
  searchText: string
}

const CastItemSearch = ({ cases, searchText }: Props) => {
  return (
    <Box>
      {getValidArray(cases)?.map(item => (
        <Box
          key={item.caseId}
          padding="8px 16px"
          borderBottom={'1px solid #E2E8F0'}
          _hover={{ background: '#E2E8F0', cursor: 'pointer' }}
          onClick={() => {
            alert('clicked')
          }}
        >
          <HStack gap={3}>
            <SvgIcon iconName="ic-cases.svg" width={16.47} height={14.17} color="black" strokeWidth={1.5} />
            <HStack spacing={4} flex={1} overflow={'hidden'}>
              <Highlighter searchWords={[searchText]} textToHighlight={item.caseId} />
              <Highlighter searchWords={[searchText]} textToHighlight={item.regNumber} />
              <Highlighter searchWords={[searchText]} textToHighlight={item.driverName} />
            </HStack>
          </HStack>
        </Box>
      ))}
    </Box>
  )
}

export default CastItemSearch
