 import Router from 'next/router';
import {createContext, ReactNode, useState} from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { api } from '../services/apiClient';
import {toast} from 'react-toastify'
import {useEffect} from 'react'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}
type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {

    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('Erro ao descolar');
    }
}

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    useEffect(() => {
        //tentando pegar algo no cookie
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response =>{
                const {id, name, email} = response.data;
                setUser({
                    id,
                    name,
                    email
                });
            }).catch(() =>{
                //Caso houver problema, desconectar o usuári.
                signOut();
            })
        }
    }, [])

    async function signIn({email, password}: SignInProps) {
        try{
            const response = await api.post('/session', {
                email,
                password
            })

            const {id, name, token} = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60*60*24*30, //Expira em 1 mês (segunds * minutos * horas * dias)
                path: '/' //Quais caminhos terão acesso ao cookie
            })

            setUser({
                id,
                name,
                email
            })

            //Setar o token padrão Header para prox requisições
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

            //Redirecionar o user
            Router.push('/dashboard');
            
        } catch (error){
            toast.error('Ocorreu um erro ao fazer login')
            console.log(error);
            console.log("Erro")
        }
    }

    async function signUp({name, email, password}: SignUpProps) {

        try {

            const response = await api.post('/users', {
                name,
                email,
                password
            })
    
            Router.push('/')
        } catch (err) {
            console.log('Erro ao cadastrar')
            console.log('err')
        }
        
        
    }
    

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}
