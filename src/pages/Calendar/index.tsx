import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  VStack,
  HStack,
  useColorModeValue,
  Badge,
  Avatar,
  SimpleGrid,
  Card,
} from '@chakra-ui/react';
import { 
  FiPlus, 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiFilter, 
  FiMap,
  FiVideoOff,
  FiVideo
} from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';

import CalendarView from '../../components/calendar/CalendarView';

// Mock team members data
const teamMembers = [
  { id: 1, name: 'John Smith', department: 'Engineering', avatar: 'JS' },
  { id: 2, name: 'Sarah Williams', department: 'Design', avatar: 'SW' },
  { id: 3, name: 'Michael Johnson', department: 'Marketing', avatar: 'MJ' },
  { id: 4, name: 'Emily Davis', department: 'Product', avatar: 'ED' },
  { id: 5, name: 'Robert Brown', department: 'Engineering', avatar: 'RB' },
  { id: 6, name: 'Lisa Anderson', department: 'HR', avatar: 'LA' },
];

// Mock meeting rooms
const meetingRooms = [
  { id: 1, name: 'Conference Room A', capacity: 20, status: 'available' },
  { id: 2, name: 'Conference Room B', capacity: 10, status: 'available' },
  { id: 3, name: 'Meeting Room 1', capacity: 6, status: 'available' },
  { id: 4, name: 'Meeting Room 2', capacity: 4, status: 'busy' },
  { id: 5, name: 'Brainstorming Space', capacity: 8, status: 'available' },
];

// Mock initial calendar events
const initialEvents: EventInput[] = [
  {
    id: uuidv4(),
    title: 'Weekly Team Meeting',
    start: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    end: new Date(new Date().setDate(new Date().getDate() - 2)).setHours(new Date().getHours() + 1),
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
    extendedProps: {
      isVirtual: true,
      attendees: [1, 2, 3, 4],
      description: 'Weekly team sync-up meeting'
    }
  },
  {
    id: uuidv4(),
    title: 'Product Review',
    start: new Date().toISOString(),
    end: new Date(new Date().setHours(new Date().getHours() + 2)).toISOString(),
    backgroundColor: '#38A169',
    borderColor: '#38A169',
    extendedProps: {
      isVirtual: false,
      room: 1,
      attendees: [1, 2, 5],
      description: 'Review product roadmap and upcoming features'
    }
  },
  {
    id: uuidv4(),
    title: 'Design Workshop',
    start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 3),
    backgroundColor: '#805AD5',
    borderColor: '#805AD5',
    extendedProps: {
      isVirtual: false,
      room: 5,
      attendees: [2, 3, 6],
      description: 'Workshop to finalize new UI components'
    }
  },
  {
    id: uuidv4(),
    title: 'Client Meeting',
    start: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    end: new Date(new Date().setDate(new Date().getDate() + 3)).setHours(new Date().getHours() + 1),
    backgroundColor: '#DD6B20',
    borderColor: '#DD6B20',
    extendedProps: {
      isVirtual: true,
      attendees: [1, 4, 5],
      description: 'Meeting with client to discuss project progress'
    }
  }
];

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<EventInput> & { title: string; isVirtual: boolean; roomId?: string; attendees: string[] }>({
    title: '',
    start: '',
    end: '',
    backgroundColor: '#4299E1',
    isVirtual: false,
    attendees: [],
  });
  
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
  
  // Color mode values
  const bgCard = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    onCreateModalOpen();
    
    // Set default values for new event
    setNewEvent({
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      backgroundColor: '#4299E1',
      isVirtual: false,
      attendees: [],
    });
  };
  
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event);
    onViewModalOpen();
  };
  
  const handleCreateEvent = () => {
    if (newEvent.title.trim() === '') return;
    
    const createdEvent: EventInput = {
      id: uuidv4(),
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      backgroundColor: newEvent.backgroundColor,
      borderColor: newEvent.backgroundColor,
      extendedProps: {
        isVirtual: newEvent.isVirtual,
        room: newEvent.isVirtual ? undefined : Number(newEvent.roomId),
        attendees: newEvent.attendees.map(id => Number(id)),
        description: 'New meeting'
      }
    };
    
    setEvents([...events, createdEvent]);
    onCreateModalClose();
  };
  
  const getEventColor = (type: string) => {
    const colors = {
      'team': '#4299E1',
      'product': '#38A169',
      'design': '#805AD5',
      'client': '#DD6B20',
      'default': '#718096'
    };
    
    return colors[type as keyof typeof colors] || colors.default;
  };
  
  const handleSelectEventType = (type: string) => {
    setNewEvent({
      ...newEvent,
      backgroundColor: getEventColor(type),
    });
  };
  
  const handleToggleVirtual = () => {
    setNewEvent({
      ...newEvent,
      isVirtual: !newEvent.isVirtual,
      roomId: newEvent.isVirtual ? undefined : newEvent.roomId,
    });
  };
  
  const handleSelectRoom = (roomId: string) => {
    setNewEvent({
      ...newEvent,
      roomId,
    });
  };
  
  const handleToggleAttendee = (attendeeId: string) => {
    const attendees = [...newEvent.attendees];
    
    if (attendees.includes(attendeeId)) {
      setNewEvent({
        ...newEvent,
        attendees: attendees.filter(id => id !== attendeeId),
      });
    } else {
      setNewEvent({
        ...newEvent,
        attendees: [...attendees, attendeeId],
      });
    }
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
          <Heading size="lg" mb={1}>Calendar</Heading>
          <Text color="gray.500">Manage meetings, events, and appointments</Text>
        </Box>
        
        <Button 
          leftIcon={<FiPlus />} 
          colorScheme="primary"
          onClick={onCreateModalOpen}
        >
          Add Event
        </Button>
      </Flex>
      
      <Grid gridTemplateColumns={{ base: "1fr", lg: "1fr auto" }} gap={6} h="calc(80vh - 100px)">
        <CalendarView 
          events={events}
          onEventClick={handleEventClick}
          onDateSelect={handleDateSelect}
        />
        
        <Card 
          width={{ base: "100%", lg: "300px" }} 
          bg={bgCard}
          shadow="md"
          borderRadius="lg"
          p={4}
          borderWidth="1px"
          borderColor={borderColor}
          height="fit-content"
        >
          <VStack align="stretch" spacing={4}>
            <Heading size="md" mb={2}>Upcoming Events</Heading>
            
            {events
              .filter(event => new Date(event.start as string) >= new Date())
              .sort((a, b) => new Date(a.start as string).getTime() - new Date(b.start as string).getTime())
              .slice(0, 5)
              .map((event, index) => (
                <Box 
                  key={event.id}
                  p={3}
                  borderRadius="md"
                  borderLeftWidth="4px"
                  borderLeftColor={event.backgroundColor as string}
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                  cursor="pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    onViewModalOpen();
                  }}
                >
                  <Flex align="center" mb={1}>
                    <Box color={event.backgroundColor as string} mr={2}>
                      {event.extendedProps?.isVirtual ? <FiVideo /> : <FiMap />}
                    </Box>
                    <Text fontWeight="medium">{event.title}</Text>
                  </Flex>
                  <Flex align="center" fontSize="sm" color="gray.500">
                    <FiCalendar size={12} />
                    <Text ml={1}>
                      {new Date(event.start as string).toLocaleDateString()} • {new Date(event.start as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </Flex>
                </Box>
              ))}
          </VStack>
        </Card>
      </Grid>
      
      {/* Create Event Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={onCreateModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input 
                  placeholder="Enter event title" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </FormControl>
              
              <HStack spacing={4}>
                <FormControl isRequired flex={1}>
                  <FormLabel>Start</FormLabel>
                  <Input 
                    type="datetime-local" 
                    value={newEvent.start ? new Date(newEvent.start).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                  />
                </FormControl>
                
                <FormControl isRequired flex={1}>
                  <FormLabel>End</FormLabel>
                  <Input 
                    type="datetime-local" 
                    value={newEvent.end ? new Date(newEvent.end as string).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                  />
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Event Type</FormLabel>
                <SimpleGrid columns={4} spacing={3}>
                  <Button 
                    size="sm" 
                    colorScheme="blue" 
                    variant={newEvent.backgroundColor === getEventColor('team') ? 'solid' : 'outline'}
                    onClick={() => handleSelectEventType('team')}
                  >
                    Team
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="green" 
                    variant={newEvent.backgroundColor === getEventColor('product') ? 'solid' : 'outline'}
                    onClick={() => handleSelectEventType('product')}
                  >
                    Product
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="purple" 
                    variant={newEvent.backgroundColor === getEventColor('design') ? 'solid' : 'outline'}
                    onClick={() => handleSelectEventType('design')}
                  >
                    Design
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="orange" 
                    variant={newEvent.backgroundColor === getEventColor('client') ? 'solid' : 'outline'}
                    onClick={() => handleSelectEventType('client')}
                  >
                    Client
                  </Button>
                </SimpleGrid>
              </FormControl>
              
              <FormControl>
                <Checkbox 
                  isChecked={newEvent.isVirtual}
                  onChange={handleToggleVirtual}
                  colorScheme="primary"
                >
                  <Flex align="center">
                    <Box mr={2}>
                      {newEvent.isVirtual ? <FiVideo /> : <FiVideoOff />}
                    </Box>
                    Virtual Meeting
                  </Flex>
                </Checkbox>
              </FormControl>
              
              {!newEvent.isVirtual && (
                <FormControl>
                  <FormLabel>Meeting Room</FormLabel>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {meetingRooms
                      .filter(room => room.status === 'available')
                      .map((room) => (
                        <Box
                          key={room.id}
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          borderColor={newEvent.roomId === room.id.toString() ? 'primary.500' : borderColor}
                          bg={newEvent.roomId === room.id.toString() ? 'primary.50' : useColorModeValue('gray.50', 'gray.700')}
                          cursor="pointer"
                          onClick={() => handleSelectRoom(room.id.toString())}
                        >
                          <Text fontWeight="medium">{room.name}</Text>
                          <Badge>{room.capacity} seats</Badge>
                        </Box>
                      ))}
                  </SimpleGrid>
                </FormControl>
              )}
              
              <FormControl>
                <FormLabel>Attendees</FormLabel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {teamMembers.map((member) => (
                    <Flex
                      key={member.id}
                      p={2}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={newEvent.attendees.includes(member.id.toString()) ? 'primary.500' : borderColor}
                      bg={newEvent.attendees.includes(member.id.toString()) ? 'primary.50' : useColorModeValue('gray.50', 'gray.700')}
                      cursor="pointer"
                      onClick={() => handleToggleAttendee(member.id.toString())}
                      align="center"
                    >
                      <Checkbox
                        isChecked={newEvent.attendees.includes(member.id.toString())}
                        onChange={() => handleToggleAttendee(member.id.toString())}
                        colorScheme="primary"
                        mr={2}
                      />
                      <Avatar size="xs" name={member.name} bg="primary.500" mr={2}>
                        {member.avatar}
                      </Avatar>
                      <Box>
                        <Text fontSize="sm" fontWeight="medium">{member.name}</Text>
                        <Text fontSize="xs" color="gray.500">{member.department}</Text>
                      </Box>
                    </Flex>
                  ))}
                </SimpleGrid>
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCreateModalClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="primary" 
              onClick={handleCreateEvent}
              isDisabled={!newEvent.title || !newEvent.start || !newEvent.end}
            >
              Create Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* View Event Modal */}
      {selectedEvent && (
        <Modal isOpen={isViewModalOpen} onClose={onViewModalClose} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Flex align="center">
                <Box 
                  w={4} 
                  h={4} 
                  borderRadius="full" 
                  bg={selectedEvent.backgroundColor as string} 
                  mr={2} 
                />
                {selectedEvent.title}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Flex align="center">
                  <Box color="gray.500" mr={3}>
                    <FiCalendar />
                  </Box>
                  <Box>
                    <Text fontWeight="medium">Date & Time</Text>
                    <Text color="gray.600">
                      {new Date(selectedEvent.start as string).toLocaleDateString()} • {new Date(selectedEvent.start as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(selectedEvent.end as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </Box>
                </Flex>
                
                <Flex align="center">
                  <Box color="gray.500" mr={3}>
                    {selectedEvent.extendedProps?.isVirtual ? <FiVideo /> : <FiMap />}
                  </Box>
                  <Box>
                    <Text fontWeight="medium">Location</Text>
                    <Text color="gray.600">
                      {selectedEvent.extendedProps?.isVirtual 
                        ? 'Virtual Meeting' 
                        : `${meetingRooms.find(r => r.id === selectedEvent.extendedProps?.room)?.name || 'Unknown Room'}`}
                    </Text>
                  </Box>
                </Flex>
                
                <Flex align="flex-start">
                  <Box color="gray.500" mr={3} mt={1}>
                    <FiUsers />
                  </Box>
                  <Box flex={1}>
                    <Text fontWeight="medium" mb={2}>Attendees</Text>
                    <SimpleGrid columns={2} spacing={2}>
                      {selectedEvent.extendedProps?.attendees?.map((attendeeId: number) => {
                        const attendee = teamMembers.find(m => m.id === attendeeId);
                        return attendee ? (
                          <Flex key={attendee.id} align="center">
                            <Avatar size="xs" name={attendee.name} bg="primary.500" mr={2}>
                              {attendee.avatar}
                            </Avatar>
                            <Text fontSize="sm">{attendee.name}</Text>
                          </Flex>
                        ) : null;
                      })}
                    </SimpleGrid>
                  </Box>
                </Flex>
                
                {selectedEvent.extendedProps?.description && (
                  <Box>
                    <Text fontWeight="medium" mb={1}>Description</Text>
                    <Text color="gray.600">{selectedEvent.extendedProps.description}</Text>
                  </Box>
                )}
              </VStack>
            </ModalBody>
            
            <ModalFooter>
              <Button colorScheme="primary" mr={3} onClick={onViewModalClose}>
                Close
              </Button>
              <Button variant="outline" colorScheme="red">
                Delete Event
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default CalendarPage;