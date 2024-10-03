import React, { useState, useEffect } from 'react';
import { View, Text,  FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MonthPicker from 'react-native-month-picker';
import moment from 'moment';

export default function HomeScreen({ navigation }) {
  const [dates, setDates] = useState([]);

  const [selectedMonthData, setSelectedMonthData] = useState({
    month: 9,
    year: 2024,
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);



  // Get all dates of the current month
  const getDatesInMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get last day of the month

    const dateArray : any = [];
    for (let day = 1; day <= daysInMonth; day++) {
        let date = new Date(year, month, day);
      dateArray.push(date);
    }
    return dateArray;
  };

  useEffect(() => {
    setDates(getDatesInMonth());
  }, []);

  // Render each date as a button in a grid
  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dateCell}
      onPress={() => navigation.navigate('Details', { date: item.toDateString() })}
    >
      <Text>{item.getDate()}</Text>
    </TouchableOpacity>
  );
  const [selectedDate, changeDate] = useState(null);
  return (
    <>
    
    <Text>
        {selectedDate
          ? `Selected date: ${moment(selectedDate).format('MM/YYYY')}`
          : 'Please select a date'}
      </Text>
      <MonthPicker
        selectedDate={selectedDate}
        onMonthChange={changeDate}
        onYearChange={newDate => console.log(newDate)}
        maxDate={moment()}
        minDate={moment('01-01-1995', 'DD-MM-YYYY')}
        currentMonthTextStyle={{ color: '#0aa9c2' }}
      />

    <View style={styles.container}>
      <FlatList
        data={dates}
        numColumns={7} // 7 columns for each day of the week
        keyExtractor={(item) => item.toISOString()}
        renderItem={renderDateItem}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  dateCell: {
    flex: 1,
    margin: 5,
    height: 50,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
