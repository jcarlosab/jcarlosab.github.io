import { useState } from 'react'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import useHistoricalData from '../hooks/useHistoricalData'
import iconAdd from '../assets/add.svg'
import iconRemove from '../assets/remove.svg'
import Loader from '../components/Loader'
import LineChart from '../components/LineChart'
import TableHistorical from '../components/TableHistorical'
import EmptyState from '../components/EmptyState'

const PageHistoricalData = () => {
  const { results, isLoading } = useHistoricalData()
  const [activeIndex, setActiveIndex] = useState(0)
  Chart.register(CategoryScale)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  if (isLoading) {
    return <Loader />
  }

  if (results.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      {[...results].reverse().map((result, index) => (
        <div key={result.Year} className="accordion">
          <div
            className="accordion_header d-flex"
            onClick={() => toggleAccordion(index)}
          >
            <div className="text-bold">{result.Year}</div>
            <img
              src={activeIndex === index ? iconRemove : iconAdd}
              alt="icon action"
            />
          </div>
          {activeIndex === index && (
            <div className="accordion_content">
              <TableHistorical result={result} />
              <LineChart monthData={result} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default PageHistoricalData
