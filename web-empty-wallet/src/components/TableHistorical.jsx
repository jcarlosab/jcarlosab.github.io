import { formatterEuro, getNameMonth } from '../utils/utils'

const TableHistorical = ({ result }) => {
    return (
        <div className='table text-small'>
            <div className='table_row table_header'>
                <div className='table_cell'>Mes</div>
                <div className='table_cell'>Super</div>
                <div className='table_cell'>Gasoil</div>
                <div className='table_cell'>Otros</div>
            </div>
            {
            result.data.map((data, index) => (
                <div className='table_row' key={index}>
                    <div className='table_cell'>{getNameMonth(data.Month).substring(0, 3)}</div>
                    <div className='table_cell'>{formatterEuro.format(data.Super)}</div>
                    <div className='table_cell'>{formatterEuro.format(data.Gasoil)}</div>
                    <div className='table_cell'>{formatterEuro.format(data.Otros)}</div>
                </div>
            ))}
        </div>
    )
}

export default TableHistorical




