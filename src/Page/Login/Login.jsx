import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import app from '../../Firebase/firebase.config';
import { Helmet } from 'react-helmet';


const Login = () => {

    const auth = getAuth(app)
    const { logIn } = useContext(AuthContext)
    const [error, setError] = useState()

    const GoogleProvider = new GoogleAuthProvider()
    const GithubProvider = new GithubAuthProvider()

    const navigate = useNavigate()
    const location = useLocation()
    const goto = location.state?.from?.pathname || "/"
    console.log(location)

    const handleLogIn = (event) => {

        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value

        // console.log(email, password)

        logIn(email, password)
            .then(result => {
                const loggedUser = result.user

                form.reset()
                navigate(goto, { replace: true })
            })
            .catch(error => setError(error.message))

    }

    const GoogleLog = () => {
        signInWithPopup(auth, GoogleProvider)
            .then(result => {
                const user = result.user

                navigate(goto, { replace: true })
            })
            .catch(error => console.log(error.message))
    }

    const GitProLogin = () => {
        signInWithPopup(auth, GithubProvider)
            .then(result => {
                const user = result.user

            })
            .catch(error => console.log(error.message))

    }



    return (

        <div className='bg-[#1B4242] py-10 px-10'>
            <Helmet>
                <title>ToothSome | Login</title>
            </Helmet>
            <div className='w-72 mx-auto  '>
                <h2 className='text-center mt-5 text-2xl font-bold mb-3'>Please Login</h2>
                <form onSubmit={handleLogIn}>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" name='checkbox' value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <button type="submit" className="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-600">Submit</button>

                </form>
                <h2 className='mb-3'>Don't have an account? Please <Link to="/register" className='text-orange-500 inline-flex'>Register</Link></h2>

                <button onClick={GoogleLog} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <FaGoogle className='inline-flex'></FaGoogle>  Login with Google
                    </span>
                </button>
                <br />
                <button onClick={GitProLogin} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <FaGithub className='inline-flex'></FaGithub> Login with Github
                    </span>
                </button>
                <p className='mt-2 text-orange-500'>{error}</p>
            </div>
        </div>

    );
};

export default Login;