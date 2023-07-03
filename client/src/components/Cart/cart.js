import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import LoadingClip from '../LoadingClip'
import { useCartById } from '../../talons/useCartById'
import { VscTrash } from 'react-icons/vsc'
import NoItemInCart from '../../assets/images/no_item_in_cart.png'
import cart from './cart.module.css'

const Cart = () => {
    const cart_id = localStorage.getItem('cart_id')
    const customer_id = localStorage.getItem('token')
    const [listSelected, setListSelected] = useState([])
    const [itemsSelected, setItemsSelected] = useState([])
    const [remainingItems, setRemainingItems] = useState([])
    const [totalPrice, setTotalPrice] = useState()
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false)
    const navigate = useNavigate()

    const getCartById = useCartById(cart_id)
    const {
        isLoading,
        setIsLoading,
        cartById
    } = getCartById

    const handleSelect = (e, index) => {
        const tmp = listSelected
        tmp[index] = {
            checked: e.target.checked
        }
        let price = 0
        let items = []
        let remainItems = []
        for (let i = 0; i < cartById.items.length; i++) {
            if (tmp[i]?.checked) {
                items.push(cartById.items[i])
                price += cartById.items[i].totalPrice
            }
            else {
                remainItems.push(cartById.items[i])
            }
        }
        setTotalPrice(price)
        setItemsSelected(items)
        setRemainingItems(remainItems)
        setListSelected(tmp)
    }

    async function createBooking() {
        setIsLoadingCheckout(true)
        try {
            const res = await axios.post('http://localhost:5000/bookings', {
                customer_id: customer_id,
                items: itemsSelected,
                totalPrice: totalPrice
            });

            await axios.put(`http://localhost:5000/carts/remove/${cart_id}`, remainingItems);
            setIsLoadingCheckout(false)
            navigate('/checkout-success', {
                state: res.data.newBooking._id
            })
        } catch (err) {
            setIsLoadingCheckout(false)
        }
    }

    const handleCheckout = () => {
        createBooking()
    }

    async function removeFromCart(items) {
        setIsLoading(true)
        try {
            await axios.put(`http://localhost:5000/carts/remove/${cart_id}`, items);
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
        }
    }

    const handleRemoveFromCart = (element) => {
        const items = cartById.items.filter(ele => ele._id !== element._id)
        removeFromCart(items)
    }

    if (isLoading || isLoadingCheckout) return <LoadingClip/>

    return (
        <div>
            <Header />
            {cartById.items.length === 0 ? (<div className={cart.noItemWrapper}>
                <img src={NoItemInCart} alt='' className={cart.noItemImage}></img>
                <h2 className={cart.noItemTitle}>Có vẻ như không có đơn hàng nào trong giỏ của bạn!</h2>
                <button className={cart.backButton} onClick={() => navigate('/')}>Trở lại màn hình chính</button>
            </div>) : (<div className={cart.wrapper}>
                <h2>{`Your Cart (${cartById.items.length})`}</h2>
                <div className={cart.contentWrapper}>
                    <div className={cart.itemsWrapper}>
                        {cartById.items.map((element, index) => {
                            return (
                                <div key={index}>
                                    <div className={cart.itemWrapper}>
                                        <div className={cart.hotelDetails}>
                                            <div className={cart.hotelImage}>
                                                <img src={element.hotel.image} alt=''></img>
                                            </div>
                                            <div className={cart.hotelInfo}>
                                                <h3>{element.hotel.name}</h3>
                                                <p>{element.hotel.address}</p>
                                            </div>
                                            <div className={cart.deleteButton}>
                                                <button onClick={() => handleRemoveFromCart(element)}>
                                                    <VscTrash size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cart.checkoutInfo}>
                                        <div className={cart.roomInfo}>
                                            <div className={cart.selectWrapper}>
                                                <input type='checkbox' onChange={(e) => handleSelect(e, index)}></input>
                                                <h3>{`${element.quantity} x ${element.roomName}`}</h3>
                                            </div>
                                            <div className={cart.dateInfo}>
                                                <p>{`${element.checkIn} - ${element.checkOut}`}</p>
                                            </div>
                                        </div>
                                        <div className={cart.priceInfo}>
                                            <h3>{`${element.totalPrice.toLocaleString()} VNĐ`}</h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={cart.checkoutWrapper}>
                        <div className={cart.priceWrapper}>
                            <h3>Total</h3>
                            {listSelected.length > 0 && listSelected.find((element) => element?.checked) &&
                                <h3 className={cart.priceTotal}>{`${totalPrice.toLocaleString()} VNĐ`}</h3>}
                        </div>
                        {listSelected.length > 0 && listSelected.find((element) => element?.checked)
                            ? <p className={cart.numberItem}>{`${listSelected.filter((element) => element?.checked).length} đơn đặt phòng đã được chọn`}</p>
                            : <p className={cart.numberItem}>Bạn chưa chọn đơn đặt phòng nào</p>}
                        <button disabled={!(listSelected.length > 0 && listSelected.find((element) => element?.checked))}
                            className={cart.checkoutButton} onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>)}
            < Footer />
        </div>
    )
}

export default Cart