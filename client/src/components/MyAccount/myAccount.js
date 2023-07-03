import React, { useState } from 'react'
import Header from "../Header"
import Footer from "../Footer"
import AccountInfo from './AccountInfo'
import AccountSecurity from './AccountSecurity'
import { BsPersonGear } from 'react-icons/bs'
import { MdSecurity } from 'react-icons/md'
import myAccount from './myAccount.module.css'

const MyAccount = () => {
    const [tabSelected, setTabSelected] = useState(0)
    return (
        <div>
            <Header />
            <div className={myAccount.wrapper}>
                <div className={myAccount.leftMenu}>
                    <button className={tabSelected === 0 ? myAccount.leftTabSelected : myAccount.leftTab} onClick={() => {
                        if(tabSelected !== 0) setTabSelected(0)
                    }}>
                        <BsPersonGear className={myAccount.leftIcon} size={24}/>
                        <p className={myAccount.leftTitle}>Thông tin cá nhân</p>
                    </button>
                    <button className={tabSelected === 1 ? myAccount.leftTabSelected : myAccount.leftTab} onClick={() => {
                        if(tabSelected !== 1) setTabSelected(1)
                    }}>
                        <MdSecurity className={myAccount.leftIcon} size={24}/>
                        <p className={myAccount.leftTitle}>Bảo mật</p>
                    </button>
                </div>
                <div className={myAccount.body}>
                    {tabSelected === 0 ? (<AccountInfo/>) : (<AccountSecurity/>)}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyAccount