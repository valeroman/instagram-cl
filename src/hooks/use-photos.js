
import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';


export default function usePhotos() {
    const [photos, setPhotos] = useState(null);

    const { user: {uid: userId = ''}} = useContext(UserContext);

    useEffect(() => {
        // example: [2, 1, 5] <- 2 being rapharl
        async function getTimelinePhotos() {
            const [{ following }] = await getUserByUserId(userId);

            let followedUserPhotos = [];

            // does the user actually follow people?
            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
            } 

            // re-arrange array to be newest photos first by dataCreated 
            followedUserPhotos.sort((a, b) => b.dataCreated - a.dataCreated);
            setPhotos(followedUserPhotos);
        }

        // console.log(userId);
        getTimelinePhotos();
    }, [userId]);

    return { photos };
}