import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Badge,
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  ListIcon,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { FiCheckCircle, FiAlertCircle, FiCalendar, FiList, FiMessageSquare, FiSend, FiCpu, FiClock, FiTrendingUp, FiBell, FiBarChart2 } from 'react-icons/fi';

// Mock API function for getting AI assistant responses
const getAIResponse = async (message: string): Promise<{
  response: string;
  actionItems?: string[];
  summary?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  reminders?: Array<{text: string; due: string}>;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Detect intent in message
  if (message.toLowerCase().includes('summarize')) {
    return {
      response: "Here's a summary of the recent discussion:",
      summary: "The team discussed the new dashboard design. Alex suggested adding a heat map for resource allocation, which was well-received. Sarah raised concerns about accessibility, and the team agreed to address those in the next iteration. Timeline for completion is set for next Friday.",
      actionItems: [
        "Add resource allocation heat map to dashboard",
        "Conduct accessibility review of current design",
        "Update timeline in project management tool",
      ]
    };
  } else if (message.toLowerCase().includes('remind')) {
    return {
      response: "I've set these reminders for you:",
      reminders: [
        { text: "Team meeting", due: "Today at 2:00 PM" },
        { text: "Dashboard design deadline", due: "Friday at 5:00 PM" },
        { text: "Submit weekly report", due: "Tomorrow at 10:00 AM" },
      ]
    };
  } else if (message.toLowerCase().includes('sentiment') || message.toLowerCase().includes('morale')) {
    return {
      response: "Based on recent conversations, I've analyzed team sentiment:",
      sentiment: 'positive',
      summary: "Team morale appears positive with a 15% improvement since last week. Most discussions are solution-oriented, and there's a collaborative tone in project channels. There was some stress noted around the upcoming deadline, but overall engagement remains high."
    };
  } else {
    return {
      response: "I'm your AI assistant. I can help summarize discussions, set reminders, analyze team sentiment, and suggest action items. Just let me know what you need!",
    };
  }
};

interface AIAssistantProps {
  isOpen?: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen = false }) => {
  const { isOpen: drawerOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: isOpen });
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Array<{
    id: number;
    type: 'user' | 'assistant';
    text: string;
    summary?: string;
    actionItems?: string[];
    reminders?: Array<{text: string; due: string}>;
    sentiment?: 'positive' | 'neutral' | 'negative';
    timestamp: Date;
  }>>([
    {
      id: 1,
      type: 'assistant',
      text: "Hello! I'm your AI assistant. I can help summarize discussions, create reminders, analyze team sentiment, and suggest action items. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Automatically scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to history
    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      text: message,
      timestamp: new Date(),
    };
    
    setHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsProcessing(true);
    
    try {
      // Get AI response
      const aiResponse = await getAIResponse(userMessage.text);
      
      // Add AI response to history
      setHistory(prev => [...prev, {
        id: Date.now(),
        type: 'assistant',
        text: aiResponse.response,
        summary: aiResponse.summary,
        actionItems: aiResponse.actionItems,
        reminders: aiResponse.reminders,
        sentiment: aiResponse.sentiment,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setHistory(prev => [...prev, {
        id: Date.now(),
        type: 'assistant',
        text: "I'm sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getSentimentColor = (sentiment?: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return 'green.500';
      case 'negative':
        return 'red.500';
      case 'neutral':
      default:
        return 'gray.500';
    }
  };
  
  const getSentimentIcon = (sentiment?: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return FiTrendingUp;
      case 'negative':
        return FiAlertCircle;
      case 'neutral':
      default:
        return FiBarChart2;
    }
  };
  
  // Format conversation for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      <Box
        position="fixed"
        bottom="80px"
        right="20px"
        zIndex={1000}
      >
        <Button
          colorScheme="primary"
          size="md"
          borderRadius="full"
          boxShadow="lg"
          onClick={onOpen}
          title="Open AI Assistant"
        >
          <Icon as={FiCpu} boxSize={5} />
        </Button>
      </Box>
      
      <Drawer
        isOpen={drawerOpen}
        placement="right"
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center">
              <Icon as={FiCpu} mr={2} color="primary.500" />
              <Text>AI Assistant</Text>
            </Flex>
          </DrawerHeader>
          
          <DrawerBody p={0}>
            <VStack spacing={0} align="stretch" height="100%">
              {/* Message History */}
              <Box 
                flex="1" 
                p={4} 
                overflowY="auto" 
                bg={useColorModeValue('gray.50', 'gray.900')}
              >
                {history.map((item) => (
                  <Box
                    key={item.id}
                    mb={4}
                    alignSelf={item.type === 'user' ? 'flex-end' : 'flex-start'}
                    maxW="90%"
                    ml={item.type === 'user' ? 'auto' : 0}
                    mr={item.type === 'assistant' ? 'auto' : 0}
                  >
                    <Box
                      bg={item.type === 'user' ? 'primary.500' : bgColor}
                      color={item.type === 'user' ? 'white' : 'inherit'}
                      p={3}
                      borderRadius="lg"
                      boxShadow="sm"
                      borderWidth={item.type === 'assistant' ? '1px' : 0}
                      borderColor={borderColor}
                    >
                      <Text>{item.text}</Text>
                      
                      {/* Summary section */}
                      {item.summary && (
                        <Box mt={2} p={2} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                          <Flex align="center" mb={1}>
                            <Icon as={FiMessageSquare} mr={2} color="blue.500" />
                            <Text fontWeight="bold" fontSize="sm">Discussion Summary</Text>
                          </Flex>
                          <Text fontSize="sm">{item.summary}</Text>
                        </Box>
                      )}
                      
                      {/* Action items */}
                      {item.actionItems && item.actionItems.length > 0 && (
                        <Box mt={2} p={2} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                          <Flex align="center" mb={1}>
                            <Icon as={FiList} mr={2} color="green.500" />
                            <Text fontWeight="bold" fontSize="sm">Action Items</Text>
                          </Flex>
                          <List spacing={1}>
                            {item.actionItems.map((action, index) => (
                              <ListItem key={index} fontSize="sm">
                                <ListIcon as={FiCheckCircle} color="green.500" />
                                {action}
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                      
                      {/* Reminders */}
                      {item.reminders && item.reminders.length > 0 && (
                        <Box mt={2} p={2} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                          <Flex align="center" mb={1}>
                            <Icon as={FiBell} mr={2} color="purple.500" />
                            <Text fontWeight="bold" fontSize="sm">Reminders</Text>
                          </Flex>
                          <List spacing={1}>
                            {item.reminders.map((reminder, index) => (
                              <ListItem key={index} fontSize="sm">
                                <Flex justify="space-between" align="center">
                                  <HStack>
                                    <ListIcon as={FiClock} color="purple.500" />
                                    <Text>{reminder.text}</Text>
                                  </HStack>
                                  <Badge colorScheme="purple" ml={2}>{reminder.due}</Badge>
                                </Flex>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                      
                      {/* Sentiment Analysis */}
                      {item.sentiment && (
                        <Box mt={2} p={2} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                          <Flex align="center" mb={1}>
                            <Icon 
                              as={getSentimentIcon(item.sentiment)} 
                              mr={2} 
                              color={getSentimentColor(item.sentiment)} 
                            />
                            <Text fontWeight="bold" fontSize="sm">Team Sentiment</Text>
                          </Flex>
                          <Flex align="center">
                            <Box 
                              height="10px" 
                              width="100%" 
                              bg="gray.200" 
                              borderRadius="full"
                              overflow="hidden"
                            >
                              <Box 
                                height="100%" 
                                width={item.sentiment === 'positive' ? '75%' : 
                                       item.sentiment === 'neutral' ? '50%' : '25%'} 
                                bg={getSentimentColor(item.sentiment)}
                                borderRadius="full"
                              />
                            </Box>
                            <Text ml={2} fontWeight="medium" fontSize="sm" color={getSentimentColor(item.sentiment)}>
                              {item.sentiment === 'positive' ? 'Positive' : 
                               item.sentiment === 'neutral' ? 'Neutral' : 'Needs Attention'}
                            </Text>
                          </Flex>
                        </Box>
                      )}
                    </Box>
                    <Text fontSize="xs" color="gray.500" mt={1} textAlign={item.type === 'user' ? 'right' : 'left'}>
                      {formatTime(item.timestamp)}
                    </Text>
                  </Box>
                ))}
                
                {/* Loading indicator */}
                {isProcessing && (
                  <Flex align="center" mb={4}>
                    <Box
                      bg={bgColor}
                      p={3}
                      borderRadius="lg"
                      boxShadow="sm"
                      borderWidth="1px"
                      borderColor={borderColor}
                    >
                      <Flex align="center">
                        <Spinner size="sm" color="primary.500" mr={2} />
                        <Text>Processing your request...</Text>
                      </Flex>
                    </Box>
                  </Flex>
                )}
                
                <div ref={messagesEndRef} />
              </Box>
              
              {/* Quick actions */}
              <Box p={2} borderTopWidth="1px" borderColor={borderColor}>
                <Flex overflowX="auto" pb={2} gap={2}>
                  <Button size="sm" leftIcon={<FiMessageSquare />} onClick={() => setMessage("Summarize the recent discussion")}>
                    Summarize Discussion
                  </Button>
                  <Button size="sm" leftIcon={<FiClock />} onClick={() => setMessage("Remind me of my upcoming tasks")}>
                    Show Reminders
                  </Button>
                  <Button size="sm" leftIcon={<FiBarChart2 />} onClick={() => setMessage("Analyze team sentiment")}>
                    Sentiment Analysis
                  </Button>
                </Flex>
              </Box>
              
              {/* Message input */}
              <Box p={4} borderTopWidth="1px" borderColor={borderColor}>
                <InputGroup>
                  <Input
                    placeholder="Ask me anything..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    disabled={isProcessing}
                  />
                  <InputRightElement>
                    <Button
                      aria-label="Send message"
                      icon={<FiSend />}
                      size="sm"
                      colorScheme="primary"
                      variant="ghost"
                      onClick={handleSendMessage}
                      isLoading={isProcessing}
                      disabled={!message.trim() || isProcessing}
                    >
                      <FiSend />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Try asking for meeting summaries, reminders, or sentiment analysis
                </Text>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AIAssistant;