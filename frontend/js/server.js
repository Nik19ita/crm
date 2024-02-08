// Функция добавления клиента на сервер

export async function addClientOnServer(obj) {
    const responsePost = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
            name: obj.name,
            surname: obj.surname,
            lastName: obj.lastName,
            contacts: obj.contacts
        }),
        headers: {
            'Content-type': 'application/json',
        }
    });
}

// Функция запроса студетов с сервера

export async function getArrClients(arrSourse) {
    const response = await fetch('http://localhost:3000/api/clients');
    const result = await response.json();
    if (result.length === 0) {
        for (const obj of arrSourse) {
            await addClientOnServer(obj);
        }
        const response = await fetch('http://localhost:3000/api/clients');
        const result = await response.json();

        return result;
    }

    return result;
}

// Функция изменения клиента на сервере

export async function changeClientOnServer(id, valueName, valueSurName, valueLastName, valueContacts) {
    const responsePatch = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            name: valueName,
            surname: valueSurName,
            lastName: valueLastName,
            contacts: valueContacts
        }),
        headers: {
            'Content-type': 'application/json',
        }
    });
}

//  Функция удаления кдинета с сервера

export async function deleteClient(id) {
    const responsePatch = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        }
    });
}