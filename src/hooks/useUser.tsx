import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { UserCredential, signOut } from 'firebase/auth'
import { SignInRequest, SignUpRequest } from '@/apis/types/userTypes'
import { signInApi, signOutApi, signUpApi } from '@/apis/user'

const useSignUp = () => {
  const mutationOptions: UseMutationOptions<UserCredential, Error, SignUpRequest> = {
    mutationFn: ({ email, password }: SignUpRequest) => signUpApi({ email, password }),
  }

  return useMutation(mutationOptions)
}

const useSignIn = () => {
  const mutationOptions: UseMutationOptions<UserCredential, Error, SignUpRequest, null> = {
    mutationFn: ({ email, password }: SignInRequest) => signInApi({ email, password }),
  }

  return useMutation(mutationOptions)
}

const useSignOut = () => {
  const mutationOptions: UseMutationOptions<unknown, Error, unknown> = {
    mutationFn: signOutApi,
  }

  return useMutation(mutationOptions)
}

export { useSignUp, useSignIn, useSignOut }
