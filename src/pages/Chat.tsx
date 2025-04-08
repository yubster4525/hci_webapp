import { useState, useRef } from 'react'
import {
  Box,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  Badge,
  Text,
  HStack,
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  useColorModeValue,
  Divider,
  Card,
} from '@chakra-ui/react'
import { FiSearch, FiPaperclip, FiSend, FiCalendar, FiPlusCircle, FiMoreVertical, FiMessageSquare, FiMessageCircle } from 'react-icons/fi'

import ChatArea from '../components/chat/ChatArea'
import MeetingScheduler from '../components/chat/MeetingScheduler'

// Mock data for chat contacts
const privateChats = [
  { id: 1, name: 'John Smith', status: 'online', unread: 0, avatar: 'JS' },
  { id: 2, name: 'Sarah Williams', status: 'busy', unread: 3, avatar: 'SW' },
  { id: 3, name: 'Michael Johnson', status: 'offline', unread: 0, avatar: 'MJ' },
  { id: 4, name: 'Emily Davis', status: 'online', unread: 1, avatar: 'ED' },
  { id: 5, name: 'Robert Brown', status: 'away', unread: 0, avatar: 'RB' },
];

const groupChats = [
  { id: 1, name: 'UX Design Team', members: 5, unread: 2, avatar: 'UX' },
  { id: 2, name: 'Project Alpha', members: 7, unread: 0, avatar: 'PA' },
  { id: 3, name: 'Marketing', members: 4, unread: 6, avatar: 'MK' },
  { id: 4, name: 'Development', members: 8, unread: 0, avatar: 'DV' },
  { id: 5, name: 'Management', members: 3, unread: 1, avatar: 'MG' },
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [searchQuery, setSearchQuery] = useState('')
  
  // For styling
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green.500';
      case 'busy': return 'red.500';
      case 'away': return 'orange.500';
      case 'offline': return 'gray.500';
      default: return 'gray.500';
    }
  };
  
  // Filter chats based on search query
  const filteredPrivateChats = privateChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGroupChats = groupChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectChat = (id: number) => {
    setSelectedChat(id);
  };
  
  const currentChats = activeTab === 0 ? privateChats : groupChats;
  const currentChatDetails = currentChats.find(chat => chat.id === selectedChat);
  const isGroup = activeTab === 1;

  return (
    <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={6} h="100%">
      {/* Sidebar with chat list */}
      <Card bg={cardBg} shadow="md" borderRadius="lg" overflow="hidden" h="100%">
        <Flex direction="column" h="100%">
          <Box p={4} borderBottomWidth="1px" borderColor={borderColor}>
            <Heading size="md" mb={4}>Messages</Heading>
            
            <InputGroup size="md" mb={4}>
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={useColorModeValue('gray.50', 'gray.700')}
              />
              <InputRightElement>
                <Icon as={FiSearch} color="gray.500" />
              </InputRightElement>
            </InputGroup>
            
            <Tabs variant="soft-rounded" colorScheme="primary" size="sm" onChange={(index) => setActiveTab(index)}>
              <TabList>
                <Tab flex="1">Private</Tab>
                <Tab flex="1">Groups</Tab>
              </TabList>
            </Tabs>
          </Box>
          
          <Box overflowY="auto" flex="1">
            {activeTab === 0 ? (
              <Box>
                {filteredPrivateChats.map(chat => (
                  <Flex
                    key={chat.id}
                    align="center"
                    p={3}
                    cursor="pointer"
                    borderBottomWidth="1px"
                    borderColor={borderColor}
                    bg={selectedChat === chat.id ? 'primary.50' : undefined}
                    _hover={{ bg: selectedChat === chat.id ? 'primary.50' : hoverBg }}
                    onClick={() => handleSelectChat(chat.id)}
                  >
                    <Box position="relative">
                      <Avatar size="sm" name={chat.name} bg="primary.500" mr={3}>
                        {chat.avatar}
                      </Avatar>
                      <Box
                        w="10px"
                        h="10px"
                        bg={getStatusColor(chat.status)}
                        borderRadius="full"
                        position="absolute"
                        bottom="0"
                        right="2px"
                        borderWidth="1.5px"
                        borderColor={cardBg}
                      />
                    </Box>
                    
                    <Box flex="1">
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="medium" fontSize="sm">{chat.name}</Text>
                        {chat.unread > 0 && (
                          <Badge colorScheme="primary" borderRadius="full" fontSize="xs" px={2}>
                            {chat.unread}
                          </Badge>
                        )}
                      </Flex>
                      <Text fontSize="xs" color="gray.500">
                        {chat.status === 'online' ? 'Online' : 
                         chat.status === 'busy' ? 'Busy' : 
                         chat.status === 'away' ? 'Away' : 'Offline'}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Box>
            ) : (
              <Box>
                {filteredGroupChats.map(chat => (
                  <Flex
                    key={chat.id}
                    align="center"
                    p={3}
                    cursor="pointer"
                    borderBottomWidth="1px"
                    borderColor={borderColor}
                    bg={selectedChat === chat.id ? 'primary.50' : undefined}
                    _hover={{ bg: selectedChat === chat.id ? 'primary.50' : hoverBg }}
                    onClick={() => handleSelectChat(chat.id)}
                  >
                    <Avatar size="sm" name={chat.name} bg="secondary.500" mr={3}>
                      {chat.avatar}
                    </Avatar>
                    
                    <Box flex="1">
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="medium" fontSize="sm">{chat.name}</Text>
                        {chat.unread > 0 && (
                          <Badge colorScheme="primary" borderRadius="full" fontSize="xs" px={2}>
                            {chat.unread}
                          </Badge>
                        )}
                      </Flex>
                      <Text fontSize="xs" color="gray.500">
                        {chat.members} members
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Box>
            )}
            
            {/* New Chat Button */}
            <Flex 
              justify="center" 
              p={3} 
              borderTopWidth="1px" 
              borderColor={borderColor}
              position="sticky"
              bottom="0"
              bg={cardBg}
            >
              <Button 
                leftIcon={<FiPlusCircle />} 
                colorScheme="primary" 
                variant="outline" 
                size="sm"
                width="100%"
              >
                New {activeTab === 0 ? 'Conversation' : 'Group'}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Card>
      
      {/* Main chat area */}
      <Card bg={cardBg} shadow="md" borderRadius="lg" overflow="hidden" h="100%">
        {selectedChat ? (
          <Box h="100%">
            <ChatArea 
              isGroup={isGroup} 
              openMeetingDialog={() => setMeetingDialogOpen(true)} 
            />
          </Box>
        ) : (
          <Flex 
            justify="center" 
            align="center" 
            h="100%" 
            direction="column" 
            p={8}
            color="gray.500"
          >
            <Icon as={FiMessageCircle} fontSize="5xl" mb={4} />
            <Text fontSize="lg">Select a conversation to start chatting</Text>
          </Flex>
        )}
      </Card>
      
      {/* Meeting scheduler modal */}
      <Modal isOpen={meetingDialogOpen} onClose={() => setMeetingDialogOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <MeetingScheduler onClose={() => setMeetingDialogOpen(false)} />
        </ModalContent>
      </Modal>
    </Grid>
  )
}

export default Chat