export const validateFirstName = (value) => {
    if (value && value.trim().length > 0) {
        const nameRegex = /^[\p{L} ]+$/u
        if (!nameRegex.test(value)) return 'Họ phải chứa ít nhất 1 chữ cái và không được chứa số hay các kí tự đặc biệt.'
        else return ''
    }
    else return 'Đây là ô bắt buộc nhập.'
}

export const validateLastName = (value) => {
    if (value && value.trim().length > 0) {
        const nameRegex = /^[\p{L} ]+$/u
        if (!nameRegex.test(value)) return 'Tên phải chứa ít nhất 1 chữ cái và không được chứa số hay các kí tự đặc biệt.'
        else return ''
    }
    else return 'Đây là ô bắt buộc nhập.'
}

export const validateEmail = (value) => {
    if (value && value.trim().length > 0) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(value)) return 'Vui lòng nhập đúng định dạng email (VD: johndoe@example.com).'
        else return ''
    }
    else return 'Đây là ô bắt buộc nhập.'
}

export const validatePassword = (value) => {
    if (value && value.trim().length > 0) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
        if (!passwordRegex.test(value)) return 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm cả chữ thường, chữ hoa, số và ký tự đặc biệt.'
        else return ''
    }
    else return 'Đây là ô bắt buộc nhập.'
}

export const validatePhone = (value) => {
    if (value && value.trim().length > 0) {
        const phoneRegex = /^0\d{9}$/
        if (!phoneRegex.test(value)) return 'Vui lòng nhập số điện thoại theo đúng định dạng 0xxxxxxxxx.'
        else return ''
    }
    else return 'Đây là ô bắt buộc nhập.'
}

export const validateAge = (birthDay) => {
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDay.getFullYear()
    if (age < 18) {
        return 'Hệ thống yêu cầu người dùng phải đủ 18 tuổi trở lên'
    } else if (age === 18) {
        const currentMonth = currentDate.getMonth()
        const birthDayMonth = birthDay.getMonth()
        const currentDay = currentDate.getDate()
        const birthDayDate = birthDay.getDate()

        if (currentMonth < birthDayMonth || (currentMonth === birthDayMonth && currentDay < birthDayDate)) {
            return 'Hệ thống yêu cầu người dùng phải đủ 18 tuổi trở lên'
        } else {
            return ''
        }
    } else {
        return ''
    }
}