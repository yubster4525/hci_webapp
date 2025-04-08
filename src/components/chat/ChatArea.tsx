import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Flex,
  Avatar,
  Text,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Icon,
  Badge,
  HStack,
  Tooltip,
  useColorModeValue,
  VStack,
  Divider,
} from '@chakra-ui/react'
import { FiSend, FiCalendar, FiPaperclip, FiVideo, FiMoreHorizontal } from 'react-icons/fi'

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  senderName: string;
  timestamp: string;
  read: boolean;
  priority?: 'high' | 'normal';
  mentions?: string[];
}

interface ChatAreaProps {
  isGroup: boolean;
  openMeetingDialog: () => void;
}

// Dummy data for chat messages
const privateMessages: Message[] = [
  {
    id: 1,
    text: 'Hi there! How\'s the project coming along?',
    sender: 'other',
    senderName: 'John Smith',
    timestamp: '10:30 AM',
    read: true,
    priority: 'normal'
  },
  {
    id: 2,
    text: 'Hello! We\'ve completed the initial wireframes and user research.',
    sender: 'user',
    senderName: 'Me',
    timestamp: '10:32 AM',
    read: true,
    priority: 'normal'
  },
  {
    id: 3,
    text: 'That\'s great! When can we review them?',
    sender: 'other',
    senderName: 'John Smith',
    timestamp: '10:33 AM',
    read: true,
    priority: 'normal'
  },
  {
    id: 4,
    text: 'How about tomorrow at 2 PM? I\'ll send a calendar invite.',
    sender: 'user',
    senderName: 'Me',
    timestamp: '10:35 AM',
    read: true,
    priority: 'normal'
  },
  {
    id: 5,
    text: 'Sounds good. Looking forward to seeing what you\'ve come up with!',
    sender: 'other',
    senderName: 'John Smith',
    timestamp: '10:36 AM',
    read: true,
    priority: 'normal'
  },
]

const groupMessages: Message[] = [
  {
    id: 1,
    text: 'Welcome everyone to the UX Design team chat!',
    sender: 'other',
    senderName: 'Sarah Williams',
    timestamp: '9:00 AM',
    read: true,
    priority: 'normal',
    mentions: ['everyone']
  },
  {
    id: 2,
    text: 'Thanks for setting this up, Sarah.',
    sender: 'other',
    senderName: 'John Smith',
    timestamp: '9:05 AM',
    read: true,
    priority: 'normal',
    mentions: ['Sarah Williams']
  },
  {
    id: 3,
    text: 'I\'ve uploaded the latest mockups to the shared drive.',
    sender: 'user',
    senderName: 'Me',
    timestamp: '9:10 AM',
    read: true,
    priority: 'high'
  },
  {
    id: 4,
    text: 'Great! I\'ll take a look and provide feedback by EOD.',
    sender: 'other',
    senderName: 'Michael Johnson',
    timestamp: '9:12 AM',
    read: true,
    priority: 'normal'
  },
  {
    id: 5,
    text: 'Don\'t forget we have a team meeting tomorrow @everyone',
    sender: 'other',
    senderName: 'Sarah Williams',
    timestamp: '9:15 AM',
    read: true,
    priority: 'high',
    mentions: ['everyone']
  },
]

const ChatArea: React.FC<ChatAreaProps> = ({ isGroup, openMeetingDialog }) => {
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<Message[]>(
    isGroup ? groupMessages : privateMessages
  )
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800')
  const userMessageBg = useColorModeValue('primary.500', 'primary.600')
  const otherMessageBg = useColorModeValue('gray.100', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const subtleText = useColorModeValue('gray.500', 'gray.400')
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])
  
  // Simulate typing
  useEffect(() => {
    if (isGroup) {
      // Simulate someone typing in group chat
      const typingTimeout = setTimeout(() => {
        setIsTyping(true)
        
        // Stop typing after 3 seconds
        setTimeout(() => {
          setIsTyping(false)
        }, 3000)
      }, 5000)
      
      return () => clearTimeout(typingTimeout)
    }
  }, [isGroup, chatMessages])

  const handleSendMessage = () => {
    if (message.trim() === '') return
    
    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
      senderName: 'Me',
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      read: true,
      priority: message.includes('urgent') || message.includes('important') ? 'high' : 'normal',
      mentions: findMentions(message)
    }
    
    setChatMessages([...chatMessages, newMessage])
    setMessage('')
  }
  
  // Extract mentions from message
  const findMentions = (text: string): string[] | undefined => {
    const mentionRegex = /@(\w+)/g
    const matches = text.match(mentionRegex)
    
    if (!matches) return undefined
    
    return matches.map(match => match.substring(1)) // Remove the @ symbol
  }
  
  // Highlight mentions in messages
  const highlightMentions = (text: string, mentions?: string[]): React.ReactNode => {
    if (!mentions || mentions.length === 0) return text
    
    const parts = []
    let lastIndex = 0
    
    for (const mention of mentions) {
      const mentionText = `@${mention}`
      const index = text.indexOf(mentionText, lastIndex)
      
      if (index === -1) continue
      
      // Add text before mention
      if (index > lastIndex) {
        parts.push(text.substring(lastIndex, index))
      }
      
      // Add highlighted mention
      parts.push(
        <Badge key={`${mention}-${index}`} colorScheme="primary" mx={1}>
          {mentionText}
        </Badge>
      )
      
      lastIndex = index + mentionText.length
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }
    
    return parts.length ? parts : text
  }

  return (
    <Flex direction="column" h="100%">
      {/* Chat header */}
      <Flex 
        align="center" 
        justify="space-between" 
        p={4} 
        borderBottomWidth="1px" 
        borderColor={borderColor}
      >
        <Flex align="center">
          <Avatar 
            size="sm" 
            name={isGroup ? 'UX Team' : 'John Smith'} 
            bg={isGroup ? 'secondary.500' : 'primary.500'} 
            mr={3} 
          />
          <Box>
            <Text fontWeight="medium">
              {isGroup ? 'UX Design Team' : 'John Smith'}
            </Text>
            <Text fontSize="xs" color={subtleText}>
              {isGroup ? '5 members' : 'Online'}
            </Text>
          </Box>
        </Flex>
        
        <HStack spacing={2}>
          <IconButton
            aria-label="Video call"
            icon={<FiVideo />}
            variant="ghost"
            size="sm"
            title="Video call"
          />
          <IconButton
            aria-label="Schedule meeting"
            icon={<FiCalendar />}
            variant="ghost"
            size="sm"
            onClick={openMeetingDialog}
            title="Schedule meeting"
          />
          <IconButton
            aria-label="More options"
            icon={<FiMoreHorizontal />}
            variant="ghost"
            size="sm"
            title="More options"
          />
        </HStack>
      </Flex>
      
      {/* Messages container */}
      <Box 
        flex="1" 
        overflow="auto" 
        p={4} 
        bg={useColorModeValue('gray.50', 'gray.900')} 
      >
        <VStack spacing={4} align="stretch">
          {chatMessages.map((msg) => (
            <Flex
              key={msg.id}
              justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
            >
              {msg.sender === 'other' && (
                <Avatar 
                  size="sm" 
                  name={msg.senderName} 
                  bg={isGroup ? 'secondary.500' : 'primary.500'}
                  mr={2}
                  alignSelf="flex-end"
                />
              )}
              
              <Box 
                maxW="75%" 
                bg={msg.sender === 'user' ? userMessageBg : otherMessageBg}
                color={msg.sender === 'user' ? 'white' : 'inherit'}
                p={3}
                borderRadius="lg"
                position="relative"
              >
                {msg.priority === 'high' && (
                  <Badge 
                    colorScheme="red" 
                    position="absolute" 
                    top="-8px" 
                    right="8px" 
                    borderRadius="full"
                    px={2}
                  >
                    Priority
                  </Badge>
                )}
                
                {isGroup && msg.sender === 'other' && (
                  <Text fontSize="xs" fontWeight="bold" mb={1} color={useColorModeValue('primary.700', 'primary.300')}>
                    {msg.senderName}
                  </Text>
                )}
                
                <Text>
                  {highlightMentions(msg.text, msg.mentions)}
                </Text>
                
                <Flex justify="flex-end" mt={1}>
                  <Text fontSize="xs" color={msg.sender === 'user' ? 'whiteAlpha.800' : 'gray.500'}>
                    {msg.timestamp}
                    {msg.sender === 'user' && msg.read && (
                      <Box as="span" ml={1} title="Read">
                        ✓
                      </Box>
                    )}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <Flex align="center" maxW="100px">
              <Avatar size="xs" name="Michael" bg="secondary.500" mr={2} />
              <Box 
                bg={otherMessageBg} 
                p={2} 
                borderRadius="lg"
              >
                <Flex>
                  <Box 
                    as="span" 
                    w={2} 
                    h={2} 
                    borderRadius="full" 
                    bg="gray.500" 
                    mr={1}
                    animation="bounce 1s infinite"
                  />
                  <Box 
                    as="span" 
                    w={2} 
                    h={2} 
                    borderRadius="full" 
                    bg="gray.500" 
                    mr={1}
                    animation="bounce 1s infinite 0.2s"
                  />
                  <Box 
                    as="span" 
                    w={2} 
                    h={2} 
                    borderRadius="full" 
                    bg="gray.500"
                    animation="bounce 1s infinite 0.4s"
                  />
                </Flex>
              </Box>
            </Flex>
          )}
          
          <div ref={messagesEndRef} />
        </VStack>
      </Box>
      
      {/* Input area */}
      <Box p={4} borderTopWidth="1px" borderColor={borderColor} bg={bgColor}>
        <InputGroup size="md">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
            pr="4.5rem"
            bg={useColorModeValue('gray.50', 'gray.700')}
          />
          <InputRightElement width="4.5rem">
            <HStack spacing={1}>
              <IconButton
                aria-label="Attach file"
                icon={<FiPaperclip />}
                variant="ghost"
                size="sm"
                color="gray.500"
              />
              <IconButton
                aria-label="Send message"
                icon={<FiSend />}
                size="sm"
                colorScheme="primary"
                variant="ghost"
                onClick={handleSendMessage}
                isDisabled={message.trim() === ''}
              />
            </HStack>
          </InputRightElement>
        </InputGroup>
        
        {isGroup && (
          <Text fontSize="xs" color={subtleText} mt={1}>
            Use @username to mention someone
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default ChatArea