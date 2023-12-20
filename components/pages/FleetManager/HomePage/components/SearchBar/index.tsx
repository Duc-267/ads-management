import { Search2Icon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputRightElement, Spinner, Stack, Text } from '@chakra-ui/react'
import { searchFleetView } from 'API/fleet'
import { IResponseSearchValue } from 'interfaces/fleet'
import { debounce } from 'lodash'
import React, { useCallback, useState } from 'react'
import { checkValidArray } from 'utils/common'
import CastItemSearch from './CasesListSearch'
import DriversListSearch from './DriverListSearch'
import VehiclesListSearch from './VehiclesListSearch'

interface ISearchBarProps {
  fleetId: string
}

const SearchBar = (props: ISearchBarProps) => {
  const { fleetId } = props
  const [query, setQuery] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [results, setResults] = useState<IResponseSearchValue | undefined>()

  const doSearch = async (searchText: string) => {
    setResults(undefined)
    if (searchText) {
      const response = await searchFleetView(fleetId, searchText)
      setResults(response)
    } else {
      setQuery('')
    }
    setIsSearching(false)
  }

  const deferredSearchInput = useCallback(debounce(doSearch, 500), [])

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true)
    setQuery(e.target.value)
    await deferredSearchInput(e.target.value)
  }

  const isValidResults =
    checkValidArray(results?.cases) || checkValidArray(results?.vehicles) || checkValidArray(results?.drivers)

  return (
    <Box position={'relative'}>
      <InputGroup borderRadius="8px" background="white">
        <InputRightElement pointerEvents="none">
          <Search2Icon color="gray.400" />
        </InputRightElement>
        <Input
          type="search"
          placeholder="Search case number / reg / date etc"
          minW={'400px'}
          onChange={handleSearch}
          value={query}
        />
      </InputGroup>

      <Box
        position="absolute"
        top="100%"
        left="0"
        right="0"
        zIndex="1"
        background="white"
        borderBottomRadius={'8px'}
        boxShadow="0px 8px 18px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
      >
        {query ? (
          <Box>
            {isSearching ? (
              <Stack spacing={2} padding={4} w="full" alignItems={'center'} justify={'center'}>
                <Spinner />
              </Stack>
            ) : (
              <Box>
                {isValidResults ? (
                  <>
                    <CastItemSearch cases={results?.cases} searchText={query} />
                    <VehiclesListSearch vehicles={results?.vehicles} searchText={query} />
                    <DriversListSearch drivers={results?.drivers} searchText={query} />
                  </>
                ) : (
                  <Stack spacing={2} padding={4} w="full" alignItems={'flex-start'} justify={'flex-start'}>
                    <Text>No matching result</Text>
                  </Stack>
                )}
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default SearchBar
