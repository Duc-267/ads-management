import { Tabs as TabsWrapper, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
import map from 'lodash/map'
import React, { ReactNode } from 'react'
import { getValidArray } from 'utils/common'

export interface ITabData {
  label: string
  content: ReactNode
}

export interface ITabsProps {
  data: ITabData[]
  tabIndex?: number
  onChange?: (tabNumber: number) => void
}

const Tabs = (props: ITabsProps) => {
  const { data, tabIndex, onChange } = props
  const headers: string[] = map(data, 'label')
  const contents: ReactNode[] = map(data, 'content')
  return (
    <TabsWrapper
      display="flex"
      overflow="hidden"
      flexDirection="column"
      colorScheme="orange"
      isLazy
      index={tabIndex}
      width="full"
      onChange={onChange}
    >
      <TabList whiteSpace="nowrap" zIndex={3} width="100%" height="50px" marginBottom={4}>
        {getValidArray(headers).map((header: string) => (
          <Tab key={`header-${header}`} _focus={{ background: 'none' }}>
            {header}
          </Tab>
        ))}
      </TabList>
      <TabPanels display="flex" overflow="hidden" width="full">
        {getValidArray(contents).map((content: ReactNode, index: number) => (
          <TabPanel width="full" overflow="hidden" key={`content-${index}`} padding={0}>
            {content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabsWrapper>
  )
}

export default Tabs
