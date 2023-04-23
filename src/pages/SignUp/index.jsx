import React, { useState } from 'react'
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import {
    Container,
    Form,
    Background,
} from './styles';

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp(){
    if(!name || !email || !password){
      return alert("Preencha todos os campos!")
    }

    api.post("/users", { name, email, password })
    .then(() => {
      alert("Usuário Cadastrado com sucesso!")
      navigate("/");
    })
    .catch((error) => {
      if(error.response){
        alert(error.response.data.message);
      } else {
        alert("Não foi possível cadastrar!")
      }
    });
  };

  return (
    <Container>
        <Background />
        <Form>
            <h1>RocketNotes</h1>
            <p>Aplicação para salvar e gerenciar seus links úteis.</p>

            <h2>Crie sua conta</h2>

            <Input 
            placeholder="Nome"
            type="text"
            icon={FiUser}
            onChange={ ({target}) => setName(target.value) }
            />
            <Input 
            placeholder="E-mail"
            type="text"
            icon={FiMail}
            onChange={ ({target}) => setEmail(target.value) }
            />
            <Input 
            placeholder="Senha"
            type="password"
            icon={FiLock}
            onChange={ ({target}) => setPassword(target.value) }
            />

            <Button 
            title="Cadastrar"
            onClick={handleSignUp}
            />

            <Link to="/">Voltar para o login</Link>
        </Form>
    </Container>
  );
};

