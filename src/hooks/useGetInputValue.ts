import { useState } from "react";

type FormData = {
    [key: string]: string; // FormData har qanday key uchun string qiymatni qabul qiladi
};

export const useGetInputValue = (initialState: FormData) => {
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return { formData, handleChange, setFormData }
}