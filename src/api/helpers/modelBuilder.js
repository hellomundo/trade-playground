const buildModel = ({
    db = null,
    table = '',
    selectableProps = []
}) => {
    const create = (props) => {
        delete props.id // don't allow id to be passed for creation

        if(areDisallowed(props, selectableProps)) { throw "One or more of those props are not allowed."}

        return db(table)
            .insert(props)
            .returning(selectableProps)
    }

    const update = (id, props) => {
        delete props.id // don't allow id to be updated

        if(areDisallowed(props, selectableProps)) throw "One or more of those props are not allowed."

        return db(table)
            .update(props)
            .where({id})
            .returning(selectableProps)
    }

    const destroy = (id) => {
        return db(table)
            .where({id})
            .del()
    }

    const find = (filters) => {
        return db(table)
            .select(selectableProps)
            .where(filters)
            
    }

    const findOne = (filters) => {
        return db(table)
            .first(selectableProps)
            .where(filters)
    }

    const findById = (id) => {
        return db(table)
            .select(selectableProps)
            .where({id})
    }

    const all = () => {
        console.log("db is of type: "+typeof(db));
        return db(table)
            .select(selectableProps)
    }

    const areDisallowed = (props, selectableProps) => {
        // make sure the props are members of selectableProps
        return !Object.keys(props).every(prop => selectableProps.includes(prop))
    }

    return {
        table,
        selectableProps,
        create,
        destroy,
        update,
        all,
        find,
        findOne,
        findById,
    }
}

module.exports = buildModel