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

const useGetUserInfo = () => {
  const queryOptions: UseQueryOptions<unknown, Error, unknown> = {
    queryKey: ['getUserInfo'],
    queryFn: async () => {
      const userToken = localStorage.getItem('userToken')
      const userQuery = query(collection(db, 'user'))
      const dataSnapShot = await getDocs(userQuery)
      const data = dataSnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      return data.filter(({ id }) => id === userToken)[0]
    },
  }
  return useQuery(queryOptions)
}

export { useSignOut, useGetUserInfo }
