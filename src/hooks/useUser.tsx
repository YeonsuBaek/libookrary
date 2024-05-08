import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { signOutApi } from '@/apis/user'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../firebase.config'

const useSignOut = () => {
  const mutationOptions: UseMutationOptions<unknown, Error, unknown> = {
    mutationFn: signOutApi,
  }

  return useMutation(mutationOptions)
}

export { useSignOut }
