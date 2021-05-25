import Table from './Components/Table'
import Modal from './Components/Modal'
import contact from './store/contacts'
import './App.css';

function App() {

  function onSubmit(newContact) {
    contact.addContact(newContact)
  }
  return (
    <div className="App">
      <Table contact={contact} />
      <Modal handleSubmit={onSubmit} />
    </div>
  );
}

export default App;
