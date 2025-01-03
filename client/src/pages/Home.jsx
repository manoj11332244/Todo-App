import toast from 'react-hot-toast'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Navbar from './Navbar'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'

const Home = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [todos, setTodos] = useState([])

    const addToDoHandler = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/todo", { title, description }, { headers: { 'Content-Type': "application/json" }, withCredentials: true })
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message);
                setTodos([...todos,res.data.todo])
                setTitle("")
                setDescription("")
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/todo")
                console.log(res)
                if (res.data.success) {
                    setTodos(res.data.todo)
                }
                console.log(todos)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTodo()
    }, [])

    return (
        <div>
            <Navbar />
            <div className='flex items-center gap-5 mt-4'>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add new todo.." className='w-1/4' />
                <Button onClick={addToDoHandler}>Add ToDo</Button>
            </div>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a discription...." className='w-1/4 mt-2' />

            <div className='grid grid-cols-4 gap-2'>
                {
                    todos.map((t) => {
                        return <Card Key={t._id} className='bg-gray-800 text-white mt-5'>
                            <CardHeader>{t.title} </CardHeader>
                            <CardDescription>{t.description}</CardDescription>
                        </Card>
                    })
                }
            </div>
        </div>
    )
}

export default Home