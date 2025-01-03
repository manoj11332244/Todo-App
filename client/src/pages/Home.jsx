import toast from 'react-hot-toast'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Navbar from './Navbar'
import { Input } from '@/components/ui/input'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'

// const Home = () => {

//     const [title, setTitle] = useState("")
//     const [description, setDescription] = useState("")
//     const [todos, setTodos] = useState([])
//     const [editingTodoId, setEditingTodoId] = useState(null);

//     const addToDoHandler = async () => {
//         try {
//             const res = await axios.post("http://localhost:8000/api/v1/todo", { title, description }, { headers: { 'Content-Type': "application/json" }, withCredentials: true })
//             console.log(res)
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 setTodos([...todos, res.data.todo])
//                 setTitle("")
//                 setDescription("")
//             }
//         } catch (error) {
//             toast.error(error.response.data.message)
//             console.log(error)
//         }
//     }


//     const deleteToDoHandler = async (todoId) => {
//         try {
//             const res = await axios.delete(`http://localhost:8000/api/v1/todo/${todoId}`, {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Error deleting todo");
//         }
//     };

//     const updateToDoHandler = async (todoId, updatedTitle, updatedDescription) => {
//         try {
//             const res = await axios.put(`http://localhost:8000/api/v1/todo/${todoId}`, {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true,
//             })
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 setTodos((prevTodos) => prevTodos.map((todo) =>
//                     todo._id === todoId ? { ...todo, title: updatedTitle, description: updatedDescription } : todo
//                 ));
//             }
//         } catch (error) {
//             toast.error("Error updated todo");
//         }
//     }

//     useEffect(() => {
//         const fetchTodo = async () => {
//             try {
//                 const res = await axios.get("http://localhost:8000/api/v1/todo")
//                 console.log(res)
//                 if (res.data.success) {
//                     setTodos(res.data.todo)
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchTodo()
//     }, [])

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center gap-5 mt-4'>
//                 <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add new todo.." className='w-1/4' />
//                 <Button onClick={addToDoHandler}>Add ToDo</Button>
//             </div>
//             <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a discription...." className='w-1/4 mt-2' />

//             {/* <div className='grid grid-cols-4 gap-2'>
//                 {
//                     todos.map((t,id) => {
//                         return <div>
//                         <Card Key={t._id} className='bg-gray-800 text-white mt-5'>
//                             <CardHeader>{t.title} </CardHeader>
//                             <CardDescription>{t.description}</CardDescription>
//                         </Card>
//                         <Button onClick={()=>updateToDoHandler(t._id)} className='w-[48%]'>Update</Button>
//                         <Button onClick={()=>deleteToDoHandler(t._id)} className='w-[48%] bg-red-600'>Delete</Button>
//                      </div>
//                     })
//                 }
//             </div> */}
//             <div className='grid grid-cols-4 gap-2'>
//                 {todos.map((t) => (
//                     <div key={t._id}>
//                         <Card className='bg-gray-800 text-white mt-5'>
//                             <CardHeader>{t.title}</CardHeader>
//                             <CardDescription>{t.description}</CardDescription>
//                         </Card>
//                         {/* Update Button */}
//                         <Button
//                             onClick={() => {
//                                 setTitle(t.title);
//                                 setDescription(t.description);
//                                 setEditingTodoId(t._id);  // Store the todoId to identify which todo to update
//                             }}
//                             className='w-[48%]'>
//                             Update
//                         </Button>

//                         {/* Delete Button */}
//                         <Button
//                             onClick={() => deleteToDoHandler(t._id)}
//                             className='w-[48%] bg-red-600'>
//                             Delete
//                         </Button>
//                     </div>
//                 ))}
//             </div>

//             {/* Form for updating a todo */}
//             {editingTodoId && (
//                 <div className="mt-4">
//                     <Input
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         type="text"
//                         placeholder="Update todo title..."
//                         className="w-1/4"
//                     />
//                     <Textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Update description..."
//                         className="w-1/4 mt-2"
//                     />
//                     <Button
//                         onClick={() => updateToDoHandler(editingTodoId, title, description)}
//                         className="mt-2">
//                         Update Todo
//                     </Button>
//                 </div>
//             )}

//         </div>
//     )
// }

// export default Home



const Home = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [todos, setTodos] = useState([])
    const [editingTodoId, setEditingTodoId] = useState(null);

    const addToDoHandler = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/todo", { title, description }, { headers: { 'Content-Type': "application/json" }, withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message);
                setTodos([...todos, res.data.todo]);
                setTitle("");
                setDescription("");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const deleteToDoHandler = async (todoId) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/todo/${todoId}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting todo");
        }
    };

    const updateToDoHandler = async (todoId, updatedTitle, updatedDescription) => {
        try {
            const res = await axios.put(`http://localhost:8000/api/v1/todo/${todoId}`, {
                title: updatedTitle,
                description: updatedDescription
            }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);
                setTodos((prevTodos) => prevTodos.map((todo) =>
                    todo._id === todoId ? { ...todo, title: updatedTitle, description: updatedDescription } : todo
                ));
                setEditingTodoId(null);  // Clear editing state after update
            }
        } catch (error) {
            toast.error("Error updating todo");
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/todo")
                if (res.data.success) {
                    setTodos(res.data.todo);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchTodo();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='flex items-center gap-5 mt-4'>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add new todo.." className='w-1/4' />
                <Button onClick={addToDoHandler}>Add ToDo</Button>
            </div>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a description...." className='w-1/4 mt-2' />

            <div className='grid grid-cols-4 gap-2'>
                {todos.map((t) => (
                    <div key={t._id}>
                        <Card className='bg-gray-800 text-white mt-5'>
                            <CardHeader>
                                {editingTodoId === t._id ? (
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        placeholder="Update todo title..."
                                    />
                                ) : (
                                    t.title
                                )}
                            </CardHeader>
                            <CardDescription>
                                {editingTodoId === t._id ? (
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Update description..."
                                    />
                                ) : (
                                    t.description
                                )}
                            </CardDescription>
                        </Card>
                        {/* Update Button */}
                        <Button
                            onClick={() => {
                                if (editingTodoId === t._id) {
                                    updateToDoHandler(t._id, title, description);
                                } else {
                                    setTitle(t.title);
                                    setDescription(t.description);
                                    setEditingTodoId(t._id); 
                                }
                            }}
                            className='w-[48%]'>
                            {editingTodoId === t._id ? "Save" : "Update"}
                        </Button>

                        {/* Delete Button */}
                        <Button
                            onClick={() => deleteToDoHandler(t._id)}
                            className='w-[48%] bg-red-600'>
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
