import {useState} from 'react';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ButtonText } from '../../components/ButtonText';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { Container, form, Avatar } from './styles';
import { useNavigate } from 'react-router-dom';

export function Profile() {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState('');
    const [passwordNew, setPasswordNew] = useState('');

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    const [ avatar, setAvatar ] = useState(avatarUrl);
    const [ avatarFile, setAvatarFile ] = useState(null);

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
      }

    async function handleUpdate() {
            const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        }
        
        const userUpdate = Object.assign(user, updated);

        await updateProfile({ user: userUpdate, avatarFile });
    }


    function handleChangeAvatar(e) {
        const file = e.target.files[0] ;
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }


    return (
        <Container>
            <header>
                <Button type='button' onClick={handleBack}>
                    <FiArrowLeft/>
                </Button>
            </header>

            <form>
                <avatar>
                    <img
                    src={avatar} 
                    alt="Foto do usuario" />

                    <label htmlFor="avatar">
                        <FiCamera/>

                        <input
                            id="avatar"
                            type='file'
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </avatar>
                <input
                    placeholder='Nome'
                    type='text'
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}

                />

                <input
                    placeholder='E-mail'
                    type='text'
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    
                />

                <input
                    placeholder='Senha atual'
                    type='password'
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                    
                />

                <input
                    placeholder='Nova senha'
                    type='password'
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                    
                />

                <Button title='Salvar' onClick={handleUpdate} />

            </form>
        </Container>
    )
}