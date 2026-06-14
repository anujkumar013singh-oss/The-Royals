import { useState, useCallback } from 'react';
import api from '../utils/api';

export default function useReservationPayment() {
  const [modalState, setModalState] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const initiatePayment = useCallback(async (formData) => {
    setModalState('loading');
    try {
      const { data } = await api.post('/reservations/create-order', formData);
      setOrderData(data);
      setModalState('qr_active');
    } catch {
      setModalState('error');
    }
  }, []);

  const handleClose = useCallback(() => {
    setModalState(null);
    setOrderData(null);
  }, []);

  return {
    modalState,
    orderData,
    initiatePayment,
    handleClose,
  };
}
