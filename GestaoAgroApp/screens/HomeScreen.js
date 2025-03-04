import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import Button from '../utils/button';
import { styles, colors } from '../utils/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleContact = () => {
    Linking.openURL('mailto:suporte@gestaoagro.com');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/5569992772027');
  };

  return (
    <ScrollView contentContainerStyle={styles.homeContainer}>
      <View style={styles.header}>
        <Text style={styles.homeTitle}>Bem-vindo ao GestãoAgro</Text>
        <Text style={styles.homeSubtitle}>
          Gerencie sua fazenda de forma simples e eficiente.
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <Animatable.View animation="fadeInUp" duration={1000}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('CadastroAnimal')}
            activeOpacity={0.7}
          >
            <Icon name="pets" size={40} color={colors.primary} />
            <Text style={styles.featureTitle}>Cadastro de Animais</Text>
            <Text style={styles.featureDescription}>
              Registre e gerencie os dados dos seus animais.
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={1200}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('HealthScreen')}
            activeOpacity={0.7}
          >
            <Icon name="medical-services" size={40} color={colors.primary} />
            <Text style={styles.featureTitle}>Controle de Saúde</Text>
            <Text style={styles.featureDescription}>
              Acompanhe vacinas e tratamentos dos animais.
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={1400}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('ProductionScreen')}
            activeOpacity={0.7}
          >
            <Icon name="local-drink" size={40} color={colors.primary} />
            <Text style={styles.featureTitle}>Gestão de Produção</Text>
            <Text style={styles.featureDescription}>
              Monitore a produção de leite e ganho de peso.
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={1600}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('ReportsScreen')}
            activeOpacity={0.7}
          >
            <Icon name="assessment" size={40} color={colors.primary} />
            <Text style={styles.featureTitle}>Relatórios</Text>
            <Text style={styles.featureDescription}>
              Acesse relatórios detalhados da sua fazenda.
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Precisa de Ajuda?</Text>
        <Text style={styles.contactText}>
          Entre em contato com nossa equipe de suporte.
        </Text>
        <Button
          title="Enviar E-mail"
          onPress={handleContact}
          style={{ marginBottom: 10 }}
        />
        <Button
          title="WhatsApp"
          onPress={handleWhatsApp}
          style={{ backgroundColor: colors.secondary }}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;