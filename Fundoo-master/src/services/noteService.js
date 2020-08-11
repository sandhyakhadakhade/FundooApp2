/*******************************************************************************
 *  @Purpose        : To create note services that will perform CRUD operations.
 *  @file           : noteServices.js        
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 *******************************************************************************/

import axios from 'axios';
import { environment } from './environment/environment'
const URL = environment.baseUrl;

export function encode(data) {
    const formBody = [];
    for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}

/**
 * @description:To create a new note
 * @param {*used to send data or note to server} data 
 */
export async function createNote(data, token) {
    let responseResetPass = [];
    try {
        responseResetPass = await axios.post(URL + "/notes/addNotes", data,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        return responseResetPass;
    } catch (err) {
        return err;
    }

}
export async function signOut(token) {
    let logout = [];
    var accessToken = {
        accessToken: token
    }
    logout = await axios.post(URL + '/user/logout', accessToken, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return logout
}


/**
 * @description:To get the created notes
 */
export async function getNotes(token) {
    var responseResult = []
    responseResult = await axios.get(URL + '/notes/getNotesList', {
        headers: {
            'Authorization': token,
        }
    })
    return responseResult
}

/**
 * @description:
 * @param {*} url 
 * @param {*} data 
 */
export async function setNoteColor(data, token) {
    let responseSetColor = [];
    try {
        responseSetColor = await axios.post(URL + "/notes/changesColorNotes", data,
            {
                headers: {
                    'Authorization': token
                }
            })
        return responseSetColor;
    } catch (err) {
        return err;
    }
}

/**
 * 
 * @param {*} data 
 */
export async function isArchive(data, token) {
    let archiveNote = [];
    try {
        archiveNote = await axios.post(URL + "/notes/archiveNotes", data,
            {
                headers: {
                    'Authorization': token
                }
            })
        return archiveNote;
    } catch (err) {
        return err;
    }

}
export async function isTrashed(data, token) {
    let deleteNote = [];
    try {
        deleteNote = await axios.post(URL + "/notes/trashNotes", data,
            {
                headers: {
                    'Authorization': token
                }
            })
        return deleteNote;
    } catch (err) {
        return err;
    }

}
export async function getTrashNoteList(token) {
    try {
        let getTarsh = [];
        getTarsh = await axios.get(URL + "/notes/getTrashNotesList",
            {
                headers: {
                    'Authorization': token
                }
            })
        return getTarsh;
    }
    catch (err) {
        return err
    }
}
export async function isDeleteForever(data, token) {
    let deleteNoteForever = [];
    try {
        deleteNoteForever = await axios.post(URL + "/notes/deleteForeverNotes", data,
            {
                headers: {
                    'Authorization': token
                }
            })
        return deleteNoteForever;
    } catch (err) {
        return err;
    }

}
export async function getArchiveNoteList(token) {
    try {
        let getArchive = [];
        getArchive = await axios.get(URL + "/notes/getArchiveNotesList",
            {
                headers: {
                    'Authorization': token
                }
            })
        return getArchive;
    }
    catch (err) {
        return err
    }
}
export async function setReminder(data, token) {
    let setNotes = [];
    try {
        setNotes = await axios.post(URL + '/notes/addUpdateReminderNotes',
            data,
            {
                headers: {
                    'Authorization': token
                }
            })
        return setNotes;
    } catch (err) {
        return err;
    }

}
export async function removeReminder(data, token) {
    // console.log("reminder data from front-end==>", data);
    let removeNotes = [];
    try {
        removeNotes = await axios.post(URL + '/notes/removeReminderNotes',
            data,
            {
                headers: {
                    'Authorization': token
                }
            })
        return removeNotes;
    } catch (err) {
        return err;
    }

}
export async function getReminderNoteList(token) {
    // console.log("token", token);
    let cards = [];
    try {
        cards = await axios.get(URL + "/notes/getReminderNotesList",
            {
                headers: {
                    'Authorization': token
                }
            }
        )
        return cards;
    } catch (err) {
        return err;
    }
}
export async function updateNote(data, token) {
    let updateNote = [];
    try {
        updateNote = await axios.post(URL + "/notes/updateNotes", data,
            {
                headers: {
                    'Authorization': token,
                }
            })
        return updateNote;
    } catch (err) {
        return err;
    }
}
export async function getCollabDetails(input, token) {
    let getCollab = [];
    try {
        getCollab = await axios.post(URL + "/user/searchUserList", input, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        return getCollab;
    } catch (err) {
        return err;
    }
}

export async function addCollab(data, token) {
    let addColl = [];
    try {
        // addColl = await axios.post(URL + "/notes/AddcollaboratorsNotes", data, {
        addColl = await axios.post(URL + "/notes/" + data.id + "/AddcollaboratorsNotes", data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        return addColl;
    } catch (err) {
        return err;
    }
}
export async function updatePin(data, token) {
    let updatePin = [];
    try {
        updatePin = await axios.post(URL + '/notes/pinUnpinNotes', data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        return updatePin;
    } catch (err) {
        return err;
    }
}

export async function addLabel(data, token) {
    let addLabel = [];
    addLabel = await axios.post(URL + '/noteLabels', data, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    })
    return addLabel;
}

export async function labelAdd(data, token) {
    let addLabel = [];
    addLabel = await axios.post(URL + '/notes/' + data.noteIdList + '/addLabelToNotes/' + data.lableId + '/add', {}, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },

    })
    return addLabel;
}

export async function deleteLabel(data, token) {
    // console.log(" In delete label service", data.id);
    let removeLabel = [];
    removeLabel = await axios.delete(URL + '/noteLabels/' + data + '/deleteNoteLabel', {
        headers: {
            'Authorization': token,
        },
    })
    return removeLabel;
}

export async function deleteNoteLabels(data, token) {
    // console.log(" In delete label service", data.id);
    let removeLabel = [];
    removeLabel = await axios.post(URL + '/notes/' + data.noteIdList + '/addLabelToNotes/' + data.id + '/remove', {}, {
        headers: {
            'Authorization': token,
        },
    })
    return removeLabel;
}

export async function getLabels(token) {
    // console.log("in getlabel service ");
    let label = [];
    label = await axios.get(URL + '/noteLabels/getNoteLabelList', {
        headers: {
            'Authorization': token,
        }
    })
    return label

}
export async function getLabelNote(token) {
    // console.log("in getlabel service ");
    let labelNote = [];
    labelNote = await axios.get(URL + '/noteLabels/user', {
        headers: {
            'Authorization': token,
        }
    })
    return labelNote

}
export async function updateNoteLabel(id, data, token) {
    let labelUpdate = [];
    labelUpdate = await axios.post(URL + '/noteLabels/' + id + '/updateNoteLabel', data, {
        headers: {
            'Authorization': token,
        }
    })

}
export async function uploadProfilePic(data, token) {
    let profilePic = []
    profilePic = await axios.post(URL + '/user/uploadProfileImage', data, {
        headers: {
            'Authorization': token,
        }
    })
    return profilePic
}

export async function updateCheckList(NoteListId, data, token) {
    let updateCheckList = []
    updateCheckList = await axios.post(URL + '/notes/' + NoteListId.noteId + '/checklist/' + NoteListId.checklistId + '/update', data, {
        headers:
        {
            'Authorization': token
        }
    })
    return updateCheckList

}

export async function addNoteCheckList(noteId, data, token) {
    let addNoteCheckList = []
    addNoteCheckList = await axios.post(URL + '/notes/' + noteId + '/checklist/add', data, {
        headers:
        {
            'Authorization': token
        }
    })
    return addNoteCheckList

}

export async function removeCheckListItem(data, token) {
    let removeCheckList = []
    removeCheckList = await axios.post(URL + '/notes/' + data.noteId + '/checklist/' + data.checklistId + '/remove', {}, {
        headers:
        {
            'Authorization': token
        }
    })
    return removeCheckList

}
export async function getNoteDetail(token) {
    var data1 = localStorage.getItem('noteId');
    let getNoteDetails = []
    getNoteDetails = await axios.get(URL + '/notes/getNotesDetail/' + data1, {
        headers: {
            'Authorization': token
        }
    })
    return getNoteDetails

}




//QustionAndAnswer


export async function addQustionAndAnswer(data, token) {
    let addQustionAndAnswer = []
    addQustionAndAnswer = await axios.post(URL + '/questionAndAnswerNotes/addQuestionAndAnswer', data, {
        headers:
        {
            'Authorization': token
        }
    })
    return addQustionAndAnswer

}



export async function getQustionAndAnswer(data, token) {
    let getQustionAndAnswer = []
    getQustionAndAnswer = await axios.get(URL + '/questionAndAnswerNotes/' + data + '/notes/questionAndAnswerNotes', {
        headers:
        {
            'Authorization': token
        }
    })
    return getQustionAndAnswer

}


export async function likesOfQustionAndAnswer(data, parentId, token) {
    let likesOfQustionAndAnswer = []
    likesOfQustionAndAnswer = await axios.post(URL + '/questionAndAnswerNotes/like/' + parentId, data, {
        headers:
        {
            'Authorization': token
        }
    })
    return likesOfQustionAndAnswer

}

//reject
export async function dislikeAndAnswer(data, parentId) {
    let dislikesAnswer = []
    dislikesAnswer = await axios.post(URL + '/questionAndAnswerNotes/reject/' + parentId, {}, {
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return dislikesAnswer

}



export async function replyQustionAndAnswer(parentId, data) {
    let replyQustionAndAnswer = []
    replyQustionAndAnswer = await axios.post(URL + '/questionAndAnswerNotes/reply/' + parentId, data, {
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return replyQustionAndAnswer

}



export async function ratingOfAnswer(parentId, data) {
    let rating = []
    rating = await axios.post(URL + '/questionAndAnswerNotes/rate/' + parentId, data, {
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return rating

}


export async function deleteQustion(parentId) {
    let deleteQustion = []
    deleteQustion = await axios.delete(URL + '/questionAndAnswerNotes/' + parentId + '/notes/questionAndAnswerNotes', {
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return deleteQustion

}



export async function getService() {
    let getService = []
    getService = await axios.get(URL + '/user/service', {
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return getService

}

export async function addToCart(data) {
    let cart = []
    cart = await axios.post(URL + '/productcarts/addToCart', data, {
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return cart

}

export async function getCartDetail(cartId) {
    let getData = []
    getData = await axios.get(URL + '/productcarts/getCartDetails/'+ cartId,{}, {
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return getData

}

export async function getMyCartDetail() {
    let getMyCart = []
    getMyCart = await axios.get(URL + '/productcarts/myCart', {
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return getMyCart

}

export async function placeOrder(data) {
    let placeOrder = []
    placeOrder = await axios.post(URL + '/productcarts/placeOrder',data ,{
        headers:
        {
            'Authorization': localStorage.getItem('token')
        }
    })
    return placeOrder

}





