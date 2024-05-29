import qs from 'qs'
const query = qs.stringify(
    {
        populate: {
            users_permissions_user: {
                fields: ['*'],
            },
        }
    },
    {
        encodeValuesOnly: true, // prettify URL
    }
);

console.log(query);