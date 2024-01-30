import { useMutation, useQuery } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { setUser } from '@/redux/userSlice'
import {
	Button,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import Auth from '@utils/auth'
import { LOGIN } from '@utils/mutations'
import { QUERY_ME } from '@utils/queries'
import { loginSchema } from '@utils/validation'
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react'

const LoginForm = ({ isOpen, onOpenChange, openSignupModal }) => {
	const [login, { error }] = useMutation(LOGIN)
	const [isVisable, setIsVisable] = useState(false)

	const dispatch = useDispatch()
	const { data: userData } = useQuery(QUERY_ME)
	console.log(userData)

	useEffect(() => {
		if (userData && userData.me) {
			dispatch(
				setUser({ credits: userData.me.credits, icons: userData.me.icons })
			)
		}
	}, [userData, dispatch])

	const toggleVisibility = () => setIsVisable(!isVisable)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({ mode: 'onBlur', resolver: zodResolver(loginSchema) })

	const onSubmit = async (data) => {
		try {
			const mutationResponse = await login({
				variables: { email: data.email, password: data.password }
			})
			const token = mutationResponse.data.login.token
			Auth.login(token)
		} catch (e) {
			console.log(e)
		}
		reset()
	}
	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement='center'>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Login</ModalHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody>
								<Input
									size='lg'
									endContent={
										<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Email'
									labelPlacement='outside'
									placeholder='Enter your email'
									variant='bordered'
									isInvalid={errors.email?.message}
									errorMessage={errors.email?.message}
									{...register('email')}
								/>
								<Input
									size='lg'
									endContent={
										<button
											className='focus:outline-none'
											type='button'
											onClick={toggleVisibility}>
											{isVisable ? (
												<EyeOffIcon className='text-2xl text-default-400 pointer-events-none' />
											) : (
												<EyeIcon className='text-2xl text-default-400 pointer-events-none' />
											)}
										</button>
									}
									label='Password'
									labelPlacement='outside'
									placeholder='Enter your password'
									type={isVisable ? 'text' : 'password'}
									variant='bordered'
									isInvalid={errors.password?.message}
									errorMessage={errors.password?.message}
									{...register('password')}
								/>
							</ModalBody>
							<ModalFooter className='flex flex-col'>
								{error ? (
									<p className='text-red-500 text-sm text-center'>
										{error.message}
									</p>
								) : null}
								<div className='flex justify-between'>
									<Link
										color='primary'
										onClick={openSignupModal}
										size='sm'
										className='cursor-pointer'>
										Don&apos;t have an account? Sign up
									</Link>
									<Button
										color='primary'
										type='submit'>
										Log In
									</Button>
								</div>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default LoginForm
