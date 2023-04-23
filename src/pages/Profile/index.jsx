import React, {useState} from 'react'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../hooks/auth";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { ButtonText } from '../../components/ButtonText';

import {
    Container,
    Form,
    Avatar,
} from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { api } from '../../services/api';

export const Profile = () => {
    const { user, updateProfiler } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passworldOld, setPassworldOld] = useState("");
    const [passworldNew, setPassworldNew] = useState("");
    
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1)
    }

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: passworldNew,
            old_password: passworldOld,
        }

        const userUpdated = Object.assign( user, updated );

        await updateProfiler({ user: userUpdated, avatarFile })
    }
    
    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    };
    
  return (
    <Container>
        <header>
            <button 
            type='button'
            onClick={handleBack}
            >
                <FiArrowLeft />
            </button>
        </header>
        <Form>
            <Avatar>
                <img 
                src={avatar} 
                alt={`Avatar de ${user.name}`}
                />
                <label htmlFor='avatar'>
                    <FiCamera />
                    <input 
                    type="file" 
                    id='avatar'
                    onChange={handleChangeAvatar}
                    />
                </label>
            </Avatar>

            <Input
            placeholder="Nome"
            type="text"
            icon={FiUser}
            value={name}
            onChange={ ({ target }) => setName(target.value)}
            />
            <Input
            placeholder="E-mail"
            type="email"
            icon={FiMail}
            value={email}
            onChange={ ({ target }) => setEmail(target.value)}
            />
            <Input
            placeholder="Senha atual"
            type="password"
            icon={FiLock}
            onChange={ ({ target }) => setPassworldOld(target.value)}
            />
            <Input
            placeholder="Nova Senha"
            type="password"
            icon={FiUser}
            onChange={ ({ target }) => setPassworldNew(target.value)}
            />

            <Button 
            title="Salvar" 
            onClick={handleUpdate}
            />
        </Form>

    </Container>
  )
}
