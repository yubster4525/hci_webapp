import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  AvatarGroup,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMoreVertical, FiCalendar, FiClock, FiTag, FiAlertTriangle } from 'react-icons/fi';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
  progress: number;
  assignees: Array<{
    id: number;
    name: string;
    avatar: string;
  }>;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onViewTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onViewTask }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };
  
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'gray';
      case 'in_progress':
        return 'blue';
      case 'review':
        return 'purple';
      case 'done':
        return 'green';
      default:
        return 'gray';
    }
  };
  
  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in_progress':
        return 'In Progress';
      case 'review':
        return 'In Review';
      case 'done':
        return 'Done';
      default:
        return 'Unknown';
    }
  };
  
  const isDueSoon = () => {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const diff = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };
  
  const isOverdue = () => {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now;
  };
  
  const dueDateLabel = () => {
    if (isOverdue()) {
      return (
        <Badge colorScheme="red" variant="solid" fontSize="xs">
          Overdue
        </Badge>
      );
    }
    
    if (isDueSoon()) {
      return (
        <Badge colorScheme="orange" fontSize="xs">
          Due Soon
        </Badge>
      );
    }
    
    return (
      <Text fontSize="xs" color="gray.500">
        {new Date(task.dueDate).toLocaleDateString()}
      </Text>
    );
  };

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      boxShadow="sm"
      p={4}
      _hover={{ boxShadow: 'md', borderColor: 'primary.300' }}
      transition="all 0.2s"
      position="relative"
      onClick={() => onViewTask(task)}
      cursor="pointer"
    >
      <Flex justify="space-between" align="start" mb={2}>
        <Box overflow="hidden">
          <Text fontWeight="semibold" noOfLines={2}>
            {task.title}
          </Text>
        </Box>
        
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMoreVertical />}
            variant="ghost"
            size="sm"
            aria-label="Options"
            onClick={(e) => e.stopPropagation()}
          />
          <MenuList>
            <MenuItem>Edit Task</MenuItem>
            <MenuItem>Duplicate Task</MenuItem>
            <MenuDivider />
            <MenuItem>Archive Task</MenuItem>
            <MenuItem color="red.500">Delete Task</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      
      <Text fontSize="sm" color="gray.500" noOfLines={2} mb={3}>
        {task.description}
      </Text>
      
      <Flex justify="space-between" align="center" mb={3}>
        <Badge colorScheme={getPriorityColor(task.priority)}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
        </Badge>
        <Badge colorScheme={getStatusColor(task.status)}>
          {getStatusLabel(task.status)}
        </Badge>
      </Flex>
      
      <Progress
        value={task.progress}
        size="sm"
        colorScheme={getStatusColor(task.status)}
        borderRadius="full"
        mb={3}
      />
      
      <Flex justify="space-between" align="center">
        <AvatarGroup size="xs" max={3}>
          {task.assignees.map((assignee) => (
            <Avatar 
              key={assignee.id} 
              name={assignee.name} 
              bg="primary.500"
              title={assignee.name}
            >
              {assignee.avatar}
            </Avatar>
          ))}
        </AvatarGroup>
        
        <Flex align="center">
          <FiCalendar size={12} style={{ marginRight: '4px', opacity: 0.7 }} />
          {dueDateLabel()}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TaskCard;