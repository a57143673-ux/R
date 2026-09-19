import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface Props {
  lat: number;
  lng: number;
  onPick?: (lat: number, lng: number) => void;
  readonly?: boolean;
  height?: string;
}

const PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="42">
  <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z" fill="#00BFA5" stroke="white" stroke-width="1.5"/>
  <circle cx="12" cy="12" r="5" fill="white"/>
</svg>`;

const customIcon = L.divIcon({
  html: PIN_SVG,
  className: '',
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -42],
});

export default function MapPicker({ lat, lng, onPick, readonly = false, height = '220px' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    const map = L.map(ref.current, {
      center: [lat, lng],
      zoom: 14,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const marker = L.marker([lat, lng], { icon: customIcon, draggable: !readonly }).addTo(map);
    markerRef.current = marker;

    if (!readonly && onPick) {
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        onPick(pos.lat, pos.lng);
      });
      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        onPick(e.latlng.lat, e.latlng.lng);
      });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      mapRef.current.setView([lat, lng], 14);
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div ref={ref} style={{ height, width: '100%', borderRadius: '16px', overflow: 'hidden' }} />
  );
}
