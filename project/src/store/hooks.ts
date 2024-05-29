import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function useAuth() {
    const { email, token, id } = useSelector(state => state);
    return {
        isAuth: !!email,
        email,
        token,
        id
    }
}

