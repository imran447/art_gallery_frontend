import { immediateToast } from 'izitoast-react'
import 'izitoast-react/dist/iziToast.css';

export const handleToastMessage = (type, message) => {
    switch (type) {
        case 'info':
            immediateToast('info', 
            {
                position: 'topRight', 
                message
            })
          break;
        case 'success':
            immediateToast('success', 
            {
                position: 'topRight', 
                message
            })
          break;
        case 'warning':
            immediateToast('warning', 
            {
                position: 'topRight',
                message
            })
          break;
        case 'error':
            immediateToast('error', 
            {
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                message
            })
          break;
      }
}