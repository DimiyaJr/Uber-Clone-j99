import { FlatList, Text, TouchableOpacity, View,Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_550,h_366/v1569012661/assets/19/dea9bc-88d6-461e-a233-17ed4d8cdc09/original/Taxi.png",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://logowik.com/content/uploads/images/uber-eats2124.jpg",
    screen: "EatsScreen", // Change in future...
  },
];

const NavOptions = () => {
const navigation = useNavigation();
const origin = useSelector(selectOrigin);

  return (
    <FlatList
    data={data}
    horizontal
    keyExtractor={(item) => item.id}
    renderItem={({item})=> (
        <TouchableOpacity

        onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-9 pb-8 pt-4 m-2 w-40`}
            //disabled={!origin}
        >

          
            <View >
                <Image
                //style={tw`${!origin && "opacity-20"}`} this should be come to the 42 line view style
                style={{paddingLeft:10 ,width:150, height: 150, resizeMode: "contain"}}
                source={{uri: item.image}}
                />

                <Text style={tw`pl-5 mt-2 text-lg font-semibold`}>{item.title}</Text>
                <Icon
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                 name="arrowright" color="white" type="antdesign"
                />

            </View>
        </TouchableOpacity>
    )}
    />
  );
};

export default NavOptions;
