import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { Tag } from '../../components/Tag';

import {
  Container,
  Content,
  Links,
} from './styles';

import './styles.js';


export function Details(){
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  //Functions
  function handleBack(){
    navigate(-1);
  }
  
  async function handleRemove(){
    const confirm = window.confirm("Deseja remover a nota?");

    if(confirm){
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  //Effects
  useEffect( () => {
    async function fetchNotes(){
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNotes();
  }, []);
  
  return(
    <Container>
      <Header />

      {
        data && 
        <main>
        <Content>
          <ButtonText
          title="Excluir nota"
          onClick={handleRemove}
          />

          <h1>{data.title}</h1>
          <p>{data.description}</p>
          
          {data.links &&
            <Section title="Links úteis">
              <Links>
                {data.links.map( link => (
                    <li key={String(link.id)}>
                      <a 
                      href={link.url}
                      target='_blank'
                      >
                        {link.url}
                      </a>
                    </li>
                  ))}
              </Links>
          </Section>
          }

          {
            data.tags &&
            <Section title="Marcadores">
              {
                data.tags.map( tag => (
                  <Tag key={tag.id} title={tag.name}/>
                ))
              }    
            </Section>

          }
          
          <Button 
          title="Voltar" 
          onClick={handleBack}
          />
        </Content>
      </main>
      }
    
    </Container>
  );
}

