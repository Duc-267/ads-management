import { HStack } from '@chakra-ui/react'
import React from 'react'
import { IconWithTextWrapper, Label } from './iconWithText.styles'
import Icon from '../Icon'

export interface IIconWithTextProps {
  iconName: string
  label?: string
  onClick?: () => void
  innerRef?: React.LegacyRef<HTMLDivElement>
  size?: number
  width?: number
  height?: number
  iconClassName?: string
  color?: string
  spacing?: number | string
}
const IconWithText = (props: IIconWithTextProps) => {
  const { iconName, label, innerRef, width, height, size, color = 'black', iconClassName, spacing = 2, onClick } = props
  return (
    <IconWithTextWrapper ref={innerRef} onClick={onClick} spacing={spacing}>
      <HStack textAlign="center" height={`${height ?? size}px`} width={`${width ?? size}px`}>
        <Icon width={width} height={height} size={size} iconName={iconName} className={iconClassName} alt="" />
      </HStack>
      <Label margin={0} color={color} isTruncated fontWeight={700} fontSize="sm" marginLeft={2}>
        {label}
      </Label>
    </IconWithTextWrapper>
  )
}
export default IconWithText
