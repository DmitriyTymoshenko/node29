const {program} = require("commander");

const {listContacts , getContactById , removeContact , addContact} = require('./contacts')

program
    .option('--action <type>' , 'action type' , 'showAll')
    .option('--id <type>' , 'contact id')
    .option('--name <type>' , 'add name')
    .option('--email <type>' , 'add name')
    .option('--phone <type>' , 'add name')

program.parse(process.argv)
const options = program.opts()
const {action, id , name , email , phone} = options;

(async()=> {
    switch(action) {
        case "list":
            const contacts = await listContacts();
            if (!contacts) {
                console.log('Контакты не найдены')
                break;
            }
            console.log(contacts)
            break;
        case "get":
            const contact = await getContactById(id)
            if(!contact){
                console.log(contact)
                console.log(`Товар с id=${id} не найден`)
                break;
            }
            console.log(contact)
            break;
        case "remove" :
            console.log(typeof id)
            const result = await removeContact(id)
            if (!result) {
                    console.log("Контакт не удален")
                    break;
            }
            console.log("Контакт успешно удален")
            break;
        case "add":
            if(!name || !email || !phone){
                console.log("Для товара нужно указать name, email и phone");
                break;
            }
            const newContact = await addContact(name , email , phone);
            if (!newContact) {
                console.log("Контакт не добавлен")
                break;
            }
            console.log(newContact)
            break;
        default:
            console.log("неизвестная команда");
    }
})()
