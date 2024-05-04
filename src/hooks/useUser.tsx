import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { UserCredential } from 'firebase/auth'
import { SignUpRequest } from '@/apis/types/userTypes'
import { signUpApi } from '@/apis/user'

const useSignUp = () => {
  const mutationOptions: UseMutationOptions<UserCredential, Error, SignUpRequest> = {
    mutationFn: ({ email, password }: SignUpRequest) => signUpApi({ email, password }),
  }

  return useMutation(mutationOptions)
}

export { useSignUp }
