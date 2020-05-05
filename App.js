import React, {useState} from 'react';
import { StyleSheet, Text, View,  TextInput, Button, FlatList, Keyboard} from 'react-native';

import PrevisaoItem from './components/PrevisaoItem';

export default function App() {
  const apiKey = "0bf1e07e66660405d50e31b9f4f1c9f4"
  const endpointLatLon = "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q=";
  const endpointOneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=";
  const pointLon = "&lon=";

  const [cidade, setCidade] = useState('');
  const [cityData, setCityData] = useState([]);
  const [oneCallApiData, setOneCallApiData] = useState([]);
  const [icon, setIcon] = useState('');
  const [showCard, setShowCard] = useState(false);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obtemLatLon = () => {
    setCityData([]);
    const target = endpointLatLon + cidade + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados)=> {
      setCityData(dados["city"]);
      let lat = dados.city.coord.lat;
      let lon = dados.city.coord.lon;
      obtemOneCallApiData(lat, lon);
      Keyboard.dismiss();
    });
  }
  const obtemOneCallApiData = (lat, lon) => {
    setOneCallApiData([]);
    const target = endpointOneCallApi + lat + pointLon + lon + "&exclude=hourly,daily&" + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados)=> {
      console.log(dados["current"]);
      setOneCallApiData(dados["current"]);
      setIcon(dados.current.weather[0].icon.toString())
      setShowCard(true);
      Keyboard.dismiss();
    });

  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput 
          style={styles.nomeCidade}
          placeholder="Digite o nome da cidade"
          onChangeText={capturarCidade}
          value={cidade}
        />
        <Button 
          title="OK"
          onPress={obtemLatLon}
        />
      </View>
      {showCard === true ? <PrevisaoItem previsao={oneCallApiData} icon={icon} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
});
