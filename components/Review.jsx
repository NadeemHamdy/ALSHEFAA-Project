import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const Review = ({ productName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const user = auth.currentUser;
    setIsLoggedIn(!!user);
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('productName', '==', productName)
      );
      const querySnapshot = await getDocs(reviewsQuery);
      const loadedReviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(loadedReviews);

      // Check if current user has a review
      const user = auth.currentUser;
      if (user) {
        const userReview = loadedReviews.find(review => review.userId === user.uid);
        if (userReview) {
          setUserReview(userReview);
          setRating(userReview.rating);
          setComment(userReview.comment);
        }
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (!isLoggedIn) {
      Alert.alert('Login Required', 'Please login to submit a review');
      return;
    }

    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating');
      return;
    }

    try {
      const user = auth.currentUser;
      
      if (userReview) {
        // Update existing review
        const reviewRef = doc(db, 'reviews', userReview.id);
        await updateDoc(reviewRef, {
          rating,
          comment,
          timestamp: new Date()
        });
        Alert.alert('Success', 'Review updated successfully');
      } else {
        // Create new review
        await addDoc(collection(db, 'reviews'), {
          userId: user.uid,
          userEmail: user.email,
          productName,
          rating,
          comment,
          timestamp: new Date()
        });
        Alert.alert('Success', 'Review submitted successfully');
      }

      setRating(0);
      setComment('');
      setIsEditing(false);
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review');
    }
  };

  const handleEditReview = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment);
    } else {
      setRating(0);
      setComment('');
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Text style={[styles.star, star <= rating ? styles.starFilled : styles.starEmpty]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>Reviews</ThemedText>
      
      {isLoggedIn && !userReview && !isEditing && (
        <TouchableOpacity
          style={styles.addReviewButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.addReviewButtonText}>Write a Review</Text>
        </TouchableOpacity>
      )}
      
      {(isEditing || (!userReview && isLoggedIn)) && (
        <ThemedView style={styles.reviewForm}>
          <ThemedText style={styles.label}>Your Rating:</ThemedText>
          {renderStars()}
          
          <TextInput
            style={styles.input}
            placeholder="Write your review..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
          
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.submitButton, styles.editButton]}
              onPress={handleSubmitReview}
            >
              <Text style={styles.submitButtonText}>
                {userReview ? 'Update Review' : 'Submit Review'}
              </Text>
            </TouchableOpacity>
            
            {isEditing && (
              <TouchableOpacity
                style={[styles.submitButton, styles.cancelButton]}
                onPress={handleCancelEdit}
              >
                <Text style={styles.submitButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </ThemedView>
      )}

      <ThemedView style={styles.reviewsList}>
        {reviews.map((review, index) => (
          <ThemedView key={index} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <ThemedText style={styles.reviewUser}>{review.userEmail}</ThemedText>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text key={star} style={[styles.star, star <= review.rating ? styles.starFilled : styles.starEmpty]}>
                    ★
                  </Text>
                ))}
              </View>
            </View>
            <ThemedText style={styles.reviewComment}>{review.comment}</ThemedText>
            <View style={styles.reviewFooter}>
              <ThemedText style={styles.reviewDate}>
                {new Date(review.timestamp.toDate()).toLocaleDateString()}
              </ThemedText>
              {isLoggedIn && auth.currentUser?.uid === review.userId && !isEditing && (
                <TouchableOpacity onPress={handleEditReview}>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1D3D47',
  },
  addReviewButton: {
    backgroundColor: '#1D3D47',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewForm: {
    backgroundColor: 'rgba(161, 206, 220, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1D3D47',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 32,
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#D3D3D3',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  submitButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#1D3D47',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsList: {
    marginTop: 16,
  },
  reviewItem: {
    backgroundColor: 'rgba(161, 206, 220, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontWeight: 'bold',
    color: '#1D3D47',
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewComment: {
    marginBottom: 8,
    color: '#1D3D47',
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  editLink: {
    color: '#1D3D47',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Review; 