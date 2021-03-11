import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { Container, Button, Navbar, Table } from 'react-bootstrap';

function App() {
  const [pircas, setPircas] = useState([]);

  const onLocationReady = (location) => {
    setPircas([
      ...pircas,
      {
        timestamp: location.timestamp,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        altitude: location.coords.altitude,
        accuracy: location.coords.accuracy,
        altitudeAccuracy: location.coords.altitudeAccuracy,
      },
    ]);
  };

  const onLocationError = (error) => {
    console.log("Location error", error);
  };

  const createPirca = () => {
    navigator.geolocation.getCurrentPosition(onLocationReady, onLocationError, {
      enableHighAccuracy: true,
      maximumAge: 0,
    });
  };

  const removePirca = (pirca) => {
    setPircas(pircas.filter(element => element !== pirca));
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Pirca</Navbar.Brand>
          <Button onClick={createPirca}>
            Nueva pirca
          </Button>
        </Container>
      </Navbar>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Fecha y hora</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Precision</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { pircas.map(pirca => (
              <tr key={pirca.timestamp}>
                <td>{(new Date(pirca.timestamp)).toISOString()}</td>
                <td>{pirca.latitude}</td>
                <td>{pirca.longitude}</td>
                <td>{pirca.accuracy}</td>
                <td><Button variant="danger" onClick={() => removePirca(pirca)}>X</Button></td>
              </tr>
            )) }
          </tbody>
        </Table>
      </Container>

    </div>
  );
}

export default App;
