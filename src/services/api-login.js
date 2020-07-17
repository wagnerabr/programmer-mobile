import axios  from 'axios';
import api from './api';


const efetuarLogin = async (usuario, senha) => {
    
    const response = await api.post('/login', {
        user_name: usuario,
        user_password: senha
    });
    
    if (response.status === 200) {
        //consegui logar
        return true;
        // return resposta.headers.get("x-access-token")
    } else {
        console.log("Erro");
        return false;
        throw new Error("Não foi possível logar");
    }

}

export default efetuarLogin;