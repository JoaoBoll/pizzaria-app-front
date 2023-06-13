import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

//função para paginas que só pode ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        
        const cookies = parseCookies(ctx);

        //se usuári tentar acxessar a página porem tendo já um login salvo
        if(cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        return await fn(ctx);
    }
}