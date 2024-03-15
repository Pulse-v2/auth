import React from 'react';
import './App.scss';
import './types/index.d.ts'
import {AuthProvider} from './context/AuthContext';
import AppRouter from './routes/router';

function App() {
  return (
      <AuthProvider>
          <AppRouter />
      </AuthProvider>
  );
}

export default App;
