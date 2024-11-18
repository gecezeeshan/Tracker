
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Calendar() {

    const generateDays = (year, month) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month

        const days: any = [];

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: i,
                fullDate: new Date(year, month, i).toDateString(), // Optional: Full date
            });
        }
        return days;
    };

    const year = 2024; // Specify the year
    const month = 10; // Specify the month (0 = January, 10 = November)

    const days = generateDays(year, month);


    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Days of {new Date(year, month).toLocaleString('en-US', { month: 'long' })} {year}
                </Text>

                <FlatList
                    data={days}
                    keyExtractor={(item) => item.date.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.dayItem}>
                            <Text style={styles.dayText}>{item.date}</Text>
                            <Text style={styles.dateText}>{item.fullDate}</Text>
                        </View>
                    )}
                />
            </View>
            <SafeAreaView>


            </SafeAreaView>
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    dayItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayText: {
        fontSize: 16,
    },
    dateText: {
        fontSize: 14,
        color: 'gray',
    },
});

