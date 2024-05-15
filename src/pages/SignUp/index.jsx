import { useState } from 'react';
import {FiLogIn, FiMail, FiLock, FiUser} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Input } from '../../components/Input';
import { Button } from '../../components/button';

import { Container, Form, background } from './styles';

export function SignUp () {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

     function handleSignUp(){
        if(!name || !email || !password) {
            alert("Preencha todos os campos");
            return;
        }

        api.post("/users", {name, email, password})
        .then(() => {
            alert("usuario cadastrado com sucesso");
            navigate("/");
        })
        .catch(error => {
            if(error.response){
                alert(error.response.data.message);
            }else {
                alert("Nao foi possivel cadastrar");
            }
        })

    }

    return (
        <Container>
            <background />

            <form>
                <h1>Rocket Notes</h1>
                <p>Aplicacao para Salvar e gerenciar seus links uteis.</p>
                
                <h2>Crie sua conta</h2>

                <input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange ={e => setName(e.target.value)}
                />

                <input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange ={e => setEmail(e.target.value)}
                />

                <input 
                    placeholder="Senha"
                    type="Password"
                    icon={FiLock}
                    onChange ={e => setPassword(e.target.value)}
                />

                <button title='Cadastrar' onClick={handleSignUp}/>

                <link to="/">
                    Voltar para o login
                </link>
                      

            </form>

        </Container>
    )
}