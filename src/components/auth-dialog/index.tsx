import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthDialogProps } from './interfaces';
import { useAppState, useAppDispatch } from 'src/app/context';
import { fetchAccountData } from 'src/app/context/slices/user';
import { emailPattern, jwtPattern } from 'src/utils';

export default function AuthDialog({
  content,
  isModalOpen,
  handleModalClose,
  nextModalOpen,
}: AuthDialogProps) {
  const [userData, setUserData] = useState('');
  const [validUserData, setValidUserData] = useState('');
  const { title, label, buttonText, type } = content;

  const { id: userId, error } = useAppState(state => state.user);

  const dispatch = useAppDispatch();

  const validEmail = type === 'email' && emailPattern.test(userData);
  const validToken = type === 'text' && jwtPattern.test(userData);

  useEffect(() => {
    if (validToken) {
      Cookies.set('token', `${userData}`, {
        expires: 7,
        sameSite: 'strict',
        secure: true,
      });
      setValidUserData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (Cookies.get('token')) dispatch(fetchAccountData());
  }, [validUserData]);

  useEffect(() => {
    if (userId) {
      Cookies.set('userId', userId.toString(), {
        expires: 7,
        sameSite: 'strict',
        secure: true,
      });
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const currentUserData = formJson[type];
    if (typeof currentUserData === 'string') setUserData(currentUserData);
    handleModalClose();
  };

  const offerToEnterToken = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (nextModalOpen) {
      e.preventDefault();
      nextModalOpen();
    }
    handleModalClose();
  };

  if (error) toast.error(error);

  return (
    <Dialog
      fullWidth
      open={isModalOpen}
      onClose={handleModalClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUserData(e.target.value),
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name={type}
          id={type}
          label={label}
          type={type}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Закрыть</Button>
        <Button
          disabled={validEmail || validToken ? false : true}
          type="submit"
          onClick={e => offerToEnterToken(e)}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
