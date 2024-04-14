import {
  Box,
  Container,
  Link,
  Stack,
  TextField,
  FormGroup,
  Button,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { teal } from '@mui/material/colors';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { RequestContext } from '../../contexts/request-context';
import { CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type RegisterInputs = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File[];
};

export const Register = () => {
  const navigate = useNavigate();
  const requestContext = React.useContext(RequestContext);

  const mutation = useMutation({
    mutationFn: async (data: RegisterInputs) => {
      const response = await requestContext.users.usersControllerCreateUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      });

      await requestContext.auth.authControllerLogin({
        email: data.email,
        password: data.password,
      });

      const formData = new FormData();

      formData.append('avatar', data.avatar[0]);

      await requestContext.avatars.avatarsControllerCreateAvatar(
        response.data.id,
        { avatar: data.avatar[0] },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    },
    onSuccess(data, variables, context) {
      navigate('/');

      console.log('Success', data);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>();
  const onSubmit: SubmitHandler<RegisterInputs> = (data) =>
    mutation.mutate(data);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box
          sx={{
            borderRadius: 2,
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: teal[200],
            padding: 2,
          }}
        >
          <Stack>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                >
                  Upload avatar
                  <input
                    style={{
                      clip: 'rect(0 0 0 0)',
                      clipPath: 'inset(50%)',
                      height: 1,
                      overflow: 'hidden',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      whiteSpace: 'nowrap',
                      width: 1,
                    }}
                    type="file"
                    {...register('avatar')}
                  />
                </Button>
                <TextField
                  required
                  id="username"
                  type="text"
                  label="Username"
                  autoComplete="username"
                  variant="standard"
                  {...register('username', {
                    required: true,
                    maxLength: 20,
                    validate: (value) => {
                      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
                      return slugRegex.test(value);
                    },
                  })}
                />
                <TextField
                  required
                  id="firstName"
                  type="text"
                  label="First Name"
                  autoComplete="firstname"
                  variant="standard"
                  {...register('firstName', {
                    required: true,
                  })}
                />
                <TextField
                  required
                  id="lastName"
                  type="text"
                  label="Last Name"
                  autoComplete="lastname"
                  variant="standard"
                  {...register('lastName', {
                    required: true,
                  })}
                />
                <TextField
                  required
                  id="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  variant="standard"
                  {...register('email', {
                    required: true,
                  })}
                />
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  {...register('password', {
                    required: true,
                  })}
                />
                <TextField
                  required
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  {...register('confirmPassword', {
                    required: true,
                    validate: (value) => value === watch('password'),
                  })}
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </FormGroup>
            </form>
            <Link href="/login" underline="hover">
              Already have an account?
            </Link>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
};
