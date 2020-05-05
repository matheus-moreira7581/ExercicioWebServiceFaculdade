import React from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';
import Cartao from './Cartao'

// import { Container } from './styles';

const PrevisaoItem = (props) => {
  return (
    <Cartao estilos={estilos.cartao}> 
      <View style={estilos.tela}>
        <Image
          style={estilos.imagem}
          source={{uri: "https://openweathermap.org/img/wn/" + 
          props.icon + ".png"}}
        />
        <View>
          <View style={estilos.primeiraLinha}>
            <Text>{"Sensação Termica "} 
            - {props.previsao.feels_like}</Text>
          </View>

          <View style={estilos.segundaLinha}>
            <Text style={estilos.valor}>
              
              {"Nascer do Sol: "  + new Date(props.previsao.sunrise * 1000).toLocaleTimeString()} 
            </Text>
            <Text style={estilos.valor}>
              {"Pôr do Sol: " + new Date(props.previsao.sunset * 1000).toLocaleTimeString()} 
            </Text>
            
          </View>
        </View>

      </View>
    </Cartao>
  );
};

const estilos = StyleSheet.create({
  cartao: {
    marginBottom: 5,
  },
  tela: {
    flexDirection: 'row',
  },
  imagem: {
    width: 50,
    height: 50,
  },
  primeiraLinha: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  segundaLinha: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    borderTopWidth: 1,
    height: 30,
    borderTopColor: '#EEE',
  },
  valor: {
    marginHorizontal: 2,
  },

});

export default PrevisaoItem;
