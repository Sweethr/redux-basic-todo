import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, status } from '../Redux/Todo/TodoSlice';
import { BiPlus, BiPlusCircle, BiXCircle } from 'react-icons/bi'

function Todo() {
    const selector = useSelector((state) => state.todo.value)
    const dispatch = useDispatch()

    const [value, setValue] = useState("")

    const buttonHandle = (e) => {
        if (value.length === 0) return alert("Input alanına bir metin giriniz.")
        if (e.code && e.code == "Enter") {
            dispatch(add({ text: value, id: selector.length }))
        } else if (!e.code) {
            dispatch(add({ text: value, id: selector.length }))
        }
    }

    return (
        <div className='flex flex-col h-screen bg-black text-white items-center w-auto max-w-7xl py-10 overflow-auto'>
            <div className='flex flex-col gap-y-5'>
                <h2 className='text-2xl'>Todo List</h2>
                <div className='flex flex-col items-center textWrap max-h-96 overflow-hidden hover:overflow-auto hover:overflow-y-auto gap-y-1 max-w-xl'>
                    {[...selector].length > 0 ? [...selector].sort((a, b) => b.status - a.status).map(c => <>
                        <div className={`flex flex-row items-center rounded-xl p-1.5 px-5 bg-opacity-20 ${c.status === true ? "bg-green-500" : "bg-red-600"}`}>
                            <BiXCircle onClick={() => dispatch(remove(c.id))} size={26} className='text-gray-500 hover:text-red-700 transition-colors duration-200 cursor-pointer' />
                            <span className='font-semibold text-lg ml-1'>{c.text}</span>
                            <div className='flex items-center text-sm ml-1'>
                                <BiPlusCircle onClick={e => dispatch(status({ id: c.id, status: true }))} size={20} className='cursor-pointer text-gray-500 hover:text-green-400 transition-all' />
                                <BiXCircle onClick={e => dispatch(status({ id: c.id, status: false }))} size={20} className='cursor-pointer text-gray-500 hover:text-red-700 transition-all' />
                            </div>
                        </div>
                    </>) : <span>Listede herhangi bir şey bulunmuyor.</span>}
                </div>
                <div className='w-full'>
                    <div className='flex flex-col items-center justify-center'>
                        <input type="text" className='outline-none rounded-xl p-1 text-black w-52 max-w-[15rem]' onKeyUp={buttonHandle} onChange={e => setValue(e.target.value)} />
                    </div>
                    <div className='flex justify-center mt-5'>
                        <button className="flex justify-center p-1 bg-white hover:bg-gray-300 transition-colors text-black w-28 text-center rounded-xl" onClick={buttonHandle}><BiPlus /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo