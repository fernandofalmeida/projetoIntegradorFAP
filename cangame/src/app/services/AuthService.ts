
import jwt from 'jsonwebtoken';
import  IUser  from '../interfaces/IUser';

const generateToken = (user: IUser): string => {
    const token = jwt.sign({ id: user.id, email: user.email }, 'cangame123', { expiresIn: '8h' });
    return token;
};

export default { generateToken };
