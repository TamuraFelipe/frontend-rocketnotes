import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import { FiPlus, FiSearch } from 'react-icons/fi';

import { Header } from '../../components/Header';
import { ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';

import {
    Container,
    Brand,
    Menu,
    Search,
    Content,
    NewNote
} from './styles';
import { Note } from '../../components/Note';

export const Home = () => {
    //States
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    const [tags, setTags] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);
    
    //Functions
    const navigate = useNavigate();
    function handleTagSelected(tagName){
        if(tagName === "all"){
            return setTagSelected([]);
        }

        const alreadySelected = tagSelected.includes(tagName);
        if(alreadySelected){
            const filteredTags = tagSelected.filter( tag => tag !== tagName);
            setTagSelected(filteredTags);
        } else {
            setTagSelected( prevState => [...prevState, tagName]);
        }
    };

    function handleDetails(id){
        navigate(`/details/${id}`);
    }

    //Effects
    useEffect( () => {
        async function fetchTags(){
            const response = await api.get("/tags");
            setTags(response.data)
        };
        fetchTags();
    }, []);
    
    useEffect( () => {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagSelected}`);
            setNotes(response.data);
        }
        fetchNotes();
    }, [tagSelected, search]);

  return (
    <Container>
        <Brand>
            <h1>RocketNotes</h1>
        </Brand>

        <Header />

        <Menu>
            <li>
                <ButtonText 
                title="Todos" 
                onClick={ () => handleTagSelected("all")} 
                isActive={tagSelected.length === 0}/>
            </li>
            {
                tags && tags.map( tag => (
                    <li key={tag.id}>
                        <ButtonText 
                        title={tag.name} 
                        onClick={ () => handleTagSelected(tag.name)}
                        isActive={tagSelected.includes(tag.name)}
                        />
                    </li>
                ))
            }
        </Menu>

        <Search>
            <Input 
            type="text"
            placeholder="Pesquisar pelo título..." 
            icon={FiSearch}
            onChange={ ({ target }) => setSearch(target.value)}
            />
        </Search>

        <Content>
            <Section title="Minhas notas">
                {notes &&
                    notes.map( note => (
                        <Note 
                        key={String(note.id)} 
                        data={note} 
                        onClick={ () => handleDetails(note.id)}
                        />
                    ))
                }
            </Section>
        </Content>

        <NewNote to='/new'>
            <FiPlus />
            Criar nota
        </NewNote>

    </Container>
  )
}

