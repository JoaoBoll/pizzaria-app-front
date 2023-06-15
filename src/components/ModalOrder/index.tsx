import Modal from "react-modal";
import styles from './style.module.scss';

import {FiX} from 'react-icons/fi'
import {OrderItemProps} from "../../pages/dashboard";

interface ModalOrderPorps{
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[];
    handleFinishItem: (id: string) => void;
}
export default function ModalOrder({isOpen, onRequestClose, order, handleFinishItem}: ModalOrderPorps) {

    console.log("Teste Modal")
    console.log(order)

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            backgroundColor: "#1d1d2e",
            padding: "30px",
            transform: "translate(-50%, -50%)",

            // marginRight: "-50%",
            // width: "500px",
            // height: "500px",
            // border: "1px solid #000",
            // borderRadius: "10px"
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type="button"
                className='react-modal-close'
                onClick={onRequestClose}
                style={{background: 'transparent', border:0}}
            >
                <FiX size={45} color={"#f34748"}/>
            </button>

            <div className={styles.container}>
                <h2>Detalhes do Pedido</h2>
                <span className={styles.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>

                {order.map( item => (
                    <section className={styles.containerItem} key={item.id}>
                        <span>{item.amount} - {item.product.name}</span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}

                <button className={styles.buttonOrder} onClick={() => handleFinishItem(order[0].order_id)}>
                    Concluir Pedido
                </button>

            </div>
        </Modal>
    )
}
