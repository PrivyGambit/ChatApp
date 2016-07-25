import { ref } from 'config/constants'

export function saveDecision (decision) {
  const decisionId = ref.child('decisions').push().key
  return ref.child(`decisions/${decisionId}`).set({...decision, decisionId})
}

export function saveRoom (room) {
  const roomId = ref.child('rooms').push().key
  return ref.child(`rooms/${roomId}`).set({...room, roomId})
}

export function saveChat ( chatText, roomId ) {
  const chatId = ref.child(`rooms/${roomId}/chats`).push().key
  return ref.child(`rooms/${roomId}/chats`).push({chatText, chatId})
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
