import React, { Component } from 'react';
import './InputCard.css';
import orderDosages from '../../utils/orderDosages.js';

class InputCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { type, currentInput, handleInputChange, dosage, dosageErrors } = this.props;
		const { errorMessages, dosageNames } = orderDosages;

		return (
				<article className='input-container'>
					{ type === 'text' &&
							<div className='InputCard-text'>
								<div className='header-info-container'>
									<h4>{ dosageNames[dosage] }</h4>
									<a 
										href='https://github.com/raualex/crrt-teaching-tool-v2' 
										className='textbook-link'
									>
										<i className='far fa-question-circle'></i>
									</a>
								</div>

								<input 
									type='text'
									name={dosage}
									value={isNaN(currentInput) ? 0 : currentInput}
									onChange={event => handleInputChange(event)}
								/>
								<div className='input-error-container'>
									<p className='input-error-text'>{
										dosageErrors.includes(dosage) ? errorMessages[dosage] : ''
									}
									</p>
								</div>
							</div>
					}

					{
						type === 'radio' &&
							<div className='modality-radio'>
								<label>
									<input 
										type='radio'
										name='modality'
										value={dosage}
										checked={currentInput.modality === dosage}
										onChange={event => handleInputChange(event)}
									/>
									{ dosage }
										<a 
										href='https://github.com/raualex/crrt-teaching-tool-v2' 
										className='textbook-link'
										>
											<i className='far fa-question-circle'></i>
										</a>
								</label>
							</div>						
					}
				</article>
		)
	}
}

export default InputCard;