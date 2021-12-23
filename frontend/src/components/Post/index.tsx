import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import Carousel from 'react-native-snap-carousel';
import Text, { TextType } from '../Text';
import {
  Comments,
  Container,
  Content,
  Description,
  Header,
  Icons,
  Info,
  LikeHeartContainer,
  Options,
  Picture,
  SlidePositionNumber,
  User,
  UserInfo,
} from './styles';

import Heart from '~/assets/icons/Heart.svg';
import RedHeart from '~/assets/icons/RedHeart.svg';
import Comment from '~/assets/icons/Comment.svg';
import ScrollIndicator from '../ScrollIndicator';
import { api } from '~/services/api';
import { PostFile, PostLike } from '~/models/post';
import AnimatedLottieView from 'lottie-react-native';

import like from '~/assets/animations/like.json';

interface PostProps {
  comments: [];
  description: string;
  files: PostFile[];
  username: string;
  likes: PostLike[];
  location: string;
  onGoToLikes: (postId: string) => void;
  onLikePost: (postId: string) => void;
  postId: string;
  userProfilePicture: string;
  userId: string;
}

const Post = ({
  comments,
  description,
  files,
  username,
  likes,
  location,
  onGoToLikes,
  onLikePost,
  postId,
  userProfilePicture,
  userId,
}: PostProps) => {
  const { colors } = useTheme();

  const [carouselPosition, setCarouselPosition] = useState(1);
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(3);
  const [lastContentTap, setLastContentTap] = useState<number>();

  const [likeAnimation, setLikeAnimation] = useState(false);

  const { width: viewportWidth } = Dimensions.get('window');

  const isUserLikedPost = likes.find((like) => like.userId === userId);

  const handleDoubleTap = () => {
    const ANIMATION_TIMEOUT = 900;
    const DOUBLE_PRESS_DELAY = 300;
    const now = Date.now();

    clearTimeout(ANIMATION_TIMEOUT);

    if (lastContentTap && now - lastContentTap < DOUBLE_PRESS_DELAY) {
      if (!isUserLikedPost) {
        onLikePost(postId);
        setLikeAnimation(true);

        setTimeout(() => {
          setLikeAnimation(false);
        }, ANIMATION_TIMEOUT);
      }
    } else {
      setLastContentTap(now);
    }
  };

  return (
    <Container>
      <Header>
        <User>
          <TouchableOpacity>
            <Picture
              source={{
                uri: `${api.defaults.baseURL}/images/${userProfilePicture}`,
              }}
            />
          </TouchableOpacity>
          <UserInfo>
            <Text size={13} type={TextType.bold}>
              {username}
            </Text>
            {location !== '' && <Text size={11}>{location}</Text>}
          </UserInfo>
        </User>
        <SimpleLineIcons
          name='options-vertical'
          size={16}
          color={colors.textPrimary}
        />
      </Header>
      <View>
        {files.length > 1 && (
          <SlidePositionNumber>
            {carouselPosition}/{files.length}
          </SlidePositionNumber>
        )}
        <Carousel
          data={files}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={handleDoubleTap}>
              <View>
                {likeAnimation && (
                  <LikeHeartContainer>
                    <AnimatedLottieView source={like} autoPlay />
                  </LikeHeartContainer>
                )}
                <Content
                  source={{
                    uri: `${api.defaults.baseURL}/images/${item.filename}`,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{ width: viewportWidth }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onSnapToItem={(index) => setCarouselPosition(index + 1)}
        />
      </View>
      <Info>
        <Options>
          <Icons>
            <TouchableOpacity>
              <TouchableWithoutFeedback onPress={() => onLikePost(postId)}>
                {isUserLikedPost ? (
                  <RedHeart width={30} height={30} />
                ) : (
                  <Heart width={30} height={30} />
                )}
              </TouchableWithoutFeedback>
            </TouchableOpacity>
            <TouchableOpacity>
              <Comment width={25} height={25} />
            </TouchableOpacity>
          </Icons>
          {files.length > 1 && (
            <ScrollIndicator
              itemsLenght={files.length}
              carouselPosition={carouselPosition}
            />
          )}
        </Options>
        {likes.length > 0 && (
          <Text type={TextType.bold} onPress={() => onGoToLikes(postId)}>
            {likes.length} {likes.length > 1 ? 'Curtidas' : 'Curtida'}
          </Text>
        )}
        <Description numberOfLines={numberOfLines}>
          <Text type={TextType.bold}>Usuário</Text> {description}
        </Description>
        {description.length > 140 && numberOfLines && (
          <Text
            color={colors.inputText}
            onPress={() => setNumberOfLines(undefined)}
          >
            ...mais
          </Text>
        )}
        {comments.length > 0 && (
          <Comments>
            <Text color={colors.inputText}>
              Ver todos os {comments} comentários
            </Text>
          </Comments>
        )}
      </Info>
    </Container>
  );
};

export default Post;
