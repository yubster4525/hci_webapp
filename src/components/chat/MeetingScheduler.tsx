import { useState } from 'react'
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Checkbox,
  Textarea,
  Grid,
  GridItem,
  VStack,
  HStack,
  Flex,
  Text,
  Badge,
  Divider,
  SimpleGrid,
  Avatar,
  CheckboxGroup,
  useColorModeValue,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Icon,
} from '@chakra-ui/react'
import { FiAlertCircle, FiInfo, FiVideo, FiUsers, FiCalendar, FiCheck } from 'react-icons/fi'

interface MeetingSchedulerProps {
  onClose: () => void
}

// Dummy data for meeting rooms
const meetingRooms = [
  { id: 1, name: 'Conference Room A', capacity: 20, status: 'available' },
  { id: 2, name: 'Conference Room B', capacity: 10, status: 'available' },
  { id: 3, name: 'Meeting Room 1', capacity: 6, status: 'available' },
  { id: 4, name: 'Meeting Room 2', capacity: 4, status: 'busy' },
  { id: 5, name: 'Brainstorming Space', capacity: 8, status: 'available' },
]

// Dummy data for team members
const teamMembers = [
  { id: 1, name: 'John Smith', department: 'Engineering', avatar: 'JS' },
  { id: 2, name: 'Sarah Williams', department: 'Design', avatar: 'SW' },
  { id: 3, name: 'Michael Johnson', department: 'Marketing', avatar: 'MJ' },
  { id: 4, name: 'Emily Davis', department: 'Product', avatar: 'ED' },
  { id: 5, name: 'Robert Brown', department: 'Engineering', avatar: 'RB' },
  { id: 6, name: 'Lisa Anderson', department: 'HR', avatar: 'LA' },
]

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ onClose }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [room, setRoom] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [isVirtual, setIsVirtual] = useState(false)
  const [agenda, setAgenda] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringFrequency, setRecurringFrequency] = useState('weekly')
  
  // Color mode values
  const bgCard = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const inactiveCardBg = useColorModeValue('gray.50', 'gray.600')
  const disabledCardBg = useColorModeValue('gray.100', 'gray.700')
  
  const handleSelectMember = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId))
    } else {
      setSelectedMembers([...selectedMembers, memberId])
    }
  }

  const handleSchedule = () => {
    // In a real app, this would send data to backend
    console.log({
      title,
      date,
      startTime,
      endTime,
      room,
      selectedMembers,
      isVirtual,
      agenda,
      isRecurring,
      recurringFrequency
    })
    
    // Show success message (in a real app)
    onClose()
  }

  const isFormValid = () => {
    return (
      title.trim() !== '' && 
      date !== '' && 
      startTime !== '' && 
      endTime !== '' && 
      (isVirtual || room !== '') && 
      selectedMembers.length > 0
    )
  }
  
  // Filter available rooms
  const availableRooms = meetingRooms.filter(room => room.status === 'available')

  return (
    <>
      <ModalHeader>
        <Flex align="center">
          <Icon as={FiCalendar} mr={2} color="primary.500" />
          <Heading size="md">Schedule a Meeting</Heading>
        </Flex>
        <ModalCloseButton />
      </ModalHeader>
      
      <ModalBody>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel htmlFor="meeting-title">Meeting Title</FormLabel>
            <Input
              id="meeting-title"
              placeholder="Enter meeting title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="meeting-date">Date</FormLabel>
              <Input
                id="meeting-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel htmlFor="start-time">Start Time</FormLabel>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel htmlFor="end-time">End Time</FormLabel>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
          </Grid>
          
          <Flex>
            <Checkbox 
              isChecked={isRecurring} 
              onChange={(e) => setIsRecurring(e.target.checked)}
              colorScheme="primary"
              mr={4}
            >
              Recurring meeting
            </Checkbox>
            
            {isRecurring && (
              <Select 
                value={recurringFrequency} 
                onChange={(e) => setRecurringFrequency(e.target.value)}
                w="150px"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
            )}
          </Flex>
          
          <Flex direction="column">
            <FormControl mb={4}>
              <Flex align="center" mb={2}>
                <Checkbox 
                  isChecked={isVirtual} 
                  onChange={(e) => setIsVirtual(e.target.checked)}
                  colorScheme="primary"
                  mr={2}
                >
                  <Flex align="center">
                    <Icon as={FiVideo} mr={2} />
                    Virtual Meeting
                  </Flex>
                </Checkbox>
              </Flex>
            </FormControl>
            
            {!isVirtual && (
              <FormControl isRequired={!isVirtual}>
                <FormLabel>Select Meeting Room</FormLabel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {meetingRooms.map((meetingRoom) => (
                    <Box
                      key={meetingRoom.id}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={room === meetingRoom.id.toString() ? 'primary.500' : borderColor}
                      bg={
                        meetingRoom.status !== 'available' 
                          ? disabledCardBg 
                          : room === meetingRoom.id.toString() 
                            ? 'primary.50' 
                            : inactiveCardBg
                      }
                      cursor={meetingRoom.status === 'available' ? 'pointer' : 'not-allowed'}
                      onClick={() => {
                        if (meetingRoom.status === 'available') {
                          setRoom(meetingRoom.id.toString())
                        }
                      }}
                      opacity={meetingRoom.status !== 'available' ? 0.6 : 1}
                      position="relative"
                    >
                      {room === meetingRoom.id.toString() && (
                        <Icon 
                          as={FiCheck} 
                          position="absolute" 
                          top={2} 
                          right={2} 
                          color="primary.500" 
                          bg="white" 
                          borderRadius="full"
                        />
                      )}
                      
                      <Text fontWeight="medium">{meetingRoom.name}</Text>
                      <Flex justify="space-between" align="center" mt={1}>
                        <Badge>{meetingRoom.capacity} seats</Badge>
                        {meetingRoom.status !== 'available' && (
                          <Badge colorScheme="red">Unavailable</Badge>
                        )}
                      </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
              </FormControl>
            )}
          </Flex>
          
          <FormControl isRequired>
            <FormLabel>
              <Flex align="center">
                <Icon as={FiUsers} mr={2} />
                Participants
              </Flex>
            </FormLabel>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
              {teamMembers.map((member) => (
                <Flex
                  key={member.id}
                  p={2}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor={selectedMembers.includes(member.id.toString()) ? 'primary.500' : borderColor}
                  bg={selectedMembers.includes(member.id.toString()) ? 'primary.50' : bgCard}
                  cursor="pointer"
                  onClick={() => handleSelectMember(member.id.toString())}
                  align="center"
                >
                  <Checkbox
                    isChecked={selectedMembers.includes(member.id.toString())}
                    onChange={() => handleSelectMember(member.id.toString())}
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
          
          <FormControl>
            <FormLabel htmlFor="agenda">Agenda</FormLabel>
            <Textarea
              id="agenda"
              placeholder="Enter meeting agenda (optional)"
              rows={4}
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
            />
          </FormControl>
        </VStack>
      </ModalBody>
      
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button
          colorScheme="primary"
          onClick={handleSchedule}
          isDisabled={!isFormValid()}
          leftIcon={<FiCalendar />}
        >
          Schedule Meeting
        </Button>
      </ModalFooter>
    </>
  )
}

export default MeetingScheduler