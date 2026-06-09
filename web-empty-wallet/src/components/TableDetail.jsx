import iconDelete from '../assets/delete.svg'
import  { formatterEuro } from '../utils/utils'

const TableDetail = ({ data, handleDeleteAmount }) => {
    const totalAmount = data.reduce((acc, item) => acc + item.amount, 0)

    return (
        <div className='table text-small'>
            <div className='table_row table_header'>
                <div className='table_cell'>Fecha</div>
                <div className='table_cell'>Importe</div>
                <div className='table_cell'></div>
            </div>
            {
                data.map((result) => (
                    <div className='table_row' key={result.id}>
                        <div className='table_cell'>{result.fdate}</div>
                        <div className='table_cell'>{formatterEuro.format(result.amount)}</div>
                        <div className='table_cell'>
                            <button
                                className='button button--danger '
                                onClick={() => handleDeleteAmount(result.id)}
                            >
                                <img src={iconDelete} alt='delete'/>
                            </button>
                        </div>
                    </div>
                ))
            }
            <div className='table_row table_footer'>
                <div className='table_cell colspan text-bold text-center'>Total en curso: { formatterEuro.format(totalAmount) }</div>
            </div>
        </div>
    )
}

export default TableDetail




