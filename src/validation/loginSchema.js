export const loginSchema = {
  email(value) {
    if (!value) {
      return 'This field is required';
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return 'Invalid Email';
    }
    return true;
  },
  password(value) {
    if (value) return true
    return 'Invalid password'
  }
}
