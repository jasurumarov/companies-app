import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BgImg from '../../assets/images/bg-image.png'
import { useGetInputValue } from '../../hooks/useGetInputValue'
import { useSignInMutation } from '../../context/api/loginApi'
import { useDispatch } from 'react-redux'
import { setToken } from '../../context/slices/authSlice'
import { toast } from 'react-toastify'

// Initialstate
const initialState = {
    login: "",
    password: "",
}

const SignIn: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { formData, setFormData, handleChange } = useGetInputValue(initialState)
    const [signIn, { isLoading, isSuccess, isError, data }] = useSignInMutation()

    useEffect(() => {
        if (isSuccess && data) {
            setFormData(initialState)
            dispatch(setToken(data.token))
            toast.success('Успешный вход.')
            navigate('/admin')
        }
    }, [isSuccess, data])
    useEffect(() => {
        if (isError) {
            toast.error('Неверный логин или пароль.')
        }
    }, [isError])


    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();

        signIn(formData)
    };
    return (
        <main style={{ backgroundImage: `url("${BgImg}")` }} className='h-screen bg-[length:100%] bg-bottom bg-no-repeat flex justify-center items-center '>
            <form onSubmit={handleSignIn} className='max-w-[462px] w-full p-6 rounded-sm bg-white'>
                <h2 className='text-4xl font-bold mb-5'>Вход</h2>
                <div className='mb-4 flex flex-col gap-1'>
                    <label htmlFor="login">Логин</label>
                    <input onChange={handleChange} value={formData.login} type="text" id='login' name='login' className='w-full border rounded py-2 px-3 outline-none' placeholder='Введите логин' required />
                </div>
                <div className='mb-2 flex flex-col gap-1'>
                    <label htmlFor="password">Пароль</label>
                    <input onChange={handleChange} value={formData.password} type="password" id='password' name='password' className='w-full border rounded py-2 px-3 outline-none' placeholder='Введите пароль' required />
                </div>
                <Link to={'/sign-up'} className='text-[#1890FF] mb-4 block hover:underline'>Регистрация</Link>
                <div className='flex justify-center'>
                    <button disabled={isLoading} className='disabled:opacity-50 py-2 px-5 rounded-sm font-medium text-center bg-[#7CB305] text-white'>Вход</button>
                </div>
            </form>
        </main>
    )
}

export default SignIn
