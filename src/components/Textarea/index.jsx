import { Container } from './styles';

export function Textarea ({ Value, ...rest}){
    Return (
        <Container type="textarea"
         {...rest}
        >
            {Value}
        </Container>
    )

}