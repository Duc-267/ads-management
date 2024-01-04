import { Box, Text } from '@chakra-ui/react'
import React, { memo } from 'react'
import Icon from 'components/Icon'
export interface INavigateBarProps {
  handleBack: () => void
  title: string
}

const NavigateBar = (props: INavigateBarProps) => {
  const { title, handleBack } = props

  return (
    <Box bg={'#fff'} display="flex" alignItems={'center'} padding="18px 16px">
      <Icon iconName="arrow-left.svg" width={32} height={32} className="ono-logo" alt="ono-logo" onClick={handleBack} />

      <Text fontWeight={600} fontSize="20px" marginLeft={'13px'}>
        {title}
      </Text>
    </Box>
  )
}

export default memo(NavigateBar)
