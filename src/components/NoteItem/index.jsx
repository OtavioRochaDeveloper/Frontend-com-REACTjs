import { FiPlus,FiX } from 'react-icons'; 

import { Container } from './styles';

export function NoteItem ({ isNew, value, onClick, ...rest}) {
    return (
        <Container isNew={isNew} onClick={onClick} {...rest}>
            <input 
            type='text'
            value={value}
            readOnly={!isNew}
            {...rest}
            />

            <button
                type="button"
                onClick={onClick}
                className= {isNew ? 'button-add' : 'button-remove' }
            >
                {isNew ? <FiPlus/> : <FiX/>}
            </button>

        </Container>
    );
};