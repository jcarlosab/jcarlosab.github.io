import { useMemo } from 'react'
import { getNameMonth } from '../utils/utils'

const useDataChart = (monthData) => {
  return useMemo(() => {
    const labels = monthData.data.map((element) => getNameMonth(element.Month));
    const data = monthData.data.map((element) => element.Total);

    return {
      chartData: {
        labels,
        datasets: [
          {
            label: 'Gastos',
            data,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
          },
        ],
      },
      chartOptions: {
        plugins: {
          title: {
            display: true,
            text: 'Gráfica de gasto anual',
          },
        },
      },
    };
  }, [monthData]);
};

export default useDataChart
