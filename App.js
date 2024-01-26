import React, { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';

const DATA = Array.from({length: 5}, (_, i) => ({id: i.toString()}));

const Item = ({ id, selectedIds, backgroundColor, setSelected }) => (
  <TouchableOpacity
    onPress={() => {
      setSelected([...selectedIds, id])
    }}
    style={[
      styles.item,
      { backgroundColor: backgroundColor ? 'blue' : 'grey' },
    ]}
  />
);

const renderItem = (selectedIds, setSelected) => ({ item }) => {
  const backgroundColor = selectedIds.includes(item.id) ? 'blue' : 'grey';

  return (
    <Item
      id={item.id}
      selectedIds={selectedIds}
      backgroundColor={backgroundColor === 'blue'}
      setSelected={setSelected}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'grey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
  },
});

export default function App() {
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem(selectedIds, setSelectedIds)}
        keyExtractor={(item) => item.id}
        extraData={selectedIds}
      />
      <Button title="Reset" onPress={() => setSelectedIds([])} />
    </SafeAreaView>
  );
}