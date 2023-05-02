import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editCommerceProfileSchema } from './editCommerceProfileSchema';
import { Input } from '../Input';
import { IRegisterUserFormData } from '../RegisterCommerceForm';
import { useContext } from 'react';
import { CommerceContext } from '../../../providers/CommerceProvider';
import { StyledEditCommerceProfileModal } from './style';
import cartIcon from '../../../assets/icons/cart.svg';
import favoriteIcon from '../../../assets/icons/coração.svg';
import xIcon from '../../../assets/icons/close.svg';

interface ICloseModal {
  closeProfileModal: () => void;
}

export const EditCommerceProfile = ({ closeProfileModal }: ICloseModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUserFormData>({
    resolver: zodResolver(editCommerceProfileSchema),
  });

  const { editCommerceProfile } = useContext(CommerceContext);
  const userNameCommerce = localStorage.getItem('@EatSmart:userNameCommerce');
  const emailUserCommerce = localStorage.getItem('@EatSmart:userCommerceEmail');

  const editCommerceProfileSubmit: SubmitHandler<IRegisterUserFormData> = (
    newCommerceProfileData
  ) => {
    editCommerceProfile(newCommerceProfileData);
    closeProfileModal();
  };

  return (
    <StyledEditCommerceProfileModal role='dialog'>
      <nav>
        <img src={cartIcon} alt='cart-icon'></img>
        <img src={favoriteIcon} alt='heart-icon'></img>
        <button onClick={() => closeProfileModal()}>
          <img src={xIcon} alt='close-icon'></img>
        </button>
      </nav>
      <form onSubmit={handleSubmit(editCommerceProfileSubmit)}>
        <h3>Edite seu perfil</h3>
        <Input
          type='text'
          label='Nome'
          placeholder={userNameCommerce?.toString()}
          id='userName'
          {...register('userName')}
          error={errors.userName}
        />
        <Input
          type='email'
          label='Email'
          placeholder={emailUserCommerce?.toString()}
          id='email'
          {...register('email')}
          error={errors.email}
        />
        <Input
          type='password'
          label='Senha'
          placeholder='Sua senha'
          id='password'
          {...register('password')}
          error={errors.password}
        />
        <Input
          type='password'
          label='Confirmar Senha'
          placeholder='Confirmar alteração de senha'
          id='confirmPassword'
          {...register('confirmPassword')}
          error={errors.confirmPassword}
        />
        <button type='submit'>Salvar alterações</button>
      </form>
      <span>
        <button onClick={() => closeProfileModal()}>Voltar para loja</button>
      </span>
    </StyledEditCommerceProfileModal>
  );
};