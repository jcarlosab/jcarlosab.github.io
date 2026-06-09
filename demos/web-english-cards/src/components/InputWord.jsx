/* eslint-disable react/prop-types */
import { useEffect } from "react"

const InputWord = ({ input, handleValidate, handleChange, isInputDisabled }) => {
	const focusInput = () => {
		document.querySelector('input').focus()
	}

	useEffect(()=> {
		focusInput()
	},[isInputDisabled])

	return (
		<div className="input-word">
			<input
			type="text"
			value={input}
			onKeyDown={(e) => input != '' && e.key === 'Enter' && handleValidate()}
			onChange={handleChange}
			disabled={isInputDisabled}
			placeholder='palabra...'
			/>
			<button
			className="btn-add"
			onClick={handleValidate}
			disabled={!input}
			>
				Validar
			</button>
      </div>
	)
}

export default InputWord
