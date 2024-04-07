import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { useSelector,useDispatch } from "react-redux";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/bike-4086577-3402151.png?f=webp&w=256",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image:
      "https://cdn.iconscout.com/icon/free/png-512/free-car-1080-449858.png?f=webp&w=256",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/van-423-984764.png?f=webp&w=256",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text} </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={[
              tw`flex-row justify-between items-center px-10`,
              item.id === selected?.id && tw`bg-gray-200`,
            ]}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>Rs 1000
              {/* {new Intl.NumberFormat('en-gb',{
                style: 'currency',
                currency: 'GBP'
              }).format(
                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) /100
              )} */}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-1 m-2 ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>
            {selected ? `Choose ${selected.title}` : 'Select a ride to proceed'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
