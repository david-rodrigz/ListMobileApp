import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';

// const DATA = Array.from({length: 5}, (_, i) => ({id: i.toString()}));
const DATA = [
  { "id": "0", "text": "A" }, 
  { "id": "1", "text": "B" }, 
  { "id": "2", "text": "C" }, 
  { "id": "3", "text": "D" }, 
  { "id": "4", "text": "E" }
];

const handleOnSelect = (selectedIds, setSelected, id) => {
  if (selectedIds.includes(id)) {
    setSelected(selectedIds.filter((selectedId) => selectedId !== id));
  } else {
    setSelected([...selectedIds, id]);
  }
}

const renderItem = (selectedIds, setSelected) => ({ item }) => {
  const borderColor = selectedIds.includes(item.id) ? '#72a4d4' : 'white';
  const backgroundColor = selectedIds.includes(item.id) ? '#f4f4f4' : 'white';

  return (
    <TouchableOpacity
      onPress={() => handleOnSelect(selectedIds, setSelected, item.id)}
      style={[
        styles.textContainer, 
        { borderWidth: 2 }, 
        { backgroundColor: backgroundColor }, 
        { borderColor: borderColor }
      ]}
    >
      <Text style={styles.text}>{item.text}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [data, setData] = useState(DATA);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newText, setNewText] = useState();
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
    const newItem = { id: newId.toString(), text: itemText ? itemText : "" };
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
          value={newText} 
          onChangeText={text => setNewText(text)} 
          onBlur={() => setDisplayPrompt(false)} // Hide prompt when text input is deselected
          onSubmitEditing= {() => {
            addNewItem(newText);
            setNewText(null);
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
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
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 60,
    backgroundColor: 'white',
    borderColor: '#C0C0C0',
    width: '90%',
  },
});