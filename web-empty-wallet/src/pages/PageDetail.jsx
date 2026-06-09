import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useListAmount from '../hooks/useListAmount'
import InputValue from '../components/InputValue'
import Loader from '../components/Loader'
import TableDetail from '../components/TableDetail'
import EmptyState from '../components/EmptyState'

const PageDetail = () => {
  const { id } = useParams()
  const { listAmount, isLoading, addItem, deleteItem } = useListAmount(id)
  const [inputValue, setInputValue] = useState('')

  const handleAddAmount = () => {
    if (!inputValue) return
    const date = new Date()

    const newItem = {
      id: parseInt(Date.now() * Math.random()),
      fdate: date.toLocaleDateString(),
      amount: parseFloat(inputValue),
      month: date.getMonth(),
      year: date.getFullYear(),
      category: id,
    }
    addItem(newItem)
    setInputValue('')
  };

  const handleDeleteAmount = (id) => deleteItem(id)

  const handleInputChange = (event) => {
    const regex = /^[0-9]*[.,]?[0-9]*$/
    if (regex.test(event.target.value)) {
      setInputValue(event.target.value)
    }
  };

  return (
    <div>
      <InputValue
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleAddAmount={handleAddAmount}
      />
      {isLoading ? (
        <Loader />
      ) : listAmount.length === 0 ? (
        <EmptyState />
      ) : (
        <TableDetail data={listAmount} handleDeleteAmount={handleDeleteAmount} />
      )}
    </div>
  );
};

export default PageDetail;
