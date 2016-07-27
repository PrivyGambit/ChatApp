import { ref, storageRef } from 'config/constants'

export function saveDecision (decision) {
  const decisionId = ref.child('decisions').push().key
  return ref.child(`decisions/${decisionId}`).set({...decision, decisionId})
}

export function saveRoom (room) {
  const roomId = ref.child('rooms').push().key
  return ref.child(`rooms/${roomId}`).set({...room, roomId})
}

export function saveChat ( chat, roomId ) {
  ref.child(`rooms/${roomId}`).update({
    latestUpdateTime: chat.timestamp
  })
  ref.child(`rooms/${roomId}/newContent`).update({
    chat: chat.content,
    user: chat.user
  })
  const chatId = ref.child(`rooms/${roomId}/chats`).push().key
  return ref.child(`rooms/${roomId}/chats`).push({
    type: chat.type,
    content: chat.content,
    timestamp: chat.timestamp,
    user: {
      name: chat.user,
      avatar: chat.avatar
    },
    chatId: chatId
  })
}

export function listenToDecisions (cb, error) {
  return ref.child('decisions').on('value', (snapshot) => {
    return cb(snapshot.val() || {})
  }, error)
}

export function listenToRooms (cb, error) {
  return ref.child('rooms').on('value', (snapshot) => {
    return cb(snapshot.val() || {})
  }, error)
}

export function turnOffListener () {
  return ref.child(`rooms`).off()
}

export function listenToChats (roomId, cb, error) {
  return ref.child(`rooms/${roomId}/chats`).on('value', (snapshot) => {
    return cb(snapshot.val() || {})
  }, error)
}

export function fetchSingleDecision (decisionId) {
  return ref.child(`decisions/${decisionId}`)
    .once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchRooms () {
  return ref.child('rooms/')
    .then((snapshot) => snapshot.val() || {})
    .catch((err) => console.warn('Error fetching rooms', err))
}

export function fetchRooms () {
  return ref.child('rooms/')
    .then((snapshot) => snapshot.val() || {})
    .catch((err) => console.warn('Error fetching rooms', err))
}

export function fetchUsersMadeDecisions (uid) {
  return ref.child(`users/${uid}/decisionsMade`)
    .once('value')
    .then((snapshot) => snapshot.val() || {})
    .catch((err) => console.warn('Error fetching decisions', err))
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function addDecisionToUser (uid, decisionId, data) {
  return ref.child(`users/${uid}/decisionsMade/${decisionId}`)
    .set(data)
}

export function incrementSelectedCount (decisionId, option) {
  return ref.child(`decisions/${decisionId}/${option}/selectedCount`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementSelectedCount (decisionId, option) {
  return ref.child(`decisions/${decisionId}/${option}/selectedCount`)
    .transaction((currentValue = 0) => currentValue <= 0 ? 0 : currentValue - 1)
}

export function uploadFile ( file, chat, roomId ) {
  console.log();
  // Create the file metadata
  let metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  let uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        return false;
        break;

      case 'storage/canceled':
        // User canceled the upload
        return false;
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        return false;
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
    let downloadURL = uploadTask.snapshot.downloadURL;
    const chatId = ref.child(`rooms/${roomId}/chats`).push().key
    return ref.child(`rooms/${roomId}/chats`).push({
      type: chat.type,
      user: {
        name: chat.user,
        avatar: chat.avatar
      },
      timestamp: chat.timestamp,
      url: downloadURL,
      chatId: chatId
    })
  });
}