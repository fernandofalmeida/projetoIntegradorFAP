
interface IUser {
  id?: number;
  email: string;
  password: string;
  nivelAcesso: string;
  dataCadastro: Date;
  
  checkPassword(candidatePassword: string): Promise<boolean>;
}

export default IUser;
