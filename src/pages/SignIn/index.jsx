import { useState } from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {useAuth} from '../../hooks/auth';

import { Input } from '../../components/Input';
import { Button } from '../../components/button';

import { Container, Form, background } from './styles';

export function SignIn () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signIn} = useAuth();

    function handleSignIn(){
        signIn({ email, password });
    }
    
    return (
        <Container>
            <form>
                <h1>Rocket Notes</h1>
                <p>Aplicacao para Salvar e gerenciar seus links uteis.</p>
                
                <h2>Faca seu login</h2>

                <input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={ e => setEmail(e.target.value)}
                />

                <input 
                    placeholder="Senha"
                    type="Password"
                    icon={FiLock}
                    onChange={ e => setPassword(e.target.value)}
                />

                <button title='Entrar' onClick={handleSignIn}/>

                <link to="/Register">
                    Criar conta
                </link>
                      

            </form>

            <background />
        </Container>
    );
}