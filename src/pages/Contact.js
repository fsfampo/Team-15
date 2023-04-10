import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import "../styles/Contact.css";

Modal.setAppElement('#root');

function Contact() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointment, setAppointment] = useState({});

  function handleDateClick(date) {
    setSelectedDate(date);
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleAppointmentSubmit(event) {
    event.preventDefault();
    setAppointment({
      date: selectedDate,
      name: event.target.name.value,
      email: event.target.email.value
    });
    setIsModalOpen(false);
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
        <h2>Book Appointment</h2>
        <form onSubmit={handleAppointmentSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
      {appointment.date && (
        <div className="appointment-details">
          <h3>Appointment Details:</h3>
          <p>Date: {appointment.date.toLocaleDateString()}</p>
          <p>Name: {appointment.name}</p>
          <p>Email: {appointment.email}</p>
        </div>
      )}
    </div>
  );
}

export default Contact;
