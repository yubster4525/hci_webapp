import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Button,
  ButtonGroup,
  Divider,
  useColorMode,
  Flex,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { 
  FiMoon, 
  FiSun, 
  FiBell, 
  FiGlobe, 
  FiType, 
  FiEye, 
  FiSave, 
  FiRefreshCw,
  FiUser,
  FiShield,
  FiWifi,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiSlack
} from 'react-icons/fi';

const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Appearance settings
  const [fontSize, setFontSize] = useState('medium');
  const [density, setDensity] = useState('medium');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [mentionNotifications, setMentionNotifications] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  
  // Language settings
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('UTC-4');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  
  // Integration settings
  const [githubEnabled, setGithubEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(true);
  const [twitterEnabled, setTwitterEnabled] = useState(false);
  const [linkedinEnabled, setLinkedinEnabled] = useState(false);
  
  // Style variables
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const handleResetSettings = () => {
    setFontSize('medium');
    setDensity('medium');
    setAnimationsEnabled(true);
    setEmailNotifications(true);
    setPushNotifications(true);
    setMentionNotifications(true);
    setDeadlineReminders(true);
    setLanguage('english');
    setTimezone('UTC-4');
    setDateFormat('MM/DD/YYYY');
    setGithubEnabled(true);
    setSlackEnabled(true);
    setTwitterEnabled(false);
    setLinkedinEnabled(false);
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
          <Heading size="lg" mb={1}>Settings</Heading>
          <Text color="gray.500">Customize your experience</Text>
        </Box>
        
        <ButtonGroup>
          <Button 
            variant="outline" 
            leftIcon={<FiRefreshCw />} 
            onClick={handleResetSettings}
          >
            Reset
          </Button>
          <Button 
            colorScheme="primary" 
            leftIcon={<FiSave />}
          >
            Save Changes
          </Button>
        </ButtonGroup>
      </Flex>
      
      <Tabs variant="enclosed" colorScheme="primary" mb={6}>
        <TabList>
          <Tab><Flex align="center"><Icon as={FiEye} mr={2} />Appearance</Flex></Tab>
          <Tab><Flex align="center"><Icon as={FiBell} mr={2} />Notifications</Flex></Tab>
          <Tab><Flex align="center"><Icon as={FiGlobe} mr={2} />Language & Region</Flex></Tab>
          <Tab><Flex align="center"><Icon as={FiWifi} mr={2} />Integrations</Flex></Tab>
        </TabList>
        
        <TabPanels>
          {/* Appearance Tab */}
          <TabPanel p={0} pt={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card bg={cardBg} shadow="md" borderRadius="lg">
                <CardHeader pb={2}>
                  <Heading size="md">Theme</Heading>
                </CardHeader>
                <CardBody>
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="color-mode" mb="0">
                      <Flex align="center">
                        <Icon as={colorMode === 'dark' ? FiMoon : FiSun} mr={2} />
                        {colorMode === 'dark' ? 'Dark' : 'Light'} Mode
                      </Flex>
                    </FormLabel>
                    <Switch
                      id="color-mode"
                      colorScheme="primary"
                      isChecked={colorMode === 'dark'}
                      onChange={toggleColorMode}
                    />
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel htmlFor="font-size">
                      <Flex align="center">
                        <Icon as={FiType} mr={2} />
                        Font Size
                      </Flex>
                    </FormLabel>
                    <Select
                      id="font-size"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel>Density</FormLabel>
                    <RadioGroup value={density} onChange={setDensity}>
                      <Stack direction="row" spacing={4}>
                        <Radio value="compact">Compact</Radio>
                        <Radio value="medium">Medium</Radio>
                        <Radio value="comfortable">Comfortable</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="animations" mb="0">
                      Animations
                    </FormLabel>
                    <Switch
                      id="animations"
                      colorScheme="primary"
                      isChecked={animationsEnabled}
                      onChange={(e) => setAnimationsEnabled(e.target.checked)}
                    />
                  </FormControl>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} shadow="md" borderRadius="lg">
                <CardHeader pb={2}>
                  <Heading size="md">Accessibility</Heading>
                </CardHeader>
                <CardBody>
                  <FormControl mb={4}>
                    <FormLabel>Contrast</FormLabel>
                    <Slider
                      aria-label="contrast-slider"
                      defaultValue={50}
                      colorScheme="primary"
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel>Motion Sensitivity</FormLabel>
                    <Slider
                      aria-label="motion-slider"
                      defaultValue={80}
                      colorScheme="primary"
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="focus-outlines" mb="0">
                      Visible Focus Outlines
                    </FormLabel>
                    <Switch
                      id="focus-outlines"
                      colorScheme="primary"
                      defaultChecked
                    />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="screen-reader" mb="0">
                      Screen Reader Optimized
                    </FormLabel>
                    <Switch
                      id="screen-reader"
                      colorScheme="primary"
                      defaultChecked
                    />
                  </FormControl>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
          
          {/* Notifications Tab */}
          <TabPanel p={0} pt={4}>
            <Card bg={cardBg} shadow="md" borderRadius="lg">
              <CardHeader pb={2}>
                <Heading size="md">Notification Preferences</Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="email-notifications" mb="0">
                      Email Notifications
                    </FormLabel>
                    <Switch
                      id="email-notifications"
                      colorScheme="primary"
                      isChecked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="push-notifications" mb="0">
                      Push Notifications
                    </FormLabel>
                    <Switch
                      id="push-notifications"
                      colorScheme="primary"
                      isChecked={pushNotifications}
                      onChange={(e) => setPushNotifications(e.target.checked)}
                    />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="mention-notifications" mb="0">
                      @Mention Alerts
                    </FormLabel>
                    <Switch
                      id="mention-notifications"
                      colorScheme="primary"
                      isChecked={mentionNotifications}
                      onChange={(e) => setMentionNotifications(e.target.checked)}
                    />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="deadline-reminders" mb="0">
                      Deadline Reminders
                    </FormLabel>
                    <Switch
                      id="deadline-reminders"
                      colorScheme="primary"
                      isChecked={deadlineReminders}
                      onChange={(e) => setDeadlineReminders(e.target.checked)}
                    />
                  </FormControl>
                </SimpleGrid>
                
                <Divider my={4} />
                
                <FormControl mb={4}>
                  <FormLabel>Notification Sound</FormLabel>
                  <Select defaultValue="default">
                    <option value="default">Default</option>
                    <option value="soft">Soft Chime</option>
                    <option value="bell">Bell</option>
                    <option value="digital">Digital</option>
                    <option value="none">None</option>
                  </Select>
                </FormControl>
                
                <FormControl mb={4}>
                  <FormLabel>Do Not Disturb Hours</FormLabel>
                  <Flex gap={4}>
                    <Select defaultValue="18">
                      <option value="17">5:00 PM</option>
                      <option value="18">6:00 PM</option>
                      <option value="19">7:00 PM</option>
                      <option value="20">8:00 PM</option>
                      <option value="21">9:00 PM</option>
                      <option value="22">10:00 PM</option>
                    </Select>
                    <Text alignSelf="center">to</Text>
                    <Select defaultValue="8">
                      <option value="5">5:00 AM</option>
                      <option value="6">6:00 AM</option>
                      <option value="7">7:00 AM</option>
                      <option value="8">8:00 AM</option>
                      <option value="9">9:00 AM</option>
                    </Select>
                  </Flex>
                </FormControl>
              </CardBody>
            </Card>
          </TabPanel>
          
          {/* Language & Region Tab */}
          <TabPanel p={0} pt={4}>
            <Card bg={cardBg} shadow="md" borderRadius="lg">
              <CardHeader pb={2}>
                <Heading size="md">Language & Regional Settings</Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl mb={4}>
                    <FormLabel htmlFor="language">Language</FormLabel>
                    <Select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                      <option value="chinese">Chinese</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel htmlFor="timezone">Timezone</FormLabel>
                    <Select
                      id="timezone"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC-4">Atlantic Time (UTC-4)</option>
                      <option value="UTC+0">UTC</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                      <option value="UTC+8">China Standard Time (UTC+8)</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>
                
                <Divider my={4} />
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl mb={4}>
                    <FormLabel htmlFor="date-format">Date Format</FormLabel>
                    <Select
                      id="date-format"
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel htmlFor="first-day">First Day of Week</FormLabel>
                    <Select id="first-day" defaultValue="sunday">
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </CardBody>
            </Card>
          </TabPanel>
          
          {/* Integrations Tab */}
          <TabPanel p={0} pt={4}>
            <Card bg={cardBg} shadow="md" borderRadius="lg">
              <CardHeader pb={2}>
                <Heading size="md">Connected Services</Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Flex 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="md" 
                    borderColor={borderColor}
                    align="center"
                    justify="space-between"
                  >
                    <Flex align="center">
                      <Icon as={FiGithub} boxSize={6} mr={3} />
                      <Box>
                        <Text fontWeight="medium">GitHub</Text>
                        <Text fontSize="sm" color="gray.500">Connect to your repositories</Text>
                      </Box>
                    </Flex>
                    <Switch
                      colorScheme="primary"
                      isChecked={githubEnabled}
                      onChange={(e) => setGithubEnabled(e.target.checked)}
                    />
                  </Flex>
                  
                  <Flex 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="md" 
                    borderColor={borderColor}
                    align="center"
                    justify="space-between"
                  >
                    <Flex align="center">
                      <Icon as={FiSlack} boxSize={6} mr={3} />
                      <Box>
                        <Text fontWeight="medium">Slack</Text>
                        <Text fontSize="sm" color="gray.500">Connect to your workspace</Text>
                      </Box>
                    </Flex>
                    <Switch
                      colorScheme="primary"
                      isChecked={slackEnabled}
                      onChange={(e) => setSlackEnabled(e.target.checked)}
                    />
                  </Flex>
                  
                  <Flex 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="md" 
                    borderColor={borderColor}
                    align="center"
                    justify="space-between"
                  >
                    <Flex align="center">
                      <Icon as={FiTwitter} boxSize={6} mr={3} />
                      <Box>
                        <Text fontWeight="medium">Twitter</Text>
                        <Text fontSize="sm" color="gray.500">Share updates to Twitter</Text>
                      </Box>
                    </Flex>
                    <Switch
                      colorScheme="primary"
                      isChecked={twitterEnabled}
                      onChange={(e) => setTwitterEnabled(e.target.checked)}
                    />
                  </Flex>
                  
                  <Flex 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="md" 
                    borderColor={borderColor}
                    align="center"
                    justify="space-between"
                  >
                    <Flex align="center">
                      <Icon as={FiLinkedin} boxSize={6} mr={3} />
                      <Box>
                        <Text fontWeight="medium">LinkedIn</Text>
                        <Text fontSize="sm" color="gray.500">Share updates to LinkedIn</Text>
                      </Box>
                    </Flex>
                    <Switch
                      colorScheme="primary"
                      isChecked={linkedinEnabled}
                      onChange={(e) => setLinkedinEnabled(e.target.checked)}
                    />
                  </Flex>
                </SimpleGrid>
                
                <Box mt={6}>
                  <Button colorScheme="primary" variant="outline">
                    Add New Integration
                  </Button>
                </Box>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      <Card bg={cardBg} shadow="md" borderRadius="lg" mb={6}>
        <CardHeader pb={2}>
          <Flex align="center">
            <Icon as={FiUser} mr={2} />
            <Heading size="md">Account Settings</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Button variant="outline" colorScheme="primary">
              Edit Profile
            </Button>
            <Button variant="outline" colorScheme="primary">
              Change Password
            </Button>
            <Button variant="outline" colorScheme="red">
              Delete Account
            </Button>
          </SimpleGrid>
        </CardBody>
      </Card>
      
      <Card bg={cardBg} shadow="md" borderRadius="lg">
        <CardHeader pb={2}>
          <Flex align="center">
            <Icon as={FiShield} mr={2} />
            <Heading size="md">Privacy & Security</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="two-factor" mb="0">
                Two-Factor Authentication
              </FormLabel>
              <Switch
                id="two-factor"
                colorScheme="primary"
                defaultChecked
              />
            </FormControl>
            
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="profile-visibility" mb="0">
                Public Profile
              </FormLabel>
              <Switch
                id="profile-visibility"
                colorScheme="primary"
                defaultChecked
              />
            </FormControl>
            
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="data-collection" mb="0">
                Usage Data Collection
              </FormLabel>
              <Switch
                id="data-collection"
                colorScheme="primary"
                defaultChecked
              />
            </FormControl>
            
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="login-alerts" mb="0">
                Login Alerts
              </FormLabel>
              <Switch
                id="login-alerts"
                colorScheme="primary"
                defaultChecked
              />
            </FormControl>
          </SimpleGrid>
          
          <Button mt={4} colorScheme="primary" variant="outline">
            View Privacy Policy
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Settings;