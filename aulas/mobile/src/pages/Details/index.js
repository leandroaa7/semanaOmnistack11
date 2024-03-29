import React from 'react';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    //const message = "Olá APAD, estrou entrando em contato pois gostaria de ajudar o caso 'Cadelinha atropelada' com o valor de R$120,00"
    const message = "Olá, gostaria de deixar registrado que eu te amo muito"
    function navigateBack(){
        navigation.goBack();
    }


    function sendMail(){
        MailComposer.composeAsync({
            subject: 'Herói do caso: Cadelinha atropelada',
            recipients: ['diego@rocketseat.com.br'],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=5511959172928&text=${message}`)
    }

    return (
        <View style={styles.container} >
            <View style={styles.header}>

                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28}
                        color="#E82041" />

                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG</Text>
                    <Text style={styles.incidentValue}>APAD</Text>

                    <Text style={styles.incidentProperty}>Caso</Text>
                    <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                    <Text style={styles.incidentProperty}>Valor</Text>
                    <Text style={styles.incidentValue}>R$ 120,00</Text>

                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-Mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}