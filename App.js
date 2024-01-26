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
    console.log(data);
  };

  const addNewItem = () => {
    const newId = data.length == 0 ? 0 : Math.max(...data.map(item => parseInt(item.id))) + 1;
    const newItem = { id: newId.toString() };
    setData([...data, newItem]);
    setSelectedIds([]); // Clear selection after deletion
    console.log(data);
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
      <Button title="Add" onPress={addNewItem} />
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