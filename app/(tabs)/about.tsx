import { StyleSheet, Image, Platform, View } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { images } from '@/constants/images';

export default function AboutScreen() {
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
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.mainTitle}>About Alshefaa</ThemedText>
          <ThemedText style={styles.subtitle}>Your Trusted Healthcare Partner for Comprehensive Diagnostics</ThemedText>
        </ThemedView>

        <Collapsible title="Our Mission">
          <ThemedText style={styles.contentText}>
            At Alshefaa, we are committed to providing accessible, high-quality medical laboratory services. 
            Our mission is to empower individuals with accurate health information through comprehensive 
            diagnostic testing and professional medical care.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Our Services">
          <ThemedText style={styles.contentText}>
            We offer a wide range of medical laboratory services including:
          </ThemedText>
          <ThemedView style={styles.serviceList}>
            <ThemedText style={styles.bulletPoint}>• Complete Blood Count (CBC)</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Lipid Panel Analysis</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Basic Metabolic Panel</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Thyroid Function Tests</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Liver Function Tests</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Kidney Function Tests</ThemedText>
          </ThemedView>
        </Collapsible>

        <Collapsible title="Why Choose Us">
          <ThemedView style={styles.featureContainer}>
            <ThemedView style={styles.feature}>
              <IconSymbol
                size={24}
                color="#A1CEDC"
                name="house.fill"
                style={styles.featureIcon}
              />
              <ThemedText style={styles.featureText}>State-of-the-art Equipment</ThemedText>
            </ThemedView>
            <ThemedView style={styles.feature}>
              <IconSymbol
                size={24}
                color="#A1CEDC"
                name="house.fill"
                style={styles.featureIcon}
              />
              <ThemedText style={styles.featureText}>Expert Medical Staff</ThemedText>
            </ThemedView>
            <ThemedView style={styles.feature}>
              <IconSymbol
                size={24}
                color="#A1CEDC"
                name="house.fill"
                style={styles.featureIcon}
              />
              <ThemedText style={styles.featureText}>Quick Results</ThemedText>
            </ThemedView>
            <ThemedView style={styles.feature}>
              <IconSymbol
                size={24}
                color="#A1CEDC"
                name="house.fill"
                style={styles.featureIcon}
              />
              <ThemedText style={styles.featureText}>Affordable Pricing</ThemedText>
            </ThemedView>
          </ThemedView>
        </Collapsible>

        <Collapsible title="Our Commitment">
          <ThemedText style={styles.contentText}>
            We are dedicated to maintaining the highest standards of medical care and patient service. 
            Our team of experienced healthcare professionals ensures accurate results and provides 
            comprehensive support throughout your healthcare journey.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Contact Information">
          <ThemedView style={styles.contactContainer}>
            <ThemedText style={styles.contactText}>📍 Location: 12 street</ThemedText>
            <ThemedText style={styles.contactText}>📞 Phone: 01202222022</ThemedText>
            <ThemedText style={styles.contactText}>✉️ Email: n.email@alshefaa.com</ThemedText>
            <ThemedText style={styles.contactText}>⏰ Hours: 24/7</ThemedText>
          </ThemedView>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    resizeMode: 'cover',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#A1CEDC',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.8,
    color: '#A1CEDC',
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#666',
  },
  serviceList: {
    marginLeft: 16,
    marginTop: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  featureContainer: {
    marginTop: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(161, 206, 220, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#666',
  },
  contactContainer: {
    marginTop: 8,
    backgroundColor: 'rgba(161, 206, 220, 0.1)',
    padding: 16,
    borderRadius: 8,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
});
