import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface MenuItem {
  _id?: string;
  restaurant_id: string;
  name: string;
  description?: string;
  category: string[];
  availability: boolean;
  suggest_notes: string[];
  variants: string[];
  purchase_count: number;
  discount?: {
    discount_type: 'FIXED' | 'PERCENTAGE';
    discount_value: number;
    start_date: number;
    end_date: number;
  } | null;
}

const MenuManagement = () => {
  const [menuItem, setMenuItem] = useState<MenuItem>({
    restaurant_id: '',
    name: '',
    description: '',
    category: [],
    availability: false,
    suggest_notes: [],
    variants: [],
    purchase_count: 0,
    discount: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setMenuItem({
        _id: '12345',
        restaurant_id: 'rest_001',
        name: 'Spicy Ramen',
        description: 'A delicious spicy ramen with pork and egg',
        category: ['Asian', 'Noodles'],
        availability: true,
        suggest_notes: ['Less spicy', 'Extra noodles'],
        variants: ['Large', 'Medium'],
        purchase_count: 40,
        discount: {
          discount_type: 'PERCENTAGE',
          discount_value: 10,
          start_date: 1712438400,
          end_date: 1715030400,
        },
      });
    }, 1000);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Menu Management</Text>
      <Text>Name:</Text>
      <TextInput 
        value={menuItem.name}
        onChangeText={(text) => setMenuItem((prev) => ({ ...prev, name: text }))}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Text>Availability:</Text>
      <Switch 
        value={menuItem.availability}
        onValueChange={(value) => setMenuItem((prev) => ({ ...prev, availability: value }))}
      />

      <Text>Discount Type:</Text>
      <Picker
        selectedValue={menuItem.discount?.discount_type || ''}
        onValueChange={(value: 'FIXED' | 'PERCENTAGE' | '') => {
          setMenuItem((prev) => ({
            ...prev,
            discount: value ? { ...prev.discount, discount_type: value, discount_value: prev.discount?.discount_value || 0, start_date: prev.discount?.start_date || 0, end_date: prev.discount?.end_date || 0 } : null,
          }));
        }}
      >
        <Picker.Item label="No Discount" value="" />
        <Picker.Item label="Fixed" value="FIXED" />
        <Picker.Item label="Percentage" value="PERCENTAGE" />
      </Picker>

      <Button title="Save Menu Item" onPress={() => console.log(menuItem)} />
    </View>
  );
};

export default MenuManagement;
