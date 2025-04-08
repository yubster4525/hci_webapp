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
  Textarea,
  VStack,
  HStack,
  Badge,
  Avatar,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Progress,
  Card,
  Divider,
  Checkbox,
} from '@chakra-ui/react';
import { 
  FiPlus, 
  FiFilter, 
  FiSearch, 
  FiCalendar, 
  FiUsers, 
  FiTag, 
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiList,
  FiClipboard,
  FiBarChart2
} from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';

import TaskCard, { Task } from '../../components/tasks/TaskCard';

// Mock team members data
const teamMembers = [
  { id: 1, name: 'John Smith', department: 'Engineering', avatar: 'JS' },
  { id: 2, name: 'Sarah Williams', department: 'Design', avatar: 'SW' },
  { id: 3, name: 'Michael Johnson', department: 'Marketing', avatar: 'MJ' },
  { id: 4, name: 'Emily Davis', department: 'Product', avatar: 'ED' },
  { id: 5, name: 'Robert Brown', department: 'Engineering', avatar: 'RB' },
  { id: 6, name: 'Lisa Anderson', department: 'HR', avatar: 'LA' },
];

// Mock initial tasks
const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Implement Dashboard Components',
    description: 'Create React components for the analytics dashboard including charts and filters',
    status: 'in_progress',
    priority: 'high',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    category: 'Development',
    progress: 60,
    assignees: [teamMembers[0], teamMembers[4]],
  },
  {
    id: uuidv4(),
    title: 'Design UI/UX for Mobile App',
    description: 'Create wireframes and high-fidelity designs for the mobile application',
    status: 'review',
    priority: 'medium',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    category: 'Design',
    progress: 90,
    assignees: [teamMembers[1]],
  },
  {
    id: uuidv4(),
    title: 'Fix Authentication Bug',
    description: 'Resolve the issue with user authentication that occurs during login',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    category: 'Bug Fix',
    progress: 0,
    assignees: [teamMembers[0], teamMembers[2], teamMembers[4]],
  },
  {
    id: uuidv4(),
    title: 'Create Marketing Content',
    description: 'Develop marketing materials for the product launch campaign',
    status: 'done',
    priority: 'medium',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    category: 'Marketing',
    progress: 100,
    assignees: [teamMembers[2], teamMembers[5]],
  },
  {
    id: uuidv4(),
    title: 'User Testing Session',
    description: 'Organize and conduct user testing sessions for the new features',
    status: 'in_progress',
    priority: 'low',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    category: 'Research',
    progress: 40,
    assignees: [teamMembers[1], teamMembers[3]],
  },
  {
    id: uuidv4(),
    title: 'Update Documentation',
    description: 'Update the API documentation with the new endpoints and parameters',
    status: 'todo',
    priority: 'low',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    category: 'Documentation',
    progress: 10,
    assignees: [teamMembers[0]],
  },
  {
    id: uuidv4(),
    title: 'Optimize Database Queries',
    description: 'Improve performance of database queries for the search functionality',
    status: 'review',
    priority: 'high',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    category: 'Development',
    progress: 80,
    assignees: [teamMembers[4]],
  },
  {
    id: uuidv4(),
    title: 'Prepare Quarterly Report',
    description: 'Compile and analyze project metrics for the quarterly stakeholder review',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    category: 'Management',
    progress: 0,
    assignees: [teamMembers[3], teamMembers[5]],
  },
];

const categories = ['All', 'Development', 'Design', 'Bug Fix', 'Marketing', 'Research', 'Documentation', 'Management'];

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    category: 'Development',
    progress: 0,
    assignees: [],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
  });
  
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
  
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const highlightBg = useColorModeValue('primary.50', 'primary.900');
  
  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus,
            progress: newStatus === 'done' ? 100 : task.progress 
          } 
        : task
    ));
  };
  
  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    onViewModalOpen();
  };
  
  const handleCreateTask = () => {
    if (!newTask.title) return;
    
    const createdTask: Task = {
      id: uuidv4(),
      title: newTask.title as string,
      description: newTask.description || '',
      status: newTask.status as Task['status'],
      priority: newTask.priority as Task['priority'],
      dueDate: newTask.dueDate as string,
      category: newTask.category as string,
      progress: newTask.status === 'done' ? 100 : (newTask.progress || 0),
      assignees: newTask.assignees as Task['assignees'] || [],
    };
    
    setTasks([...tasks, createdTask]);
    onCreateModalClose();
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      category: 'Development',
      progress: 0,
      assignees: [],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    });
  };
  
  const handleToggleAssignee = (member: typeof teamMembers[0]) => {
    const currentAssignees = newTask.assignees as Task['assignees'] || [];
    const assigneeExists = currentAssignees.some(a => a.id === member.id);
    
    if (assigneeExists) {
      setNewTask({
        ...newTask,
        assignees: currentAssignees.filter(a => a.id !== member.id),
      });
    } else {
      setNewTask({
        ...newTask,
        assignees: [...currentAssignees, member],
      });
    }
  };
  
  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });
  
  // Group tasks by status for board view
  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    in_progress: filteredTasks.filter(task => task.status === 'in_progress'),
    review: filteredTasks.filter(task => task.status === 'review'),
    done: filteredTasks.filter(task => task.status === 'done'),
  };
  
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const overdueTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now && task.status !== 'done';
  }).length;
  
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
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
          <Heading size="lg" mb={1}>Tasks</Heading>
          <Text color="gray.500">Manage and track your team's work</Text>
        </Box>
        
        <Button 
          leftIcon={<FiPlus />} 
          colorScheme="primary"
          onClick={onCreateModalOpen}
        >
          Add Task
        </Button>
      </Flex>
      
      {/* Task Statistics */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={6}>
        <Card bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <Flex align="center" mb={2}>
            <Box p={2} borderRadius="md" bg="blue.50" color="blue.500" mr={3}>
              <FiClipboard size={20} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Total Tasks</Text>
              <Text fontSize="2xl" fontWeight="bold">{totalTasks}</Text>
            </Box>
          </Flex>
          <Progress value={100} size="sm" colorScheme="blue" borderRadius="full" />
        </Card>
        
        <Card bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <Flex align="center" mb={2}>
            <Box p={2} borderRadius="md" bg="green.50" color="green.500" mr={3}>
              <FiCheckCircle size={20} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Completed</Text>
              <Text fontSize="2xl" fontWeight="bold">{completedTasks}</Text>
            </Box>
          </Flex>
          <Progress value={completionRate} size="sm" colorScheme="green" borderRadius="full" />
        </Card>
        
        <Card bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <Flex align="center" mb={2}>
            <Box p={2} borderRadius="md" bg="purple.50" color="purple.500" mr={3}>
              <FiBarChart2 size={20} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">In Progress</Text>
              <Text fontSize="2xl" fontWeight="bold">{inProgressTasks}</Text>
            </Box>
          </Flex>
          <Progress value={(inProgressTasks / totalTasks) * 100} size="sm" colorScheme="purple" borderRadius="full" />
        </Card>
        
        <Card bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <Flex align="center" mb={2}>
            <Box p={2} borderRadius="md" bg="red.50" color="red.500" mr={3}>
              <FiAlertTriangle size={20} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Overdue</Text>
              <Text fontSize="2xl" fontWeight="bold">{overdueTasks}</Text>
            </Box>
          </Flex>
          <Progress value={(overdueTasks / totalTasks) * 100} size="sm" colorScheme="red" borderRadius="full" />
        </Card>
      </SimpleGrid>
      
      {/* Filters */}
      <Flex 
        mb={6} 
        p={4} 
        bg={cardBg}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        shadow="sm"
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        align={{ base: 'stretch', md: 'center' }}
      >
        <InputGroup flex={{ base: 1, md: 2 }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        
        <Select 
          placeholder="Status: All" 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          flex={1}
          maxW={{ base: '100%', md: '180px' }}
          icon={<FiFilter />}
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="review">In Review</option>
          <option value="done">Done</option>
        </Select>
        
        <Select 
          placeholder="Priority: All" 
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          flex={1}
          maxW={{ base: '100%', md: '180px' }}
          icon={<FiFilter />}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
        
        <Select 
          placeholder="Category: All" 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          flex={1}
          maxW={{ base: '100%', md: '180px' }}
          icon={<FiFilter />}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Select>
      </Flex>
      
      {/* Task Views */}
      <Tabs variant="enclosed" colorScheme="primary">
        <TabList>
          <Tab>List View</Tab>
          <Tab>Board View</Tab>
        </TabList>
        
        <TabPanels>
          {/* List View */}
          <TabPanel px={0}>
            <Box overflowX="auto">
              <Box 
                as="table" 
                width="100%" 
                borderWidth="1px" 
                borderColor={borderColor}
                borderRadius="lg"
                overflow="hidden"
              >
                <Box as="thead" bg={useColorModeValue('gray.50', 'gray.800')}>
                  <Box as="tr">
                    <Box as="th" px={4} py={3} textAlign="left">Task</Box>
                    <Box as="th" px={4} py={3} textAlign="left">Status</Box>
                    <Box as="th" px={4} py={3} textAlign="left">Priority</Box>
                    <Box as="th" px={4} py={3} textAlign="left">Category</Box>
                    <Box as="th" px={4} py={3} textAlign="left">Due Date</Box>
                    <Box as="th" px={4} py={3} textAlign="left">Assignees</Box>
                    <Box as="th" px={4} py={3} textAlign="left">Progress</Box>
                  </Box>
                </Box>
                
                <Box as="tbody">
                  {filteredTasks.length === 0 ? (
                    <Box as="tr">
                      <Box as="td" colSpan={7} textAlign="center" py={6}>
                        <Text color="gray.500">No tasks found matching your filters</Text>
                      </Box>
                    </Box>
                  ) : (
                    filteredTasks.map((task) => (
                      <Box 
                        as="tr" 
                        key={task.id}
                        _hover={{ bg: highlightBg }}
                        cursor="pointer"
                        onClick={() => handleViewTask(task)}
                        borderBottomWidth="1px"
                        borderColor={borderColor}
                      >
                        <Box as="td" px={4} py={3}>
                          <Text fontWeight="medium">{task.title}</Text>
                          <Text fontSize="sm" color="gray.500" noOfLines={1}>
                            {task.description}
                          </Text>
                        </Box>
                        
                        <Box as="td" px={4} py={3}>
                          <Badge 
                            colorScheme={
                              task.status === 'todo' ? 'gray' :
                              task.status === 'in_progress' ? 'blue' :
                              task.status === 'review' ? 'purple' : 'green'
                            }
                          >
                            {task.status === 'todo' ? 'To Do' :
                             task.status === 'in_progress' ? 'In Progress' :
                             task.status === 'review' ? 'In Review' : 'Done'}
                          </Badge>
                        </Box>
                        
                        <Box as="td" px={4} py={3}>
                          <Badge
                            colorScheme={
                              task.priority === 'high' ? 'red' :
                              task.priority === 'medium' ? 'orange' : 'green'
                            }
                          >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                        </Box>
                        
                        <Box as="td" px={4} py={3}>
                          <Badge variant="outline">{task.category}</Badge>
                        </Box>
                        
                        <Box as="td" px={4} py={3}>
                          <Flex align="center">
                            <FiCalendar size={12} style={{ marginRight: '6px' }} />
                            <Text fontSize="sm">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </Text>
                          </Flex>
                        </Box>
                        
                        <Box as="td" px={4} py={3}>
                          <HStack spacing={1}>
                            {task.assignees.map((assignee) => (
                              <Avatar 
                                key={assignee.id}
                                name={assignee.name} 
                                size="xs" 
                                bg="primary.500"
                                title={assignee.name}
                              >
                                {assignee.avatar}
                              </Avatar>
                            ))}
                          </HStack>
                        </Box>
                        
                        <Box as="td" px={4} py={3} width="150px">
                          <Flex align="center">
                            <Progress 
                              value={task.progress} 
                              size="sm" 
                              colorScheme={
                                task.status === 'todo' ? 'gray' :
                                task.status === 'in_progress' ? 'blue' :
                                task.status === 'review' ? 'purple' : 'green'
                              }
                              borderRadius="full" 
                              flex="1" 
                              mr={2}
                            />
                            <Text fontSize="xs" fontWeight="medium">{task.progress}%</Text>
                          </Flex>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            </Box>
          </TabPanel>
          
          {/* Board View */}
          <TabPanel px={0}>
            <Grid
              templateColumns="repeat(4, 1fr)"
              gap={6}
              overflowX={{ base: 'auto', xl: 'hidden' }}
              style={{ minWidth: '900px' }}
            >
              <Box>
                <Flex 
                  align="center" 
                  bg="gray.100" 
                  color="gray.700" 
                  p={3} 
                  borderRadius="md" 
                  mb={4}
                  fontWeight="medium"
                >
                  <FiList style={{ marginRight: '8px' }} />
                  To Do ({tasksByStatus.todo.length})
                </Flex>
                
                <VStack spacing={4} align="stretch">
                  {tasksByStatus.todo.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onViewTask={handleViewTask}
                    />
                  ))}
                  
                  {tasksByStatus.todo.length === 0 && (
                    <Box 
                      p={4} 
                      borderWidth="1px" 
                      borderStyle="dashed" 
                      borderColor={borderColor} 
                      borderRadius="md"
                      textAlign="center"
                    >
                      <Text color="gray.500" fontSize="sm">No tasks</Text>
                    </Box>
                  )}
                </VStack>
              </Box>
              
              <Box>
                <Flex 
                  align="center" 
                  bg="blue.100" 
                  color="blue.700" 
                  p={3} 
                  borderRadius="md" 
                  mb={4}
                  fontWeight="medium"
                >
                  <FiBarChart2 style={{ marginRight: '8px' }} />
                  In Progress ({tasksByStatus.in_progress.length})
                </Flex>
                
                <VStack spacing={4} align="stretch">
                  {tasksByStatus.in_progress.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onViewTask={handleViewTask}
                    />
                  ))}
                  
                  {tasksByStatus.in_progress.length === 0 && (
                    <Box 
                      p={4} 
                      borderWidth="1px" 
                      borderStyle="dashed" 
                      borderColor={borderColor} 
                      borderRadius="md"
                      textAlign="center"
                    >
                      <Text color="gray.500" fontSize="sm">No tasks</Text>
                    </Box>
                  )}
                </VStack>
              </Box>
              
              <Box>
                <Flex 
                  align="center" 
                  bg="purple.100" 
                  color="purple.700" 
                  p={3} 
                  borderRadius="md" 
                  mb={4}
                  fontWeight="medium"
                >
                  <FiSearch style={{ marginRight: '8px' }} />
                  In Review ({tasksByStatus.review.length})
                </Flex>
                
                <VStack spacing={4} align="stretch">
                  {tasksByStatus.review.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onViewTask={handleViewTask}
                    />
                  ))}
                  
                  {tasksByStatus.review.length === 0 && (
                    <Box 
                      p={4} 
                      borderWidth="1px" 
                      borderStyle="dashed" 
                      borderColor={borderColor} 
                      borderRadius="md"
                      textAlign="center"
                    >
                      <Text color="gray.500" fontSize="sm">No tasks</Text>
                    </Box>
                  )}
                </VStack>
              </Box>
              
              <Box>
                <Flex 
                  align="center" 
                  bg="green.100" 
                  color="green.700" 
                  p={3} 
                  borderRadius="md" 
                  mb={4}
                  fontWeight="medium"
                >
                  <FiCheckCircle style={{ marginRight: '8px' }} />
                  Done ({tasksByStatus.done.length})
                </Flex>
                
                <VStack spacing={4} align="stretch">
                  {tasksByStatus.done.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onViewTask={handleViewTask}
                    />
                  ))}
                  
                  {tasksByStatus.done.length === 0 && (
                    <Box 
                      p={4} 
                      borderWidth="1px" 
                      borderStyle="dashed" 
                      borderColor={borderColor} 
                      borderRadius="md"
                      textAlign="center"
                    >
                      <Text color="gray.500" fontSize="sm">No tasks</Text>
                    </Box>
                  )}
                </VStack>
              </Box>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Create Task Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={onCreateModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input 
                  placeholder="Enter task title" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  placeholder="Enter task description" 
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </FormControl>
              
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="done">Done</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <Select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Due Date</FormLabel>
                  <Input 
                    type="date" 
                    value={newTask.dueDate ? new Date(newTask.dueDate).toISOString().slice(0, 10) : ''}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value).toISOString() })}
                  />
                </FormControl>
              </Grid>
              
              {newTask.status !== 'todo' && (
                <FormControl>
                  <FormLabel>Progress ({newTask.progress}%)</FormLabel>
                  <Flex align="center">
                    <Input 
                      type="range" 
                      min={0} 
                      max={100} 
                      step={5}
                      value={newTask.progress}
                      onChange={(e) => setNewTask({ ...newTask, progress: parseInt(e.target.value) })}
                    />
                    <Text ml={2} fontWeight="medium">{newTask.progress}%</Text>
                  </Flex>
                </FormControl>
              )}
              
              <FormControl>
                <FormLabel>Assignees</FormLabel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {teamMembers.map((member) => (
                    <Flex
                      key={member.id}
                      p={2}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={
                        (newTask.assignees as Task['assignees'])?.some(a => a.id === member.id) 
                          ? 'primary.500' 
                          : borderColor
                      }
                      bg={
                        (newTask.assignees as Task['assignees'])?.some(a => a.id === member.id) 
                          ? 'primary.50' 
                          : undefined
                      }
                      cursor="pointer"
                      onClick={() => handleToggleAssignee(member)}
                      align="center"
                    >
                      <Checkbox
                        isChecked={(newTask.assignees as Task['assignees'])?.some(a => a.id === member.id)}
                        onChange={() => handleToggleAssignee(member)}
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
              onClick={handleCreateTask}
              isDisabled={!newTask.title}
            >
              Create Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* View Task Modal */}
      {selectedTask && (
        <Modal isOpen={isViewModalOpen} onClose={onViewModalClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedTask.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="medium" mb={1}>Description</Text>
                  <Text>{selectedTask.description}</Text>
                </Box>
                
                <Divider />
                
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Status</Text>
                    <Badge 
                      colorScheme={
                        selectedTask.status === 'todo' ? 'gray' :
                        selectedTask.status === 'in_progress' ? 'blue' :
                        selectedTask.status === 'review' ? 'purple' : 'green'
                      }
                      fontSize="sm"
                    >
                      {selectedTask.status === 'todo' ? 'To Do' :
                       selectedTask.status === 'in_progress' ? 'In Progress' :
                       selectedTask.status === 'review' ? 'In Review' : 'Done'}
                    </Badge>
                  </Box>
                  
                  <Box>
                    <Text fontSize="sm" color="gray.500">Priority</Text>
                    <Badge
                      colorScheme={
                        selectedTask.priority === 'high' ? 'red' :
                        selectedTask.priority === 'medium' ? 'orange' : 'green'
                      }
                      fontSize="sm"
                    >
                      {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                    </Badge>
                  </Box>
                  
                  <Box>
                    <Text fontSize="sm" color="gray.500">Category</Text>
                    <Badge variant="outline" fontSize="sm">{selectedTask.category}</Badge>
                  </Box>
                  
                  <Box>
                    <Text fontSize="sm" color="gray.500">Due Date</Text>
                    <Flex align="center">
                      <FiCalendar size={14} style={{ marginRight: '6px' }} />
                      <Text>{new Date(selectedTask.dueDate).toLocaleDateString()}</Text>
                    </Flex>
                  </Box>
                </SimpleGrid>
                
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Progress</Text>
                  <Flex align="center">
                    <Progress 
                      value={selectedTask.progress} 
                      size="sm" 
                      colorScheme={
                        selectedTask.status === 'todo' ? 'gray' :
                        selectedTask.status === 'in_progress' ? 'blue' :
                        selectedTask.status === 'review' ? 'purple' : 'green'
                      }
                      borderRadius="full" 
                      flex="1" 
                      mr={2}
                    />
                    <Text fontWeight="medium">{selectedTask.progress}%</Text>
                  </Flex>
                </Box>
                
                <Divider />
                
                <Box>
                  <Text fontWeight="medium" mb={2}>Assignees</Text>
                  <SimpleGrid columns={2} spacing={3}>
                    {selectedTask.assignees.map((assignee) => (
                      <Flex key={assignee.id} align="center" p={2} borderRadius="md" bg={highlightBg}>
                        <Avatar name={assignee.name} size="sm" bg="primary.500" mr={2}>
                          {assignee.avatar}
                        </Avatar>
                        <Box>
                          <Text fontWeight="medium">{assignee.name}</Text>
                          <Text fontSize="xs" color="gray.500">{teamMembers.find(m => m.id === assignee.id)?.department}</Text>
                        </Box>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>
              </VStack>
            </ModalBody>
            
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onViewModalClose}>
                Close
              </Button>
              <Button 
                colorScheme="primary" 
                variant="outline"
                mr={2}
              >
                Edit Task
              </Button>
              <Button colorScheme="red" variant="ghost">
                Delete Task
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default TasksPage;