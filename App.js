import React, { useState } from 'react';
import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

// list items
const DATA = [
  { title: 'First Item', selected: false },
  { title: 'Second Item', selected: false },
  { title: 'Third Item', selected: false },
];


export default function App() {
  // state array for list entries
  const [listEntries, setlistEntries] = useState(DATA);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.listContainer}
        data = {listEntries}
        renderItem = {({ item }) => <Text style={styles.listItem}>{item.title}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  listItem: {
    padding: 6,
  },
  selectedItem: {
    borderWidth: 1,
    borderBlockColor: 'blue',
    borderRadius: 6,
    padding: 6,
  }
});
