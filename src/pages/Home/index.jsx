import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'; 

import { FiPlus } from 'react-icons/fi';

import { api } from '../../services/api';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Note } from '../../components/Note';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

export function Home() {
  const [search, setSearch] = useState([]);
  const [tags, setTags] = useState([]); 
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected (tagName) {
    
    if(tagName === "all"){
      return tagsSelected([]);
    }


    const alreadySelected = tagsSelected.includes(tagName);

    if(alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);

    } else {
      setTagsSelected(prevState => [...prevState, tag.name]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);

  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/tags')  
      setTags(response.data);
    }
    
    fetchTags();
}, []);


  useEffect (() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?titles=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }


    fetchNotes();
  }, [tagsSelected, search]);


  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header></Header>

      <Menu>
        <li>
          <ButtonText 
            title="Todos"
            onClick={() => handleTagSelected('all') }
            isActive={tagsSelected.length === 0}
            />
        </li>

        {
          tags && tags.map(tag => (
            <li key={String(tag.id)} >
              <ButtonText 
                title={tag.name}  
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
              </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder ="Pesquisar pelo titulo" icon={FiSearch}
          onChange={(e) => handleSearch(e.target.value)}
          
        />

      </Search>

      <Content>
        <section title ="Minhas notas">
          {
            notes.map(note => (
              <note
               key={String(note.id)}
               data={note} 
               onClick={() => handleDetails(note.id)}
            />
          ))
        }
        </section>

      </Content>

      <NewNote to ="/new">
        <FiPlus/>
        Nova nota
      </NewNote>
    </Container>
  )
}