import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  IconButton,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { 
  FiUser, 
  FiClock, 
  FiRefreshCw, 
  FiBell, 
  FiMoreVertical, 
  FiCheckCircle, 
  FiX 
} from 'react-icons/fi';

interface NotificationData {
  id: number;
  type: 'mention' | 'deadline' | 'update';
  content: string;
  time: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: NotificationData;
  onMarkAsRead?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead, 
  onDelete 
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'mention':
        return FiUser;
      case 'deadline':
        return FiClock;
      case 'update':
        return FiRefreshCw;
      default:
        return FiBell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mention':
        return 'blue';
      case 'deadline':
        return 'orange';
      case 'update':
        return 'green';
      default:
        return 'gray';
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'mention':
        return 'Mention';
      case 'deadline':
        return 'Deadline';
      case 'update':
        return 'Update';
      default:
        return 'Notification';
    }
  };
  
  const bgColor = useColorModeValue(
    notification.read ? 'white' : 'gray.50', 
    notification.read ? 'gray.700' : 'gray.750'
  );
  
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const IconComponent = getIcon(notification.type);

  return (
    <Box
      p={4}
      mb={2}
      borderWidth="1px"
      borderColor={notification.read ? borderColor : `${getTypeColor(notification.type)}.500`}
      borderRadius="md"
      boxShadow={notification.read ? 'sm' : 'md'}
      bg={bgColor}
      position="relative"
      transition="all 0.2s"
      _hover={{ boxShadow: 'md' }}
    >
      <Flex>
        <Box 
          p={2} 
          borderRadius="md" 
          bg={`${getTypeColor(notification.type)}.50`} 
          color={`${getTypeColor(notification.type)}.500`} 
          mr={3}
        >
          <Icon as={IconComponent} boxSize={5} />
        </Box>
        
        <Box flex="1">
          <Text fontWeight={notification.read ? 'normal' : 'medium'}>
            {notification.content}
          </Text>
          <Flex mt={1} fontSize="sm" color="gray.500" align="center">
            <Text mr={2}>{notification.time}</Text>
            <Badge colorScheme={getTypeColor(notification.type)}>
              {getTypeLabel(notification.type)}
            </Badge>
          </Flex>
        </Box>
        
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMoreVertical />}
            variant="ghost"
            size="sm"
            aria-label="Options"
          />
          <MenuList>
            {!notification.read && onMarkAsRead && (
              <MenuItem 
                icon={<FiCheckCircle />} 
                onClick={() => onMarkAsRead(notification.id)}
              >
                Mark as read
              </MenuItem>
            )}
            {onDelete && (
              <MenuItem 
                icon={<FiX />} 
                onClick={() => onDelete(notification.id)}
                color="red.500"
              >
                Delete
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
      
      {!notification.read && (
        <Box 
          position="absolute" 
          top={2} 
          left={2} 
          w={2} 
          h={2} 
          borderRadius="full" 
          bg={`${getTypeColor(notification.type)}.500`} 
        />
      )}
    </Box>
  );
};

export default NotificationItem;