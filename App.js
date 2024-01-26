import React, { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Button, View } from 'react-native';

const DATA = Array.from({length: 5}, (_, i) => ({id: i.toString()}));

const Item = ({ id, selected, onSelect }) => (
  <TouchableOpacity
    onPress={() => onSelect(id)}
    style={[
      styles.item,
      { backgroundColor: selected ? 'blue' : 'grey' },
    ]}
  />
);

const renderItem = (selectedId, onSelect) => ({ item }) => {
  const backgroundColor = item.id === selectedId ? 'blue' : 'grey';

  return (
    <Item
      id={item.id}
      selected={backgroundColor === 'blue'}
      onSelect={onSelect}
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
    padding: 40,
  },
});

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem(selectedId, setSelectedId)}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <Button title="Reset" onPress={() => setSelectedId(null)} />
    </View>
  );
}