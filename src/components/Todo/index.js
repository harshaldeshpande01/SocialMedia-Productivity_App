import React, {useEffect, useState} from "react";

export default function TodoListItem({ todo, lastdate, inprogress, id }) {

    const [message, setMessage] = useState('Hello');
    const [colour, setColour] = useState();
   
    const current_date = new Date();
    const todo_date = lastdate.toDate();
    const date = todo_date.getDate().toString() + '/' + (todo_date.getMonth() + 1).toString() + '/' + todo_date.getFullYear().toString()

    
    useEffect(() => {

      if(current_date.getMonth() === todo_date.getMonth()) {

        if(current_date.getDate() === todo_date.getDate()) {
            setMessage('Today‼');
            setColour('red');
        }
        if(current_date.getDate() < todo_date.getDate()) {
            let temp = todo_date.getDate() - current_date.getDate();
            setMessage(temp + ' days left');
            setColour('green');
        }
        if(current_date.getDate() > todo_date.getDate()) {
            setColour('gray');
            setMessage('Completed');
        }
      }
      else if (current_date.getMonth() > todo_date.getMonth()) {
        setColour('gray');
        setMessage('Completed');
      }
      else {
        let temp = todo_date.getDate() - current_date.getDate();
        temp = temp + 30*(todo_date.getMonth() - current_date.getMonth())
        setMessage(temp + ' days left');
        setColour('green');
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
    <>
    <div style={{ display: "flex", padding: '1em', backgroundColor: 'white', alignItems: 'center', marginBottom: '1px', justifyContent: 'space-between'}}>
      <div>
          <b>{todo}</b> - 
          <span style={{color: 'gray'}}>{date}</span>
      </div>

    <span style={{color: colour}}> 
        {message}
    </span>
    </div>
    <hr />
    </>
  );
}