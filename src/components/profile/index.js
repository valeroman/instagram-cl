import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { getUserPhotosByUsername } from '../../services/firebase';
import Header from './header';
import Photos from './photos';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
};

export default function Profile({user}) {
    const [{profile, photosCollection, followerCount}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUsername(user.username);
            // console.log('user__', user);
            // console.log('photos', photos);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }

        
        getProfileInfoAndPhotos();
        
    }, [user]);

    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string
    })
}
