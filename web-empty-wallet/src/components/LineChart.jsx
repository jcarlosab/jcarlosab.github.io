import { Line } from 'react-chartjs-2'
import useDataChart from '../hooks/useDataChart'

// eslint-disable-next-line react/prop-types
const LineChart = ({ monthData }) => {

    const { chartData, chartOptions } = useDataChart(monthData);

    return (
        <div className='line-chart-container'>
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default LineChart