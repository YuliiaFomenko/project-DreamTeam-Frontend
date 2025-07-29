import React from 'react'
import { Link } from 'react-router-dom';
import css from './Creators.module.css';


const creators = [
  {
    id: 1,
    name: 'Naomi',
    img1x: 'https://placehold.co/200x200?text=Naomi',
    img2x: 'https://placehold.co/400x400?text=Naomi',
  },
  {
    id: 2,
    name: 'Andrii',
    img1x: 'https://placehold.co/200x200?text=Andrii',
    img2x: 'https://placehold.co/400x400?text=Andrii',
  },
  {
    id: 3,
    name: 'Emma',
    img1x: 'https://placehold.co/200x200?text=Emma',
    img2x: 'https://placehold.co/400x400?text=Emma',
  },
  {
    id: 4,
    name: 'Max',
    img1x: 'https://placehold.co/200x200?text=Max',
    img2x: 'https://placehold.co/400x400?text=Max',
  },
  {
    id: 5,
    name: 'Tony',
    img1x: 'https://placehold.co/200x200?text=Tony',
    img2x: 'https://placehold.co/400x400?text=Tony',
  },
  {
    id: 6,
    name: 'Tailor',
    img1x: 'https://placehold.co/200x200?text=Tailor',
    img2x: 'https://placehold.co/400x400?text=Tailor',
  },
];


const Creators = () => {
  return (
    <section className={css.section}>
      <div className='container'>
          <div className={css.titleline}>
            <h2 className={css.title}>Top Creators</h2>
              <Link to="/creators" className={css.link}>
                  Go to all Creators
              <svg className={css.icon} width="25" height="25">
                <use href="/src/assets/img/sprite.svg#icon-arrows-right" />
              </svg>
              </Link>
          </div>

          <ul className={css.list}>
            {creators.map((creator) => (
              <li key={creator.id} className={css.card}>
                <Link to={`/creators/${creator.id}`}>
                  <img
                    className={css.img}
                    src={creator.img1x}
                    srcSet={`${creator.img1x} 1x, ${creator.img2x} 2x`}
                    alt={creator.name}
                  />
                  <span className={css.name}>{creator.name}</span>
                </Link>
              </li>
            ))}
          </ul>
  </div>
</section>
  );
};


export default Creators;