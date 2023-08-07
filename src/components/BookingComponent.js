import React, { useEffect, useState } from 'react';
import { Button } from "@mui/joy";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';

const BookingComponent = (props) => {
  const { id } = useParams();
  const [date, setDate] = useState(dayjs(Date.now()));
  const [time, setTime] = useState(dayjs('2022-04-17T12:00'));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } else {
        console.log("Current user not found.");
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const routeListings = () => {
    props.handleNavClick("Listings");
  }
  /*
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
*/
  const submitBooking = async () => {
    try {
      const response = await axios.post(`${api}/booking`, {
        serviceId: id,
        date,
        time,
        userId: currentUser._id,
      });
      console.log("Booking created:", response.data);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <form className='booking-form'>
      <h1>Booking</h1>
      {/*<label>Date:</label>*/}
      {/*<input type="date" value={date} onChange={handleDateChange} />*/}
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <DemoContainer components={['DateCalendar', 'DigitalClock']}>
          <div className="datetime-picker">
            <div className="date-picker">
              <DateCalendar
                showDaysOutsideCurrentMonth
                minDate={dayjs(Date.now())}
                label="Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </div>
            <div className="time-picker">
              <DigitalClock
                label="Time"
                value={time}
                onChange={(newTime) => setTime(newTime)}
              />
            </div>
          </div>
        </DemoContainer>

      </LocalizationProvider>
      {/*<label>Time:</label>*/}
      {/*<input type="time" value={time} onChange={handleTimeChange} />*/}
      <div className='spacer'></div>
      <Button
        color="info"
        onClick={submitBooking}
        size="lg"
        variant="solid"
        fullWidth
      >Book</Button>
      <div className='spacer'></div>
      <Button
        color="info"
        onClick={routeListings}
        size="lg"
        variant="solid"
        fullWidth
      >Cancel</Button>
    </form>
  );
};

export default BookingComponent;
