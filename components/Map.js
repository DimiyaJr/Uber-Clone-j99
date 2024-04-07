import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useSelector,useDispatch } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";


const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!origin || !destination) return;

    //zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin','destination'],{
       edgePadding:{top:50, right:50, bottom:50, left:50}, 
    });
  }, [origin, destination]);

  useEffect(() => {
    if(!origin || !destination) return;

    fetch(
      
    )

    const getTravelTime = async() => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}
      &key=${GOOGLE_MAPS_APIKEY}`
      ).then((res) => res.json())
      .then(data => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      });
      
    };

    getTravelTime();
  },[origin,destination,GOOGLE_MAPS_APIKEY])

  return (
    <MapView
    ref={mapRef}
      style={tw`flex-1`}
      // mapType="mutedStandard"
      region={{
        latitude: 6.855637635697559, // origin.location.lat
        longitude: 79.90827913755678, // origin.location.lng
        latitudeDelta: 0.015, //0.015
        longitudeDelta: 0.0121, //0.0121
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: 37.78825, // origin.location.lat
            longitude: -122.4324, // origin.location.lng
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
