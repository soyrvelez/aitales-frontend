// components > AllScenes > AllScenes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SceneCard from '../SceneCard/SceneCard';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';



export default function AllScenes() {
    const { userId } = useParams();
    const [scenes, setScenes] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchScenes = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/scenes/explore/${userId}`);
            console.log('DEBUGGING', response);
            
            setScenes(response.data);
            // if (response.data.character && response.data.character.length > 0) {
            //   setScenes({ ...response.data, characterName: response.data.character[0].name });
            //   console.log("Testing scene fetch", scene)
            // } else {
            //   setScenes({ ...response.data, characterName: 'Unknown' });
            //   console.log("Testing scene fetch", scene)
            // }
            
            setLoading(false);
          } catch (error) {
            console.log("An error occurred:", error);
            setLoading(false);
          }
        };
    
        fetchScenes();
      }, [userId]);
    
      if (isLoading) return <p>Loading...</p>;
      if (!scenes) return <p>No scene data found</p>;

    return (
      <Container maxWidth="sm"> 
        <Stack spacing={2}>
            {scenes.map(scene => (
                <SceneCard key={scene._id} scene={scene} />
            ))}
        </Stack>
      </Container>
    );
}