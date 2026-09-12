import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Toast = () => {
  const { toast } = useContext(AppContext);

  return (
    <div className="toast-box" id="toast-box">
      {toast && (
        <div className={`toast toast-${toast.type} show`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Toast;
