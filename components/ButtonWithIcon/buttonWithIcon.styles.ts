import { chakra, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const ButtonWithIconWrapper = styled(
  chakra(Box, {
    baseStyle: () => ({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '6px 12px',
      boxSizing: 'border-box',
      backgroundColor: '#FFCD1C',
      borderRadius: '6px',
      height: '40px',
      cursor: 'pointer'
    })
  })
)`
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    padding-left: 12px;
    color: black;
  }
`
