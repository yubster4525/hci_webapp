import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Flex,
  VStack,
  Text,
  IconButton,
  Icon,
  Heading,
  useColorModeValue,
  CloseButton,
  Divider,
} from '@chakra-ui/react'
import {
  FiGrid,
  FiMessageCircle,
  FiBell,
  FiSettings,
  FiCalendar,
  FiUsers,
  FiCheckSquare,
  FiBarChart2,
} from 'react-icons/fi'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, children, isActive, onClick }: NavItemProps) => {
  const activeBg = useColorModeValue('primary.50', 'gray.700');
  const activeColor = useColorModeValue('primary.700', 'white');
  const inactiveColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Flex
      align="center"
      py={3}
      px={4}
      cursor="pointer"
      role="group"
      rounded="md"
      mb={1}
      onClick={onClick}
      bg={isActive ? activeBg : 'transparent'}
      color={isActive ? activeColor : inactiveColor}
      fontWeight={isActive ? 'semibold' : 'normal'}
      transition="all 0.2s"
      _hover={{
        bg: activeBg,
        color: activeColor,
      }}
    >
      <Icon
        as={icon}
        mr={4}
        fontSize="16px"
        color={isActive ? 'primary.500' : 'gray.500'}
        _groupHover={{
          color: 'primary.500',
        }}
      />
      <Text fontSize="sm">{children}</Text>
      
      {isActive && (
        <Box
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          width="4px"
          height="20px"
          bg="primary.500"
          borderLeftRadius="md"
        />
      )}
    </Flex>
  )
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      onClose()
    }
  }, [location.pathname, onClose])

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: FiGrid },
    { name: 'Chat', path: '/chat', icon: FiMessageCircle },
    { name: 'Calendar', path: '/calendar', icon: FiCalendar },
    { name: 'Tasks', path: '/tasks', icon: FiCheckSquare },
    { name: 'Teams', path: '/teams', icon: FiUsers },
    { name: 'Analytics', path: '/analytics', icon: FiBarChart2 },
    { name: 'Notifications', path: '/notifications', icon: FiBell },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ]

  return (
    <Box
      as="nav"
      position="fixed"
      top="60px"
      left={0}
      zIndex="sticky"
      h="full"
      pb={10}
      overflowX="hidden"
      overflowY="auto"
      bg={bgColor}
      borderRightWidth="1px"
      borderColor={borderColor}
      w={{ base: 'full', md: 60 }}
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      boxShadow={{ base: isOpen ? 'md' : 'none', md: 'none' }}
      transition="width 0.3s ease"
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" px={4}>
        <Heading size="md" color="primary.500">Menu</Heading>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      
      <Divider borderColor={borderColor} />
      
      <VStack spacing={0} align="stretch" mt={4}>
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar