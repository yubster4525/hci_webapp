import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box, Flex, useDisclosure, useColorModeValue, createGlobalStyle } from '@chakra-ui/react'
import './App.css'

// Pages
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import CalendarPage from './pages/Calendar'
import TasksPage from './pages/Tasks'

// Components
import Sidebar from './components/navigation/Sidebar'
import Header from './components/navigation/Header'

// Custom components
import GazeTracker from './components/common/GazeTracker'
import AIAssistant from './components/common/AIAssistant'

function App() {
  const { isOpen: sidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose, onToggle: onSidebarToggle } = useDisclosure()
  const [showGazeTracker, setShowGazeTracker] = useState(false)
  
  // Background color based on color mode
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Router>
      <Flex direction="column" h="100vh" bg={bgColor}>
        <Header onToggleSidebar={onSidebarToggle} showGazeTracker={showGazeTracker} setShowGazeTracker={setShowGazeTracker} />
        <Flex flex="1" overflow="hidden">
          <Sidebar isOpen={sidebarOpen} onClose={onSidebarClose} />
          <Box 
            as="main" 
            flex="1" 
            p={4} 
            overflow="auto"
            transition="margin 0.3s ease"
            ml={sidebarOpen ? { base: 0, md: '250px' } : 0}
            bg={bgColor} // Add background color to main content
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/teams" element={<Box pt={8} textAlign="center">Teams Page</Box>} />
              <Route path="/analytics" element={<Box pt={8} textAlign="center">Analytics Page</Box>} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Box pt={8} textAlign="center">Page Not Found</Box>} />
            </Routes>
          </Box>
        </Flex>
        
        {/* Add AI Assistant */}
        <AIAssistant />
        
        {/* Add Gaze Tracker */}
        {showGazeTracker && <GazeTracker />}
      </Flex>
    </Router>
  )
}

export default App