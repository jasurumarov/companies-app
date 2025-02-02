import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BgImg from '../../assets/images/bg-image.png'
import { useGetInputValue } from '../../hooks/useGetInputValue'
import { useSignUpMutation } from '../../context/api/loginApi'
import { toast } from 'react-toastify'

// Initialstate
const initialState = {
    fullName: "",
    login: "",
    password: "",
}

const SignUp: React.FC = () => {
    const navigate = useNavigate()

    const { formData, setFormData, handleChange } = useGetInputValue(initialState)
    const [signUp, { isLoading, isSuccess, isError, data }] = useSignUpMutation()

    useEffect(() => {
        if (isSuccess && data) {
            setFormData(initialState)
            toast.success('Пользователь успешно создан. Войдите в систему.')
            navigate('/sign-in')
        }
    }, [isSuccess, data])
    useEffect(() => {
        if (isError) {
            toast.error('Ошибка при создании пользователя.')
        }
    }, [isError])

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()

        signUp(formData)
    }
    return (
        <main style={{ backgroundImage: `url("${BgImg}")` }} className='h-screen bg-[length:100%] bg-bottom bg-no-repeat flex justify-center items-center '>
            <form onSubmit={handleSignUp} className='max-w-[462px] w-full p-6 rounded-sm bg-white'>
                <h2 className='text-4xl font-bold mb-5'>Регистрация</h2>
                <div className='mb-4 flex flex-col gap-1'>
                    <label htmlFor="fullName">Ф.И.О</label>
                    <input onChange={handleChange} value={formData.fullName} type="text" id='name' name='fullName' className='w-full border rounded py-2 px-3 outline-none' placeholder='Введите Ф.И.О' required />
                </div>
                <div className='mb-4 flex flex-col gap-1'>
                    <label htmlFor="login">Логин</label>
                    <input onChange={handleChange} value={formData.login} type="text" id='login' name='login' className='w-full border rounded py-2 px-3 outline-none' placeholder='Введите логин' required />
                </div>
                <div className='mb-2 flex flex-col gap-1'>
                    <label htmlFor="password">Пароль</label>
                    <input onChange={handleChange} value={formData.password} type="text" id='password' name='password' className='w-full border rounded py-2 px-3 outline-none' placeholder='Введите пароль' required />
                </div>
                <Link to={'/sign-in'} className='text-[#1890FF] mb-4 block hover:underline'>Вход</Link>
                <div className='flex justify-center'>
                    <button disabled={isLoading} className='disabled:opacity-50 py-2 px-5 rounded-sm font-medium text-center bg-[#7CB305] text-white'>Регистрировать</button>
                </div>
            </form>
        </main>
    )
}

export default SignUp
