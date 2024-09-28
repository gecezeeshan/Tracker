import { View, Text, StyleSheet, TextInput, Button, Pressable, SafeAreaView, FlatList, ImageBackground,Platform } from 'react-native'
import React, { useState } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';
const Game = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([
        { id: 1, item: 'FAjr', value: false },
        { id: 2, item: 'Zuhar', value: false },
        { id: 3, item: 'Asar', value: false },
        { id: 4, item: 'Maghrib', value: false },
        { id: 5, item: 'Isha', value: false },
    ]);


    // Handle the date change event
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // Keep picker open on iOS
        setDate(currentDate); // Set selected date
    };
  // Show the date picker
  const showDatePicker = () => {
    setShow(true);
  };

    // Function to handle changes to individual item states
    const handleChange = (id, newValue) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, value: newValue } : item
            )
        );
    };

    // Rendering each item as a TextInput
    const renderItem = ({ item }) => (


        <View style={[styles.box]}  >
            <Pressable
                onPress={() => {
                    handleChange(item.id, !item.value);
                }}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                    }
                ]}>
                <Text style={[styles.namazText, { backgroundColor: item.value == true ? 'green' : 'gray' }]}>{item.item}</Text>
            </Pressable>
        </View>
    );


    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };
    return (

        <SafeAreaView>
            <ImageBackground
                source={require('../assets/namazbg1.jpg')}
                resizeMode="cover" // Optional: "cover", "contain", "stretch", etc.
                //source={image} 
                resizeMode="cover" >

                <Button onPress={showDatePicker} title="Select Date" />
                <Text>Selected Date: {date.toDateString()}</Text>

                {show && (
                    <DateTimePicker
                        value={date}
                        mode="date" // Specify whether it's date or time picker
                        display="default" // Different display modes like "spinner" or "calendar"
                        onChange={onChange} // When the date changes
                    />
                )}

                {/* <View style={[styles.appContainer ]}>
                <View style={[styles.box, { flex: 6, backgroundColor: 'steelblue' }]} >
                    <Text style={[{ padding: 10 }, { textAlign: 'center', fontSize: 25, fontWeight: 'bold' }]}>S A L A H</Text>
                </View>
            </View> */}

                <View style={[styles.namazContainer]}>
                    <FlatList
                        data={items}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#f00',
        textShadowColor: 'black',
        color: 'black',
        flexDirection: 'row',
    },

    namazContainer: {
        marginTop: 200,
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center'

    },
    background: {
        flex: 1, // Ensures the background image takes up the entire screen
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        backgroundColor: 'black'

    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay for better text visibility
        padding: 20,
        borderRadius: 10,
    },

    itemContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
    },

    box: {
        marginTop: 20,
        width: 200,
        height: 50,
        border: 1,
    },
    namazText: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold'
    },


})

export default Game

