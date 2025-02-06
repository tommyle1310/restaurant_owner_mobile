import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert } from 'react-native';

type Promotion = {
  id: string;
  title: string;
  description: string;
  validUntil: string;
};

export default function PromotionManagement() {
  const [currentPromotions, setCurrentPromotions] = useState<Promotion[]>([
    { id: '1', title: '10% Off', description: '10% discount on all items', validUntil: '2025-12-31' },
  ]);
  const [flashFoodPromotions, setFlashFoodPromotions] = useState<Promotion[]>([
    { id: '2', title: 'Buy 1 Get 1 Free', description: 'Applicable to selected items', validUntil: '2025-06-30' },
  ]);
  const [expiredPromotions, setExpiredPromotions] = useState<Promotion[]>([
    { id: '3', title: 'Free Delivery', description: 'For orders above $50', validUntil: '2024-12-31' },
  ]);
  const [activeTab, setActiveTab] = useState<'Current' | 'FlashFood' | 'Expired'>('Current');

  const handleAddFlashFoodPromotion = (promotion: Promotion) => {
    setCurrentPromotions([...currentPromotions, promotion]);
    setFlashFoodPromotions(flashFoodPromotions.filter((p) => p.id !== promotion.id));
    Alert.alert('Success', 'Promotion added to Current Promotions!');
  };

  const renderPromotionItem = (
    { item }: { item: Promotion },
    type: 'Current' | 'FlashFood' | 'Expired'
  ) => (
    <View style={styles.promotionItem}>
      <Text style={styles.promotionTitle}>{item.title}</Text>
      <Text style={styles.promotionDescription}>{item.description}</Text>
      <Text style={styles.promotionValid}>Valid Until: {item.validUntil}</Text>
      {type === 'FlashFood' && (
        <Button title="Add to Current Promotions" onPress={() => handleAddFlashFoodPromotion(item)} />
      )}
    </View>
  );

  const renderPromotions = () => {
    let data = [];
    switch (activeTab) {
      case 'Current':
        data = currentPromotions;
        break;
      case 'FlashFood':
        data = flashFoodPromotions;
        break;
      case 'Expired':
        data = expiredPromotions;
        break;
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderPromotionItem({ item }, activeTab)}
        ListEmptyComponent={<Text style={styles.emptyText}>No promotions available.</Text>}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Current' && styles.activeTab]}
          onPress={() => setActiveTab('Current')}
        >
          <Text style={[styles.tabText, activeTab === 'Current' && styles.activeTabText]}>
            Current Promotions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'FlashFood' && styles.activeTab]}
          onPress={() => setActiveTab('FlashFood')}
        >
          <Text style={[styles.tabText, activeTab === 'FlashFood' && styles.activeTabText]}>
            Promotions by FlashFood
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Expired' && styles.activeTab]}
          onPress={() => setActiveTab('Expired')}
        >
          <Text style={[styles.tabText, activeTab === 'Expired' && styles.activeTabText]}>
            Expired Promotions
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.promotionList}>{renderPromotions()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  activeTab: {
    borderBottomColor: '#007BFF',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  promotionList: {
    flex: 1,
  },
  promotionItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  promotionValid: {
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});
