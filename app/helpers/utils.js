import { decisionsExpirationLength } from '../config/constants'
import restrictions from '../config/restrictions'

export function formatUserInfo (uid, banned, name, avatar, type) {
    return {
        uid,
        banned,
        name,
        avatar,
        type,
    }
}

export function formatDecision (title, firstDecisionText, secondDecisionText, user) {
    return {
        timestamp: Date.now(),
        author: user,
        title,
        firstOption: {
            text: firstDecisionText,
            selectedCount: 0,
        },
        secondOption: {
            text: secondDecisionText,
            selectedCount: 0,
        }
    }
}

export function formatTimestamp (timestamp) {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
    return new Date().getTime() - new Date(timestamp).getTime()
}

export function decisionsAreStale (timestamp) {
    return getMilliseconds(timestamp) > decisionsExpirationLength
}

export function formatRoomName ( roomName ) {
    return {
        roomName: roomName,
        latestUpdateTime: Date.now(),
        newContent: {
            user: '',
            chat: '',
        }
    }
}

export function formatChat ( chat ) {
    return {
        type: chat.type,
        content: chat.text,
        user: chat.user,
        avatar: chat.avatar,
        timestamp: Date.now(),
        announcement: chat.announcement
    }
}

export function formatFile ( chat ) {
    return {
        type: chat.type,
        user: chat.user,
        avatar: chat.avatar,
        timestamp: Date.now()
    }
}

export function filterText ( str ) {
    const rgx = new RegExp(restrictions.join("|"), "gi");
    return str.replace(rgx, "****");
}
