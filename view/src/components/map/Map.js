import { GoogleMap,useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo } from "react";
import './map.css'


export default function  MapContainer  ( )  {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDTZ8ESjj_oMlzU6i1Y8rwayGnNQvju4Dc',
      });
      const center = useMemo(() => ({ lat: 45.647510, lng:  13.767241 }), []);
    
      return (
        <div className="App">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map"
              center={center}
              zoom={15}>
         
            <InfoWindow
              position={{ lat: 45.645210, lng: 13.759241 }}
             
            >
              <div>
                <h3 style={{fontStyle:'italic'}}>Osteria Istriano</h3>
              </div>
            </InfoWindow>
            </GoogleMap>
          )}
        </div>
      );
    };