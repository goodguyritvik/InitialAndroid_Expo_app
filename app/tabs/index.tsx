import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Linking, TouchableOpacity, TextInput, Platform, ScrollView, FlatList } from 'react-native';
import { fetchNews, fetchWeather } from '../utils/apiService';

const GOOGLE_STATIC_MAPS_API_KEY = 'AIzaSyAzmqPDYk3vvPI5ELg1lJaUtmd2qHfKHZI'; // Replace with your API key

interface Location {
  latitude: number;
  longitude: number;
}

const IndexScreen = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [destination, setDestination] = useState<string>('');
  const [destinationCoords, setDestinationCoords] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  // API keys as constants
  const NEWS_API_KEY = 'ec3dd0e00ad54a84804f3472748bfe03';
  const WEATHER_API_KEY = '39a9ff3ae50764bec2012af20d486301';

  // News and Weather states
 // News and Weather states
const [newsApiKey, setNewsApiKey] = useState<string>(NEWS_API_KEY);
const [weatherApiKey, setWeatherApiKey] = useState<string>(WEATHER_API_KEY);
const [newsArticles, setNewsArticles] = useState<any[]>([]);
const [weatherData, setWeatherData] = useState<any | null>(null);
const [newsLoading, setNewsLoading] = useState<boolean>(false);
const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
const [newsError, setNewsError] = useState<string | null>(null);
const [weatherError, setWeatherError] = useState<string | null>(null);


  React.useEffect(() => {
    if (Platform.OS === 'web') {
      setUserLocation({ latitude: 40.7128, longitude: -74.0060 });
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError('Failed to get current location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  React.useEffect(() => {
    if (!newsApiKey) return;
    setNewsLoading(true);
    fetchNews(newsApiKey)
      .then((articles) => {
        setNewsArticles(articles);
        setNewsError(null);
      })
      .catch(() => {
        setNewsError('Failed to fetch news');
      })
      .finally(() => {
        setNewsLoading(false);
      });
  }, [newsApiKey]);

  React.useEffect(() => {
    if (!userLocation || !weatherApiKey) return;
    setWeatherLoading(true);
    fetchWeather(userLocation.latitude, userLocation.longitude, weatherApiKey)
      .then((data) => {
        setWeatherData(data);
        setWeatherError(null);
      })
      .catch(() => {
        setWeatherError('Failed to fetch weather');
      })
      .finally(() => {
        setWeatherLoading(false);
      });
  }, [userLocation, weatherApiKey]);

  const geocodeDestination = async () => {
    if (!destination) {
      setDestinationCoords(null);
      return;
    }
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${GOOGLE_STATIC_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setDestinationCoords({ latitude: location.lat, longitude: location.lng });
        setError(null);
      } else {
        setError('Unable to find location for the entered address');
        setDestinationCoords(null);
      }
    } catch {
      setError('Error fetching location data');
      setDestinationCoords(null);
    }
  };

  const getStaticMapUrl = () => {
    if (!userLocation) return null;
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const size = '600x300';
    const markers = [
      `color:blue|label:U|${userLocation.latitude},${userLocation.longitude}`,
    ];
    if (destinationCoords) {
      markers.push(`color:red|label:D|${destinationCoords.latitude},${destinationCoords.longitude}`);
    }
    const markersParam = markers.map(m => `markers=${encodeURIComponent(m)}`).join('&');
    return `${baseUrl}?size=${size}&${markersParam}&key=${GOOGLE_STATIC_MAPS_API_KEY}`;
  };

  const openDirections = () => {
    if (!userLocation || !destinationCoords) return;
    const url = Platform.select({
      ios: `maps://app?daddr=${destinationCoords.latitude},${destinationCoords.longitude}&saddr=${userLocation.latitude},${userLocation.longitude}`,
      android: `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}`,
      default: `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}`,
    });
    if (url) {
      Linking.openURL(url);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading current location...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Delivery Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter delivery address"
        value={destination}
        onChangeText={setDestination}
      />
      <TouchableOpacity style={styles.button} onPress={geocodeDestination}>
        <Text style={styles.buttonText}>Show Map</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {userLocation && (
        <>
      {(() => {
        const mapUrl = getStaticMapUrl();
        if (mapUrl) {
          return (
            <TouchableOpacity onPress={openDirections}>
              <Image
                source={{ uri: mapUrl }}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <Text style={styles.directionsText}>Tap map to open directions</Text>
            </TouchableOpacity>
          );
        } else {
          return <Text>Enter a valid destination to see the map</Text>;
        }
      })()}
        </>
      )}


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Weather</Text>
        {weatherLoading ? (
          <ActivityIndicator />
        ) : weatherError ? (
          <Text style={styles.errorText}>{weatherError}</Text>
        ) : weatherData ? (
          <View>
            <Text>Location: {weatherData.name}</Text>
            <Text>Temperature: {weatherData.main.temp} °C</Text>
            <Text>Condition: {weatherData.weather[0].description}</Text>
          </View>
        ) : (
          <Text>Enter Weather API key to see weather data</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top News Headlines</Text>
        {newsLoading ? (
          <ActivityIndicator />
        ) : newsError ? (
          <Text style={styles.errorText}>{newsError}</Text>
        ) : newsArticles.length > 0 ? (
          <FlatList
            data={newsArticles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.newsItem}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                {item.url && (
                  <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                    <Text style={styles.newsLink}>Read more</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        ) : (
          <Text>Enter News API key to see news headlines</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  directionsText: {
    marginTop: 8,
    color: '#007AFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  apiKeyContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  apiKeyInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  newsItem: {
    marginBottom: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  newsLink: {
    color: '#007AFF',
    marginTop: 4,
  },
});

export default IndexScreen;
