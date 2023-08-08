import React, { useEffect, useState } from 'react';
import { Button } from "@mui/joy";
import axios from "axios";
import { api } from "../utils/api";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { Dialog } from '@mui/material';

const BookingComponent = (props) => {
  // const { id } = useParams();
  const [myDialogOpen, setMyDialogOpen] = useState(false);
  const [date, setDate] = useState(dayjs(Date.now()));
  const [time, setTime] = useState(dayjs('2022-04-17T06:00'));

  useEffect(() => {
    //console.log("BookingComponent mounted");
    if (props.selectedListing !== null && props.selectedListing !== undefined) {
      //console.log("Selected listing:", props.selectedListing);
      setMyDialogOpen(true);
    }
  }, [props.selectedListing]);


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
      console.log(time.hour());
      console.log(time.minute());
      const bookTime = time.hour() + ":" + time.minute();

      const response = await axios.post(`${api}/booking`, {
        serviceId: props.selectedListing._id,
        date: date,
        time: bookTime,
        userId: props.currentUser._id,
      });
      //console.log("Booking created:", response.data);
      setMyDialogOpen(false);
      props.onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleBookingClose = () => {
    props.onClose();
    setMyDialogOpen(false);
  };

  return (
    <Dialog
      open={myDialogOpen}
      onClose={handleBookingClose}
    >
      <div className='booking-form' style={{ width: '400px', marginLeft: '20px', marginRight: '20px', marginBottom: '20px' }}>
        <h1>Booking</h1>
        {/*<label>Date:</label>*/}
        {/*<input type="date" value={date} onChange={handleDateChange} />*/}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateCalendar', 'DigitalClock']}>
            <div>
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
                  disableIgnoringDatePartForTimeValidation={true}
                  minTime={dayjs('2022-04-17T06:00')}
                  maxTime={dayjs('2022-04-17T18:00')}

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
          onClick={handleBookingClose}
          size="lg"
          variant="solid"
          fullWidth
        >Cancel</Button>
      </div>
    </Dialog>
  );
};

export default BookingComponent;
