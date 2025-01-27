import React, { useState, useEffect } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';

const CharList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const marvelService = new MarvelService();

    const loadRandomCharacters = async () => {
        setLoading(true);
        const newCharacters = [];
        for (let i = 0; i < 9; i++) {
            const randomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            const character = await marvelService.getCharacter(randomId);
            newCharacters.push(character);
        }
        setCharacters(prevCharacters => [...prevCharacters, ...newCharacters]);
        setLoading(false);
    };

    useEffect(() => {
        loadRandomCharacters();
    }, []);

    return (
        <div className="char__list">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <ul className="char__grid">
                        {characters.map((char, index) => (
                            <li className="char__item" key={index}>
                                <img
                                    src={char.thumbnail}
                                    alt={char.name}
                                    style={{ objectFit: char.isImageAvailable ? 'contain' : 'cover' }}
                                />
                                <div className="char__name">{char.name}</div>
                            </li>
                        ))}
                    </ul>
                    <button className="button button__main button__long" onClick={loadRandomCharacters}>
                        <div className="inner">load more</div>
                    </button>
                </>
            )}
        </div>
    )
}

export default CharList;