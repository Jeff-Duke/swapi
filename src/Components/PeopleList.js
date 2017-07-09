import React from 'react';
import PersonCard from './PersonCard';

const PeopleList = ({ people }) => {
  return people.map((person, index) => {
    return <PersonCard person={person} />
  });
}

export default PeopleList;