import { Image, StyleSheet, Platform, View, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { images } from '@/constants/images';

interface Analysis {
  name: string;
  description: string;
  icon: any;
  http: string;
  price: number;
}

export default function HomeScreen() {
  const router = useRouter();

  const latestAnalyses: Analysis[] = [
    {
      name: "Complete Blood Count (CBC)",
      description: "Measures the number and types of cells in your blood.",
      icon: images.cpc,
      http: "/product/Products",
      price: 50,
    },
    {
      name: "Lipid Panel",
      description: "Checks cholesterol and triglyceride levels.",
      icon: images.lp,
      http: "/product/LipidPanel",
      price: 75,
    },
    {
      name: "Basic Metabolic Panel",
      description: "Measures glucose, electrolytes, and kidney function.",
      icon: images.pmb,
      http: "/product/BMP",
      price: 60,
    },
  ];

  const handleAnalysisPress = (analysis: Analysis) => {
    router.push({
      pathname: "/product/Products",
      params: { 
        iconSrc: analysis.icon,
        http: analysis.http,
        name: analysis.name,
        description: analysis.description,
        price: analysis.price
      },
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#A1CEDC' }}
      headerImage={
        <Image
          source={images.lab}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title" style={styles.mainTitle}>Welcome to Alshefaa</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>Your Health, Our Priority</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>Get Started</ThemedText>
          <ThemedText style={styles.cardText}>
            Begin your journey to better health with our comprehensive medical services.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.latestAnalysesContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Latest Analyses</ThemedText>
          {latestAnalyses.map((analysis, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.analysisItem}
              onPress={() => handleAnalysisPress(analysis)}
            >
              <Image source={analysis.icon} style={styles.analysisIcon} />
              <ThemedView style={styles.analysisContent}>
                <ThemedText style={styles.analysisName}>{analysis.name}</ThemedText>
                <ThemedText style={styles.analysisDescription}>{analysis.description}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.viewMoreButton}
            onPress={() => router.push('/search')}
          >
            <ThemedText style={styles.viewMoreText}>View More Analyses</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>Our Services</ThemedText>
          <ThemedText style={styles.cardText}>
            Explore our wide range of medical services and specialized treatments.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>Expert Care</ThemedText>
          <ThemedText style={styles.cardText}>
            Trust in our team of experienced healthcare professionals.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  headerImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  latestAnalysesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#A1CEDC',
  },
  analysisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(161, 206, 220, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(161, 206, 220, 0.3)',
  },
  analysisIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  analysisContent: {
    flex: 1,
  },
  analysisName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#A1CEDC',
  },
  analysisDescription: {
    fontSize: 14,
    color: '#A1CEDC',
    opacity: 0.8,
  },
  viewMoreButton: {
    backgroundColor: '#A1CEDC',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  viewMoreText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
