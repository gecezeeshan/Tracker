import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import MonthPicker from 'react-native-month-picker';
import moment from 'moment';

export default function HomeScreen({ navigation }) {


  // const [selectedMonthData, setSelectedMonthData] = useState({
  //   month: new Date().getMonth(),
  //   year: new Date().getFullYear(),
  // });
  const [dates, setDates] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [dm, setDM] = useState(0);
  const [selectedDate, changeDate] = useState(null);

  // Get all dates of the current month
  const getDatesInMonth = (d: Date) => {
    const now = new Date(d);
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get last day of the month
    //setDM(d.getDate());
    const dateArray: any = [];
    for (let day = 1; day <= daysInMonth; day++) {
      let date = new Date(year, month, day);
      dateArray.push(date);
    }
    return dateArray;
  };

  // useEffect(() => {
  //   setDates(getDatesInMonth());
  // }, []);

  // Render each date as a button in a grid
  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dateCell}
      onPress={() => navigation.navigate('Namaz', { date: item.toDateString() })}
    >
      <Text>{item.getDate()}</Text>
    </TouchableOpacity>
  );
  const ShowCalender = () => {
    setIsShow(!isShow);
  }

  const onMonthChange = (d) => {
    console.log(d);
    setIsShow(false);
    setDates(getDatesInMonth(d));

  }
  return (
    <>


      {/* <Text>
        {selectedDate
          ? `Selected date: ${moment(selectedDate).format('MM/YYYY')}`
          : 'Please select a date'}
      </Text> */}
      <Button title="Select Month" onPress={ShowCalender} />


      {isShow && <MonthPicker
        selectedDate={selectedDate}
        onMonthChange={onMonthChange}
        onYearChange={newDate => console.log(newDate)}
        maxDate={moment()}
        minDate={moment('01-01-1995', 'DD-MM-YYYY')}
        currentMonthTextStyle={{ color: '#0aa9c2' }}
      />}

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
