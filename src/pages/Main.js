import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [programmers, setProgrammers] = useState([]);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted }=await requestPermissionsAsync();
            
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition();
    }, []);

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }      
        })
        
        setProgrammers(response.data.programmers);
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    return (
        <>
        <MapView 
            onRegionChangeComplete={handleRegionChanged}
            initialRegion={currentRegion} 
            style={styles.map} 
            >
            {programmers.map(programmer => (
                <Marker 
                    key={programmer._id}
                    coordinate={{ 
                        longitude: programmer.location.coordinates[0],
                        latitude: programmer.location.coordinates[1], 
                    }}>
                    <Image 
                        style={styles.avatar} 
                        source={{ uri: programmer.avatar_url }} />
                    <Callout onPress={() => {
                        //Navegação
                        navigation.navigate('Profile', { github_username: programmer.github_username })
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{programmer.name}</Text>
                            <Text style={styles.devBio}>{programmer.bio}</Text>
                            <Text style={styles.devTechs} >{programmer.techs.join(', ')}</Text>
                        </View> 
                    </Callout>
                </Marker>
            ) )}
        </MapView>
        <View style={styles.searchForm}> 
            <TextInput 
                style={styles.serachInput}
                placeholder="Buscar devs por technologia"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            /> 
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    callout: {
        width: 260,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#FFF"
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    }, 
    devBio: {
        color: "#666",
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    }, 
    serachInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,

    }
})

export default Main;