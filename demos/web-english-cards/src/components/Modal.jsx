/* eslint-disable react/prop-types */
import ButtonBack from './ButtonBack'

const Modal = ({ numberCards, counter }) => {
	
    const handleTest = () => {
		if (numberCards == counter.correct + counter.incorrect) {
			return ' active'
		} else {
            return ' inactive'
        } 
	}

	return (
        <div className={'modal' + handleTest()}>
            <div className="modal-content">
                <h2>Resultados</h2>
                <p>Correctas: {counter.correct}</p>
                <p>Incorrectas: {counter.incorrect}</p>
                <p>Ratio: {counter.correct * 100 / numberCards}%</p>
                <ButtonBack/>
            </div>
        </div>
	)
}

export default Modal