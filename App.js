import React, { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';

const DATA = Array.from({length: 5}, (_, i) => ({id: i.toString()}));

const handleOnSelect = (selectedIds, setSelected, id) => {
  if (selectedIds.includes(id)) {
    setSelected(selectedIds.filter((selectedId) => selectedId !== id));
  } else {
    setSelected([...selectedIds, id]);
  }
}

const renderItem = (selectedIds, setSelected) => ({ item }) => {
  const backgroundColor = selectedIds.includes(item.id) ? 'blue' : 'grey';

  return (
    <TouchableOpacity
      onPress={() => handleOnSelect(selectedIds, setSelected, item.id)}
      style={[styles.item, { backgroundColor: backgroundColor }]}
    />
  );
};

export default function App() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [data, setData] = useState(DATA);

  const deleteSelectedItems = () => {
    const newData = data.filter(item => !selectedIds.includes(item.id));
    setData(newData);
    setSelectedIds([]); // Clear selection after deletion
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem(selectedIds, setSelectedIds)}
        keyExtractor={(item) => item.id}
        extraData={selectedIds}
        />
      <Button title="Reset" onPress={() => setSelectedIds([])} />
      <Button title="Delete" onPress={deleteSelectedItems} />
    </SafeAreaView>
  );
}

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