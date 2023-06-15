import Head from "next/head";
import {canSSRAuth} from "../../utils/canSSRAuth";
import {Header} from "../../components/Header";
import styles from './styles.module.scss';
import {FiUpload} from "react-icons/fi";
import {ChangeEvent, FormEvent, useState} from "react";
import {setupAPIClient} from "../../services/api";
import {toast} from 'react-toastify'

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function product({categoryList}: CategoryProps) {

    const [name, setName]= useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);

    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if(!e.target.files){
            return
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(image))
        }
    }

    //Ao selecionar uma categoria na lista
    function handleChanceCategory(event){
        setCategorySelected(event.target.value);
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        try{
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === '') {
                toast.error('Preencha todos os campos!');
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            const response = await apiClient.post('/product', data);

            toast.success('Produto cadastrado com sucesso!')

        } catch (err) {
            console.log(err);
            toast.error('Erro ao cadastrar.');
        }

        setName('');
        setPrice('');
        setDescription('');
        setAvatarUrl('');
        setImageAvatar(null);
    }

    return(
        <>
            <Head>
                <title>Cadastro de produtos- Pizzaria</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo Produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color={"#FFF"}/>
                            </span>

                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                            {avatarUrl && (
                                <img src={avatarUrl}
                                     className={styles.preview}
                                     alt="foto do protudo"
                                     width={250}
                                     height={250}/>
                            )}

                        </label>

                        <select value={categorySelected} onChange={handleChanceCategory}>
                            {categories.map((item, index) => {
                                return (
                                    <option key={index} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input type="text"
                               placeholder="Nome do produto"
                                className={styles.input}
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>

                        <input type="text"
                               placeholder="Preço do produto"
                               className={styles.input}
                               value={price}
                               onChange={(e) => setPrice(e.target.value)}/>

                        <textarea placeholder="Descreva seu produto..."
                                  className={styles.input}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>

                        <button className={styles.buttonAdd}
                                type='submit'>
                            Cadastrar
                        </button>

                    </form>
                </main>

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');

    return {
        props:{
            categoryList: response.data
        }
    }
})
