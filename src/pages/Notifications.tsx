import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Icon,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
  SimpleGrid,
  Card,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { 
  FiCheckCircle, 
  FiFilter, 
  FiUser, 
  FiClock, 
  FiRefreshCw, 
  FiTrash2, 
  FiMoreVertical 
} from 'react-icons/fi';

import NotificationItem from '../components/common/NotificationItem';

interface NotificationData {
  id: number;
  type: 'mention' | 'deadline' | 'update';
  content: string;
  time: string;
  read: boolean;
}

// Dummy data for notifications
const initialNotificationsData: NotificationData[] = [
  {
    id: 1,
    type: 'mention',
    content: '@johnsmith mentioned you in "Project Alpha"',
    time: '10 minutes ago',
    read: false
  },
  {
    id: 2,
    type: 'deadline',
    content: 'Deadline approaching: UI Review Meeting at 3 PM',
    time: '30 minutes ago',
    read: false
  },
  {
    id: 3,
    type: 'update',
    content: 'Team B updated the shared document',
    time: '2 hours ago',
    read: true
  },
  {
    id: 4,
    type: 'mention',
    content: '@sarahwilliams mentioned you in "Bug Fix #234"',
    time: '1 day ago',
    read: true
  },
  {
    id: 5,
    type: 'update',
    content: 'New release version 1.2.0 is available',
    time: '2 days ago',
    read: true
  },
  {
    id: 6,
    type: 'deadline',
    content: 'Project deadline: Submit final designs by Friday',
    time: '3 days ago',
    read: true
  },
  {
    id: 7,
    type: 'mention',
    content: '@michaeljohnson mentioned you in "Weekly Status Update"',
    time: '4 days ago',
    read: true
  },
  {
    id: 8,
    type: 'update',
    content: 'System maintenance scheduled for this weekend',
    time: '5 days ago',
    read: true
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>(initialNotificationsData);
  const [filter, setFilter] = useState<string>('all');
  
  // Style variables
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });
  
  // Count notifications by type
  const unreadCount = notifications.filter(n => !n.read).length;
  const mentionCount = notifications.filter(n => n.type === 'mention').length;
  const deadlineCount = notifications.filter(n => n.type === 'deadline').length;
  const updateCount = notifications.filter(n => n.type === 'update').length;
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <Box>
      <Flex 
        justifyContent="space-between" 
        alignItems="center" 
        mb={6}
        flexDir={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <Box>
          <Heading size="lg" mb={1}>Notifications</Heading>
          <Text color="gray.500">Stay updated with the latest activities</Text>
        </Box>
        
        <ButtonGroup>
          <Button 
            leftIcon={<FiCheckCircle />} 
            variant="outline"
            onClick={handleMarkAllAsRead}
            isDisabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
          <Menu>
            <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="outline" />
            <MenuList>
              <MenuItem 
                icon={<FiTrash2 />} 
                onClick={handleDeleteAll}
                color="red.500"
              >
                Delete all notifications
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </Flex>
      
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <Card bg={cardBg} p={3} borderRadius="md" shadow="sm">
          <Flex align="center" justify="space-between">
            <Text fontWeight="medium">All</Text>
            <Badge colorScheme="gray" borderRadius="full">
              {notifications.length}
            </Badge>
          </Flex>
        </Card>
        
        <Card bg={cardBg} p={3} borderRadius="md" shadow="sm">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Icon as={FiUser} color="blue.500" mr={2} />
              <Text fontWeight="medium">Mentions</Text>
            </Flex>
            <Badge colorScheme="blue" borderRadius="full">
              {mentionCount}
            </Badge>
          </Flex>
        </Card>
        
        <Card bg={cardBg} p={3} borderRadius="md" shadow="sm">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Icon as={FiClock} color="orange.500" mr={2} />
              <Text fontWeight="medium">Deadlines</Text>
            </Flex>
            <Badge colorScheme="orange" borderRadius="full">
              {deadlineCount}
            </Badge>
          </Flex>
        </Card>
        
        <Card bg={cardBg} p={3} borderRadius="md" shadow="sm">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Icon as={FiRefreshCw} color="green.500" mr={2} />
              <Text fontWeight="medium">Updates</Text>
            </Flex>
            <Badge colorScheme="green" borderRadius="full">
              {updateCount}
            </Badge>
          </Flex>
        </Card>
      </SimpleGrid>
      
      <Card bg={cardBg} shadow="md" borderRadius="lg" overflow="hidden">
        <Tabs variant="enclosed-colored" colorScheme="primary">
          <TabList px={4} pt={4}>
            <Tab 
              onClick={() => setFilter('all')}
              fontWeight={filter === 'all' ? 'semibold' : 'normal'}
            >
              All
            </Tab>
            <Tab 
              onClick={() => setFilter('unread')}
              fontWeight={filter === 'unread' ? 'semibold' : 'normal'}
            >
              Unread
              {unreadCount > 0 && (
                <Badge ml={2} colorScheme="primary" borderRadius="full">
                  {unreadCount}
                </Badge>
              )}
            </Tab>
            <Tab 
              onClick={() => setFilter('mention')}
              fontWeight={filter === 'mention' ? 'semibold' : 'normal'}
            >
              Mentions
            </Tab>
            <Tab 
              onClick={() => setFilter('deadline')}
              fontWeight={filter === 'deadline' ? 'semibold' : 'normal'}
            >
              Deadlines
            </Tab>
            <Tab 
              onClick={() => setFilter('update')}
              fontWeight={filter === 'update' ? 'semibold' : 'normal'}
            >
              Updates
            </Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel p={4}>
              {filteredNotifications.length === 0 ? (
                <Box py={10} textAlign="center">
                  <Text color="gray.500">No notifications to display</Text>
                </Box>
              ) : (
                filteredNotifications.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TabPanel>
            <TabPanel p={4}>
              {filteredNotifications.length === 0 ? (
                <Box py={10} textAlign="center">
                  <Text color="gray.500">No notifications to display</Text>
                </Box>
              ) : (
                filteredNotifications.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TabPanel>
            <TabPanel p={4}>
              {filteredNotifications.length === 0 ? (
                <Box py={10} textAlign="center">
                  <Text color="gray.500">No mentions to display</Text>
                </Box>
              ) : (
                filteredNotifications.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TabPanel>
            <TabPanel p={4}>
              {filteredNotifications.length === 0 ? (
                <Box py={10} textAlign="center">
                  <Text color="gray.500">No deadlines to display</Text>
                </Box>
              ) : (
                filteredNotifications.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TabPanel>
            <TabPanel p={4}>
              {filteredNotifications.length === 0 ? (
                <Box py={10} textAlign="center">
                  <Text color="gray.500">No updates to display</Text>
                </Box>
              ) : (
                filteredNotifications.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
};

export default Notifications;