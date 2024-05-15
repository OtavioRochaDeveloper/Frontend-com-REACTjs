import { useState } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

import { useNavigate} from 'react-router-dom';

import { api } from '../../services/api';

import { Container, Form } from './styles';

export function New() {

  const [title, setTitle] = useState ('');
  const [description, setDescription] = useState ('');

  const [links, setLinks] = useState ({});
  const [newLink, setNewLink] = useState (''); 


  const [tags, setTags] = useState ({});
  const [newTag, setNewTag] = useState (''); 

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    setLinks(prevState=> [...prevState, newLink]);
    setNewLink('');
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState=> prevState.filter(link=> link !==deleted));
  }


  function handleAddTag() {
    setTags(prevState=> [...prevState, newTag]);
    setNewTag('');
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !==deleted));
 }

 async function handleNewNote(){
    if(!title) {
      return alert('Voce nao inseriu um titulo');
    }

    if(newLink) {
      return alert('Voce deixou um campo em aberto');
    }

    if(newTag) {
      return alert('Voce deixou um campo em aberto');
    }

   await api.post('/notes', {
     title,
     description,
     links,
     tags,
   });

   alert("Nota rriada com sucesso");
   navigate(-1);
 }


  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title ='voltar' 
              onClick={handleBack}
            />
          </header>

          <Input 
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
            
          />
          <Textarea 
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)} 
            
          />

          <Section title="links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String (index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
               />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo link"
              value={newLink}
              onChange={ e=> setNewLink (e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <section title="Marcadores">
            <div className="tags">
              { 
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                    
                  /> 
                ))
                 
              }

              <NoteItem 
                isNew 
                placeholder="Nova tag" 
                onChange={ e=> setNewTag (e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </section>

          <button 
            title="salvar"
            onClick={handleNewNote}
          />
          
        </Form>
      </main>
    </Container>
  );
}