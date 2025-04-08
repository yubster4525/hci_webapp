import { useState } from 'react'
import {
  Box,
  Heading,
  Grid,
  Flex,
  Select,
  Text,
  FormControl,
  FormLabel,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from '@chakra-ui/react'
import { FiMoreVertical, FiDownload, FiRefreshCw, FiCalendar } from 'react-icons/fi'

// Import chart components
import PendingWorkChart from '../components/dashboard/PendingWorkChart'
import PerformanceChart from '../components/dashboard/PerformanceChart'
import CompletedWorkChart from '../components/dashboard/CompletedWorkChart'
import NotificationsChart from '../components/dashboard/NotificationsChart'
import WorkloadHeatmap from '../components/dashboard/WorkloadHeatmap'
import ProjectSuccessChart from '../components/dashboard/ProjectSuccessChart'

const Dashboard = () => {
  const [period, setPeriod] = useState('weekly')
  const cardBg = useColorModeValue('white', 'gray.800')

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
          <Heading size="lg" mb={1}>Dashboard Overview</Heading>
          <Text color="gray.500">Monitor key metrics and performance indicators</Text>
        </Box>
        
        <Flex gap={4} alignItems="center">
          <FormControl w="auto">
            <Flex alignItems="center">
              <Icon as={FiCalendar} mr={2} />
              <Select 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
                size="md"
                w="140px"
                focusBorderColor="primary.500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </Select>
            </Flex>
          </FormControl>
          
          <Button 
            leftIcon={<FiRefreshCw />} 
            variant="outline"
            size="md"
          >
            Refresh
          </Button>
        </Flex>
      </Flex>

      <Grid 
        templateColumns={{ 
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)', 
          lg: 'repeat(3, 1fr)' 
        }} 
        gap={6}
      >
        <Card bg={cardBg} shadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Pending Work</Heading>
              <Menu>
                <MenuButton as={Button} variant="ghost" size="sm" p={1}>
                  <Icon as={FiMoreVertical} />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiDownload />}>Export Data</MenuItem>
                  <MenuItem icon={<FiRefreshCw />}>Refresh</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody>
            <PendingWorkChart />
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Performance Metrics</Heading>
              <Menu>
                <MenuButton as={Button} variant="ghost" size="sm" p={1}>
                  <Icon as={FiMoreVertical} />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiDownload />}>Export Data</MenuItem>
                  <MenuItem icon={<FiRefreshCw />}>Refresh</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody>
            <PerformanceChart />
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Completed Work</Heading>
              <Menu>
                <MenuButton as={Button} variant="ghost" size="sm" p={1}>
                  <Icon as={FiMoreVertical} />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiDownload />}>Export Data</MenuItem>
                  <MenuItem icon={<FiRefreshCw />}>Refresh</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody>
            <CompletedWorkChart />
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Notifications Overview</Heading>
              <Menu>
                <MenuButton as={Button} variant="ghost" size="sm" p={1}>
                  <Icon as={FiMoreVertical} />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiDownload />}>Export Data</MenuItem>
                  <MenuItem icon={<FiRefreshCw />}>Refresh</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody>
            <NotificationsChart />
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Workload Distribution</Heading>
              <Menu>
                <MenuButton as={Button} variant="ghost" size="sm" p={1}>
                  <Icon as={FiMoreVertical} />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiDownload />}>Export Data</MenuItem>
                  <MenuItem icon={<FiRefreshCw />}>Refresh</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody>
            <WorkloadHeatmap />
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Project Success Rate</Heading>
              <Menu>
                <MenuButton as={Button} variant="ghost" size="sm" p={1}>
                  <Icon as={FiMoreVertical} />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiDownload />}>Export Data</MenuItem>
                  <MenuItem icon={<FiRefreshCw />}>Refresh</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody>
            <ProjectSuccessChart />
          </CardBody>
        </Card>
      </Grid>
    </Box>
  )
}

export default Dashboard