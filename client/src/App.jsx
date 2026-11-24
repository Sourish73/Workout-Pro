import React from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import { SuperProfileView } from './pages/SuperProfileView';

export default function App() {
  return (
    <WorkoutProvider>
      <SuperProfileView />
    </WorkoutProvider>
  );
}
