import "./App.css";
import Cities from "./components/Cities";
import FlightTicketForm from "./components/FlightTicketForm";

function App() {
  // const getData = async () => {
  //   const data = await Cities();
  //   console.log(data);
  // };

  // getData();

  return (
    <>
      <Cities />
      <FlightTicketForm />
    </>
  );
}

export default App;
