import React, { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';

const DATA = Array.from({length: 5}, (_, i) => ({id: i.toString()}));

const handleOnPress = (selectedIds, setSelected, id) => {
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
    onPress={() => handleOnPress(selectedIds, setSelected, item.id)}
      style={[
        styles.item,
        { backgroundColor: backgroundColor },
      ]}
    />
  );
};

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