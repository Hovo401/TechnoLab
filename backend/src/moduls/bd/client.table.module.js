import { tableSelect, tableInsert, tableDeleteRow, tableUpdateRow, getItemsCountByName, query_ } from './libs/TableBD.module.js';




async function getProjectsItems(offset = 0, pageSize = 3) {
    const result = await tableSelect({offset, pageSize}, 'projects');
    return result.rows;
}

async function getProjectsItemsCount(){
    const result =  await getItemsCountByName('projects');
    return result;
}



async function getServices_pricesItems(offset = 0, pageSize = 3) {
    const result = await tableSelect({offset, pageSize}, 'services_prices');
    return result.rows;
}

async function getServices_pricesItemsCount(){
    const result = await getItemsCountByName('services_prices');
    return result.rows;
}


async function getReviewsItems(offset = 0, pageSize = 3) {
    const result = await tableSelect({offset, pageSize}, 'reviews');
    return result.rows;
}

async function getReviewsItemsCount(){
    const result = await getItemsCountByName('reviews');
    return result.rows;
}


async function insertMessage({communication_method, client_name, phone, message}) {
    const result = await tableInsert({communication_method, client_name, phone, message}, 'messages');
    return result.rows;
}

async function insertApplication({communication_method, client_name, phone}) {
    const result = await tableInsert({communication_method, client_name, phone}, 'applications');
    return result.rows;
}



export {
    insertMessage, insertApplication, getProjectsItems, getProjectsItemsCount, 
    getServices_pricesItems, getServices_pricesItemsCount, getReviewsItems, getReviewsItemsCount
};