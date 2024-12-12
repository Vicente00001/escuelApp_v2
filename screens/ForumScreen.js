import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../services/firebase';

const ForumScreen = ({ navigation }) => {
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      const forumsQuery = collection(firestore, 'Foro');
      const querySnapshot = await getDocs(forumsQuery);
      const forumList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          titulo: data.titulo,
          descripcion: data.descripcion,
        };
      });
      setForums(forumList);
    } catch (error) {
      console.error('Error fetching forums:', error);
    }
  };

  const fetchComments = async (forumId) => {
    try {
      const commentsQuery = query(
        collection(firestore, 'ForoComentario'),
        where('foroId', '==', forumId)
      );
      const querySnapshot = await getDocs(commentsQuery);
      const commentList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(commentList);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleForumSelect = (forum) => {
    setSelectedForum(forum);
    setModalVisible(true);
    fetchComments(forum.id);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addDoc(collection(firestore, 'ForoComentario'), {
        comentario: newComment,
        fecha: serverTimestamp(),
        foroId: selectedForum.id,
        nombre: 'Usuario Anónimo', // Cambia esto por el nombre del usuario si tienes autenticación
      });

      setNewComment('');
      fetchComments(selectedForum.id);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Foros Disponibles</Text>

      {forums.map((forum) => (
        <View key={forum.id} style={styles.forumWrapper}>
          <Text style={styles.forumTitle}>{forum.titulo}</Text>
          <Text style={styles.forumDescription}>{forum.descripcion}</Text>
          <TouchableOpacity onPress={() => handleForumSelect(forum)}>
            <Card style={styles.forumCard}>
              <Card.Content>
                <Text style={styles.forumButtonText}>Entrar al Foro</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver al Menú Principal</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedForum?.titulo}</Text>

          <ScrollView style={styles.commentsContainer}>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Text style={styles.commentAuthor}>{comment.nombre}</Text>
                <Text style={styles.commentText}>{comment.comentario}</Text>
                <Text style={styles.commentDate}>
                  {comment.fecha
                    ? new Date(
                        typeof comment.fecha.toDate === 'function' ? comment.fecha.toDate() : comment.fecha
                      ).toLocaleString()
                    : 'Fecha no disponible'}
                </Text>
              </View>
            ))}
          </ScrollView>

          <TextInput
            style={styles.input}
            placeholder="Escribe un comentario"
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button mode="contained" onPress={handleAddComment} style={styles.sendButton}>
            Enviar Comentario
          </Button>

          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 16,
  },
  forumWrapper: {
    marginBottom: 16,
  },
  forumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 4,
  },
  forumDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  forumCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  forumButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 16,
  },
  commentsContainer: {
    flex: 1,
    marginBottom: 16,
  },
  commentItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003366',
  },
  commentText: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 4,
  },
  commentDate: {
    fontSize: 12,
    color: '#666666',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  sendButton: {
    backgroundColor: '#003366',
    marginBottom: 16,
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: '#003366',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForumScreen;
