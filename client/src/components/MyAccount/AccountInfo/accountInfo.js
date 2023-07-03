import React, { useState } from "react";
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { useUserById } from "../../../talons/useUserById";
import { validateFirstName, validateLastName, validateEmail, validatePhone, validateAge } from '../../../talons/validation'
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
    const [nationality, setNationality] = useState()
    const [gender, setGender] = useState()
    const [address, setAddress] = useState()

    const [firstNameErr, setFirstNameErr] = useState()
    const [lastNameErr, setLastNameErr] = useState()
    const [emailErr, setEmailErr] = useState()
    const [phoneErr, setPhoneErr] = useState()
    const [birthDayErr, setBirthDayErr] = useState()
    const [nationalityErr, setNationalityErr] = useState()
    const [genderErr, setGenderErr] = useState()

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
                                <div>
                                    <input placeholder="Họ" onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}></input>
                                    {firstNameErr?.length > 0 && <p className={accountInfo.inputError}>{firstNameErr}</p>}
                                </div>
                                <div>
                                    <input placeholder="Tên" onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}></input>
                                    {lastNameErr?.length > 0 && <p className={accountInfo.inputError}>{lastNameErr}</p>}
                                </div>

                            </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                        {!nameEdit ? (<button className={accountInfo.editButton} onClick={() => setNameEdit(true)}>Sửa</button>)
                            : (<div className={accountInfo.buttonWrapper}>
                                <button className={accountInfo.cancelButton} onClick={() => setNameEdit(false)}>Hủy</button>
                                <button className={accountInfo.saveButton} onClick={() => {
                                    const firstNameCheck = validateFirstName(firstName)
                                    const lastNameCheck = validateLastName(lastName)
                                    if (!(firstNameCheck.length > 0) && !(lastNameCheck.length > 0)) {
                                        setFirstNameErr('')
                                        setLastNameErr('')
                                        setFirstName()
                                        setLastName()
                                        const field = ['first_name', 'last_name']
                                        const value = [firstName, lastName]
                                        handleUpdateUser(field, value)
                                        setNameEdit(false)
                                    }
                                    else {
                                        setFirstNameErr(firstNameCheck)
                                        setLastNameErr(lastNameCheck)
                                    }
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
                                <div>
                                    <input placeholder="Email" onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}></input>
                                    {emailErr?.length > 0 && <p className={accountInfo.inputError}>{emailErr}</p>}
                                </div>
                            </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                        {!emailEdit ? (<button className={accountInfo.editButton} onClick={() => setEmailEdit(true)}>Sửa</button>)
                            : (<div className={accountInfo.buttonWrapper}>
                                <button className={accountInfo.cancelButton} onClick={() => setEmailEdit(false)}>Hủy</button>
                                <button className={accountInfo.saveButton} onClick={() => {
                                    const emailCheck = validateEmail(email)
                                    if (!(emailCheck.length > 0)) {
                                        setEmailErr('')
                                        setEmail()
                                        const field = ['email']
                                        const value = [email]
                                        handleUpdateUser(field, value)
                                        setEmailEdit(false)
                                    }
                                    else setEmailErr(emailCheck)
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
                                <div>
                                    <input placeholder="Số điện thoại" onChange={(e) => {
                                        setPhone(e.target.value)
                                    }}></input>
                                    {phoneErr?.length > 0 && <p className={accountInfo.inputError}>{phoneErr}</p>}
                                </div>

                            </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                        {!phoneEdit ? (<button className={accountInfo.editButton} onClick={() => setPhoneEdit(true)}>Sửa</button>)
                            : (<div className={accountInfo.buttonWrapper}>
                                <button className={accountInfo.cancelButton} onClick={() => setPhoneEdit(false)}>Hủy</button>
                                <button className={accountInfo.saveButton} onClick={() => {
                                    const phoneCheck = validatePhone(phone)
                                    if (!(phoneCheck.length > 0)) {
                                        setPhoneErr('')
                                        setPhone()
                                        const field = ['phone_number']
                                        const value = [phone]
                                        handleUpdateUser(field, value)
                                        setPhoneEdit(false)
                                    }
                                    else setPhoneErr(phoneCheck)
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
                                <div>
                                    <DatePicker
                                        id="calendar"
                                        dateFormat="dd/MM/yyyy"
                                        selected={birthDay}
                                        onChange={date => setBirthDay(date)}
                                        showPopperArrow={false}
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        customInput={<button className={accountInfo.birthDayButton}>{birthDay ? birthDay.toLocaleDateString('vi-VI') : ''}</button>}
                                    />
                                    {birthDayErr?.length > 0 && <p className={accountInfo.inputError}>{birthDayErr}</p>}
                                </div>
                            </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                        {!birthEdit ? (<button className={accountInfo.editButton} onClick={() => setBirthEdit(true)}>Sửa</button>)
                            : (<div className={accountInfo.buttonWrapper}>
                                <button className={accountInfo.cancelButton} onClick={() => setBirthEdit(false)}>Hủy</button>
                                <button className={accountInfo.saveButton} onClick={() => {
                                    const birthDayCheck = validateAge(birthDay)
                                    if (!(birthDayCheck.length > 0)) {
                                        setBirthDayErr('')
                                        setBirthDay(new Date())
                                        const field = ['birth_day']
                                        const value = [birthDay.toLocaleDateString('vi-VI')]
                                        handleUpdateUser(field, value)
                                        setBirthEdit(false)
                                    }
                                    else setBirthDayErr(birthDayCheck)
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
                                <div>
                                    <select className={accountInfo.selectNationality} onChange={(e) => {
                                        setNationality(e.target.value)
                                    }}>
                                        <option value='default'>Chọn quốc tịch của bạn</option>
                                        {countries.map((element, index) => {
                                            return (
                                                <option key={index} value={element}>{element}</option>
                                            )
                                        })}
                                    </select>
                                    {nationalityErr?.length > 0 && <p className={accountInfo.inputError}>{nationalityErr}</p>}
                                </div>
                            </div>}
                    </div>
                    <div className={accountInfo.itemButton}>
                        {!nationalityEdit ? (<button className={accountInfo.editButton} onClick={() => setNationalityEdit(true)}>Sửa</button>)
                            : (<div className={accountInfo.buttonWrapper}>
                                <button className={accountInfo.cancelButton} onClick={() => setNationalityEdit(false)}>Hủy</button>
                                <button className={accountInfo.saveButton} onClick={() => {
                                    if (nationality && nationality !== 'default') {
                                        setNationalityErr('')
                                        setNationality()
                                        const field = ['nationality']
                                        const value = [nationality]
                                        handleUpdateUser(field, value)
                                        setNationalityEdit(false)
                                    }
                                    else setNationalityErr('Đây là ô bắt buộc nhập.')
                                }}>Lưu</button>
                            </div>)}
                    </div>
                </div>

                <div className={accountInfo.infoItem}>
                    <div className={accountInfo.itemName}>
                        <h4>Giới tính</h4>
                    </div>
                    <div className={accountInfo.itemContent}>
                        {!genderEdit ? (<p>{userById.gender !== -1 ? (userById.gender === 0 ? 'Nam' : 'Nữ') : 'Chọn giới tính của bạn'}</p>)
                            : <div className={accountInfo.selectWrapper}>
                                <div>
                                    <select className={accountInfo.selectGender} onChange={(e) => {
                                        setGender(e.target.value)
                                    }}>
                                        <option value='default'>Chọn giới tính của bạn</option>
                                        <option value='male'>Nam</option>
                                        <option value='female'>Nữ</option>
                                    </select>
                                    {genderErr?.length > 0 && <p className={accountInfo.inputError}>{genderErr}</p>}
                                </div>
                            </div>}
                    </div>
                    <div className={accountInfo.itemButton}>
                        {!genderEdit ? (<button className={accountInfo.editButton} onClick={() => setGenderEdit(true)}>Sửa</button>)
                            : (<div className={accountInfo.buttonWrapper}>
                                <button className={accountInfo.cancelButton} onClick={() => setGenderEdit(false)}>Hủy</button>
                                <button className={accountInfo.saveButton} onClick={() => {
                                    if (gender && gender !== 'default') {
                                        setGenderErr('')
                                        setGender()
                                        const field = ['gender']
                                        const value = [gender === 'male' ? 0 : 1]
                                        handleUpdateUser(field, value)
                                        setGenderEdit(false)
                                    }
                                    else setGenderErr('Đây là ô bắt buộc nhập.')
                                }}>Lưu</button>
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
                                <textarea placeholder="Địa chỉ" onChange={(e) => {
                                    setAddress(e.target.value)
                                }}></textarea>
                            </div>)}
                    </div>
                    <div className={accountInfo.itemButton}>
                        {!addressEdit ? (<button className={accountInfo.editButton} onClick={() => setAddressEdit(true)}>Sửa</button>)
                            : (<div className={accountInfo.buttonWrapper}>
                                <button className={accountInfo.cancelButton} onClick={() => setAddressEdit(false)}>Hủy</button>
                                <button className={accountInfo.saveButton} onClick={() => {
                                    if (address && address.length > 0) {
                                        const field = ['address']
                                        const value = [address]
                                        handleUpdateUser(field, value)
                                        setAddressEdit(false)
                                    }
                                }}>Lưu</button>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo