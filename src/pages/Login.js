import React, { Fragment, useState, useEffect } from 'react';
import {
    Text,
    TextInput,
    Button,
    View,
    StyleSheet,
    Dimensions
  } from "react-native";

import efetuarLogin from '../services/api-login';

function Login({ navigation }) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagemErro, setMensagemErro] = useState("")

    const tentarLogar = async () => {
        try {
            
          const token = await efetuarLogin(usuario, senha);
        //   alert(token);
        //   return false;
        //   await AsyncStorage.setItem("instalura_token", token);
          //Ir para tela Main
          navigation.replace("Main", { nome: usuario })
    
        } catch (erro) {
          setMensagemErro("Erro ao tentar logar")
        }
    
      }

    return (
    <Fragment>
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="Usuário"
          onChangeText={texto => setUsuario(texto)}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={texto => setSenha(texto)}
        />
        <Text>{mensagemErro}</Text>
      </View>

      <View style={styles.botaoView}>
        <Button title="Entrar" onPress={tentarLogar} />
      </View>
    </Fragment>
    ); 
}


const largura = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    container:{
        flexGrow:2,
        justifyContent:"center",
        alignItems:"center"
    },
    inputs:{
        width:largura*0.8,
        textAlign:"center",
        marginTop:40,
        fontSize:30
    },
    botaoView:{
        alignItems:"center",
        marginBottom:50,
    }
})
export default Login;