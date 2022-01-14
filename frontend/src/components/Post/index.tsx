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
  Buttons,
  Cancel,
  Comments,
  Container,
  Content,
  Delete,
  DeletePostModal,
  Description,
  Header,
  Icons,
  Info,
  LikeHeartContainer,
  ModalBody,
  ModalTitle,
  Options,
  Picture,
  Separator,
  SlidePositionNumber,
  User,
  UserInfo,
} from './styles';

import Heart from '~/assets/icons/Heart.svg';
import RedHeart from '~/assets/icons/RedHeart.svg';
import CommentIcon from '~/assets/icons/Comment.svg';
import ScrollIndicator from '../ScrollIndicator';
import { api } from '~/services/api';
import { PostFile, PostLike } from '~/models/post';
import AnimatedLottieView from 'lottie-react-native';

import like from '~/assets/animations/like.json';
import { Comment } from '~/models/comment';
import Modal from '../Modal';

interface PostProps {
  commentsNumber: number;
  description?: string;
  files: PostFile[];
  username: string;
  likes: PostLike[];
  location?: string;
  onDeletePost: (postId: string) => void;
  onGoToComments: (postId: string) => void;
  onGoToUserProfile: (userId: string) => void;
  onGoToLikes: (postId: string) => void;
  onLikePost: (postId: string) => void;
  postAuthorId: string;
  postId: string;
  userProfilePicture: string;
  userId: string;
}

const Post = ({
  commentsNumber,
  description,
  files,
  username,
  likes,
  location,
  onDeletePost,
  onGoToComments,
  onGoToUserProfile,
  onGoToLikes,
  onLikePost,
  postAuthorId,
  postId,
  userProfilePicture,
  userId,
}: PostProps) => {
  const { colors } = useTheme();

  const [carouselPosition, setCarouselPosition] = useState(1);
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(3);
  const [lastContentTap, setLastContentTap] = useState<number>();
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [isShowDeletPostModal, setIsShowDeletPostModal] = useState(false);

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
          <TouchableOpacity onPress={() => onGoToUserProfile(postAuthorId)}>
            <Picture
              source={{
                uri: `${api.defaults.baseURL}/images/${userProfilePicture}`,
              }}
            />
          </TouchableOpacity>
          <UserInfo>
            <Text
              size={13}
              type={TextType.bold}
              onPress={() => onGoToUserProfile(postAuthorId)}
            >
              {username}
            </Text>
            {location !== '' && <Text size={11}>{location}</Text>}
          </UserInfo>
        </User>
        {userId === postAuthorId && (
          <SimpleLineIcons
            name='options-vertical'
            size={16}
            color={colors.textPrimary}
            onPress={() => setIsShowDeletPostModal(true)}
          />
        )}
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
            <TouchableOpacity
              style={{ marginLeft: 5 }}
              onPress={() => onGoToComments(postId)}
            >
              <CommentIcon width={25} height={25} />
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
          <Text type={TextType.bold}>Usuário</Text> {description && description}
        </Description>
        {description && description.length > 140 && numberOfLines && (
          <Text
            color={colors.inputText}
            onPress={() => setNumberOfLines(undefined)}
          >
            ...mais
          </Text>
        )}
        {commentsNumber > 0 && (
          <Comments>
            <Text
              color={colors.inputText}
              onPress={() => onGoToComments(postId)}
            >
              Ver todos os {commentsNumber} comentários
            </Text>
          </Comments>
        )}
      </Info>
      <Modal isVisible={isShowDeletPostModal}>
        <DeletePostModal>
          <ModalBody>
            <ModalTitle type={TextType.bold} size={20}>
              Excluir postagem
            </ModalTitle>
            <Text size={16}>Tem certeza que deseja excluir essa postagem?</Text>
          </ModalBody>
          <Buttons>
            <Separator />
            <TouchableOpacity>
              <Delete
                type={TextType.bold}
                size={16}
                onPress={() => onDeletePost(postId)}
              >
                Excluir
              </Delete>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity onPress={() => setIsShowDeletPostModal(false)}>
              <Cancel type={TextType.bold} size={16}>
                Cancelar
              </Cancel>
            </TouchableOpacity>
          </Buttons>
        </DeletePostModal>
      </Modal>
    </Container>
  );
};

export default Post;
