import React, { useState } from 'react';

const FlightTicketForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    pnr: '',
    ticketNo: '',
    sector: '',
    airline: '',
    flight: '',
    flightType: '', // new field
    departure: '',
    status: '',
    issues: '',
    issueAgent: '',
    co: '',
    coasting: '',
    sale: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // API call or backend submission can be added here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Flight Ticket Input Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-medium mb-1">Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label className="block font-medium mb-1">PNR:</label>
          <input type="text" name="pnr" value={formData.pnr} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Ticket No:</label>
          <input type="text" name="ticketNo" value={formData.ticketNo} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Sector:</label>
          <input type="text" name="sector" value={formData.sector} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Airline:</label>
          <input type="text" name="airline" value={formData.airline} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Flight:</label>
          <input type="text" name="flight" value={formData.flight} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Flight Type:</label>
          <select name="flightType" value={formData.flightType} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
            <option value="">--Select Type--</option>
            <option value="one way">One Way</option>
            <option value="return">Return</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Departure:</label>
          <input type="datetime-local" name="departure" value={formData.departure} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
            <option value="">--Select Status--</option>
            <option value="ok">OK</option>
            <option value="reissue">Reissue</option>
            <option value="void">Void</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Issues:</label>
          <input type="text" name="issues" value={formData.issues} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block font-medium mb-1">Issue Agent:</label>
          <input type="text" name="issueAgent" value={formData.issueAgent} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block font-medium mb-1">C/O:</label>
          <input type="text" name="co" value={formData.co} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block font-medium mb-1">Coasting:</label>
          <input type="text" name="coasting" value={formData.coasting} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block font-medium mb-1">Sale:</label>
          <input type="text" name="sale" value={formData.sale} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FlightTicketForm;
