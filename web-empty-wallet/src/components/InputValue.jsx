const InputValue = ({ inputValue, handleAddAmount, handleInputChange }) => {
    return (
        <div className='add-number'>
            <div className='input-button-wrapper'>
                <input
                    className='add-number_input'
                    type='text'
                    inputMode='decimal'
                    value={inputValue.replace(',', '.')}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddAmount()}
                    onChange={handleInputChange}
                    placeholder='0.00'
                />
                <button
                    className='button button--primary input-inside-btn'
                    onClick={handleAddAmount}
                    disabled={!inputValue}
                    type="button"
                >
                    Añadir
                </button>
            </div>
        </div>
    )
}

export default InputValue
