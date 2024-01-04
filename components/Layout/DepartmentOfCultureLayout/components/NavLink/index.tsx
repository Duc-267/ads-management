import { HStack, Link, LinkProps, Text } from '@chakra-ui/react'
import React from 'react'

export interface INavLinkProps extends LinkProps {
  isActive?: boolean
  label: string
  icon: string
  href?: string
  onClick?: () => void
}

const NavLink = (props: INavLinkProps) => {
  const { icon, isActive, label, href, onClick } = props

  return (
    <Link
      className={undefined}
      display="block"
      onClick={onClick}
      paddingY={3}
      paddingLeft={4}
      paddingRight={4}
      href={href}
      borderRadius="lg"
      fontWeight={600}
      fontSize="sm"
      lineHeight="1.5rem"
      aria-current={isActive ? 'page' : undefined}
      color="white"
      _hover={{
        textDecoration: 'none'
      }}
      _activeLink={{
        bg: 'brand.primary.500',
        color: 'gray.900'
      }}
    >
      <HStack spacing={3}>
        <Text as="span" flexGrow={1}>
          {label}
        </Text>
      </HStack>
    </Link>
  )
}

export default NavLink
