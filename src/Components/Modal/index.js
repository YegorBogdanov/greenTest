import { Input } from 'antd';
import clsx from 'clsx'
import './index.scss'
import { useState } from 'react'

const Modal = ({ handleSubmit }) => {

  const [isOpened, setIsOpened] = useState(false)
  const [inputs, setInputs] = useState({})
  function handleChange({ target: { value, name } }) {
    setInputs({ ...inputs, [name]: value })
  }
  function handleSave() {
    setIsOpened(false)
    handleSubmit({ ...inputs, phoneNumbers: typeof inputs.phoneNumbers === 'string' ? inputs.phoneNumbers.split(',') : inputs.phoneNumbers, key: Math.random().toString(32).slice(3, 12) })
    clear()
  }
  function handleDecline() {
    setIsOpened(false)
    clear()
  }
  function handleOpen() {
    setIsOpened(!isOpened)
  }
  function clear() {
    setInputs({})
  }
  return (
    <>
      <div onClick={handleOpen} className='addButton'> Добавить контакт</div>
      <div className={clsx(!isOpened && 'dispNone', isOpened && 'modal')}>
        <Input onChange={handleChange} name='lastName' value={inputs.lastName} placeholder='Фамилия'></Input>
        <Input onChange={handleChange} name='name' value={inputs.name} placeholder='Имя'></Input>
        <Input onChange={handleChange} name='phoneNumbers' value={inputs.phoneNumbers} placeholder='Телефон'></Input>
        <Input onChange={handleChange} name='email' value={inputs.email} placeholder='Email'></Input>

        <div className='buttonContainer'>
          {/* <div onClick={handleSave} className='button save'>Сохранить</div> */}
          <div onClick={handleDecline} className='button decline'>Отмена</div>
        </div>
      </div>
    </>
  )
}

export default Modal