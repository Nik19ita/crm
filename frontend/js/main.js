import { addSvg } from "./svg.js";
import { addClientOnServer, getArrClients, changeClientOnServer, deleteClient } from "./server.js";

const vk = 'vk';
const facebook = 'facebook';
const tel = 'tel';
const email = 'email';

const arrSourse = [
    {
        name: 'Денис',
        surname: 'Скворцов',
        lastName: 'Юрьевич',
        contacts: [
            {
                type: vk,
                value: 'vk.com/id1'
            },

            {
                type: facebook,
                value: 'facebook.com/id1'
            },

            {
                type: tel,
                value: '+71111111111'
            },

            {
                type: email,
                value: 'ckvorcov@ckvorcov.com'
            },

            {
                type: tel,
                value: '+71222222222'
            },

            {
                type: tel,
                value: '+7133333333'
            },

            {
                type: tel,
                value: '+7144444444'
            },

            {
                type: tel,
                value: '+7155555555'
            },

        ]

    },

    {
        name: 'Арсений',
        surname: 'Куприянов',
        lastName: 'Валерьевич',
        contacts: [
            {
                type: tel,
                value: '+72111111111'
            },

            {
                type: email,
                value: 'cuprianov@cuprizniv.com'
            }
        ]


    },

    {
        name: 'Людмила',
        surname: 'Константинопольская',
        lastName: 'Александровна',
        contacts: [
            {
                type: facebook,
                value: 'facebook.com/id3 '
            },

            {
                type: tel,
                value: '+73111111111'
            },

            {
                type: email,
                value: 'konstantinopolskay@konstantinopolskay.com'
            }
        ]
    },

    {
        name: 'Олег',
        surname: 'Дмитриевский',
        lastName: 'Алексеевич',
        contacts: [
            {
                type: tel,
                value: '+74111111111'
            }
        ]

    },

    {
        name: 'Татьяна',
        surname: 'Александровна',
        lastName: 'Павловна',
        contacts: [
            {
                type: vk,
                value: 'vk.com/id5'
            },

            {
                type: tel,
                value: '+75111111111'
            },

            {
                type: email,
                value: 'alexsandrova@alexsandrova.com'
            }
        ]
    },
]

// Функция создания tooltip для svg

function tooltip() {
    const divs = document.getElementsByClassName('div-for-svg')
    for (const div of divs) {
        let tooltipElem;
        div.onmouseover = function () {
            const type = div.dataset.type
            const value = div.dataset.value

            const spanForType = document.createElement('span');
            spanForType.textContent = type + ':'
            spanForType.className = 'tel'

            const spanForValue = document.createElement('span');
            spanForValue.textContent = value;
            if (type === tel) {
                spanForValue.className = 'tel'
            } else {
                spanForValue.className = 'nikname'
            }

            tooltipElem = document.createElement('div')
            tooltipElem.className = "tooltip"

            if (
                type !== vk &&
                type !== facebook &&
                type !== tel &&
                type !== email
            ) {
                tooltipElem.append(spanForType)
                tooltipElem.append(spanForValue)
            } else {
                tooltipElem.append(spanForValue)
            }

            document.body.append(tooltipElem)

            let coords = div.getBoundingClientRect()
            let left = coords.left + (div.offsetWidth - tooltipElem.offsetWidth) / 2
            let top = coords.top - tooltipElem.offsetHeight - 10

            tooltipElem.style.left = left + 'px'
            tooltipElem.style.top = top + 'px'
        }
        div.onmouseout = () => {
            tooltipElem.remove();
            tooltipElem = null;
        }
    }
}

// Функция добавления svg

function createSvgElement(td, obj) {
    let contacts = obj.contacts;
    const buttonForSVG = document.createElement('button');
    buttonForSVG.classList.add('button-for-svg')

    function beginning() {
        const row = document.createElement('div')
        row.classList.add('row')
        td.append(row)

        function createSvgBeginning(i) {
            let countSVG = i
            for (const contact of contacts) {
                if (countSVG < 5) {
                    addSvg(contact, row)
                    countSVG++
                }
            }
        }

        if (contacts.length > 5) {
            createSvgBeginning(1)
            buttonForSVG.textContent = `+${contacts.length - 4}`
            row.append(buttonForSVG)
        } else {
            createSvgBeginning(0)
        }

        tooltip()
    }

    beginning()

    function buttonClick() {
        let countSVG = 0;
        for (const contact of contacts) {
            if (countSVG === 0 || countSVG % 5 === 0) {
                const row = document.createElement('div')
                row.classList.add('row')
                td.append(row)
                addSvg(contact, row)
            } else {
                const row = td.lastChild
                addSvg(contact, row)
            }
            countSVG++
        }
        tooltip()
    }

    buttonForSVG.addEventListener('click', () => {
        td.querySelector('div').remove();
        buttonClick();
    });
}

// функция создания таблицы

async function createTable(arr) {

    const awaitDiv = document.getElementById('awaiting');

    if (awaitDiv) awaitDiv.remove();

    const table = document.querySelector('table');
    const oldTBody = table.querySelector('tbody')
    oldTBody.remove();

    const tbody = document.createElement('tbody');
    table.append(tbody);

    function dateCreate(td, objKey) {
        const div = document.createElement('div');
        const divForDate = document.createElement('div');
        const divForHours = document.createElement('div');

        div.classList.add('div-for-date')
        divForDate.classList.add('text-black-14')
        divForHours.classList.add('text-grey-14')

        const dateOver = objKey.split('T');
        const date = dateOver[0].split('-');
        const hours = dateOver[1].split(':');

        const dateResult = date.reverse().join(':');
        const hoursResult = hours[0] + ':' + hours[1]

        divForDate.innerHTML = dateResult;
        divForHours.innerHTML = hoursResult;

        td.append(div);
        div.append(divForDate);
        div.append(divForHours);
    }

    for (const obj of arr) {
        const tr = document.createElement('tr');
        tbody.append(tr);

        for (let i = 0; i < 6; i++) {
            let td = document.createElement('td');
            const divForTd = document.createElement('div');
            tr.append(td);
            switch (i) {
                case 0:
                    td.append(divForTd);
                    divForTd.classList.add('text-grey-12');
                    divForTd.textContent = obj.id.substr(-6);
                    break
                case 1:
                    td.append(divForTd);
                    divForTd.classList.add('text-black-14');
                    divForTd.textContent = obj.surname + '\n' + obj.name + '\n' + obj.lastName;
                    break
                case 2:
                    const dateCreateOfObj = obj.createdAt;
                    dateCreate(td, dateCreateOfObj)
                    break
                case 3:
                    const dateUpdateOfObj = obj.updatedAt;
                    dateCreate(td, dateUpdateOfObj)
                    break
                case 4:
                    createSvgElement(td, obj)
                    break
                case 5:
                    const div = document.createElement('div')
                    div.classList.add('td-last')

                    const divForbuttonChange = document.createElement('div')
                    const divForIMG = document.createElement('div')
                    const buttonChange = document.createElement('div')
                    const buttonRemove = document.createElement('button')

                    buttonRemove.classList.add('button-remove')
                    divForbuttonChange.classList.add('div-for-button-change', 'flex')
                    buttonChange.classList.add('button-change')
                    divForIMG.classList.add('img-for-button-change')

                    buttonChange.textContent = 'Изменить'
                    buttonRemove.textContent = 'Удалить'

                    td.append(div)
                    div.append(divForbuttonChange)
                    divForbuttonChange.append(divForIMG)
                    divForbuttonChange.append(buttonChange)

                    div.append(buttonRemove)

                    divForbuttonChange.addEventListener('click', () => {
                        divForIMG.classList.add('img-for-button-change-load')
                        buttonChange.classList.add('button-change-load')
                        setTimeout(() => {
                            popupChange(obj)
                            divForIMG.classList.remove('img-for-button-change-load')
                            buttonChange.classList.remove('button-change-load')
                        }, 800)

                    })

                    buttonRemove.addEventListener('click', () => {
                        removeClient(obj)
                    })
                    break
            }
        }
    }
}

// Функция сортировки таблицы

async function tableSort(arr) {
    const newArr = arr;
    const columnWithID = document.getElementById('id');
    const columnWithFIO = document.getElementById('fio');
    const columnWithDateCreate = document.getElementById('create');
    const columnWithDateChanges = document.getElementById('update');

    // Функция для сортировки ID и дат
    function columnSorted(column, objKey) {
        let i = true
        column.onclick = () => {
            if (i) {
                newArr.sort((a, b) => {
                    if (a[objKey] > b[objKey]) return -1;
                });
                i = false;
                createTable(newArr);
                if (column.classList.contains('arrow-up')) {
                    column.classList.replace('arrow-up', 'arrow-down')
                } else {
                    column.classList.replace('arrow-down', 'arrow-up')
                }

            } else {
                newArr.sort((a, b) => {
                    if (a[objKey] < b[objKey]) return -1;
                });
                i = true;
                createTable(newArr);
                if (column.classList.contains('arrow-up')) {
                    column.classList.replace('arrow-up', 'arrow-down')
                } else {
                    column.classList.replace('arrow-down', 'arrow-up')
                }
            }
        }
    }

    columnSorted(columnWithID, 'id')
    columnSorted(columnWithDateCreate, 'updatedAt')
    columnSorted(columnWithDateChanges, 'createdAt')

    // Функция сортировки fio

    function columnFIOSorted() {
        let i = true
        columnWithFIO.onclick = () => {
            if (i) {
                newArr.sort((a, b) => {
                    if (a['surname'] + a['name'] + a['lastname'] < b['surname'] + b['name'] + b['lastname']) return -1;
                });
                i = false;
                createTable(newArr);
                columnWithFIO.querySelector('.td-fio').classList.replace('arrow-down', 'arrow-up')
            } else {
                newArr.sort((a, b) => {
                    if (a['surname'] + a['name'] + a['lastname'] > b['surname'] + b['name'] + b['lastname']) return -1;
                });
                i = true;
                createTable(newArr);
                columnWithFIO.querySelector('.td-fio').classList.replace('arrow-up', 'arrow-down')
            }
        }
    }

    columnFIOSorted()
}

// Функция поиска через input

function inputTable(arr) {
    setInterval(() => {
        const newArr = arr
        const input = document.getElementById('input')

        // Валидация input
        input.oninput = () => {
            if ((/^[а-яА-я0-9\s]+$/igm.test(input.value))) {
                input.classList.remove("invalid")
                input.classList.add("valid")
                createFoundTable(newArr)
            } else {
                input.classList.remove("valid")
                input.classList.add("invalid")
            }

            if (input.value === '') {
                input.classList.remove("valid", "invalid");
                createTable(newArr)
            }

            // Сортировка таблицы

            function createFoundTable(arrEnter) {
                let arrFound = []
                for (const obj of arrEnter) {
                    const fio = `${obj.surname} ${obj.name} ${obj.lastName}`
                    if (fio.toLowerCase().includes(input.value.toLowerCase())
                        ||
                        obj.id.includes(input.value)) {
                        if (!arrFound.includes(obj)) {
                            arrFound.push(obj)
                        };
                    }
                    createTable(arrFound);
                }
            }
        }

        arrFound = []

    }, 600)
}

// Функция добавления контакта

function addContact(popup) {
    const divForButtonAdd = popup.querySelector('.div-for-button-add')
    divForButtonAdd.classList.add('when-add-contact')

    if (divForButtonAdd.childElementCount === 1) {
        const divForContacts = document.createElement('div')
        divForContacts.classList.add('div-for-contacts')
        divForButtonAdd.prepend(divForContacts)
    }

    const divForContacts = popup.querySelector('.div-for-contacts')
    divForContacts.id = 'div-contacts'

    if (divForContacts.childElementCount < 10) {
        const divContact = document.createElement('div')
        divContact.classList.add('div-for-add-contact')

        const divForAddContactSelect = document.createElement('div')
        divForAddContactSelect.classList.add('div-for-add-contact__select', 'arrow-down')

        const divForAddContactDivInput = document.createElement('div')
        divForAddContactDivInput.classList.add('div-for-add-contact__div-input')

        const divForDel = document.createElement('div')
        divForDel.classList.add('div-for-del')
        divForDel.classList.add('del-visibility')

        const divForAddContactTooltip = document.createElement('div')
        divForAddContactTooltip.classList.add('div-for-add-contact__tooltip')

        divForContacts.append(divContact)
        divContact.append(divForAddContactSelect)
        divContact.append(divForAddContactDivInput)
        divContact.append(divForAddContactTooltip)

        const contact1 = document.createElement('div')
        contact1.id = 'contact-1'
        contact1.classList.add('contact-1')
        contact1.textContent = 'Телефон'
        divForAddContactSelect.append(contact1)

        const divForAddContactInput = document.createElement('input')
        divForAddContactInput.placeholder = 'Введите данные контакта'
        divForAddContactInput.classList.add('div-for-add-contact__input')
        divForAddContactDivInput.append(divForAddContactInput)
        divForAddContactDivInput.append(divForDel)

        divForAddContactInput.oninput = () => {
            if (divForAddContactInput.value === '') {
                divForDel.classList.remove('del-visibility')
                divForAddContactDivInput.classList.remove('invalid')
            } else {
                divForDel.classList.add('del-visibility')
            }
        }

        divForDel.onclick = () => {
            if (divForDel.classList.contains('del-visibility')) {
                divForAddContactInput.value = ''
                divForDel.classList.remove('del-visibility')
            }
        }

        const divsInTooltip = document.getElementsByClassName('contact')
        function tooltipForAddContactContent(divTextContent) {
            const arrForTooltip = ['Телефон', 'Доп. телефон', 'Email', 'VK', 'Facebook']
            let arrTooltip = arrForTooltip.filter((item) => {
                return item !== divTextContent
            })

            divForAddContactInput.value = ''
            divForDel.classList.remove('del-visible')

            if (!divForAddContactTooltip.hasChildNodes()) {
                for (let i = 0; i < 4; i++) {
                    const contact = document.createElement('div')
                    contact.classList.add('contact')
                    divForAddContactTooltip.append(contact)
                    contact.textContent = arrTooltip[i]
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    divsInTooltip[i].textContent = arrTooltip[i]
                }
            }
        }

        tooltipForAddContactContent(contact1.textContent)

        let clickDivForAddContactSelect = true

        for (let divInTooltip of divsInTooltip) {
            divInTooltip.onclick = () => {
                contact1.textContent = divInTooltip.textContent
                tooltipForAddContactContent(contact1.textContent)
                divForAddContactTooltip.classList.remove('visible')
                divForAddContactSelect.classList.replace('arrow-up', 'arrow-down')
                clickDivForAddContactSelect = true
            }
        }

        divForAddContactSelect.addEventListener('click', () => {
            if (clickDivForAddContactSelect) {
                divForAddContactTooltip.classList.add('visible')
                divForAddContactSelect.classList.replace('arrow-down', 'arrow-up')
                clickDivForAddContactSelect = false
            } else {
                divForAddContactTooltip.classList.remove('visible')
                divForAddContactSelect.classList.replace('arrow-up', 'arrow-down')
                clickDivForAddContactSelect = true
            }
        })
    }
}

// Функция валидации и извлечения контактов

async function getClientForm(popup, obj) {
    const inputName = popup.querySelector('.input-name')
    const inputSurname = popup.querySelector('.input-surname')
    const inputLastName = popup.querySelector('.input-lastname')

    const contacts = popup.getElementsByClassName('div-for-add-contact')

    const contactsArr = []

    // Функция добаления и изменения на сервере

    async function onServer() {
        if (popup.classList.contains('popup-change')) {
            await changeClientOnServer(obj.id, inputName.value, inputSurname.value, inputLastName.value, contactsArr)
        } else {
            const objNewClient = {
                name: inputName.value,
                surname: inputSurname.value,
                lastName: inputLastName.value,
                contacts: contactsArr
            }
            await addClientOnServer(objNewClient)
        }
    }

    // Функция валидации полей ввода

    function invalidInputInBlock(valid, borderForBlock) {
        if (!valid) {
            borderForBlock.classList.add('invalid')
        }
    }

    // Функция проверки валидации ФИО

    function validInput() {
        const inputs = popup.getElementsByClassName('input')
        for (const input of inputs) {
            const relval = (/^[а-яА-Я]+$/.test(input.value))
            invalidInputInBlock(relval, input)
        }
    }

    // Функция проверки валидации контактов

    function validContacts() {
        for (const contact of contacts) {
            const contact1 = contact.querySelector('.contact-1')
            const input = contact.querySelector('.div-for-add-contact__input')
            const blockForInput = contact.querySelector('.div-for-add-contact__div-input')

            switch (contact1.textContent) {
                case ('Телефон'): {
                    const relVal = (/^[0-9+]+$/.test(input.value))
                    invalidInputInBlock(relVal, blockForInput)
                    break
                }
                case ('Доп. телефон'): {
                    const relVal = (/^[0-9+]+$/.test(input.value))
                    invalidInputInBlock(relVal, blockForInput)
                    break
                }
                case ('Email'): {
                    const valtel = (/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/igm.test(input.value))
                    invalidInputInBlock(valtel, blockForInput)
                    break
                }
                case ('VK'): {
                    const valtel = (/vk/igm.test(input.value))
                    invalidInputInBlock(valtel, blockForInput)
                    break
                }
                case ('Facebook'): {
                    const valtel = (/facebook/igm.test(input.value))
                    invalidInputInBlock(valtel, blockForInput)
                    break
                }
            }
        }
    }

    // Проверка всех input

    if (contacts.length === 0) {
        validInput()
        const arrValidInputs = Array.from(popup.getElementsByClassName('input'))
        if (arrValidInputs.every(elem => {
            return !elem.classList.contains('invalid')
        })) {
            await onServer()
            popup.classList.remove('open')
            const arrClients = await getArrClients(arrSourse)
            createTable(arrClients)
            return true
        }
    } else {
        validInput()
        validContacts()

        const arrValidInputs = Array.from(popup.getElementsByClassName('input'))
        const arrValidContacts = Array.from(popup.getElementsByClassName('div-for-add-contact__div-input'))

        if (arrValidInputs.every(elem => {
            return !elem.classList.contains('invalid')
        }) && arrValidContacts.every(elem => {
            return !elem.classList.contains('invalid')
        })) {
            for (const contact of contacts) {
                const contact1 = contact.querySelector('.contact-1')
                const input = contact.querySelector('.div-for-add-contact__input')

                function typeName(textContent) {
                    switch (textContent) {
                        case ('Телефон'):
                            return 'tel'
                        case ('Доп. телефон'):
                            return 'tel'
                        case ('Email'):
                            return 'email'
                        case ('VK'):
                            return 'vk'
                        case ('Facebook'):
                            return 'facebook'
                    }
                }

                const objContact = {
                    type: typeName(contact1.textContent),
                    value: input.value
                }

                contactsArr.push(objContact)
            }

            popup.classList.remove('open')

            await onServer()

            const arrClients = await getArrClients(arrSourse)
            createTable(arrClients)

            setTimeout(() => {
                const divForContacts = popup.querySelector('.div-for-contacts')
                divForContacts.remove()

                const divForButtonAdd = popup.querySelector('.div-for-button-add')
                divForButtonAdd.classList.remove('when-add-contact')
            }, 800)

            return true
        }
    }
}

// Закрытие окна 

function closePopup(popup) {
    const divContacts = popup.querySelector('.div-for-contacts')
    const divButton = popup.querySelector('.div-for-button-add')
    popup.classList.remove('open')
    setTimeout(() => {
        const inputs = popup.getElementsByClassName('input')
        for (const input of inputs) {
            input.value = ''
            input.classList.remove('invalid')
        }
        divButton.classList.remove('when-add-contact')
        if (divContacts) {
            divContacts.remove()
        }
    }, 800)
}

// Функция для пустого input

function inputEntry(popup) {
    const inputs = popup.querySelectorAll('.input')
    for (const input of inputs) {
        input.addEventListener('focus', () => {
            if (input.value === '') {
                input.classList.remove('invalid')
            }
        })

        input.addEventListener('input', () => {
            input.classList.remove('invalid')
        })
    }

    const contactsInputs = popup.querySelectorAll('.div-for-add-contact')
    for (const contact of contactsInputs) {
        const divInputs = contact.querySelector('.div-for-add-contact__div-input')
        const input = contact.querySelector('input')

        input.addEventListener('focus', () => {
            if (input.value === '') {
                divInputs.classList.remove('invalid')
            }
        })

        input.addEventListener('input', () => {
            divInputs.classList.remove('invalid')
        })
    }
}

// Popup change

function popupChange(obj) {
    const popup = document.querySelector('.popup-change')
    popup.classList.add('open')

    const idElem = document.getElementById('id-change')
    idElem.textContent = `ID: ${obj.id}`

    const inputSurname = popup.querySelector('.input-surname')
    inputSurname.value = obj.surname

    const inputName = popup.querySelector('.input-name')
    inputName.value = obj.name

    const inputLastName = popup.querySelector('.input-lastname')
    inputLastName.value = obj.lastName

    let counterTrue = false
    for (let i = 0; i < obj.contacts.length; i++) {
        addContact(popup)
        const contacts = popup.getElementsByClassName('div-for-add-contact')[i]

        function typeName(textContent) {
            switch (textContent) {
                case ('tel'):
                    return 'Телефон'
                case ('tel'):
                    return 'Доп. телефон'
                case ('email'):
                    return 'Email'
                case ('vk'):
                    return 'VK'
                case ('facebook'):
                    return 'Facebook'
            }
        }

        const contactType = contacts.querySelector('.contact-1')

        if (obj.contacts[i].type === 'tel' && counterTrue === false) {
            counterTrue = true
            contactType.textContent = typeName(obj.contacts[i].type)
        } else if (
            obj.contacts[i].type === 'tel' && counterTrue === true
        ) {
            contactType.textContent = 'Доп. телефон'
        } else {
            contactType.textContent = typeName(obj.contacts[i].type)
        }

        const contactValue = contacts.querySelector('.div-for-add-contact__input')
        contactValue.value = obj.contacts[i].value
    }



    const buttonDeleteClient = popup.querySelector('.popup-change__button-remove')
    buttonDeleteClient.addEventListener('click', () => {
        popup.classList.remove('open')
        removeClient(obj)
    })

    function functionButtonAdd() {
        addContact(popup)
    }

    const buttonAdd = popup.querySelector('.button-add')
    buttonAdd.addEventListener('click', functionButtonAdd)

    const buttonSave = document.getElementById('button-save')
    buttonSave.addEventListener('click', async function functionButtonSave() {
        if (await getClientForm(popup, obj)) {
            buttonAdd.removeEventListener('click', functionButtonAdd)
            buttonSave.removeEventListener('click', functionButtonSave)
            closePopup(popup)
        }
        inputEntry(popup)
    })

    const close = popup.querySelector('.close-popup')
    close.addEventListener('click', () => {
        buttonAdd.removeEventListener('click', functionButtonAdd)
        closePopup(popup)
    })
}

// Popup remove

async function removeClient(obj) {
    const popup = document.querySelector('.popup-remove')
    popup.classList.add('open')

    const buttonRemove = popup.querySelector('.popup-remove__button-remove')
    buttonRemove.addEventListener('click', async function removeClientServer() {
        alert('Удалить клиента?')
        await deleteClient(obj.id)
        popup.classList.remove('open')
        const arrClients = await getArrClients(arrSourse)
        createTable(arrClients)
        buttonRemove.removeEventListener('click', removeClientServer)
    })

    const closes = popup.querySelectorAll('.close-popup')
    for (const close of closes) {
        close.addEventListener('click', () => {
            popup.classList.remove('open')
        })
    }
}

// Popup new client

function createNewClient() {
    const buttonAddNewClient = document.querySelector('.popup-create-open')
    const popupCreate = document.querySelector('.popup-create')

    buttonAddNewClient.addEventListener('click', async function addClientOnServer() {
        popupCreate.classList.add('open')

        function functionButtonAdd() {
            addContact(popupCreate)
        }

        const buttonAdd = popupCreate.querySelector('.button-add')
        buttonAdd.addEventListener('click', functionButtonAdd)

        const buttonSave = popupCreate.querySelector('.popup-create__button-save')
        buttonSave.addEventListener('click', async function functionButtonSave() {
            if (await getClientForm(popupCreate)) {
                buttonAdd.removeEventListener('click', functionButtonAdd)
                buttonSave.removeEventListener('click', functionButtonSave)
                closePopup(popupCreate)
            }
            inputEntry(popupCreate)
        })

        const closes = popupCreate.querySelectorAll('.close-popup')
        for (const close of closes) {
            close.addEventListener('click', () => {
                buttonAdd.removeEventListener('click', functionButtonAdd)
                closePopup(popupCreate)
            })
        }

        const inputs = popupCreate.querySelectorAll('li')
        for (const li of inputs) {
            const label = li.querySelector('label')
            const input = li.querySelector('input')
            input.addEventListener('input', () => {
                if (input.value !== '') {
                    label.classList.add('transform-input')
                } else {
                    label.classList.remove('transform-input')
                }
            })
        }
    })
}

// Загрузка страницы

const arrClients = await getArrClients(arrSourse);
createTable(arrClients);
tableSort(arrClients);
inputTable(arrClients);
createNewClient();
