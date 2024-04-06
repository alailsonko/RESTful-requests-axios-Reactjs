import {
  Box,
  Button,
  Container,
  FormGroup,
  Link,
  Stack,
  TextField,
} from '@mui/material';
import { teal } from '@mui/material/colors';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: LoginInputs) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL!}/auth/login`,
        {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  React.useEffect(() => {
    if (isSuccess) {
      navigate('/profile');
    }
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => mutate(data);

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
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <TextField
                  required
                  id="outlined-required"
                  type="email"
                  label="Email"
                  variant="standard"
                  {...register('email', {
                    required: 'You must specify an email',
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
                    required: 'You must specify a password',
                  })}
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </FormGroup>
            </form>

            <Link href="/register" underline="hover">
              register
            </Link>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
};
