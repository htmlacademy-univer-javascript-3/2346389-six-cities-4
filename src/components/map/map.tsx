import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../hooks/use-map';
import { Offer } from '../../types/offers';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT, MapClasses } from '../const/const';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


type MapProps = {
   offers: Offer[];
   activeOfferId?: string;
   isMainPage: boolean;
}


export default function Map(props: MapProps): JSX.Element {
  const {offers, activeOfferId, isMainPage} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0]);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer.options.pane === 'markerPane') {
          map.removeLayer(layer);
        }
      });

      offers.forEach((offer: Offer) => {
        const marker = new Marker({
          lat: offer.location.width,
          lng: offer.location.height,
        });

        marker.setIcon(
          activeOfferId !== undefined && offer.id === activeOfferId
            ? currentCustomIcon
            : defaultCustomIcon
        )
          .addTo(map);
      });
    }
  }, [map, offers, activeOfferId]);

  useEffect(() => {
    if (map) {
      map.flyTo([offers[0].city.location.width, offers[0].city.location.height], offers[0].city.location.zoom);
    }
  }, [map, offers]);

  return (
    <section className={isMainPage ? MapClasses.SectionMainMapClass : MapClasses.SectionPropertyMapClass} ref={mapRef}></section>
  );
}
