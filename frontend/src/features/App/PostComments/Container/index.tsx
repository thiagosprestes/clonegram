import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import { States } from '~/models/states';
import PostCommentItem from './components/PostCommentItem';
import {
  AddCommentContainer,
  Buttons,
  Cancel,
  Container,
  Delete,
  Input,
  ModalBody,
  ModalTitle,
  SendComment,
  SendCommentText,
  Separator,
  UserPicture,
} from './styles';
import { Comment } from '~/models/comment';
import Modal from '~/components/Modal';
import { DeletePostModal } from '~/components/Post/styles';
import Text, { TextType } from '~/components/Text';

interface HomeProps {
  comment: string;
  comments: Comment[];
  isShowDeleteCommentModal: boolean;
  onAddComment: () => void;
  onChangeComment: (search: string) => void;
  onCloseDeleteCommentModal: () => void;
  onDeleteComment: () => void;
  onRetry: () => void;
  onSelectComment: (commentId: string, commentAuthorId: string) => void;
  loggedUserProfilePicture: string;
  postDescription: string;
  postUsername: string;
  postUserProfilePicture: string;
  selectedCommentId: string;
  state: States;
}

const PostComments = ({
  comment,
  comments,
  isShowDeleteCommentModal,
  onSelectComment,
  onAddComment,
  onCloseDeleteCommentModal,
  onChangeComment,
  onDeleteComment,
  onRetry,
  loggedUserProfilePicture,
  postDescription,
  postUsername,
  postUserProfilePicture,
  selectedCommentId,
  state,
}: HomeProps) => {
  const content = (
    <>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <PostCommentItem
            comment={postDescription}
            isDescription
            username={postUsername}
            userPicture={postUserProfilePicture}
          />
        }
        renderItem={({ item }: { item: Comment }) => (
          <TouchableOpacity
            onLongPress={() => onSelectComment(item.id, item.user.id)}
          >
            <PostCommentItem
              comment={item.comment}
              username={item.user.username}
              userPicture={item.user.profile.profile_picture}
            />
          </TouchableOpacity>
        )}
      />
      <AddCommentContainer>
        <UserPicture
          imageSource={loggedUserProfilePicture}
          size={30}
          isRounded={true}
        />
        <Input
          value={comment}
          placeholder='Comentar'
          onChangeText={(text) => onChangeComment(text)}
        />
        <SendComment disabled={comment.length === 0} onPress={onAddComment}>
          <SendCommentText isDisabled={comment.length === 0} size={16}>
            Publicar
          </SendCommentText>
        </SendComment>
      </AddCommentContainer>
      <Modal isVisible={isShowDeleteCommentModal}>
        <DeletePostModal>
          <ModalBody>
            <ModalTitle type={TextType.bold} size={20}>
              Excluir comentário
            </ModalTitle>
            <Text size={16}>Tem certeza que deseja excluir essa postagem?</Text>
          </ModalBody>
          <Buttons>
            <Separator />
            <TouchableOpacity onPress={onDeleteComment}>
              <Delete type={TextType.bold} size={16}>
                Excluir
              </Delete>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity onPress={onCloseDeleteCommentModal}>
              <Cancel type={TextType.bold} size={16}>
                Cancelar
              </Cancel>
            </TouchableOpacity>
          </Buttons>
        </DeletePostModal>
      </Modal>
    </>
  );

  const loading = <Loading />;

  const error = <Error onRetry={onRetry} />;

  return (
    <Container>
      {
        {
          [States.default]: content,
          [States.loading]: loading,
          [States.error]: error,
        }[state]
      }
    </Container>
  );
};

export default PostComments;
