import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import "../styles/Contact.css";

Modal.setAppElement('#root');

function Contact() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingSelected, setIsBookingSelected] = useState(false);
    const [isViewSelected, setIsViewSelected] = useState(false);
    const [appointment, setAppointment] = useState({});
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState({});
    const [personalUser, setPersonalUser] = useState();
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    useEffect(() => {
        // First axios call to get trainers
        axios.get('http://gojim-backend.eastasia.cloudapp.azure.com/users', {
            params: { role: 'trainer' },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setTrainers(response.data.result.map(user => ({
                    label: `${user.first_name} ${user.last_name}`,
                    value: `${user.first_name} ${user.last_name}`
                })));
            })
            .catch(error => {
                console.log(error);
            });

        // Second axios call to get customers
        axios.get('http://gojim-backend.eastasia.cloudapp.azure.com/users', {
            params: { email: email },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const userName = response.data.result[0].first_name + " " + response.data.result[0].last_name;
                setPersonalUser(userName);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleViewClick = () => {
        axios
            .get("http://gojim-backend.eastasia.cloudapp.azure.com/appointment", {
                params: { user: personalUser },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(`Appointments `, response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsViewSelected(true);
        setIsModalOpen(true);
    };


    const handleBookClick = () => {
        setIsBookingSelected(true);
        setIsModalOpen(true);
    };

    function handleDateClick(date) {
        setSelectedDate(date);
        setIsModalOpen(true);
    }

    function handleStartClick(event) {
        setStartTime(event.target.value);
    }

    function handleEndClick(event) {
        setEndTime(event.target.value);
    }


    function handleModalClose() {
        setIsModalOpen(false);
        setIsBookingSelected(false);
    }

    function getModalTitle() {
        return isBookingSelected ? "Book Appointment" : "Appointments";
    }

    function handleAppointmentSubmit(event) {
        event.preventDefault();
        setIsModalOpen(false);

        // Format start time and end time with the selected date
        const formattedStartDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]), 0).toISOString().slice(0, 19).replace('T', ' ');
        const formattedEndDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]), 0).toISOString().slice(0, 19).replace('T', ' ');

        console.log(selectedTrainer); 
        console.log(personalUser); 
        console.log(formattedStartDate); 
        console.log(formattedEndDate); 
        axios.put(
            'http://gojim-backend.eastasia.cloudapp.azure.com/appointment',
            {
                trainer: selectedTrainer,
                user: personalUser,
                appointment_start: formattedStartDate,
                appointment_end: formattedEndDate,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(response => {
                console.log(response.data);
                alert("Appointment Added!"); 
            })
            .catch(error => {
                console.log(error);
                alert("No Appointment Available!"); 
            });
    }


    function handleTrainerChange(event) {
        const selectedValue = event.target.value;
        if (selectedValue) {
            setSelectedTrainer(selectedValue);
        }
    }

    return (
        <div className="calendar-scheduler">
            <Calendar
                onClickDay={handleDateClick}
                value={selectedDate}
            />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                className="appointment-modal"
                overlayClassName="appointment-modal-overlay"
            >
                <h2>{getModalTitle()}</h2>
                {isBookingSelected ? (
                    <form onSubmit={handleAppointmentSubmit}>
                        <div className="form-group">
                            <label htmlFor="trainer">Trainer:</label>
                            <select
                                onChange={handleTrainerChange}
                                className="trainer-select"
                                id="trainer"
                                name="trainer"
                                required
                            >
                                <option value="">Select...</option>
                                {trainers.map((trainer, index) => (
                                    <option key={index} value={trainer.value}>
                                        {trainer.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Start Time:</label>
                            <input
                                onChange={handleStartClick}
                                className="contactTime"
                                type="time"
                                id="starttime"
                                name="time"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">End Time:</label>
                            <input
                                onChange={handleEndClick}
                                className="contactTime"
                                type="time"
                                id="endtime"
                                name="time"
                                required
                            />
                        </div>
                        <button className="contact-button" type="submit">
                            Submit
                        </button>
                    </form>
                ) : (
                    <div>
                        <button onClick={handleViewClick} className="contact-button-view" type="button">
                            View
                        </button>
                        <button onClick={handleBookClick} className="contact-button-view" type="button">
                            Book
                        </button>
                    </div>
                )}
            </Modal>


            {appointment.date && (
                <div className="appointment-details">
                    <h3>Appointment Details:</h3>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                    <p>Trainer: {appointment.trainer}</p>
                    <p>Email: {appointment.email}</p>
                </div>
            )}
        </div>
    );
}

export default Contact;
