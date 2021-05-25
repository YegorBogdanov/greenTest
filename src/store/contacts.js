import { makeAutoObservable } from 'mobx'

class Contact {
  contacts = [{
    key: 123,
    name: 'Карл',
    lastName: 'Дудкин',
    email: '1@1.com',
    phoneNumbers: [123, 321, 432]
  }, {
    key: 312,
    name: 'Клара',
    lastName: 'Сидорова',
    email: '1@1.com',
    phoneNumbers: [123, 321, 432]
  }, {
    key: 1122,
    name: 'Николай',
    lastName: 'Петров',
    email: '1@1.com',
    phoneNumbers: [123, 321, 432]
  }, {
    key: 1222,
    name: 'Харитон',
    lastName: 'Ульянов',
    email: '1@1.com',
    phoneNumbers: [123, 321, 432]
  }, {
    key: 1322,
    name: 'Олег',
    lastName: 'Николаев',
    email: '1@1.com',
    phoneNumbers: [123, 321, 432]
  }, {
    key: 4122,
    name: 'Петя',
    lastName: 'Иванов',
    email: '1@1.com',
    phoneNumbers: [123, 321, 432]
  }]
  constructor() {
    makeAutoObservable(this)
  }
  addContact(contact) {
    this.contacts = [...this.contacts, contact]
  }
  setContacts(contacts) { this.contacts = contacts }
  removeContact(key) { this.contacts = this.contacts.filter((contact) => contact.key !== key) }
}

export default new Contact()