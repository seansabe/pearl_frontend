import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/joy';
import { api } from '../utils/api';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers';
import { TimeField } from '@mui/x-date-pickers';
import { Select } from '@mui/material';


const DashboardProviderComponent = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [index, setIndex] = useState(0);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const handleClickOpen = (appointment) => {
        setEditOpen(true);
        setSelectedAppointment(appointment);

    };

    const handleClose = () => {
        setEditOpen(false);
    };

    useEffect(() => {
        console.log("Fetching the current user");
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser !== null) {
            console.log("Fetching bookings for current provider");
            fetchUpcomingAppointmentsForCurrentProvider();
            fetchPastAppointmentsForCurrentProvider();
            fetchServicesForCurrentUser();
        }
    }, [currentUser]);

    const fetchCurrentUser = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setCurrentUser(user);
                console.log("Current user found. " + user._id);
            } else {
                console.log("Current user not found.");
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchServicesForCurrentUser = async () => {
        try {
            const response = await axios.get(`${api}/service/user/${currentUser._id}`);
            const services = response.data;
            setServices(services);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };


    const fetchUpcomingAppointmentsForCurrentProvider = async () => {
        try {
            const responseServices = await axios.get(`${api}/service/user/${currentUser._id}`);
            const services = responseServices.data;

            // Use Promise.all to fetch bookings for all services at the same time
            const bookingsPromises = services.map(async (service) => {
                const responseBookings = await axios.get(`${api}/booking/service/upcoming/${service._id}`);
                return responseBookings.data;
            });

            const bookingsArrays = await Promise.all(bookingsPromises);

            // Concatenate the arrays of bookings into a single array
            const allBookings = [].concat(...bookingsArrays);

            // Use Promise.all to fetch all customer and service details for the bookings
            const appointmentDetailsPromises = allBookings.map(async (booking) => {
                const [responseCustomer, responseService] = await Promise.all([
                    axios.get(`${api}/user/${booking.userId}`),
                    axios.get(`${api}/service/${booking.serviceId}`),
                ]);

                // Split the date from booking.date and only keep the date part
                const date = booking.date.split("T")[0];
                const appointmentDetail = {
                    _id: booking._id,
                    kindOfService: responseService.data.kindOfService,
                    serviceName: responseService.data.name,
                    date: date,
                    time: booking.time,
                    price: responseService.data.price,
                    customerName: responseCustomer.data.firstName + " " + responseCustomer.data.lastName,
                    description: responseService.data.description,
                };

                return appointmentDetail;
            });

            const appointmentDetails = await Promise.all(appointmentDetailsPromises);

            setUpcomingAppointments(appointmentDetails);
        } catch (error) {
            console.error("Error fetching upcoming bookings:", error);
        }
    };


    const fetchPastAppointmentsForCurrentProvider = async () => {
        try {
            const responseServices = await axios.get(`${api}/service/user/${currentUser._id}`);
            const services = responseServices.data;

            // Use Promise.all to fetch bookings for all services at the same time
            const bookingsPromises = services.map(async (service) => {
                const responseBookings = await axios.get(`${api}/booking/service/past/${service._id}`);
                return responseBookings.data;
            });

            const bookingsArrays = await Promise.all(bookingsPromises);

            // Concatenate the arrays of bookings into a single array
            const allBookings = [].concat(...bookingsArrays);

            // Use Promise.all to fetch all customer and service details for the bookings
            const appointmentDetailsPromises = allBookings.map(async (booking) => {
                const [responseCustomer, responseService] = await Promise.all([
                    axios.get(`${api}/user/${booking.userId}`),
                    axios.get(`${api}/service/${booking.serviceId}`),
                ]);

                // Split the date from booking.date and only keep the date part
                const date = booking.date.split("T")[0];
                const appointmentDetail = {
                    _id: booking._id,
                    kindOfService: responseService.data.kindOfService,
                    serviceName: responseService.data.name,
                    date: date,
                    time: booking.time,
                    price: responseService.data.price,
                    customerName: responseCustomer.data.firstName + " " + responseCustomer.data.lastName,
                };

                return appointmentDetail;
            });

            const appointmentDetails = await Promise.all(appointmentDetailsPromises);

            setPastAppointments(appointmentDetails);
        } catch (error) {
            console.error("Error fetching past bookings:", error);
        }
    };

    const AppointmentsTable = ({ appointments, buttonsHidden }) => {
        return (
            <Box sx={{ width: '100%' }}>
                <Sheet
                    variant="outlined"
                    sx={{}}
                >
                    <Table
                        borderAxis="bothBetween"
                        stripe="odd"
                        hoverRow
                        sx={{}}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Service Type</th>
                                <th style={{ width: 200 }}>Service Name</th>
                                <th style={{ width: 200 }}>Date - Time</th>
                                <th style={{ width: 200 }}>Customer Name</th>
                                <th style={{ width: 200 }}>Price</th>
                                <th style={{ width: 200, display: buttonsHidden ? 'none' : '' }}>Actions</th>
                                <th
                                    aria-label="last"
                                    style={{ width: 'var(--Table-lastColumnWidth)' }}
                                />
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.kindOfService}</td>
                                    <td>{appointment.serviceName}</td>
                                    <td>{appointment.date} - {appointment.time}</td>
                                    <td>{appointment.customerName}</td>
                                    <td>${appointment.price}</td>
                                    <td>
                                        <Box sx={{ display: buttonsHidden ? 'none' : 'flex', gap: 1 }}>
                                            <Button size="sm" variant="soft" color="neutral" onClick={() => handleClickOpen(appointment)}>
                                                Edit
                                            </Button>
                                            <Button size="sm" variant="soft" color="danger">
                                                Cancel
                                            </Button>
                                        </Box>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
            </Box>
        );
    };

    const ServicesTable = ({ services }) => {
        return (
            <Box sx={{ width: '100%' }}>
                <Sheet
                    variant="outlined"
                    sx={{}}
                >
                    <Table
                        borderAxis="bothBetween"
                        stripe="odd"
                        hoverRow
                        sx={{}}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Service Type</th>
                                <th style={{ width: 200 }}>Service Name</th>
                                <th style={{ width: 200 }}>Service Description</th>
                                <th style={{ width: 200 }}>Price</th>
                                <th style={{ width: 200 }}>Actions</th>
                                <th
                                    aria-label="last"
                                    style={{ width: 'var(--Table-lastColumnWidth)' }}
                                />
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id}>
                                    <td>{service.kindOfService}</td>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>${service.price}</td>
                                    <td>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button size="sm" variant="soft" color="neutral">
                                                Edit
                                            </Button>
                                            <Button size="sm" variant="soft" color="danger">
                                                Remove
                                            </Button>
                                        </Box>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
            </Box>
        );
    };

    const DialogEditService = () => {
        const [type, setType] = useState("");
        const handleChangeType = (event) => {
            setType(event.target.value);
        };

        return (
            <Dialog open={editOpen} onClose={handleClose}>
                <DialogTitle>Edit a Service</DialogTitle>
                <DialogContent>
                <TextField
                        margin="dense"
                        id="serviceType"
                        label="Service Type"
                        fullWidth
                        value={selectedAppointment ? selectedAppointment.kindOfService || "" : ""}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                            style: {
                                color: 'rgba(0, 0, 0, 0.3)', // Pasive Field
                            },
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="serviceName"
                        label="Service Name"
                        fullWidth
                        value={selectedAppointment ? selectedAppointment.serviceName || "" : ""}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="serviceDescription"
                        label="Service Description"
                        fullWidth
                        value={selectedAppointment ? selectedAppointment.description || "" : ""}
                        variant="standard"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField', 'TimeField']}>
                            <DemoItem label="Appointment Date" id="appointmentDate" >
                                {console.log(selectedAppointment)}
                                <DateField defaultValue={selectedAppointment ? dayjs(selectedAppointment.date) || null : null} />
                            </DemoItem>
                            <DemoItem label="Appointment Time" id="appointmentTime">
                                <TimeField defaultValue={selectedAppointment ? dayjs('2000-01-01T' + selectedAppointment.time) || null : null} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        );
    };

    const DialogEditAppointment = () => {
        const [type, setType] = useState("");
        const [selectedDate, setSelectedDate] = useState(new Date());
        const [selectedTime, setSelectedTime] = useState(new Date());

        const handleDataChange = (newDate) => {
            setSelectedDate(newDate);
        };

        const handleTimeChange = (newTime) => {
            setSelectedTime(newTime);
        };

        const handleUpdate = () => {
            console.log("Updating appointment");
            console.log(selectedAppointment);
            console.log(selectedDate);
            console.log(selectedTime);

            // convert selectedDate to to the JavaScript Date object
            // type of selectedDate
            console.log(typeof selectedDate);

            // convert selectedTime to to the JavaScript Date object
            console.log(typeof selectedTime);
            
        

            // TODO :it is not working, check the date type and time type
            const updateAppointment = async () => {
                try {
                    console.log("selectedAppointment._id", selectedAppointment._id);
                    const response = await axios.put(`${api}/booking/${selectedAppointment._id}`, {
                        selectedDate,
                        selectedTime,
                    });
                    console.log("Updated appointment");
                    console.log(response.data);
                } catch (error) {
                    console.error("Error updating appointment:", error);
                }
            };
        
            
            updateAppointment();
            handleClose();
        };


        return (
            <Dialog open={editOpen} onClose={handleClose}>
                <DialogTitle>Edit an Appointment</DialogTitle>
                <DialogContent>
                <TextField
                        margin="dense"
                        id="serviceType"
                        label="Service Type"
                        fullWidth
                        value={selectedAppointment ? selectedAppointment.kindOfService || "" : ""}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                            style: {
                                color: 'rgba(0, 0, 0, 0.3)', // Pasive Field
                            },
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="serviceName"
                        label="Service Name"
                        fullWidth
                        value={selectedAppointment ? selectedAppointment.serviceName || "" : ""}
                        variant="standard"
                        InputProps={{
                            readOnly: true,
                            style: {
                                color: 'rgba(0, 0, 0, 0.3)', // Pasive Field
                            },
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField', 'TimeField']}>
                            <DemoItem label="Appointment Date" id="appointmentDate" >
                                {console.log(selectedAppointment)}
                                <DateField 
                                    defaultValue={selectedAppointment ? dayjs(selectedAppointment.date) || null : null}
                                    onChange={(newDate) => handleDataChange(newDate)}
                                />
                            </DemoItem>
                            <DemoItem label="Appointment Time" id="appointmentTime">
                                <TimeField 
                                    defaultValue={selectedAppointment ? dayjs('2000-01-01T' + selectedAppointment.time) || null : null}
                                    onChange={(newTime) => handleTimeChange((dayjs('2000-01-01T' + newTime)))} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        );
    };



    return (
        <div>
            {DialogEditAppointment()}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Tabs
                    aria-label="Outlined tabs"
                    value={index}
                    onChange={(event, value) => setIndex(value)}
                >
                    <TabList variant="outlined" disableUnderline>
                        <Tab
                            variant={index === 0 ? 'soft' : 'plain'}
                            color={index === 0 ? 'success' : 'neutral'}
                        >
                            Upcoming Appointments
                        </Tab>
                        <Tab
                            variant={index === 1 ? 'soft' : 'plain'}
                            color={index === 1 ? 'warning' : 'neutral'}
                        >
                            Past Appointments
                        </Tab>
                        <Tab
                            variant={index === 2 ? 'soft' : 'plain'}
                            color={index === 2 ? 'primary' : 'neutral'}
                        >
                            My Services
                        </Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <AppointmentsTable appointments={upcomingAppointments} buttonsHidden={false} />
                    </TabPanel>
                    <TabPanel value={1}>
                        <AppointmentsTable appointments={pastAppointments} buttonsHidden={true} />
                    </TabPanel>
                    <TabPanel value={2}>
                        <ServicesTable services={services} />
                    </TabPanel>
                </Tabs>
            </Box>
        </div>

    );
};

export default DashboardProviderComponent;
