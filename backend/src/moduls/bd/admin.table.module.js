import { tableSelect, tableInsert, tableDeleteRow, tableUpdateRow, getItemsCountByName, query_ } from './libs/TableBD.module.js';


async function creatProject_bd({ name, short_description, deadline_min_day, deadline_max_day, types, url, imgUrl }) {
    const result = await tableInsert({ name, short_description, deadline_min_day, deadline_max_day, types, url, imgUrl }, 'projects');
    return result.rows;
}

async function creatServices_prices_bd({ title, short_description, deadlines,
    hit, price, currency, price_individually, time_individually }) {
    const result = await tableInsert(
        { title, short_description, deadlines, hit, price, currency, price_individually, time_individually },
        'services_prices'
    );
    return result.rows;
}

async function creatReviews_bd({ name, review, img, url }) {
    const result = await tableInsert(
        { name, review, img, url },
        'reviews'
    );
    return result.rows;
}

// update

async function updateProject_bd({id, name, short_description, deadline_min_day, deadline_max_day, types, url, imgUrl }) {
    const result = await tableUpdateRow(
        {id, name, short_description, deadline_min_day, deadline_max_day, types, url, imgUrl },
         'projects'
    );
    return result.rows;
}

async function updateServices_prices_bd(
    {id, title, short_description, deadlines, hit, price, currency, price_individually, time_individually}
) {
    const result = await tableUpdateRow(
        {id, title, short_description, deadlines, hit, price, currency, price_individually, time_individually },
         'services_prices'
    );

    return result.rows;
}

// get

async function getMessages_bd( {offset = 0, pageSize = 3} ){
    const res_items = await tableSelect({offset, pageSize}, 'messages');
    const totalItems =  await getItemsCountByName('messages');
    const items = res_items.rows;
    return {items, totalItems};
}

async function getApplications_bd({offset = 0, pageSize = 3}){
    const res_items = await tableSelect({offset, pageSize}, 'applications');
    const totalItems =  await getItemsCountByName('applications');
    const items = res_items.rows;
    return {items, totalItems};
}
async function getDownloadsItems_bd({offset = 0, pageSize = 3}){
    const res_items = await tableSelect({offset, pageSize}, 'downloads');
    const totalItems =  await getItemsCountByName('downloads');
    const items = res_items.rows;
    return {items, totalItems};
}

// delete

async function deleteProject_bd(id){
    const result = await tableDeleteRow(id, 'projects');
    return result.rowCount;
}
async function deleteServices_pricest_bd(id){
    const result = await tableDeleteRow(id, 'services_prices');
    return result.rowCount;
}
async function deleteReview_bd(id){
    const result = await tableDeleteRow(id, 'reviews');
    return result.rowCount;
}
async function deleteMessage_bd(id){
    const result =  await tableDeleteRow(id, 'messages');
    return result.rowCount;
}
async function deleteApplication_bd(id){
    const result = await tableDeleteRow(id, 'applications');
    return result.rowCount;
}

export {
    creatProject_bd, creatServices_prices_bd, creatReviews_bd,
    updateProject_bd, updateServices_prices_bd,
    getMessages_bd, getApplications_bd, getDownloadsItems_bd,
    deleteProject_bd, deleteServices_pricest_bd, deleteReview_bd, deleteMessage_bd, deleteApplication_bd
};