import React, { useState } from 'react'
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

import {
    Container,
    Form,
} from './styles';
import { TextArea } from '../../components/TextArea';

export const New = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    async function handleNewNote(){
        
        if(!title === ""){
            return alert("Título obrigatório!")
        }
        if(newLink){
            return alert("Existe um LINK para adicionar no campo! Clique em Adicionar ou deixe o campo vazio!")
        }
        if(newTag){
            return alert("Existe uma TAG para adicionar no campo! Clique em Adicionar ou deixe o campo vazio!")
        }
        
        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });
        alert("Nota Criada com sucesso!")
        navigate(-1);
        /* setTitle("");
        setDescription("");
        setLinks([]);
        setTags([]); */
    }

    function handleAddLink(){
        if(newLink === "") {
            return alert("Link não pode ser vazio!")
        }
        setLinks( prevState => [...prevState, newLink]);
        setNewLink("");
    };
    
    function handleRemoveLink(deleted){
        setLinks( prevState => prevState.filter( link => link !== deleted));
    };

    function handleAddTag(){
        if(newTag === "") {
            return alert("Link não pode ser vazio!")
        }
        setTags( prevState => [...prevState, newTag]);
        setNewTag("");
    }
   
    function handleRemoveTag(deleted){
        setTags( prevState => prevState.filter( tag => tag !== deleted));
    }
    
    function handleBack(){
        navigate(-1)
    }

  return (
    <Container>
        <Header />

        <main>
            <Form>
                <header>
                    <h1>Criar nota</h1>
                    <ButtonText 
                    title="Voltar"
                    onClick={handleBack}
                    >
                        Voltar
                    </ButtonText>
                </header>
                
                <Input 
                placeholder="Título"
                type="text"
                value={title}
                onChange={ ({ target }) => setTitle(target.value)}
                />
                
                <TextArea 
                value={description}
                placeholder="Descrição:"
                onChange={ ({ target }) => setDescription(target.value)}
                />

                <Section title="Links úteis">
                    {
                        links && links.map( (link, index) => (
                            <NoteItem
                                key={String(index)} 
                                value={link}
                                onClick={ () => handleRemoveLink(link)}
                            />
                        ))
                    }
                    <NoteItem 
                    isNew 
                    placeholder="Novo Link" 
                    value={newLink}
                    onChange={ ({ target }) => setNewLink(target.value) }
                    onClick={handleAddLink}
                    />
                </Section>

                <Section title="Marcadores">
                    <div className='tags'>
                        {
                            tags && tags.map( (tag, index) => (
                                <NoteItem 
                                key={String(index)}
                                value={tag}
                                onClick={ () => handleRemoveTag(tag)}
                                />
                            ))
                        }
                        <NoteItem 
                        isNew 
                        placeholder="Nova tag" 
                        value={newTag}
                        onChange={ ({ target }) => setNewTag(target.value)}
                        onClick={handleAddTag}
                        />
                    </div>
                </Section>

                <Button 
                title="Salvar"
                onClick={handleNewNote}
                />
            </Form>
        </main>
    </Container>
  )
}
