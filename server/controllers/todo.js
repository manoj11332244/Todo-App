import { Todo } from '../models/todo.js'
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.."
            })
        }
        const todo = new Todo({ title, description })
        todo.save()
        console.log(todo)
        return res.status(201).json({
            success: true,
            message: "todo created..",
            todo
        })
    } catch (error) {
        console.log(error)
    }
}


export const getAllTodos = async (req, res) => {
    try {
        const todo=await Todo.find()
        return res.status(200).json({
            success:true,
            // todos: todos.length ===0 ? []:todos
            todo
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateTodo=async (req,res)=>{
    try {
        const todoId=req.params.todoId;
        const {title}=req.body;
        // const todo=await Todo.findById(todoId)
     const todo= await Todo.findByIdAndUpdate(todoId,{title},{new:true})
     await todo.save()
     res.status(200).json({
        success:true,
        message:"todo updated",
        todo
     })

    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo=async(req,res)=>{
    try {
        const todoID=req.params.todoId;
        await Todo.findByIdAndDelete(todoID)
        return res.status(200).json({
            success:true,
            message:"Todo deleted successfully"
        })
    } catch (error) {
       console.log(error) 
    }
}