import React from 'react';
import NGOList from '~/components/NGOList';
// import NGOList from './NGOList';

const ngos = [
  { name: 'International Federation of Red Cross and Red Crescent Societies (IFRC)', website: 'https://www.ifrc.org/' },
  { name: 'Médecins Sans Frontières (Doctors Without Borders)', website: 'https://www.msf.org/' },
  // ... other NGOs
];

const App: React.FC = () => {
  return (
    <div className="App">
      <NGOList ngos={ngos} />
    </div>
  );
};

export default App;