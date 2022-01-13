import React, { useState } from 'react';
import { TextType } from '~/components/Text';
import Bio from './components/Bio';
import Info from './components/Info';
import {
  Container,
  Header,
  Option,
  ProfilePostOptions,
  Username,
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, FlatList, Image, ScrollView, View } from 'react-native';
import { colors } from '~/styleguide';

interface ProfilePostOption {
  icon: React.ReactNode;
  isSelected: boolean;
}

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState('photo');

  const { width } = Dimensions.get('window');

  const ProfilePostOption = ({ icon, isSelected }: ProfilePostOption) => (
    <Option isSelected={isSelected}>{icon}</Option>
  );

  const data = [
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
          }}
          style={{ width: width / 3, height: width / 3 }}
        ></Image>
      </View>
    </ScrollView>,
    <ScrollView>
      <Image
        source={{
          uri: 'https://i.pinimg.com/originals/4a/53/da/4a53da1745df1eb6b09f1652433d39de.jpg',
        }}
        style={{ width: 150, height: 150 }}
      ></Image>
    </ScrollView>,
  ];

  const handleOnChangeSelectedItem = (event: any) => {
    const pageNumber = Math.min(
      Math.max(
        Math.floor(event.nativeEvent.contentOffset.x / width + 0.5) + 1,
        0
      ),
      2
    );

    if (pageNumber === 2) {
      setSelectedOption('video');
    } else {
      setSelectedOption('photo');
    }
  };

  return (
    <Container>
      <Header>
        <Username type={TextType.bold} size={20}>
          usuário
        </Username>
      </Header>
      <Info />
      <Bio />
      <ProfilePostOptions>
        <ProfilePostOption
          icon={
            <MaterialIcons
              name='grid-on'
              size={30}
              color={
                selectedOption === 'photo' ? colors.black : colors.lightGreyText
              }
            />
          }
          isSelected={selectedOption === 'photo'}
        />
        <ProfilePostOption
          icon={
            <Ionicons
              name='ios-play-outline'
              size={30}
              color={
                selectedOption === 'video' ? colors.black : colors.lightGreyText
              }
            />
          }
          isSelected={selectedOption === 'video'}
        />
      </ProfilePostOptions>
      <FlatList
        data={data}
        pagingEnabled
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleOnChangeSelectedItem}
        renderItem={({ item }) => <View style={{ width: width }}>{item}</View>}
      />
    </Container>
  );
};

export default Profile;
