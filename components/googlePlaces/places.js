'use client';
import { useState, useEffect } from 'react';
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from '@react-google-maps/api';

const Map = () => {
  const [map, setMap] = useState(null);
  const [service, setService] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  useEffect(() => {
    const request = {
      query: 'Museum of Contemporary Art Australia',
      fields: ['name', 'geometry'],
    };

    if (service && map) {
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === 'OK' && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }

          map.setCenter(results[0].geometry.location);
        }
      });
    }
  }, [service, map]);

  const createMarker = (place) => {
    if (!place.geometry || !place.geometry.location) return;

    new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
      animation: google.maps.Animation.DROP,
    });
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: -33.867, lng: 151.195 }}
        zoom={15}
        onLoad={(map) => setMap(map)}
      >
        {infowindow && (
          <InfoWindow
            position={{ lat: -33.867, lng: 151.195 }}
            onCloseClick={() => setInfowindow(null)}
          >
            <div>Museum of Contemporary Art Australia</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
