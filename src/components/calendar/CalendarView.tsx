import React, { useState } from 'react';
import {
  Box,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, DateSelectArg, EventInput } from '@fullcalendar/core';

interface CalendarViewProps {
  events: EventInput[];
  onEventClick?: (arg: EventClickArg) => void;
  onDateSelect?: (arg: DateSelectArg) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  events, 
  onEventClick, 
  onDateSelect 
}) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const handleEventClick = (arg: EventClickArg) => {
    if (onEventClick) {
      onEventClick(arg);
    }
  };
  
  const handleDateSelect = (arg: DateSelectArg) => {
    if (onDateSelect) {
      onDateSelect(arg);
    }
  };

  // Custom styling for light and dark mode
  const calendarStyles = {
    '.fc': {
      height: '100%',
      '--fc-border-color': borderColor,
      '--fc-page-bg-color': bgColor,
      '--fc-neutral-bg-color': useColorModeValue('gray.100', 'gray.700'),
      '--fc-list-event-hover-bg-color': useColorModeValue('gray.100', 'gray.700'),
      '--fc-today-bg-color': useColorModeValue('primary.50', 'primary.900'),
    },
    '.fc-theme-standard td, .fc-theme-standard th': {
      borderColor: borderColor,
    },
    '.fc-day': {
      transition: 'background-color 0.2s',
      cursor: 'pointer',
    },
    '.fc-day:hover': {
      bg: useColorModeValue('gray.50', 'gray.700'),
    },
    '.fc-daygrid-day-number, .fc-col-header-cell-cushion': {
      color: textColor,
    },
    '.fc-event': {
      cursor: 'pointer',
      borderRadius: '4px',
      padding: '2px 4px',
    },
    '.fc-timegrid-slot, .fc-timegrid-axis, .fc-scrollgrid': {
      borderColor: borderColor,
    },
    '.fc-timegrid-slot-label-cushion, .fc-timegrid-axis-cushion': {
      color: textColor,
    },
    '.fc-button-primary': {
      bg: 'primary.500 !important',
      borderColor: 'primary.500 !important',
      color: 'white !important',
    },
    '.fc-button-primary:hover': {
      bg: 'primary.600 !important',
      borderColor: 'primary.600 !important',
    },
    '.fc-button-primary:disabled': {
      bg: 'primary.300 !important',
      borderColor: 'primary.300 !important',
    },
    '.fc-toolbar-title': {
      color: textColor,
    },
  };

  return (
    <Box
      sx={calendarStyles}
      height="100%"
      bg={bgColor}
      p={4}
      borderRadius="lg"
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={handleEventClick}
        selectable={true}
        select={handleDateSelect}
        height="100%"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short'
        }}
        nowIndicator={true}
        eventDisplay="block"
        displayEventEnd={true}
      />
    </Box>
  );
};

export default CalendarView;