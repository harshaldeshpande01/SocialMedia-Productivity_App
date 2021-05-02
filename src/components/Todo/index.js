import React, {useEffect, useState} from "react";
import { ListItem, ListItemText} from "@material-ui/core";

export default function TodoListItem({ todo, lastdate, inprogress, id }) {

    const [message, setMessage] = useState('Hello');
    const [colour, setColour] = useState();
   
    const current_date = new Date();
    const todo_date = lastdate.toDate();
    const date = todo_date.getDate().toString() + '/' + (todo_date.getDay() + 1).toString() + '/' + todo_date.getFullYear().toString()

    
    useEffect(() => {

        if(current_date.getDate() === todo_date.getDate()) {
            setMessage('Deadline today‼');
            setColour('red');
        }
        if(current_date.getDate() < todo_date.getDate()) {
            let temp = todo_date.getDate() - current_date.getDate();
            setMessage(temp + ' days left');
            setColour('green');
        }
        if(current_date.getDate() > todo_date.getDate()) {
            setColour('gray');
            setMessage('Deadline exceded');
        }

    }, []);


//   function toggleInProgress() {
//     db.collection("todos").doc(id).update({
//       inprogress: !inprogress,
//     });
//   }

//   function deleteTodo() {
//     db.collection("todos").doc(id).delete();
//   }

  return (
    <div style={{ display: "flex", padding: '1em', backgroundColor: 'white', alignItems: 'center', marginBottom: '1px', justifyContent: 'space-between'}}>
      {/* <ListItem>
        <ListItemText
            primary={todo}
            secondary={date}
        />
      </ListItem> */}
      <div>
          <b>{todo}</b> - 
          <span style={{color: 'gray'}}>{date}</span>
      </div>

    <span style={{color: colour}}> 
        {message}
    </span>
    </div>
  );
}