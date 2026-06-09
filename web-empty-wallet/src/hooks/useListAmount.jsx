import { useEffect, useState } from 'react'
import { getListAmount, addAmount, deleteAmount } from '../db/database'

const useListAmount = (categoryId) => {
  const [listAmount, setListAmount] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListAmount()
        setListAmount(data)
      } catch (error) {
        console.error('Error fetching amounts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const addItem = async (item) => {
    setListAmount((prev) => [...prev, item])
    try {
      await addAmount(item)
    } catch (error) {
      console.error('Error adding amount:', error)
    }
  }

  const deleteItem = async (id) => {
    setListAmount((prev) => prev.filter((item) => item.id !== id))
    try {
      await deleteAmount(id)
    } catch (error) {
      console.error('Error deleting amount:', error)
    }
  }

  const filteredList = listAmount
    .filter((item) => item.category === categoryId)
    .filter((item) => item.month === new Date().getMonth())
    .filter((item) => item.year === new Date().getFullYear())
    .reverse()

  return { listAmount: filteredList, isLoading, addItem, deleteItem }
}

export default useListAmount
