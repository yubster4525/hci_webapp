import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useColorMode,
  useColorModeValue,
  Tooltip,
  Badge,
  Switch,
  FormControl,
  FormLabel,
  Icon,
  Text,
} from '@chakra-ui/react'
import { FiMenu, FiBell, FiEye, FiEyeOff, FiUser, FiSettings, FiLogOut, FiMoon, FiSun } from 'react-icons/fi'

interface HeaderProps {
  onToggleSidebar: () => void;
  showGazeTracker: boolean;
  setShowGazeTracker: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar, 
  showGazeTracker, 
  setShowGazeTracker 
}) => {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  // Notification count - in a real app this would come from a notifications service
  const [notificationCount] = useState(3)

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={2}
      px={4}
      bg={bgColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
      h="60px"
    >
      <Flex align="center">
        <IconButton
          aria-label="Open sidebar"
          icon={<FiMenu />}
          variant="ghost"
          onClick={onToggleSidebar}
          mr={3}
          size="lg"
        />
        <Heading 
          size="md" 
          cursor="pointer" 
          color="primary.500"
          onClick={() => navigate('/')}
        >
          Process Planning
        </Heading>
      </Flex>
      
      <Flex align="center" gap={4}>
        {/* Eye Tracking Toggle */}
        <Flex align="center" title={showGazeTracker ? "Disable Eye Tracking" : "Enable Eye Tracking"}>
          <FormControl display="flex" alignItems="center" justifyContent="flex-end" width="auto">
            <FormLabel htmlFor="gaze-toggle" mb="0" mr={2} fontSize="sm" cursor="pointer">
              <Icon as={showGazeTracker ? FiEye : FiEyeOff} color={showGazeTracker ? "primary.500" : "gray.500"} />
            </FormLabel>
            <Switch
              id="gaze-toggle"
              colorScheme="primary"
              isChecked={showGazeTracker}
              onChange={(e) => setShowGazeTracker(e.target.checked)}
              size="sm"
            />
          </FormControl>
        </Flex>
        
        {/* Color Mode Toggle */}
        <IconButton
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          variant="ghost"
          onClick={toggleColorMode}
          title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        />
        
        {/* Notifications */}
        <Box position="relative" title="Notifications">
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="ghost"
            onClick={() => navigate('/notifications')}
          />
          {notificationCount > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="0"
              right="0"
              transform="translate(25%, -25%)"
            >
              {notificationCount}
            </Badge>
          )}
        </Box>
        
        {/* User Menu */}
        <Menu>
          <MenuButton as={Button} variant="ghost" p={0} borderRadius="full">
            <Avatar size="sm" name="User" bg="primary.500" />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser />} onClick={() => navigate('/profile')}>
              Profile
            </MenuItem>
            <MenuItem icon={<FiSettings />} onClick={() => navigate('/settings')}>
              Settings
            </MenuItem>
            <MenuItem icon={<FiLogOut />}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Header