export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'nameName',
            title: 'User Name',
            type: 'string'
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string'
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string'
        },
        {
            name: 'role',
            title: 'Role',
            type: 'string'
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string'
        },
        {
            name: 'created_at',
            title: 'Created At',
            type: 'datetime'
        },
        {
            name: 'updated_at',
            title: 'Updated At',
            type: 'datetime'
        },
        {
            name: 'deleted_at',
            title: 'Deleted At',
            type: 'datetime'
        },
    ]
}