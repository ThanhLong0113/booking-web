import React, { useState} from "react";
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { useUserById } from "../../../talons/useUserById";
import { countries } from '../../../constants/countries'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import accountInfo from './accountInfo.module.css'

const AccountInfo = () => {
    const id = localStorage.getItem('token')
    const getUserById = useUserById(id)
    const {
        isLoading,
        userById,
        setIsLoading
    } = getUserById
    const [birthDay, setBirthDay] = useState(new Date())

    const [nameEdit, setNameEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [phoneEdit, setPhoneEdit] = useState(false)
    const [birthEdit, setBirthEdit] = useState(false)
    const [nationalityEdit, setNationalityEdit] = useState(false)
    const [genderEdit, setGenderEdit] = useState(false)
    const [addressEdit, setAddressEdit] = useState(false)

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    async function updateUser(field, value) {
        setIsLoading(true)
        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                field: field,
                value: value
            });
            setIsLoading(false)
        } catch (err) {
           setIsLoading(false)
        }
    }

    const handleUpdateUser = (field, value) => {
        updateUser(field, value)
    }

    if (isLoading) return (
        <div className={accountInfo.wrapper}>
            <div className={accountInfo.title}>
                <h1>Thông tin cá nhân</h1>
                <p>Thay đổi thông tin cá nhân của bạn bất cứ lúc nào</p>
            </div>
            <div className={accountInfo.infoLoading}>
                <SyncLoader size={12} color='#006ce4' speedMultiplier={1.5} />
            </div>
        </div>
    )

    return (
        <div className={accountInfo.wrapper}>
            <div className={accountInfo.title}>
                <h1>Thông tin cá nhân</h1>
                <p>Thay đổi thông tin cá nhân của bạn bất cứ lúc nào</p>
            </div>
            <div className={accountInfo.infoWrapper}>
                <div className={accountInfo.infoItem}>
                    <div className={accountInfo.itemName}>
                        <h4>Họ và tên</h4>
                    </div>
                    <div className={accountInfo.itemContent}>
                        {!nameEdit ? (<p>{`${userById.first_name} ${userById.last_name}`}</p>)
                        : (<div className={accountInfo.inputWrapper}>
                            <input placeholder="Họ" onChange={(e) => {
                                setFirstName(e.target.value)
                            }}></input>
                            <input placeholder="Tên" onChange={(e) => {
                                setLastName(e.target.value)
                            }}></input>
                        </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                        {!nameEdit ? (<button className={accountInfo.editButton} onClick={() => setNameEdit(true)}>Sửa</button>)
                        : (<div className={accountInfo.buttonWrapper}>
                          <button className={accountInfo.cancelButton} onClick={() => setNameEdit(false)}>Hủy</button>
                          <button className={accountInfo.saveButton} onClick={() => {
                            const field = ['first_name', 'last_name']
                            const value = [firstName, lastName]
                            handleUpdateUser(field, value)
                            setNameEdit(false)
                          }}>Lưu</button>
                        </div>)}
                    </div>
                </div>

                <div className={accountInfo.infoItem}>
                    <div className={accountInfo.itemName}>
                        <h4>Email</h4>
                    </div>
                    <div className={accountInfo.itemContent}>
                    {!emailEdit ? (<p>{userById.email}</p>)
                        : (<div className={accountInfo.inputWrapper}>
                            <input placeholder="Email" onChange={(e) => {
                                setEmail(e.target.value)
                            }}></input>
                        </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                    {!emailEdit ? (<button className={accountInfo.editButton} onClick={() => setEmailEdit(true)}>Sửa</button>)
                        : (<div className={accountInfo.buttonWrapper}>
                          <button className={accountInfo.cancelButton} onClick={() => setEmailEdit(false)}>Hủy</button>
                          <button className={accountInfo.saveButton} onClick={() => {
                            const field = ['email']
                            const value = [email]
                            handleUpdateUser(field, value)
                            setEmailEdit(false)
                          }}>Lưu</button>
                        </div>)}
                    </div>
                </div>

                <div className={accountInfo.infoItem}>
                    <div className={accountInfo.itemName}>
                        <h4>Số điện thoại</h4>
                    </div>
                    <div className={accountInfo.itemContent}>
                    {!phoneEdit ? (<p>{userById.phone_number ? userById.phone_number : 'Thêm số điện thoại của bạn'}</p>)
                        : (<div className={accountInfo.inputWrapper}>
                            <input placeholder="Số điện thoại" onChange={(e) => {
                                setPhone(e.target.value)
                            }}></input>
                        </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                    {!phoneEdit ? (<button className={accountInfo.editButton} onClick={() => setPhoneEdit(true)}>Sửa</button>)
                        : (<div className={accountInfo.buttonWrapper}>
                          <button className={accountInfo.cancelButton} onClick={() => setPhoneEdit(false)}>Hủy</button>
                          <button className={accountInfo.saveButton} onClick={() => {
                            const field = ['phone_number']
                            const value = [phone]
                            handleUpdateUser(field, value)
                            setPhoneEdit(false)
                          }}>Lưu</button>
                        </div>)}
                    </div>
                </div>

                <div className={accountInfo.infoItem}>
                    <div className={accountInfo.itemName}>
                        <h4>Ngày sinh</h4>
                    </div>
                    <div className={accountInfo.itemContent}>
                    {!birthEdit ? (<p>{userById.birth_day ? userById.birth_day : 'Chọn ngày sinh của bạn'}</p>)
                        : (<div className={accountInfo.inputWrapper}>
                            <DatePicker
                            id="calendar"
                            dateFormat="dd/MM/yyyy"
                            selected={birthDay}
                            onChange={date => setBirthDay(date)}
                            showPopperArrow={false}
                            customInput={<button className={accountInfo.birthDayButton}>{birthDay ? birthDay.toLocaleDateString('vi-VI') : ''}</button>}
                        />
                        </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                    {!birthEdit ? (<button className={accountInfo.editButton} onClick={() => setBirthEdit(true)}>Sửa</button>)
                        : (<div className={accountInfo.buttonWrapper}>
                          <button className={accountInfo.cancelButton} onClick={() => setBirthEdit(false)}>Hủy</button>
                          <button className={accountInfo.saveButton} onClick={() => {
                            console.log(birthDay.toLocaleDateString('vi-VI'))
                            const field = ['birth_day']
                            const value = [birthDay.toLocaleDateString('vi-VI')]
                            handleUpdateUser(field, value)
                            setBirthEdit(false)
                          }}>Lưu</button>
                        </div>)}
                    </div>
                </div>

                <div className={accountInfo.infoItem}>
                    <div className={accountInfo.itemName}>
                        <h4>Quốc tịch</h4>
                    </div>
                    <div className={accountInfo.itemContent}>
                        {!nationalityEdit ? (<p>{userById.nationality ? userById.nationality : 'Chọn quốc gia/vùng lãnh thổ của bạn'}</p>)
                        : <div className={accountInfo.selectWrapper}>
                            <select className={accountInfo.selectNationality}>
                                <option value='Quốc tịch'>Chọn quốc tịch của bạn</option>
                                {countries.map((element, index) => {
                                    return (
                                        <option key={index} value={element}>{element}</option>
                                    )
                                })}
                            </select>
                        </div>}
                    </div>
                    <div className={accountInfo.itemButton}>
                    {!nationalityEdit ? (<button className={accountInfo.editButton} onClick={() => setNationalityEdit(true)}>Sửa</button>)
                        : (<div className={accountInfo.buttonWrapper}>
                          <button className={accountInfo.cancelButton} onClick={() => setNationalityEdit(false)}>Hủy</button>
                          <button className={accountInfo.saveButton}>Lưu</button>
                        </div>)}
                    </div>
                </div>

                <div className={accountInfo.infoItem}>
                    <div className={accountInfo.itemName}>
                        <h4>Giới tính</h4>
                    </div>
                    <div className={accountInfo.itemContent}>
                    {!genderEdit ? (<p>{userById.gender !== -1 ? userById.gender : 'Chọn giới tính của bạn'}</p>)
                        : <div className={accountInfo.selectWrapper}>
                            <select className={accountInfo.selectGender}>
                                <option value='default'>Chọn giới tính của bạn</option>
                                <option value='male'>Nam</option>
                                <option value='female'>Nữ</option>
                            </select>
                        </div>}
                    </div>
                    <div className={accountInfo.itemButton}>
                    {!genderEdit ? (<button className={accountInfo.editButton} onClick={() => setGenderEdit(true)}>Sửa</button>)
                        : (<div className={accountInfo.buttonWrapper}>
                          <button className={accountInfo.cancelButton} onClick={() => setGenderEdit(false)}>Hủy</button>
                          <button className={accountInfo.saveButton}>Lưu</button>
                        </div>)}
                    </div>
                </div>

                <div className={accountInfo.infoItem}>
                    <div className={accountInfo.itemName}>
                        <h4>Địa chỉ</h4>
                    </div>
                    <div className={accountInfo.itemContent}>
                    {!addressEdit ? (<p>{userById.address ? userById.address : 'Thêm địa chỉ của bạn'}</p>)
                        : (<div className={accountInfo.inputWrapper}>
                            <textarea placeholder="Địa chỉ"></textarea>
                        </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                    {!addressEdit ? (<button className={accountInfo.editButton} onClick={() => setAddressEdit(true)}>Sửa</button>)
                        : (<div className={accountInfo.buttonWrapper}>
                          <button className={accountInfo.cancelButton} onClick={() => setAddressEdit(false)}>Hủy</button>
                          <button className={accountInfo.saveButton}>Lưu</button>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo