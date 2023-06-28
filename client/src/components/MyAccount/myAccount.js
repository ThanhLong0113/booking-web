import React from 'react'
import Header from "../Header"
import Footer from "../Footer"
import AccountInfo from './AccountInfo'
import myAccount from './myAccount.module.css'

const MyAccount = () => {
    return (
        <div>
            <Header />
            <div className={myAccount.wrapper}>
                <div className={myAccount.leftMenu}>
                    
                </div>
                <div className={myAccount.body}>
                    <AccountInfo/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyAccount