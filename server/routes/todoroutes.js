import {createTodo, deleteTodo, getAllTodos, updateTodo} from '../controllers/todo.js'
import express from 'express'
import isAuthenciated from  '../middleware/isAuthenicated.js'

const router=express.Router();

router.route('/').post(isAuthenciated,createTodo)
router.route('/').get(getAllTodos)
router.route('/:todoId').put(isAuthenciated,updateTodo)
router.route("/:todoId").delete(isAuthenciated,deleteTodo)


export default router;