import { useEffect } from 'react';
import fluidCursor from '@/hooks/useFluidCursor.jsx';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-10">
      <canvas id="fluid" className="h-screen w-screen pointer-events-none inset-0 fixed" />
    </div>
  );
};
// fixed inset-0 pointer-events-none
export default FluidCursor;
