import { useEffect, useState } from 'react'
import { getTotalAmountByCategory } from '../db/database'
import { groupByYear } from '../utils/utils'

const useHistoricalData = () => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await getTotalAmountByCategory()
        setResults(groupByYear(data))
      } catch (error) {
        console.error('Error fetching historical data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return { results, isLoading }
}

export default useHistoricalData
