import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginUserMutation } from '../store/apis'
import { Link } from 'react-router-dom'




export interface MyForm{
    email:string,
    password:string,
    userName?:String
}

export const Login = () => {

    const {register, handleSubmit, reset ,formState:{errors}} = useForm<MyForm>()
    const [loginUser] = useLoginUserMutation();
    const onSubmit:SubmitHandler<MyForm>  = async(data)=>{
        const result = await loginUser(data).unwrap()
        console.log(result)
        reset()
    }


  return (
    <div className='h-screen w-screen bg-gray-800 text-cyan-100 flex justify-center items-center'>

        <div className='w-96 max-h-min border border-cyan-100 rounded-lg p-8 flex flex-col'>
            <h1 className='text-center font-semibold text-2xl underline w-full'>Login</h1>

            <div className='w-full mt-8'>
                <form className='w-full h-full flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='flex w-full items-center justify-between'>
                        
                        <label>Email:- </label>
                        <input {...register("email",{
                            required:true,
                        })}  placeholder='jhon123@gmail.com' className='bg-inherit border-b border-cyan-100 p-1 mb-4 outline-none w-[70%]'/>
                    
                    </div>
                    {errors.email && <p>{errors.email.message}</p>}

                    <div className='flex w-full items-center justify-between'>

                        <label>Password:- </label>
                        
                        <input {...register("password",{
                        required:true,
                        minLength:2,
                    
                    })} type='password'  className='bg-inherit border-b border-cyan-100 p-1 mb-4 outline-none w-[70%] ' />
                    </div>
                    {errors.password && <p>{errors.password.message}</p>}


                    <div className='flex w-full justify-center mt-8'>
                        <button type='submit' className='p-2 border border-white rounded-md'>Submit</button>
                    </div>
         
                </form>
            </div>
            <div className='w-full mt-8'>
                <p>don't have an account <Link to={'/signup'} className='underline'>Signup</Link></p>
            </div>

        </div>    

    </div>
  )
}
