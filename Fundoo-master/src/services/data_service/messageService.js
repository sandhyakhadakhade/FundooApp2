import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
    sendMessage: message => subject.next({ text: message }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
}

const subject1 = new Subject();
export const searchMessageService = {
    sendSearchKeyword: word => subject1.next({ text: word }),
    clearKeyword: () => subject1.next(),
    getSearchkey: () => subject1.asObservable()
}

const subject2 = new Subject();
export const tickBoxMessageService = {
    sendCheckBox: seen => subject2.next({ text: seen }),
    clearCheckBox: () => subject2.next(),
    getCheckBox: () => subject2.asObservable()
}

const subject3 = new Subject();
export const UpdateTickBoxMessageService = {
    sendUpdateCheckBox: value => subject3.next({ text: value }),
    clearUpdateCheckBox: () => subject3.next(),
    getUpdateCheckBox: () => subject3.asObservable()
}

export const QustionAndAnswerService = {
    sendShowQustion: data => subject3.next({ text: data }),
    clearShowQustion: () => subject3.next(),
    getshowQustion: () => subject3.asObservable()
}

const sub = new Subject();
export const dailogBoxService = {
    sendDailogBoxValue: value1 => sub.next({ text: value1 }),
    clearDailogBox: () => sub.next(),
    getDailogBox: () => sub.asObservable()
}

//add cart service
const sub1 = new Subject();
export const addToCartService = {
    sendCartService: data2 => sub1.next({ text: data2 }),
    clearCartService: () => sub1.next(),
    getCartService: () => sub1.asObservable()
}