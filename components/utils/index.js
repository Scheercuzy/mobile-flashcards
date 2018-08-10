const ID5 = () => {
    return Math.random().toString(36).substr(2, 5)
}

export const createAndCheckID5 = (list) => {
    while ( true ) {
        unique = true
        id = ID5()
        list && list.map(item => {
            if (id == item.id) {
                unique = false
            }
        })
        if (unique) {
            return id
        }
    }
}