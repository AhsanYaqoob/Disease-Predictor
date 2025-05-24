import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Hospitals.css';

const HospitalMap = () => {
  const mapRef = useRef(null);
  const [status, setStatus] = useState('Loading...');
  const markerLayerRef = useRef(L.layerGroup());
  const userCoordsRef = useRef(null);
  const hospitalCoordsRef = useRef([]); // Store hospital coordinates

  const CONFIG = {
    INITIAL_RADIUS: 10000,
    MAX_RADIUS: 30000,
    FALLBACK_LOCATION: [51.505, -0.09],
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const position = await getLocation();
      const coords = [position.coords.latitude, position.coords.longitude];
      userCoordsRef.current = coords;
      setStatus('Location found! Loading map...');
      initializeMap(coords);
      await loadMedicalFacilities(coords);
    } catch (error) {
      handleFatalError(error);
    }
  };

  const initializeMap = (coords) => {
    const map = L.map(mapRef.current).setView(coords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    markerLayerRef.current.addTo(map);

    L.marker(coords, {
      icon: L.divIcon({
        className: 'user-marker',
        html: '<div style="background: #4285F4; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
      }),
    }).bindPopup('<b>Your Location</b>').addTo(map);

    mapRef.current.leafletMap = map;
  };

  const loadMedicalFacilities = async (coords) => {
    let currentRadius = CONFIG.INITIAL_RADIUS;
    let facilitiesFound = 0;
    const allMarkers = [];

    while (currentRadius <= CONFIG.MAX_RADIUS && facilitiesFound === 0) {
      setStatus(`Searching  Hospitals`);
      try {
        const osmData = await fetchFromOverpass(coords, currentRadius);
        const osmMarkers = processOSMData(osmData);
        facilitiesFound += osmMarkers.length;
        allMarkers.push(...osmMarkers);

        if (osmMarkers.length === 0) {
          const whoData = await fetchFromWHO(coords, currentRadius);
          const whoMarkers = processWHOData(whoData);
          facilitiesFound += whoMarkers.length;
          allMarkers.push(...whoMarkers);
        }
      } catch (error) {
        console.error('API Error:', error);
      }

      currentRadius += 5000;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (allMarkers.length > 0) {
      const markerGroup = L.featureGroup(allMarkers);
      mapRef.current.leafletMap.fitBounds(markerGroup.getBounds().pad(0.2));
      setStatus(`Found ${allMarkers.length} medical facilities`);
    } else {
      setStatus('No facilities found within 30km');
    }
  };

  const fetchFromOverpass = async ([lat, lng], radius) => {
    const query = `
      [out:json][timeout:30];
      (
        node["amenity"~"hospital|clinic|doctors|pharmacy|health_center"](around:${radius},${lat},${lng});
        way["amenity"~"hospital|clinic|doctors|pharmacy|health_center"](around:${radius},${lat},${lng});
      );
      out center;
    `;
    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    return response.json();
  };

  const fetchFromWHO = async ([lat, lng], radius) => {
    const url = `https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/WHO_HealthFacilities/FeatureServer/0/query?where=1=1&outFields=*&geometry=${lng},${lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&distance=${radius}&units=esriSRUnit_Meter&outSR=4326&f=json`;
    const response = await fetch(url);
    return response.json();
  };

  const processOSMData = (data) => {
    const markers = [];
    if (!data?.elements?.length) return markers;

    data.elements.forEach((item) => {
      const coords = item.center || { lat: item.lat, lon: item.lon };
      if (!coords || !isValidCoordinate(coords.lat, coords.lon)) return;

      hospitalCoordsRef.current.push({ lat: coords.lat, lon: coords.lon });

      const marker = L.marker([coords.lat, coords.lon], {
        icon: L.divIcon({
          className: 'medical-marker',
          html: '<div style="background: #EA4335; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
        }),
      }).bindPopup(`<b>${item.tags.name || 'Unknown Facility'}</b><br>${item.tags.amenity || 'Medical Service'}`);

      markers.push(marker);
      markerLayerRef.current.addLayer(marker);
    });

    return markers;
  };

  const processWHOData = (data) => {
    const markers = [];
    if (!data?.features?.length) return markers;

    data.features.forEach((feature) => {
      const { x, y } = feature.geometry || {};
      if (!x || !y) return;

      hospitalCoordsRef.current.push({ lat: y, lon: x });

      const marker = L.marker([y, x], {
        icon: L.divIcon({
          className: 'who-marker',
          html: '<div style="background: #34A853; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
        }),
      }).bindPopup(`<b>${feature.attributes.NAME || 'Unknown Facility'}</b><br>${feature.attributes.TYPE || 'Health Facility'}`);

      markers.push(marker);
      markerLayerRef.current.addLayer(marker);
    });

    return markers;
  };

  const isValidCoordinate = (lat, lon) => Math.abs(lat) <= 90 && Math.abs(lon) <= 180;

  const getLocation = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });

  const handleFatalError = (error) => {
    console.error(error);
    setStatus(`Error: ${error.message}`);
    if (!userCoordsRef.current) initializeMap(CONFIG.FALLBACK_LOCATION);
  };

  const handleOpenGoogleMaps = () => {
    const coords = userCoordsRef.current;
    if (!coords) return alert('Location not available yet');
    const hospitals = hospitalCoordsRef.current;

    if (hospitals.length === 0) {
      alert('No hospital coordinates found to open in Google Maps');
      return;
    }

    const base = 'https://www.google.com/maps/dir/';
    const url = hospitals
      .slice(0, 10)
      .map(h => `${h.lat},${h.lon}`)
      .join('/');

    window.open(`${base}${url}`, '_blank');
  };

  return (
    <div className="hospitals-container">
      <div className="google-map">
        <div className="status-label">{status}</div>
        <div className="map-controls">
          <button className="control-btn" onClick={handleOpenGoogleMaps}>

            Open in Google Maps
          </button>
        </div>
        <div id="map" ref={mapRef} className="leaflet-map"></div>
      </div>
    </div>
  );
};

export default HospitalMap;
