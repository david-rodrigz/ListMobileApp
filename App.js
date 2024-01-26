import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';

// const DATA = Array.from({length: 5}, (_, i) => ({id: i.toString()}));
const DATA = [
  { "id": "0", "item": "A" }, 
  { "id": "1", "item": "B" }, 
  { "id": "2", "item": "C" }, 
  { "id": "3", "item": "D" }, 
  { "id": "4", "item": "E" }
];

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
  const [data, setData] = useState(DATA);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newItemText, setNewItemText] = useState();
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const inputRef = useRef();

  const deleteSelectedItems = () => {
    const newData = data.filter(item => !selectedIds.includes(item.id));
    setData(newData);
    setSelectedIds([]); // Clear selection after deletion
    console.log(data); // Debug
  };

  const addNewItem = (itemText) => {
    const newId = data.length == 0 ? 0 : Math.max(...data.map(item => parseInt(item.id))) + 1;
    const newItem = { id: newId.toString(), item: itemText ? itemText : "" };
    setData([...data, newItem]);
    setSelectedIds([]); // Clear selection after addition
    setDisplayPrompt(false); // Hide prompt after addition
    console.log(data); // Debug
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
      <Button title="Add" onPress={() => { 
        setDisplayPrompt(true); 
        inputRef.current.focus(); // Focus on text input
      }} />

      {/* New list item prompt text box */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.newItemPrompt}
      >
        <TextInput 
          ref={inputRef} // Ref for focusing on text input
          style={[styles.input, {display: displayPrompt ? 'flex' : 'none'}]} 
          placeholder={'New Item'} 
          value={newItemText} 
          onChangeText={text => setNewItemText(text)} 
          onBlur={() => setDisplayPrompt(false)} // Hide prompt when text input is deselected
          onSubmitEditing= {() => {
            addNewItem(newItemText);
            setNewItemText(null);
          }}
        />
      </KeyboardAvoidingView>
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
  newItemPrompt: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
});