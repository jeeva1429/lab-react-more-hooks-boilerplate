import React, { useState, useReducer , useRef,useEffect} from 'react';
import '../components/useReducer.css'
const initialState = {
  notes: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_LIST':
      return {
        ...state,
        notes: [...state.notes, { title: action.payload, isHidden: false }],
      };
    case 'EDIT_lIST':
      return {
        notes: state.notes.map((note, index) => {
          if (index === action.payload) {
            return {
              ...note,
              isHidden: !note.isHidden,
            };
          }
          return note;
        }),
      };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [items, setItems] = useState('');
  const inputRef = useRef(null);
  

  // This fucntion is to add the items entered by the user into the list
  const handleAddToList = () => {
    dispatch({ type: 'ADD_TO_LIST', payload: items });
    setItems('');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // check if Enter key was pressed
      handleAddToList();
    }
  }; 

  // This function is to toggle the content inside the list
  const handleEditToList = (index) => {
    dispatch({ type: 'EDIT_lIST', payload: index });
  };

  // This function is used to get back the focus to input box.
    const GetBackToWriting = () => {
      inputRef.current.focus();
    };

  // This function is to get the values of the input box
  const handleInputChange = (e) => setItems(e.target.value);

  return (
    <div>
      <input ref={inputRef} value={items} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
      <button onClick={handleAddToList}>Add Item</button>
      {state.notes.map((note, index) => (
        <div key={index} className="list">
          <span>{note.isHidden ? 'Content is hidden' : note.title}</span>
          <button onClick={() => handleEditToList(index)}>Toggle</button>
        </div>
      ))}
      <div id='focus-btn-div'><button id='focus' onClick={GetBackToWriting}>Get back to Writing</button></div>
    </div>
  );

}
export default TodoList;
